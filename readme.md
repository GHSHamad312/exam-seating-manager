<div align="center">

  <br />
  <img src="./frontend/assets/logo-placeholder.png" alt="Project Logo" width="120" height="120">
  <h1 align="center">Exam Seating Plan Manager</h1>

  <p align="center">
    A comprehensive, automated solution for academic examination logistics.
    <br />
    <a href="#-project-demo"><strong>View Demo</strong></a> ·
    <a href="#-features"><strong>Explore Features</strong></a> ·
    <a href="#-installation--setup"><strong>Installation</strong></a>
  </p>
  
  <p align="center">
    <img src="https://img.shields.io/badge/Node.js-v14+-green?style=flat&logo=node.js" alt="Node Version">
    <img src="https://img.shields.io/badge/Database-MySQL-blue?style=flat&logo=mysql" alt="DB">
    <img src="https://img.shields.io/badge/License-MIT-yellow?style=flat" alt="License">
    <img src="https://img.shields.io/badge/Status-Maintained-orange?style=flat" alt="Status">
  </p>
</div>

<br />

![Application Banner](path/to/your/banner-image.png)
*(Replace this text with a banner screenshot of your application)*

## 📖 About The Project

The **Exam Seating Plan Manager** is a web-based application built to streamline the complex administrative task of allocating exam seats. By managing students, rooms, and departments, the system uses intelligent algorithms to ensure **academic integrity** by generating conflict-free seating arrangements.

---

## 🎥 Project Demo

<div align="center">
  <a href="https://www.youtube.com/watch?v=jYxsA4et9a4&feature=youtu.be">
    <img src="https://img.youtube.com/vi/jYxsA4et9a4/0.jpg" alt="Watch the Demo" style="width:100%;">
  </a>
  <br>
  <b>🔴 Click the image above to watch the full walkthrough</b>
</div>

---

## 📸 Screenshots

| **Admin Dashboard** | **Seating Generation** |
|:---:|:---:|
| ![Dashboard](path/to/dashboard-screenshot.png) | ![Seating](path/to/seating-screenshot.png) |
| *Overview of system stats* | *Conflict-free allocation* |

| **Student Management** | **PDF Export** |
|:---:|:---:|
| ![Student Mgmt](path/to/student-screenshot.png) | ![PDF](path/to/pdf-screenshot.png) |
| *CRUD operations for students* | *Print-ready reports* |

---

## 🚀 Features

### 🧠 Core Functionality
* **🧩 Automated Seating Algorithm:** Ensures no two students from the same department or semester sit adjacent to each other.
* **📄 PDF Export:** One-click generation of professional seating plans for printing and notice boards.
* **⚖️ Conflict Resolution:** Smart handling of room capacities and student distribution.

### 🛠 Administrative Control (CRUD)
* **🎓 Student Management:** Add/Update/Delete records (Names, Roll Nos, Semesters).
* **🏫 Room Management:** Configure classrooms with specific row/column capacities.
* **🏢 Department Management:** Organize students by academic discipline.

### 🔐 Security
* **Secure Authentication:** Protected Admin Login and Registration system.

---

## 🛠️ Tech Stack

This project leverages the **MVC (Model-View-Controller)** architecture.

### **Backend**
* ![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white) **Node.js**: Runtime environment.
* ![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB) **Express.js**: Framework for API routing.
* ![MySQL](https://img.shields.io/badge/mysql-%2300f.svg?style=for-the-badge&logo=mysql&logoColor=white) **MySQL**: Relational database.
* ![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens) **Dotenv**: Environment management.

### **Frontend**
* ![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white) **HTML5**: Structure.
* ![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white) **CSS3**: Styling.
* ![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E) **Vanilla JS**: Client-side logic.

---

## 📂 Project Structure

```bash
EXAM_SEATING_PLAN_PROJECT/
├── backend/
│   ├── config/              # Database connection setup
│   ├── controllers/         # Business logic (Seating algo, CRUD)
│   ├── models/              # Database queries and schema models
│   ├── routes/              # API Endpoints
│   └── middleware/          # Error handling
├── frontend/
│   ├── authpages/           # Login and Register HTML/CSS
│   ├── pages/               # Dashboard and Management interfaces
│   └── assets/              # Static images and global styles
├── database.sql             # SQL file for database initialization
├── server.js                # Application entry point
└── package.json             # Dependencies and scripts
```
⚙️ Installation & Setup
Follow these steps to run the project locally.

1. Prerequisites
Node.js (v14 or higher)

MySQL Server installed and running

2. Clone the Repository
Bash

git clone [https://github.com/GHSHamad312/exam-seating-manager.git](https://github.com/GHSHamad312/exam-seating-manager.git)
cd exam-seating-plan
3. Install Dependencies
Bash

npm install
4. Database Configuration
Create a new MySQL database named exam_seating_db.

Import the provided SQL file:

Open MySQL Workbench or Command Line.

Run the contents of database.sql.

5. Environment Variables
Create a .env file in the root directory:

Code snippet

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=exam_seating_db
PORT=3000
6. Run the Application
Start the development server:

Bash

# Run in development mode
npm run dev

# OR start standard server
npm start
Visit http://localhost:3000 in your browser.

🤝 Contributing
Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are greatly appreciated.

Fork the Project

Create your Feature Branch (git checkout -b feature/AmazingFeature)

Commit your Changes (git commit -m 'Add some AmazingFeature')

Push to the Branch (git push origin feature/AmazingFeature)

Open a Pull Request

<div align="center"> <p>If you found this project helpful, please give it a ⭐️!</p> </div>
