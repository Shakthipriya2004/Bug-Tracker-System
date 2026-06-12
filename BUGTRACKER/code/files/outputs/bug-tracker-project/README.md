# Bug Tracker Project

This is a 1-day beginner-friendly Java full-stack project using:

- Java 17
- Spring Boot
- Spring Data JPA
- MySQL
- HTML, CSS, and JavaScript

## What You Will Build

A small-team Bug Tracker where users can:

- Add a bug report
- Set severity: Low, Medium, High, Critical
- Assign the bug to a developer
- Change status: Open, In Progress, Fixed, Rejected
- Track bug history with timestamps
- Filter bugs by status
- Delete bugs

## Folder Structure

```text
bug-tracker-project/
  backend/
    pom.xml
    src/main/java/com/bugtracker/
      BugTrackerApplication.java
      model/Bug.java
      repository/BugRepository.java
      service/BugService.java
      controller/BugController.java
    src/main/resources/application.properties
  frontend/
    index.html
    style.css
    script.js
  sql/
    bugtracker.sql
```

## 1-Day Roadmap

### Hour 1: Setup

Install or open:

- Java 17
- Maven
- MySQL or XAMPP
- IntelliJ IDEA, Eclipse, or VS Code

### Hour 2: Database

If you use XAMPP:

1. Open XAMPP Control Panel.
2. Start MySQL.
3. Open `http://localhost/phpmyadmin`.
4. Create a database named `bugtracker`.
5. Open the SQL tab and run `sql/bugtracker.sql`.

If you use MySQL command line:

```bash
mysql -u root < sql/bugtracker.sql
```

If MySQL asks for a password and you know it:

```bash
mysql -u root -p < sql/bugtracker.sql
```

## Important: If You Do Not Have a MySQL Password

That is okay. The project is already configured for a blank password:

```properties
spring.datasource.username=root
spring.datasource.password=
```

This usually works with XAMPP and WAMP.

If your MySQL later has a password, update this line in `backend/src/main/resources/application.properties`:

```properties
spring.datasource.password=your_password_here
```

## Hour 3-5: Run Backend

Open the `backend` folder in your IDE.

Run:

```bash
mvn spring-boot:run
```

The backend starts at:

```text
http://localhost:8080
```

Test API in browser:

```text
http://localhost:8080/api/bugs
```

You should see JSON data.

## Hour 6-7: Run Frontend

Open:

```text
frontend/index.html
```

You can double-click the file, or open it with your browser.

## Hour 8: Practice Explanation

Use this for your resume or viva:

> Built a full-stack Bug Tracker using Spring Boot REST APIs, MySQL persistence, and a vanilla JavaScript frontend. The app supports creating, viewing, filtering, updating, and deleting bug reports.

## API Endpoints

| Method | URL | Purpose |
| --- | --- | --- |
| GET | `/api/bugs` | Get all bugs |
| GET | `/api/bugs?status=OPEN` | Filter bugs by status |
| GET | `/api/bugs/{id}` | Get one bug |
| GET | `/api/bugs/{id}/history` | Get bug history |
| POST | `/api/bugs` | Create a bug |
| PUT | `/api/bugs/{id}` | Update a bug |
| DELETE | `/api/bugs/{id}` | Delete a bug |

## Common Error Fixes

### Backend cannot connect to MySQL

Check that MySQL is running.

For XAMPP, keep:

```properties
spring.datasource.username=root
spring.datasource.password=
```

### Port 8080 already in use

Change this in `application.properties`:

```properties
server.port=8081
```

Then update this line in `frontend/script.js`:

```javascript
const API_BASE = "http://localhost:8081/api/bugs";
```

### Frontend says backend offline

Start the backend first:

```bash
mvn spring-boot:run
```
