const express = require("express");

const Projects = require("./data/helpers/projectModel");
const Actions = require("./data/helpers/actionModel");

const router = express.Router();

// CRUD operations

// GET operations (3)
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

// POST operations (2)
router.post("/", (req, res) => {
  const newProject = req.body;
  //   const requiredValues = req.body.name && req.body.description
  if (!req.body.name) {
    res.status(400).json({ message: "Name is required" });
  } else if (!req.body.description) {
    res.status(400).json({ message: "Description is required" });
  } else {
    Projects.insert(newProject)
      .then((project) => {
        res.status(200).json({ message: "Project created", project });
      })
      .catch((error) => {
        res.status(500).json({ error, message: "Server broke" });
      });
  }
});

//! Not working, goes to default server 404
router.post("/id/actions", (req, res) => {
  const newAction = req.body;
  if (
    !req.body.description ||
    Object.values(req.body.description).length > 128
  ) {
    res.status(400).json({
      message: "Description is required and must be less than 128 characters",
    });
  } else if (!req.body.notes) {
    res.status(400).json({ message: "Notes are required" });
  } else {
    Actions.insert(newAction)
      .then((newAction) => {
        res.status(200).json({ message: "Action created", newAction });
      })
      .catch((error) => {
        res.status(500).json({ error, message: "Server broke" });
      });
  }
});

// DELETE operations (2)
router.delete("/:id", (req, res) => {
  const id = req.params.id;
  Projects.remove(id)
    .then((count) => {
      if (count > 0) {
        res.status(200).json({ message: "Project deleted" });
      } else {
        res.status(404).json({
          message: "Project not found. You may have deleted it already",
        });
      }
    })
    .catch((error) => res.status(500).json({ error, message: "Server broke" }));
});

//! COME BACK TO THIS
router.delete("/:id/actions/:id", (req, res) => {
  const id = req.params.id;
});

// PUT operations ()

module.exports = router;
