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
      ('Min Mycbs ser mærkelig', 'Der mangler en masse ikoner.', 'S162392', 'E1001', 'S162392', 'Software')
      `
    );
    db.run(
      "CREATE TABLE IF NOT EXISTS it_employees (userId INTEGER PRIMARY KEY, name TEXT, email TEXT, password TEXT, status TEXT, createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP, passwordChangedAt TIMESTAMP, employeeNumber TEXT)"
    );
    db.run(
      `INSERT INTO it_employees (name, email, password, status, employeeNumber) VALUES 
      ('Bob Smith', 'bs.it@cbs.dk', 'password123', 'active', 'E1001'),
      ('Carol Black', 'cb.it@cbs.dk', 'password124', 'active', 'E1002'),
      ('Dan Grey', 'dg.it@cbs.dk', 'password125', 'active', 'E1003'),
      ('Eva Gold', 'eg.it@cbs.dk', 'password126', 'active', 'E1004'),
      ('Frank Silver', 'fs.it@cbs.dk', 'password127', 'active', 'E1005');
      `
    );
    db.run(
      "CREATE TABLE IF NOT EXISTS students (userId INTEGER PRIMARY KEY, name TEXT, email TEXT, password TEXT, status TEXT, createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP, passwordChangedAt TIMESTAMP, studentNumber TEXT)"
    );
    db.run(
      `INSERT INTO students (name, email, password, status, studentNumber) VALUES 
      ('Alice Johnson', 'aljo23ab@student.cbs.dk', 'mypassword', 'enrolled', 'S162392'),
      ('Bob Martin', 'boma24bc@student.cbs.dk', 'password1', 'enrolled', 'S162393'),
      ('Clara Hansen', 'clha25cd@student.cbs.dk', 'password2', 'enrolled', 'S162394'),
      ('David Nygaard', 'dany26de@student.cbs.dk', 'password3', 'enrolled', 'S162395'),
      ('Eva Rasmussen', 'evra27ef@student.cbs.dk', 'password4', 'enrolled', 'S162396'),
      ('Finn Jakobsen', 'fija28fg@student.cbs.dk', 'password5', 'enrolled', 'S162397'),
      ('Greta Larsen', 'grla29gh@student.cbs.dk', 'password6', 'enrolled', 'S162398'),
      ('Hans Mortensen', 'hamo30hi@student.cbs.dk', 'password7', 'enrolled', 'S162399'),
      ('Ida Nielsen', 'idni31ij@student.cbs.dk', 'password8', 'enrolled', 'S162400'),
      ('Johan Petersen', 'jope32jk@student.cbs.dk', 'password9', 'enrolled', 'S162401');
      `
    );
    db.run(
      "CREATE TABLE IF NOT EXISTS academics (userId INTEGER PRIMARY KEY, name TEXT, email TEXT, password TEXT, status TEXT, createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP, passwordChangedAt TIMESTAMP, academicId TEXT, title TEXT, department TEXT, phone STRING)"
    );
    db.run(
      `INSERT INTO academics (name, email, password, title, department, phone, academicId) VALUES 
      ('Dr. Charlie Brown', 'cb.fi@cbs.dk', 'securepass', 'Professor', 'Finansiering', '123-456-7890', 'A1001'),
      ('Dr. Emily White', 'ew.ec@cbs.dk', 'securepass1', 'Professor', 'Economics', '123-456-7891', 'A1002'),
      ('Dr. Fiona Green', 'fg.ma@cbs.dk', 'securepass2', 'Associate Professor', 'Marketing', '123-456-7892', 'A1003'),
      ('Dr. George Blue', 'gb.st@cbs.dk', 'securepass3', 'Assistant Professor', 'Strategy', '123-456-7893', 'A1004'),
      ('Dr. Harold Red', 'hr.ib@cbs.dk', 'securepass4', 'Professor', 'International Business', '123-456-7894', 'A1005');
      `
    );
  });
};

module.exports = { init, db };
