const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./db.sqlite");

const init = () => {
  db.serialize(() => {
    db.run(
      "CREATE TABLE IF NOT EXISTS support_tickets (ticketId INTEGER PRIMARY KEY, status TEXT DEFAULT 'created', title TEXT, description TEXT, createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP, createdBy TEXT, assignedTo TEXT, affectedUser TEXT, category TEXT)"
    );
    db.run(
      "INSERT INTO support_tickets (title, description, createdBy, assignedTo, affectedUser, category) VALUES ('Issue with printer', 'The color printer on the 2nd floor is not working.', 'alice@example.com', 'bob@example.com', 'charlie@example.com', 'hardware')"
    );
    db.run(
      "CREATE TABLE IF NOT EXISTS it_employees (userId INTEGER PRIMARY KEY, name TEXT, email TEXT, password TEXT, status TEXT, createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP, passwordChangedAt TIMESTAMP, employeeNumber TEXT)"
    );
    db.run(
      "INSERT INTO it_employees (name, email, password, status, employeeNumber) VALUES ('Bob Smith', 'bob@example.com', 'password123', 'active', 'E1001')"
    );
    db.run(
      "CREATE TABLE IF NOT EXISTS students (userId INTEGER PRIMARY KEY, name TEXT, email TEXT, password TEXT, status TEXT, createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP, passwordChangedAt TIMESTAMP, studentNumber TEXT)"
    );
    db.run(
      "INSERT INTO students (name, email, password, status, studentNumber) VALUES ('Alice Johnson', 'alice@student.edu', 'mypassword', 'enrolled', 'S1001')"
    );
    db.run(
      "CREATE TABLE IF NOT EXISTS academics (userId INTEGER PRIMARY KEY, name TEXT, email TEXT, password TEXT, status TEXT, createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP, passwordChangedAt TIMESTAMP, academicId TEXT, title TEXT, department TEXT, phone STRING)"
    );
    db.run(
      "INSERT INTO academics (name, email, password, title, department, phone, academicId) VALUES ('Dr. Charlie Brown', 'charlie@academia.edu', 'securepass', 'Professor', 'Computer Science', '123-456-7890', 'A1001')"
    );
  });
};

module.exports = { init, db };
