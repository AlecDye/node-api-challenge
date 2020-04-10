const express = require("express");

const Projects = require("./data/helpers/projectModel");

const router = express.Router();

// CRUD operations
router.get("/", (req, res) => {
  Projects.get()
    .then((projects) => {
      if (projects) {
        res.status(200).json({ message: "Project list sent", projects });
      } else {
        res.status(404).json({ message: "Projects not found" });
      }
    })
    .catch((error) => {
      res.status(500).json({ error, message: "Server broke" });
    });
});

router.get("/:id", (req, res) => {
  const id = req.params.id;
  Projects.get(id)
    .then((project) => {
      if (project) {
        res.status(200).json({ message: "Requested project sent", project });
      } else {
        res.status(404).json({ message: "Project not found" });
      }
    })
    .catch((error) => {
      res.status(500).json({ error, message: "Server broke" });
    });
});

router.get("/:id/actions", (req, res) => {
  const id = req.params.id;
  Projects.getProjectActions(id)
    .then((actions) => {
      if (actions) {
        res.status(200).json({ message: "Actions sent", actions });
      } else {
        res.status(404).json({ message: "Actions for this project not found" });
      }
    })
    .catch((error) => {
      res.status(500).json({ error, message: "Server broke" });
    });
});

module.exports = router;
