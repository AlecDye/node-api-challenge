const express = require("express");

const Projects = require("./data/helpers/projectModel");

const router = express.Router();

// CRUD operations
router.get("/", (req, res) => {
  Projects.get()
    .then((projects) => {
      if (projects) {
        res.status(200).json({ message: "Sent success", projects });
      } else {
        res.status(404).json({ message: "Projects no found!" });
      }
    })
    .catch((error) => {
      res.status(500).json({ error, message: "Server broke" });
    });
});

module.exports = router;
