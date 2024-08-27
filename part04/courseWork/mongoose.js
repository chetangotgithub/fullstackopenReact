const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log("give password as argument");
  process.exit(1);
}

const password = process.argv[2];
console.log(password);
const url = `mongodb+srv://chetanzagade28:${password}@fullstackopen.iaw3x.mongodb.net/?retryWrites=true&w=majority&appName=FullstackOpen`;
mongoose.set("strictQuery", false);

mongoose
  .connect(url)
  .then((res) => {
    console.log("Successful Connected ");
  })
  .catch((err) => {
    console.log("Error : ", err);
  });

const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean,
});

const Note = mongoose.model("Note", noteSchema);

// const note = new Note({
//   content: "JS is Beast",
//   important: true,
// });

// note.save().then((result) => {
//   console.log("note saved!");
//   mongoose.connection.close();
// });

Note.find({}).then((result) => {
  result.forEach((note) => {
    console.log(note);
  });
  mongoose.connection.close();
});
