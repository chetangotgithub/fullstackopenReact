const express = require("express");
const cors = require("cors");
const Note = require("./modules/note");
const config = require("./Utils/config");
const app = express();
app.use(express.static("dist"));
app.use(cors());
app.use(express.json());

// DO NOT SAVE YOUR PASSWORD TO GITHUB!!

const requestLogger = (request, response, next) => {
  console.log("Method:", request.method);
  console.log("Path:  ", request.path);
  console.log("Body:  ", request.body);
  console.log("---");
  next(); // yields control to the next middleware
};

app.use(requestLogger);

// let notes = [
//   {
//     id: "1",
//     content: "HTML is easy",
//     important: true,
//   },
//   {
//     id: "2",
//     content: "Browser can execute only JavaScript",
//     important: false,
//   },
//   {
//     id: "3",
//     content: "GET and POST are the most important methods of HTTP protocol",
//     important: true,
//   },
// ];

const generateId = () => {
  const maxId =
    notes.length > 0 ? Math.max(...notes.map((n) => Number(n.id))) : 0;
  return String(maxId + 1);
};

app.get("/", (request, response) => {
  response.send("<h1>Hello World!</h1>");
});

app.get("/api/notes", (request, response) => {
  Note.find({}).then((notes) => {
    response.json(notes);
  });
});

app.get("/api/notes/:id", (request, response) => {
  const id = request.params.id;
  // const note = notes.find((note) => note.id === id);
  // if (note) {
  //   response.json(note);
  // } else {
  //   response.status(404).end();
  // }

  Note.findById(id)
    .then((note) => {
      console.log(id, " ", note);
      if (note) {
        response.json(note);
      } else {
        response.status(404).send("Note Not Found").end();
      }
    })
    .catch((err) => {
      console.log(err);
    });
});
//This middleware will be used for catching requests made to non-existent routes
// const unknownEndpoint = (request, response) => {
//   response.status(404).send({ error: "unknown endpoint" });
// };

// app.use(unknownEndpoint);
app.put("/api/notes/:id", (request, response) => {
  const body = request.body;

  const note = {
    content: body.content,
    important: body.important,
  };

  Note.findByIdAndUpdate(request.params.id, note, { new: true })
    .then((updatedNote) => {
      response.json(updatedNote);
    })
    .catch((error) => console.log(error));
});

app.delete("/api/notes/:id", (request, response) => {
  const id = request.params.id;
  // notes = notes.filter((note) => note.id !== id);

  Note.findByIdAndDelete(id)
    .then((res) => {
      response.status(204).end();
      console.log("Deleted id:", id);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.post("/api/notes", (request, response) => {
  const body = request.body;

  if (!body.content) {
    return response.status(400).json({
      error: "content missing",
    });
  }

  const note = Note({
    content: body.content,
    important: Boolean(body.important) || false,
  });

  note.save().then((note) => {
    response.json(note);
  });
});

const PORT = config.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
