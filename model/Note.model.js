const mongoose = require("mongoose");

const noteSchema = mongoose.Schema(
  {
    title: { type: String, required: true },
    body: { type: String, require: true },
    author: { type: String, require: true },
    authorID: { type: String, require: true },
    category: { type: String, require: true },
  },
  {
    versionKey: false,
  }
);

const NoteModel = mongoose.model("note", noteSchema);

module.exports = {
  NoteModel,
};
