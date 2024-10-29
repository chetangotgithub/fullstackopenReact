const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const Person = require("./modules/person");
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(cors());

morgan("tiny", function (tokens, req, res) {
  console.log(tokens);
  return [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, "content-length"),
    "-",
    tokens["response-time"](req, res),
    "ms",
  ].join(" ");
});

// let persons = [
//   {
//     id: "1",
//     name: "Arto Hellas",
//     number: "040-123456",
//   },
//   {
//     id: "2",
//     name: "Ada Lovelace",
//     number: "39-44-5323523",
//   },
//   {
//     id: "3",
//     name: "Dan Abramov",
//     number: "12-43-234345",
//   },
//   {
//     id: "4",
//     name: "Mary Poppendieck",
//     number: "39-23-6423122",
//   },
// ];

app.get("/api/persons", (request, response) => {
  Person.find({}).then((res) => {
    response.json(res);
  });
});

app.get("/api/info", (req, res) => {
  Person.find({}).then((response) => {
    const lenPerson = response.length;
    console.log(response);
    const time = new Date();
    res.send(`PhoneBook has info for ${lenPerson} <br/> ${time}`);
  });
});

// app.get("/api/persons/:id", (req, res) => {
//   const id = req.params.id;
//   const obj = persons.filter((per) => per.id == id);

//   res.json(obj);
// });

app.put("/api/persons:id", (req, res) => {
  const body = request.body;

  const person = {
    name: body.name,
    number: body.number,
  };

  Person.findByIdAndUpdate(request.params.id, person, { new: true })
    .then((per) => {
      response.json(per);
    })
    .catch((error) => console.log(error));
});

app.post("/api/persons", (req, res) => {
  const obj = req.body;

  Person.find({ name: obj.name }).then((res) => {
    const person = {
      name: body.name,
      number: body.number,
    };
    Person.findByIdAndUpdate(res.id, person, { new: true })
      .then((person) => {
        res.json(person);
      })
      .catch((error) => console.log(error));
  });

  const personNode = new Person({
    name: obj.name,
    number: obj.number,
  });

  personNode
    .save()
    .then((res) => {
      console.log(`added ${obj.name} number ${obj.number} to PhoneBook`);
    })
    .catch((err) => {
      console.log(err);
    });

  res.json(obj);
});

app.delete("/api/persons/:id", (req, res) => {
  const id = req.params.id;
  Person.findByIdAndDelete(id)
    .then((res) => {
      res.send(`Deleted Person with id: ${id}`);
    })
    .catch((err) => {
      console.log(err);
    });
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Listening to Port ${PORT}`);
});
