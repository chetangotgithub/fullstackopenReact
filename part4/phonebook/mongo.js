const mongoose = require("mongoose");
const password = process.argv[2];
const name = process.argv[3];
const number = process.argv[4];

const url = `mongodb+srv://chetanzagade28:${password}@fullstackopen.iaw3x.mongodb.net/?retryWrites=true&w=majority&appName=FullstackOpen`;
mongoose.set("strictQuery", false);

mongoose
  .connect(url)
  .then((res) => {
    console.log("Connection Successful");
  })
  .catch((err) => {
    console.log(err);
  });

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Person = mongoose.model("Person", personSchema);

const personNode = new Person({
  name: name,
  number: number,
});

personNode
  .save()
  .then((res) => {
    console.log(`added ${name} number ${number} to PhoneBook`);
    mongoose.connection.close();
  })
  .catch((err) => {
    console.log(err);
    mongoose.connection.close();
  });
