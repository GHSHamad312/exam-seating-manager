<br />
<div align="center">
  <a href="https://github.com/GHSHamad312/exam-seating-manager">
    <img src="frontend/assets/logo.png" alt="Logo" width="80" height="80">
  </a>

  <h3 align="center">Exam Seating Plan Manager</h3>

  <p align="center">
    A comprehensive solution for conflict-free academic scheduling.
    <br />
    <a href="https://github.com/GHSHamad312/exam-seating-manager"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://www.youtube.com/watch?v=jYxsA4et9a4">View Demo</a>
    ·
    <a href="https://github.com/GHSHamad312/exam-seating-manager/issues">Report Bug</a>
    ·
    <a href="https://github.com/GHSHamad312/exam-seating-manager/issues">Request Feature</a>
  </p>
</div>

<div align="center">
  
  ![Contributors](https://img.shields.io/github/contributors/GHSHamad312/exam-seating-manager?style=for-the-badge)
  ![Forks](https://img.shields.io/github/forks/GHSHamad312/exam-seating-manager?style=for-the-badge)
  ![Stargazers](https://img.shields.io/github/stars/GHSHamad312/exam-seating-manager?style=for-the-badge)
  ![Issues](https://img.shields.io/github/issues/GHSHamad312/exam-seating-manager?style=for-the-badge)
  ![License](https://img.shields.io/github/license/GHSHamad312/exam-seating-manager?style=for-the-badge)

</div>

<details>
  <summary>Table of Contents</summary>
  <ol>
    <li><a href="#about-the-project">About The Project</a></li>
    <li><a href="#built-with">Built With</a></li>
    <li><a href="#gallery">Project Gallery</a></li>
    <li><a href="#getting-started">Getting Started</a></li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#contributing">Contributing</a></li>
  </ol>
</details>

---

## 🚀 About The Project

![Product Screenshot](frontend/assets/banner_placeholder.png)
*(Recommended: Add a wide banner image here showing the main dashboard)*

The **Exam Seating Plan Manager** solves the logistical nightmare of manual exam scheduling. It is a full-stack web application designed to automate seat allocation, ensuring academic integrity by strictly preventing students from the same department or semester from sitting adjacent to one another.

### Key Features

* 🧩 **Algorithmic Seating:** automatically generates conflict-free arrangements based on room capacity and student data.
* 📄 **PDF Generation:** Instantly creates downloadable, printable PDF reports for notice boards.
* 🏫 **Room & Student Management:** Full CRUD capabilities for managing university infrastructure and student records.
* 🔒 **Secure Access:** Role-based authentication to protect sensitive student data.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

---

## 🛠️ Built With

This project utilizes a robust **MVC (Model-View-Controller)** architecture.

| Tech | Description |
| --- | --- |
| ![NodeJS](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white) | Runtime Environment for Backend Logic |
| ![ExpressJS](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge) | Web Framework for API Routing |
| ![MySQL](https://img.shields.io/badge/MySQL-005C84?style=for-the-badge&logo=mysql&logoColor=white) | Relational Database Management |
| ![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white) | Frontend Structure |
| ![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white) | Styling and Responsive Design |
| ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black) | Client-side Interactivity |

<p align="right">(<a href="#readme-top">back to top</a>)</p>

---

## 📸 Gallery

<div align="center">
  <h3>🎥 Video Demo</h3>
  <a href="https://www.youtube.com/watch?v=jYxsA4et9a4">
    <img src="https://img.youtube.com/vi/jYxsA4et9a4/maxresdefault.jpg" alt="Watch the Video" width="600">
  </a>
  <p><i>Click to watch the full workflow</i></p>
</div>

<br>

| **Dashboard Overview** | **Seating Logic** |
|:---:|:---:|
| <img src="frontend/assets/dashboard_screenshot.png" width="400" alt="Dashboard"> | <img src="frontend/assets/seating_screenshot.png" width="400" alt="Seating"> |
| *Real-time stats and controls* | *Conflict-free generation* |

| **Student Management** | **PDF Export** |
|:---:|:---:|
| <img src="frontend/assets/crud_screenshot.png" width="400" alt="CRUD"> | <img src="frontend/assets/pdf_screenshot.png" width="400" alt="PDF"> |
| *Easy database management* | *Print-ready layouts* |

<p align="right">(<a href="#readme-top">back to top</a>)</p>

---

## ⚡ Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

* **Node.js** (v14+)
* **MySQL Server**

### Installation

1.  **Clone the repo**
    ```sh
    git clone [https://github.com/GHSHamad312/exam-seating-manager.git](https://github.com/GHSHamad312/exam-seating-manager.git)
    cd exam-seating-plan
    ```
2.  **Install NPM packages**
    ```sh
    npm install
    ```
3.  **Database Setup**
    * Create a database named `exam_seating_db`
    * Import `database.sql` into MySQL Workbench.
4.  **Configure Environment**
    Create a `.env` file in the root directory:
    ```env
    DB_HOST=localhost
    DB_USER=root
    DB_PASSWORD=your_password
    DB_NAME=exam_seating_db
    PORT=3000
    ```
5.  **Run the App**
    ```sh
    npm run dev
    ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

---

## 🤝 Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

<p align="right">(<a href="#readme-top">back to top</a>)</p>

---

## 📧 Contact

Your Name - [@YourTwitter](https://twitter.com/your_username) - email@example.com

Project Link: [https://github.com/GHSHamad312/exam-seating-manager](https://github.com/GHSHamad312/exam-seating-manager)

<p align="center">
  <img src="https://capsule-render.vercel.app/api?type=waving&color=auto&height=200&section=footer" />
</p>
