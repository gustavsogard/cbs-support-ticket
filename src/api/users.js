const express = require("express");
const router = express.Router();

const { getAllUsers } = require("../lib/functions");

router.get("/it-employees", (req, res) => {
  getAllUsers("it_employees")
    .then((users) => {
      res.json(users);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

router.get("/academics", (req, res) => {
  getAllUsers("academics")
    .then((users) => {
      res.json(users);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

router.get("/students", (req, res) => {
  getAllUsers("students")
    .then((users) => {
      res.json(users);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

module.exports = router;
