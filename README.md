Bug Tracker Management System

A full-stack web application developed using Spring Boot and MySQL that enables users to report, track, manage, and resolve software bugs efficiently. The system provides a centralized platform for issue management with severity classification, status tracking, and responsive dashboards.

Features
Create, update, view, and delete bug records
Bug severity classification (Low, Medium, High, Critical)
Status tracking (Open, In Progress, Fixed, Rejected)
Responsive user interface
RESTful API integration
MySQL database connectivity
Real-time bug management workflow
Tech Stack
Backend
Java
Spring Boot
Spring Data JPA
Hibernate
Frontend
HTML5
CSS3
JavaScript
Bootstrap
Database
MySQL
Project Architecture
Frontend (HTML/CSS/JS)
        ↓
Spring Boot Controllers
        ↓
Service Layer
        ↓
Repository Layer (JPA)
        ↓
MySQL Database
Screenshots

Add screenshots of:

Dashboard
Bug List
Create Bug Form
Update Bug Page

Example:

## Screenshots

### Dashboard
![Dashboard](screenshots/dashboard.png)

### Bug List
![Bug List](screenshots/bug-list.png)
Database Schema
Field	Type
id	BIGINT
title	VARCHAR
description	TEXT
severity	ENUM
status	ENUM
API Endpoints
Method	Endpoint	Description
GET	/api/bugs	Get all bugs
GET	/api/bugs/{id}	Get bug by ID
POST	/api/bugs	Create new bug
PUT	/api/bugs/{id}	Update bug
DELETE	/api/bugs/{id}	Delete bug
Installation
Clone Repository
git clone https://github.com/yourusername/bug-tracker.git
Configure Database

Create a MySQL database:

CREATE DATABASE bugtracker;

Update application.properties:

spring.datasource.url=jdbc:mysql://localhost:3306/bugtracker
spring.datasource.username=root
spring.datasource.password=your_password
Run Application
mvn spring-boot:run

Open:

http://localhost:8080
Future Enhancements
User Authentication & Authorization
Role-Based Access Control (Admin/Developer/Tester)
Email Notifications
Bug Assignment to Developers
Search and Filter Functionality
Analytics Dashboard
