const express = require("express");
const noteRouter = express.Router();

const { NoteModel } = require("../models/Note.model");

// Get all notes (requires authentication)
noteRouter.get("/", async (req, res) => {
  // const userId = req.body.userId;

  try {
    const notes = await NoteModel.find();
    //send notes properly like how send data using status code
    res.status(200).send(notes);
  } catch (err) {
    res.send({
      message: "Error while getting notes",
    });
    console.log(err);
  }
});

// Create a new note (requires authentication)
noteRouter.post("/create", async (req, res) => {
  const payload = req.body;
  console.log("payload:", payload);
  try {
    const note = new NoteModel(payload);
    await note.save();
    res.send({ message: "Note created successfully" });
  } catch (err) {
    res.send({
      message: "Error while creating note",
    });
    console.log(err);
  }
});

// Update a note (PATCH) (requires authentication)
noteRouter.patch("/update/:id", async (req, res) => {
  const id = req.params.id;
  const payload = req.body;
  console.log("payload:", payload);

  const note = await NoteModel.findOne({ _id: id });
  const user_id_in_note = note.userId;
  const user_id_in_req = req.body.userId;

  try {
    if (user_id_in_note !== user_id_in_req) {
      res
        .status(401)
        .send({ message: "You are not authorized to update this note" });
      return;
    } else {
      await NoteModel.findByIdAndUpdate({ _id: id }, payload);
      res.status(200).send({ message: "Updated the note" });
    }
  } catch (err) {
    console.log(err);
    res.send({ message: "Error while updating the id" });
  }
});

// Delete a note (requires authentication)
noteRouter.delete("/delete/:id", async (req, res) => {
  const id = req.params.id;

  const note = await NoteModel.findOne({ _id: id });
  const user_id_in_note = note.userId;
  const user_id_in_req = req.body.userId;
  try {
    if (user_id_in_note !== user_id_in_req) {
      res
        .status(401)
        .send({ message: "You are not authorized to delete this note" });
      return;
    } else {
      await NoteModel.findByIdAndDelete({ _id: id });
      res.status(200).send({ message: "Deleted the note" });
    }
  } catch (err) {
    console.log(err);
    res.send({ message: "Error while deleting the note" });
  }
});

// Get individual note (requires authentication)
noteRouter.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const note = await NoteModel.findOne({ _id: id });
    res.send(note);
  } catch (err) {
    console.log(err);
    res.send({ message: "Error while getting the note" });
  }
});

module.exports = { noteRouter };
