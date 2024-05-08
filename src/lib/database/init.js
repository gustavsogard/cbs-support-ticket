const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./db.sqlite");

const init = () => {
  db.serialize(() => {
    db.run(
      "CREATE TABLE IF NOT EXISTS support_tickets (ticketId INTEGER PRIMARY KEY, status TEXT DEFAULT 'created', title TEXT, description TEXT, createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP, createdBy TEXT, assignedTo TEXT, affectedUser TEXT, category TEXT)"
    );
    db.run(
      "CREATE TABLE IF NOT EXISTS it_employees (userId INTEGER PRIMARY KEY, name TEXT, email TEXT, password TEXT, status TEXT, createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP, passwordChangedAt TIMESTAMP, employeeNumber TEXT)"
    );
    db.run(
      "CREATE TABLE IF NOT EXISTS students (userId INTEGER PRIMARY KEY, name TEXT, email TEXT, password TEXT, status TEXT, createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP, passwordChangedAt TIMESTAMP, studentNumber TEXT)"
    );
    db.run(
      "CREATE TABLE IF NOT EXISTS academics (userId INTEGER PRIMARY KEY, name TEXT, email TEXT, password TEXT, status TEXT, createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP, passwordChangedAt TIMESTAMP, academicId TEXT, title TEXT, department TEXT, phone STRING)"
    );
    insertData();
  });
};

const insertData = () => {
  const supportTickets = [
    {
      title: "Outlook er stoppet med at åbne automatisk",
      description:
        "Den plejede altid at åbne automatisk, nu gør den ikke længere.",
      createdBy: "A1001",
      assignedTo: "E1001",
      affectedUser: "A1001",
      category: "Hardware",
    },
    {
      title: "Studentermedarbejders adgang til system",
      description:
        "De har brug for adgang til systemet for at kunne udføre deres arbejde.",
      createdBy: "A1001",
      assignedTo: "E1001",
      affectedUser: "A1001",
      category: "Access management",
    },
    {
      title: "Min Mycbs ser mærkelig",
      description: "Der mangler en masse ikoner.",
      createdBy: "S162392",
      assignedTo: "E1001",
      affectedUser: "S162392",
      category: "Software",
    },
  ];

  const employees = [
    {
      name: "Bob Smith",
      email: "bs.it@cbs.dk",
      password: "password123",
      status: "active",
      employeeNumber: "E1001",
    },
    {
      name: "Carol Black",
      email: "cb.it@cbs.dk",
      password: "password124",
      status: "active",
      employeeNumber: "E1002",
    },
    {
      name: "Dan Grey",
      email: "dg.it@cbs.dk",
      password: "password125",
      status: "active",
      employeeNumber: "E1003",
    },
    {
      name: "Eva Gold",
      email: "eg.it@cbs.dk",
      password: "password126",
      status: "active",
      employeeNumber: "E1004",
    },
    {
      name: "Frank Silver",
      email: "fs.it@cbs.dk",
      password: "password127",
      status: "active",
      employeeNumber: "E1005",
    },
  ];

  const students = [
    {
      name: "Alice Johnson",
      email: "aljo23ab@student.cbs.dk",
      password: "mypassword",
      status: "enrolled",
      studentNumber: "S162392",
    },
    {
      name: "Bob Martin",
      email: "boma24bc@student.cbs.dk",
      password: "password1",
      status: "enrolled",
      studentNumber: "S162393",
    },
    {
      name: "Clara Hansen",
      email: "clha25cd@student.cbs.dk",
      password: "password2",
      status: "enrolled",
      studentNumber: "S162394",
    },
    {
      name: "David Nygaard",
      email: "dany26de@student.cbs.dk",
      password: "password3",
      status: "enrolled",
      studentNumber: "S162395",
    },
    {
      name: "Eva Rasmussen",
      email: "evra27ef@student.cbs.dk",
      password: "password4",
      status: "enrolled",
      studentNumber: "S162396",
    },
  ];

  const academics = [
    {
      name: "Dr. Charlie Brown",
      email: "cb.fi@cbs.dk",
      password: "securepass",
      title: "Professor",
      department: "Finance",
      phone: "123-456-7890",
      academicId: "A1001",
    },
    {
      name: "Dr. Emily White",
      email: "ew.ec@cbs.dk",
      password: "securepass1",
      title: "Professor",
      department: "Economics",
      phone: "123-456-7891",
      academicId: "A1002",
    },
    {
      name: "Dr. Fiona Green",
      email: "fg.ma@cbs.dk",
      password: "securepass2",
      title: "Associate Professor",
      department: "Marketing",
      phone: "123-456-7892",
      academicId: "A1003",
    },
    {
      name: "Dr. George Blue",
      email: "gb.st@cbs.dk",
      password: "securepass3",
      title: "Assistant Professor",
      department: "Strategy",
      phone: "123-456-7893",
      academicId: "A1004",
    },
    {
      name: "Dr. Harold Red",
      email: "hr.ib@cbs.dk",
      password: "securepass4",
      title: "Professor",
      department: "International Business",
      phone: "123-456-7894",
      academicId: "A1005",
    },
  ];

  supportTickets.forEach((ticket) => {
    db.get(
      `SELECT * FROM support_tickets WHERE title = ? AND createdBy = ?`,
      [ticket.title, ticket.createdBy],
      (err, row) => {
        if (err) {
          console.error(err.message);
        }
        if (!row) {
          db.run(
            `INSERT INTO support_tickets (title, description, createdBy, assignedTo, affectedUser, category) VALUES (?, ?, ?, ?, ?, ?)`,
            [
              ticket.title,
              ticket.description,
              ticket.createdBy,
              ticket.assignedTo,
              ticket.affectedUser,
              ticket.category,
            ]
          );
        }
      }
    );
  });

  employees.forEach((emp) => {
    db.get(
      `SELECT * FROM it_employees WHERE email = ?`,
      [emp.email],
      (err, row) => {
        if (err) {
          console.error(err.message);
        }
        if (!row) {
          db.run(
            `INSERT INTO it_employees (name, email, password, status, employeeNumber) VALUES (?, ?, ?, ?, ?)`,
            [emp.name, emp.email, emp.password, emp.status, emp.employeeNumber]
          );
        }
      }
    );
  });

  students.forEach((student) => {
    db.get(
      `SELECT * FROM students WHERE email = ?`,
      [student.email],
      (err, row) => {
        if (err) {
          console.error(err.message);
        }
        if (!row) {
          db.run(
            `INSERT INTO students (name, email, password, status, studentNumber) VALUES (?, ?, ?, ?, ?)`,
            [
              student.name,
              student.email,
              student.password,
              student.status,
              student.studentNumber,
            ]
          );
        }
      }
    );
  });

  academics.forEach((academic) => {
    db.get(
      `SELECT * FROM academics WHERE email = ?`,
      [academic.email],
      (err, row) => {
        if (err) {
          console.error(err.message);
        }
        if (!row) {
          db.run(
            `INSERT INTO academics (name, email, password, title, department, phone, academicId) VALUES (?, ?, ?, ?, ?, ?, ?)`,
            [
              academic.name,
              academic.email,
              academic.password,
              academic.title,
              academic.department,
              academic.phone,
              academic.academicId,
            ]
          );
        }
      }
    );
  });
};

module.exports = { init, db };
