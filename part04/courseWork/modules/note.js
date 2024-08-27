const mongoose = require("mongoose");
require("dotenv").config();

const url = process.env.MONGODB_URL;
console.log(url);
mongoose.set("strictQuery", false);
mongoose
  .connect(url)
  .then((res) => {
    console.log("Connection Success");
  })
  .catch((err) => {
    console.log("ERROR : ", err);
  });

const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean,
});

noteSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const Note = mongoose.model("Note", noteSchema);

module.exports = Note;
