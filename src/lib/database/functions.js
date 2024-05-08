const { db } = require("./init");

const getAllSupportTickets = () => {
  return new Promise((resolve, reject) => {
    db.all("SELECT * FROM support_tickets", (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
};

const createSupportTicket = (ticket) => {
  if (
    !ticket.title ||
    !ticket.description ||
    !ticket.createdBy ||
    !ticket.assignedTo ||
    !ticket.affectedUser ||
    !ticket.category
  ) {
    throw new Error("Missing required fields");
  }

  return new Promise((resolve, reject) => {
    db.run(
      "INSERT INTO support_tickets (title, description, createdBy, assignedTo, affectedUser, category) VALUES (?, ?, ?, ?, ?, ?)",
      [
        ticket.title,
        ticket.description,
        ticket.createdBy,
        ticket.assignedTo,
        ticket.affectedUser,
        ticket.category,
      ],
      function (err) {
        if (err) {
          reject(err);
        } else {
          resolve(this.lastID);
        }
      }
    );
  });
};

const getAllUsers = (type) => {
  return new Promise((resolve, reject) => {
    db.all(`SELECT * FROM ${type}`, (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
};

module.exports = { getAllSupportTickets, createSupportTicket, getAllUsers };
