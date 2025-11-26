# Exam Seating Plan Backend

A modular Node.js/Express backend for the Exam Seating Plan Manager application.

## Project Structure

```
backend/
├── config/              # Configuration files
│   └── database.js      # Database connection pool
├── models/              # Data models
│   ├── Student.js       # Student model
│   ├── Room.js          # Room model
│   ├── Semester.js      # Semester model
│   └── SeatingPlan.js   # Seating plan model
├── controllers/         # Request handlers
│   ├── studentController.js
│   ├── roomController.js
│   ├── semesterController.js
│   └── seatingPlanController.js
├── routes/              # API routes
│   ├── studentRoutes.js
│   ├── roomRoutes.js
│   ├── semesterRoutes.js
│   └── seatingPlanRoutes.js
├── middleware/          # Custom middleware
│   └── errorHandler.js
├── server.js            # Main server file
├── package.json         # Project dependencies
├── .env                 # Environment variables
├── database.sql         # Database schema and sample data
└── README.md            # This file
```

## Setup Instructions

### 1. Prerequisites
- Node.js (v14 or higher)
- MySQL Server running locally
- npm or yarn

### 2. Install Dependencies

```bash
cd backend
npm install
```

### 3. Create Database

Open MySQL and run:

```bash
mysql -u root -p < database.sql
```

Or manually run the queries in `database.sql` file in your MySQL client.

### 4. Environment Configuration

The `.env` file is already configured with:
```
PORT=4000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=shahhamad
DB_NAME=exam_seating_plan
NODE_ENV=development
```

### 5. Start the Server

**Development mode (with auto-restart on file changes):**
```bash
npm run dev
```

**Production mode:**
```bash
npm start
```

The server will start on `http://localhost:4000`

## API Endpoints

### Students
- `POST /api/students` - Create a new student
- `GET /api/students` - Get all students
- `GET /api/students/:id` - Get a specific student
- `PUT /api/students/:id` - Update a student
- `DELETE /api/students/:id` - Delete a student
- `GET /api/students/search/query?query=term` - Search students

### Rooms
- `POST /api/rooms` - Create a new room
- `GET /api/rooms` - Get all rooms
- `GET /api/rooms/available` - Get available rooms
- `GET /api/rooms/:id` - Get a specific room
- `PUT /api/rooms/:id` - Update a room
- `DELETE /api/rooms/:id` - Delete a room
- `GET /api/rooms/search/query?query=term` - Search rooms

### Semesters
- `POST /api/semesters` - Create a new semester
- `GET /api/semesters` - Get all semesters
- `GET /api/semesters/:id` - Get a specific semester
- `PUT /api/semesters/:id` - Update a semester
- `DELETE /api/semesters/:id` - Delete a semester
- `GET /api/semesters/search/query?query=term` - Search semesters

### Seating Plans
- `POST /api/seating-plans/generate` - Generate a new seating plan
- `GET /api/seating-plans` - Get all seating plans
- `GET /api/seating-plans/:id` - Get a specific seating plan
- `GET /api/seating-plans/semester/:semesterId` - Get plans for a semester
- `DELETE /api/seating-plans/:id` - Delete a seating plan

### Health Check
- `GET /api/health` - Check if server is running

## Example Requests

### Create a Student
```json
POST /api/students
{
  "name": "John Doe",
  "cms": "CS001",
  "semester": 5,
  "department": "Computer Science"
}
```

### Create a Room
```json
POST /api/rooms
{
  "name": "Room 301",
  "capacity": 50,
  "availability": "Available"
}
```

### Create a Semester
```json
POST /api/semesters
{
  "name": "Spring 2024",
  "startDate": "2024-01-15",
  "endDate": "2024-05-30"
}
```

## Database Schema

### Students Table
- `id` - Primary key
- `name` - Student name
- `cms` - CMS number (unique)
- `semester` - Semester number
- `department` - Department name
- `createdAt` - Creation timestamp
- `updatedAt` - Update timestamp

### Rooms Table
- `id` - Primary key
- `name` - Room name (unique)
- `capacity` - Room capacity
- `availability` - Available/Occupied
- `createdAt` - Creation timestamp
- `updatedAt` - Update timestamp

### Semesters Table
- `id` - Primary key
- `name` - Semester name
- `startDate` - Start date
- `endDate` - End date
- `createdAt` - Creation timestamp
- `updatedAt` - Update timestamp

### Seating Plans Table
- `id` - Primary key
- `semesterId` - Foreign key to semesters
- `roomId` - Foreign key to rooms
- `studentIds` - JSON array of student IDs
- `createdAt` - Creation timestamp
- `updatedAt` - Update timestamp

## Features

✅ Modular architecture with separate concerns
✅ RESTful API design
✅ CORS enabled for frontend communication
✅ Error handling middleware
✅ MySQL database with connection pooling
✅ CRUD operations for all entities
✅ Search functionality
✅ Input validation
✅ Duplicate detection (CMS, Room names)

## Error Handling

The API returns appropriate HTTP status codes:
- `200` - Success
- `201` - Created
- `400` - Bad request
- `404` - Not found
- `409` - Conflict (duplicate)
- `500` - Server error

## Future Enhancements

- [ ] Authentication and authorization
- [ ] Implement seating plan generation algorithm
- [ ] PDF generation for seating plans
- [ ] Email notifications
- [ ] Database migrations
- [ ] Unit and integration tests
- [ ] API documentation with Swagger

## Troubleshooting

**Issue: Connection refused on port 4000**
- Check if another service is using port 4000
- Restart the server

**Issue: Database connection error**
- Verify MySQL is running
- Check credentials in `.env` file
- Ensure database exists

**Issue: Module not found**
- Run `npm install` again
- Clear node_modules and reinstall

## License

ISC
