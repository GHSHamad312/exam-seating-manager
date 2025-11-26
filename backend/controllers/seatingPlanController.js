
const SeatingPlan = require('../models/SeatingPlan');
const Room = require('../models/Room');
const Student = require('../models/Student');
const Department = require('../models/Department');
const Semester = require('../models/Semester');
const Exam = require('../models/Exam');
const PDFDocument = require('pdfkit');
const fs = require('fs');

exports.generateSeatingPlan = async (req, res) => {
    try {
        const { rooms, students } = req.body;
        if (!rooms || !students || rooms.length === 0 || students.length === 0) {
            return res.status(400).json({ error: 'Rooms and students are required' });
        }

        // Fetch room and student details
        // For simplicity, assign students row-wise to rooms (like the sample)
        const allRooms = await Promise.all(rooms.map(async r => await Room.getByNumber(r)));
        const allStudentsRaw = await Promise.all(students.map(async cms => await Student.getByCMS(cms)));
        // enrich students with semester name and department name where available
        let allStudents = await Promise.all(allStudentsRaw.map(async s => {
            if (!s) return null;
            const dept = s.department_id ? await Department.getById(s.department_id) : null;
            const sem = s.semester_id ? await Semester.getById(s.semester_id) : null;
            return {
                cms: s.cms,
                name: s.name,
                semester_id: s.semester_id,
                semester_name: sem ? (sem.name || sem.semester_name || `S-${s.semester_id}`) : '',
                department_id: s.department_id,
                department: dept ? (dept.department_name || '') : ''
            };
        }));
        // Remove any nulls for missing students
        allStudents = allStudents.filter(s => s !== null);

        // Check total capacity across selected rooms
        const totalCapacity = allRooms.reduce((sum, r) => sum + (Number(r.capacity) || 0), 0);
        if (allStudents.length > totalCapacity) {
            return res.status(400).json({ error: `Selected ${allStudents.length} students exceed total seating capacity (${totalCapacity})` });
        }

        // Generate PDF with separate page per room
        const PDFDocument = require('pdfkit');
        const { PassThrough } = require('stream');
        
        const doc = new PDFDocument({ size: 'A4', margin: 30 });
        let buffers = [];
        doc.on('data', buffers.push.bind(buffers));
        doc.on('end', () => {
            const pdfData = Buffer.concat(buffers);
            res.setHeader('Content-Type', 'application/pdf');
            res.setHeader('Content-Disposition', 'attachment; filename="seating-plan.pdf"');
            res.send(pdfData);
        });

        // Prepare to persist seating plans and exam info
        const examPayload = req.body.exam || {
            exam_id: req.body.exam_id || `EX${Date.now()}`,
            subject: req.body.subject || 'Seating Plan',
            exam_date: req.body.exam_date || new Date().toISOString().split('T')[0],
            exam_time: req.body.exam_time || new Date().toTimeString().split(' ')[0].slice(0,5)
        };

        // Upsert exam record (create if not exists, otherwise update)
        try {
            const existingExam = await Exam.getById(examPayload.exam_id);
            if (existingExam) {
                await Exam.updateById(examPayload.exam_id, {
                    subject: examPayload.subject,
                    exam_date: examPayload.exam_date,
                    exam_time: examPayload.exam_time
                });
            } else {
                await Exam.create(examPayload);
            }
        } catch (err) {
            console.warn('Warning: failed to persist exam info', err);
        }

        // Distribute students across rooms and generate PDF pages
        // We'll keep a mutable list of remaining students and pick candidates
        // so that adjacent seats (left/top) do not have the same semester or department when possible.
        let remainingStudents = allStudents.slice();
        for (let roomIdx = 0; roomIdx < allRooms.length; roomIdx++) {
            if (roomIdx > 0) doc.addPage();
            
            const room = allRooms[roomIdx];
            const COLS = room.roomcol || 8;
            const ROWS = Math.ceil((room.capacity || 0) / COLS);

            // Create grid for this room
            let grid = Array.from({ length: ROWS }, () => Array(COLS).fill(null));
            let assignedInRoom = 0;
            const roomCapacity = Number(room.capacity) || 0;

            for (let r = 0; r < ROWS; r++) {
                for (let c = 0; c < COLS; c++) {
                    // assign if we still have students and room hasn't reached capacity
                    if (remainingStudents.length > 0 && assignedInRoom < roomCapacity) {
                        // prefer a student who doesn't share semester or department with left/top neighbors
                        const left = c > 0 ? grid[r][c-1] : null;
                        const top = r > 0 ? grid[r-1][c] : null;

                        let foundIndex = -1;
                        for (let i = 0; i < remainingStudents.length; i++) {
                            const cand = remainingStudents[i];
                            let ok = true;
                            if (left) {
                                if (cand.semester_id && left.semester_id && cand.semester_id === left.semester_id) ok = false;
                                if (cand.department_id && left.department_id && cand.department_id === left.department_id) ok = false;
                            }
                            if (top && ok) {
                                if (cand.semester_id && top.semester_id && cand.semester_id === top.semester_id) ok = false;
                                if (cand.department_id && top.department_id && cand.department_id === top.department_id) ok = false;
                            }
                            if (ok) { foundIndex = i; break; }
                        }

                        // if no perfectly compatible candidate, pick the first available (fallback)
                        if (foundIndex === -1) foundIndex = 0;

                        const chosen = remainingStudents.splice(foundIndex, 1)[0];
                        grid[r][c] = chosen;
                        assignedInRoom++;
                    }
                }
            }

            // Persist seating plan for this room
            try {
                // flatten student CMS ids assigned to this room
                const assignedStudents = [];
                for (let r = 0; r < ROWS; r++) {
                    for (let c = 0; c < COLS; c++) {
                        const s = grid[r][c];
                        if (s) assignedStudents.push(s.cms);
                    }
                }
                // derive semester_id from first assigned student if available
                const flatGrid = grid.flat();
                const firstWithSem = flatGrid.find(x => x && x.semester_id);
                const semester_id = firstWithSem ? firstWithSem.semester_id : null;
                await SeatingPlan.create({ semester_id, room_number: room.room_number || room.room_number, studentIds: assignedStudents });
            } catch (err) {
                console.warn('Warning: failed to persist seating plan for room', room.room_number, err);
            }

            // Header for this room (improved design)
            doc.fontSize(18).font('Helvetica-Bold').text('Exam Seating Plan', { align: 'center' });
            doc.moveDown(0.2);
            // exam details line
            const examLine = `${examPayload.subject || ''}   •   Exam ID: ${examPayload.exam_id || ''}   •   Date: ${examPayload.exam_date || ''} ${examPayload.exam_time ? ' @ ' + examPayload.exam_time : ''}`;
            doc.fontSize(11).font('Helvetica').text(examLine, { align: 'center' });
            doc.moveDown(0.4);
            // room title
            doc.fontSize(12).font('Helvetica-Bold').text(`Room: ${room.room_name || room.room_number}`, 50, doc.y, { align: 'left' });
            doc.moveDown(0.6);

            // Draw grid
            const startX = 50, startY = doc.y + 10, cellW = 75, cellH = 55;
            
            // Draw column headers
            doc.fontSize(10).font('Helvetica-Bold');
            for (let c = 0; c < COLS; c++) {
                const colX = startX + c * cellW;
                doc.text((c + 1).toString(), colX + 23, startY - 18, { width: cellW - 10, align: 'center' });
            }
            doc.font('Helvetica');
            
            // Draw grid rows with improved cell layout
            let seatCounter = 1;
            for (let r = 0; r < ROWS; r++) {
                for (let c = 0; c < COLS; c++) {
                    const x = startX + c * cellW;
                    const y = startY + r * cellH;

                    // Draw cell border with rounded small inset
                    doc.roundedRect ? doc.roundedRect(x, y, cellW, cellH, 4).stroke() : doc.rect(x, y, cellW, cellH).stroke();

                    const student = grid[r][c];

                    // small seat number at top-left
                    doc.fontSize(8).fillColor('#555').text(seatCounter, x + 4, y + 3);

                    if (student) {
                        // Student info in cell, centered
                        const lines = [
                            student.name,
                            student.cms,
                            student.semester_name || '',
                            student.department || ''
                        ].filter(Boolean);

                        doc.fillColor('black').fontSize(9);
                        // compute vertical start to center lines
                        const totalTextHeight = lines.length * 11;
                        let textY = y + (cellH - totalTextHeight) / 2;
                        lines.forEach(line => {
                            doc.text(line, x + 4, textY, { width: cellW - 8, align: 'center' });
                            textY += 11;
                        });
                    } else {
                        // Empty seat - leave cell blank (no big red 0)
                        // optionally could draw a faint placeholder; we'll leave it empty
                        doc.fillColor('#999');
                        // no text for empty seats
                        doc.fillColor('black');
                    }

                    seatCounter++;
                }
            }

            // Footer with signature lines
            const footerY = startY + (ROWS * cellH) + 20;
            doc.fontSize(10);
            doc.moveDown(1);
            
            // Summary info (students assigned to this room)
            doc.fontSize(9).text(`Total Students: ${assignedInRoom}`, 50, footerY);
            
            // Signature lines
            const lineY = footerY + 30;
            
            // Create 3 columns for signatures
            doc.fontSize(9);
            doc.text('Superintendent:', 50, lineY);
            doc.moveTo(50, lineY + 25).lineTo(180, lineY + 25).stroke();
            
            doc.text('Invigilator:', 220, lineY);
            doc.moveTo(220, lineY + 25).lineTo(350, lineY + 25).stroke();
            
            doc.text('Support:', 390, lineY);
            doc.moveTo(390, lineY + 25).lineTo(520, lineY + 25).stroke();
        }

        doc.end();
    } catch (error) {
        console.error('Error generating seating plan:', error);
        res.status(500).json({ error: 'Error generating seating plan' });
    }
};

