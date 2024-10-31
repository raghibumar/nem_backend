const mongoose = require("mongoose");

// Note Schema
const noteSchema = mongoose.Schema({
  title: String,
  note: String,
  category: String,
  userId: String,
});

//Note Model
const NoteModel = mongoose.model("note", noteSchema);

module.exports = { NoteModel };
