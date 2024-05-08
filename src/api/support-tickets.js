const express = require("express");
const router = express.Router();

const {
  getAllSupportTickets,
  createSupportTicket,
} = require("../lib/functions");

router.post("/", async (req, res) => {
  try {
    await createSupportTicket(req.body);
    res.status(201).json({ message: "Ticket created" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/", (req, res) => {
  getAllSupportTickets()
    .then((tickets) => {
      res.json(tickets);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

module.exports = router;