exports.getAllSeatingPlans = async (req, res) => {
    try {
        const plans = await SeatingPlan.getAll();
        res.status(200).json({ 
            message: 'Seating plans retrieved successfully', 
            count: plans.length,
            plans 
        });
    } catch (error) {
        console.error('Error retrieving seating plans:', error);
        res.status(500).json({ error: 'Error retrieving seating plans' });
    }
};

exports.getSeatingPlanById = async (req, res) => {
    try {
        const { id } = req.params;
        const plan = await SeatingPlan.getById(id);

        if (!plan) {
            return res.status(404).json({ error: 'Seating plan not found' });
        }

        res.status(200).json({ message: 'Seating plan retrieved successfully', plan });
    } catch (error) {
        console.error('Error retrieving seating plan:', error);
        res.status(500).json({ error: 'Error retrieving seating plan' });
    }
};

exports.getSeatingPlansBySemester = async (req, res) => {
    try {
        const { semesterId } = req.params;
        const plans = await SeatingPlan.getBySemester(semesterId);

        res.status(200).json({ 
            message: 'Seating plans retrieved successfully', 
            count: plans.length,
            plans 
        });
    } catch (error) {
        console.error('Error retrieving seating plans:', error);
        res.status(500).json({ error: 'Error retrieving seating plans' });
    }
};

exports.deleteSeatingPlan = async (req, res) => {
    try {
        const { id } = req.params;
        
        const plan = await SeatingPlan.getById(id);
        if (!plan) {
            return res.status(404).json({ error: 'Seating plan not found' });
        }

        await SeatingPlan.delete(id);
        res.status(200).json({ message: 'Seating plan deleted successfully' });
    } catch (error) {
        console.error('Error deleting seating plan:', error);
        res.status(500).json({ error: 'Error deleting seating plan' });
    }
};
