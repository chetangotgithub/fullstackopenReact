const express = require("express");
var morgan = require("morgan");
const app = express();
app.use(express.json());

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

let persons = [
  {
    id: "1",
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: "2",
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: "3",
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: "4",
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

app.get("/api/persons", (req, res) => {
  res.json(persons);
});

app.get("/api/info", (req, res) => {
  const lenPerson = persons.length;
  const time = new Date();
  res.send(`PhoneBook has info for ${lenPerson} <br/> ${time}`);
});

app.get("/api/persons/:id", (req, res) => {
  const id = req.params.id;
  const obj = persons.filter((per) => per.id == id);

  res.json(obj);
});

app.post("/api/persons", (req, res) => {
  const id = Math.floor(Math.random() * (1 - 100000000) + 1);
  const obj = req.body;
  if (!obj.hasOwnProperty("number")) {
    return res.status(400).json({ error: "name must be unique" });
  } else if (persons.filter((per) => per["name"] == obj["name"]).length > 0) {
    return res.status(400).json({ error: "name already exists" });
  }

  obj["id"] = id;

  persons = persons.concat(obj);

  res.json(obj);
});

app.delete("/api/persons/:id", (req, res) => {
  const id = req.params.id;
  persons = persons.filter((per) => per.id !== id);
  res.send(`Deleted Person with id: ${id}`);
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Listening to Port ${PORT}`);
});
