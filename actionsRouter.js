const express = require("express");

const Actions = require("./data/helpers/actionModel");

const router = express.Router();

// CRUD operations

// GET action (to get a list of actions use the project-actions endpoint)
// POST actions
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
// DELETE actions
//! COME BACK TO THIS
router.delete("/:id/actions/:id", (req, res) => {
  const id = req.params.id;
});
// PUT actions

module.exports = router;
