const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./db.sqlite");

const init = () => {
  db.serialize(() => {
    db.run(
      "CREATE TABLE IF NOT EXISTS support_tickets (ticketId INTEGER PRIMARY KEY, status TEXT DEFAULT 'created', title TEXT, description TEXT, createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP, createdBy TEXT, assignedTo TEXT, affectedUser TEXT, category TEXT)"
    );
    db.run(
      `INSERT INTO support_tickets (title, description, createdBy, assignedTo, affectedUser, category) VALUES 
      ('Outlook er stoppet med at åbne automatisk', 'Den plejede altid at åbne automatisk, nu gør den ikke længere.', 'A1001', 'E1001', 'A1001', 'Hardware'),
      ('Studentermedarbejders adgang til system', 'De har brug for adgang til systemet for at kunne udføre deres arbejde.', 'A1001', 'E1001', 'A1001', 'Acess management'),
      ('Min Mycbs ser mærkelig', 'Der mangler en masse ikoner.', 'S162392', 'E1001', 'S162392', 'Software'),
      `
    );
    db.run(
      "CREATE TABLE IF NOT EXISTS it_employees (userId INTEGER PRIMARY KEY, name TEXT, email TEXT, password TEXT, status TEXT, createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP, passwordChangedAt TIMESTAMP, employeeNumber TEXT)"
    );
    db.run(
      "INSERT INTO it_employees (name, email, password, status, employeeNumber) VALUES ('Bob Smith', 'bs.it@cbs.dk', 'password123', 'active', 'E1001')"
    );
    db.run(
      "CREATE TABLE IF NOT EXISTS students (userId INTEGER PRIMARY KEY, name TEXT, email TEXT, password TEXT, status TEXT, createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP, passwordChangedAt TIMESTAMP, studentNumber TEXT)"
    );
    db.run(
      "INSERT INTO students (name, email, password, status, studentNumber) VALUES ('Alice Johnson', 'aljo23ab@student.cbs.dk', 'mypassword', 'enrolled', 'S162392')"
    );
    db.run(
      "CREATE TABLE IF NOT EXISTS academics (userId INTEGER PRIMARY KEY, name TEXT, email TEXT, password TEXT, status TEXT, createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP, passwordChangedAt TIMESTAMP, academicId TEXT, title TEXT, department TEXT, phone STRING)"
    );
    db.run(
      "INSERT INTO academics (name, email, password, title, department, phone, academicId) VALUES ('Dr. Charlie Brown', 'cb.fi@cbs.dk', 'securepass', 'Professor', 'Finansiering', '123-456-7890', 'A1001')"
    );
  });
};

module.exports = { init, db };
