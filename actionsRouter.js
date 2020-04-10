const express = require("express");

const Actions = require("./data/helpers/actionModel");

const router = express.Router();

// CRUD operations

// GET action (to get a list of actions use the project-actions endpoint)
router.get("/:id/actions/:id", (req, res) => {
  const id = req.params.id;
  Actions.get(id)
    .then((action) => {
      if (action) {
        res.status(200).json({ message: "Requested action sent", action });
      } else {
        res.status(404).json({ message: "Action not found" });
      }
    })
    .catch((error) => {
      res.status(500).json({ error, message: "Server broke" });
    });
});
// POST actions
router.post("/:id/actions", (req, res) => {
  const newAction = req.body;
  if (!newAction.description || !newAction.notes) {
    res.status(400).json({
      message: "Description & notes are required",
    });
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
// DELETE actions
//! COME BACK TO THIS
router.delete("/:id/actions/:id", (req, res) => {
  const id = req.params.id;
});
// PUT actions
router.put("/:id/actions/:id", (req, res) => {});

module.exports = router;
