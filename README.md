# 🐞 Bug Tracker Management System

## 📖 Overview

The Bug Tracker Management System is a full-stack web application developed using Java, Spring Boot, MySQL, HTML, CSS, and JavaScript. It provides a centralized platform for reporting, tracking, prioritizing, and resolving software bugs throughout the development lifecycle.

This system helps development teams efficiently manage software issues by categorizing bugs based on severity and tracking their status from creation to resolution.

---

## 🚀 Features

- Create, View, Update, and Delete (CRUD) bug records
- Bug severity classification:
  - Low
  - Medium
  - High
  - Critical
- Status tracking:
  - Open
  - In Progress
  - Fixed
  - Rejected
- Responsive and user-friendly interface
- RESTful API integration
- MySQL database connectivity
- Real-time bug management workflow

---

## 🛠️ Tech Stack

### Backend
- Java
- Spring Boot
- Spring Data JPA
- Hibernate

### Frontend
- HTML5
- CSS3
- JavaScript
- Bootstrap

### Database
- MySQL

---

## 🏗️ Project Architecture

Frontend (HTML, CSS, JavaScript)
↓
Spring Boot Controller
↓
Service Layer
↓
Repository Layer (JPA)
↓
MySQL Database

---

## 📂 Database Schema

| Field | Type |
|---------|---------|
| id | BIGINT |
| title | VARCHAR(255) |
| description | TEXT |
| severity | ENUM |
| status | ENUM |

---

## 🔗 API Endpoints

| Method | Endpoint | Description |
|---------|-----------|-------------|
| GET | /api/bugs | Get all bugs |
| GET | /api/bugs/{id} | Get bug by ID |
| POST | /api/bugs | Create a new bug |
| PUT | /api/bugs/{id} | Update bug details |
| DELETE | /api/bugs/{id} | Delete a bug |

---

## ⚙️ Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/bug-tracker-management-system.git
cd bug-tracker-management-system
```

### 2. Create MySQL Database

```sql
CREATE DATABASE bugtracker;
```

### 3. Configure Database

Update the `application.properties` file:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/bugtracker
spring.datasource.username=root
spring.datasource.password=your_password

spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
```

### 4. Run the Application

```bash
mvn spring-boot:run
```

Application URL:

```text
http://localhost:8080
```

---

## 🎯 Project Objectives

- Simplify bug reporting and tracking
- Improve collaboration between developers and testers
- Prioritize software issues effectively
- Maintain complete bug history
- Enhance software quality and reliability

---

## 🔮 Future Enhancements

- User Authentication & Authorization
- Role-Based Access Control
- Bug Assignment to Developers
- Email Notifications
- Advanced Search & Filters
- Analytics Dashboard
- File Attachment Support

---

## 👩‍💻 Author

**P. M. Shakthi Priya**

- M.Tech Artificial Intelligence & Data Science
- Java Full Stack Developer
- Data Analyst & Machine Learning Enthusiast

---

## 📜 License

This project is developed for learning and portfolio purposes.
