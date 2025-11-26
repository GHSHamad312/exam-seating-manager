# **Exam Seating Plan Manager**

A comprehensive web-based application designed to automate the generation of conflict-free exam seating arrangements. This system streamlines the administrative task of allocating seats by managing students, rooms, and departments, ensuring academic integrity through intelligent algorithmic placement.

\<\!-- VIDEO DEMO PLACEHOLDER \--\>

## **🎥 Project Demo**

[**Click here to watch the Project Demo Video**](https://www.google.com/search?q=PUT_YOUR_YOUTUBE_OR_DRIVE_LINK_HERE)

## **🚀 Features**

### **Core Functionality**

* **Automated Seating Generation:** Algorithms ensure that no two students from the same department or semester are seated adjacent to each other to prevent cheating.  
* **PDF Export:** Generate and download professional PDF reports of the final seating plan for printing and notice boards.  
* **Conflict Resolution:** Automatic handling of room capacities and student distribution.

### **Administrative Management (CRUD)**

* **Student Management:** Add, update, and delete student records (Names, Roll Numbers, Semesters).  
* **Room Management:** Configure classrooms with specific row/column capacities and availability status.  
* **Department Management:** Organize students by their respective academic departments.

### **Authentication**

* Secure Admin Login and Registration system to protect sensitive data.

## **🛠️ Tech Stack**

**Backend**

* **Node.js**: Runtime environment.  
* **Express.js**: Web framework for API routing and middleware.  
* **MySQL**: Relational database for storing entities.  
* **MySQL2**: Database driver.  
* **Dotenv**: Environment variable management.

**Frontend**

* **HTML5 & CSS3**: Structure and styling.  
* **Vanilla JavaScript**: Client-side logic (Embedded directly within HTML files for modularity).  
* **Note:** The application is currently **Desktop Optimized**.

## **📂 Project Structure**

The project follows the **MVC (Model-View-Controller)** architectural pattern.

EXAM\_SEATING\_PLAN\_PROJECT/  
├── backend/  
│   ├── config/             \# Database connection setup  
│   ├── controllers/        \# Business logic (Seating algo, CRUD)  
│   ├── models/             \# Database queries and schema models  
│   ├── routes/             \# API Endpoints  
│   └── middleware/         \# Error handling  
├── frontend/  
│   ├── authpages/          \# Login and Register HTML/CSS  
│   ├── pages/              \# Dashboard and Management interfaces  
│   └── assets/             \# Static images and global styles  
├── database.sql            \# SQL file for database initialization  
├── server.js               \# Application entry point  
└── package.json            \# Dependencies and scripts

## **⚙️ Installation & Setup**

Follow these steps to run the project locally.

### **1\. Prerequisites**

* Node.js (v14 or higher)  
* MySQL Server installed and running

### **2\. Clone the Repository**

git clone \[https://github.com/GHSHamad312/exam-seating-manager.git]
cd exam-seating-plan

### **3\. Install Dependencies**

npm install

### **4\. Database Configuration**

1. Create a new MySQL database (e.g., exam\_seating\_db).  
2. Import the provided SQL file to create the necessary tables:  
   * Open your MySQL Workbench or Command Line.  
   * Run the contents of database.sql.

### **5\. Environment Variables**

Create a .env file in the root directory and configure your database credentials:

DB\_HOST=localhost  
DB\_USER=root  
DB\_PASSWORD=your\_password  
DB\_NAME=exam\_seating\_db  
PORT=3000  

### **6\. Run the Application**

Start the development server:

npm run dev  
\# OR  
npm start

Access the application at http://localhost:3000.

## **🤝 Contributing**

Contributions are welcome\! Please fork the repository and submit a pull request.
