const { test, after, beforeEach, describe } = require("node:test");
const bcrypt = require("bcrypt");
const Note = require("../modules/note");
const User = require("../modules/user");
const assert = require("node:assert");
const mongoose = require("mongoose");
const helper = require("./test_helper");
const supertest = require("supertest");
const app = require("../app");

const api = supertest(app);

const initialNotes = [
  {
    content: "HTML is easy",
    important: false,
  },
  {
    content: "Browser can execute only JavaScript",
    important: true,
  },
];

beforeEach(async () => {
  await Note.deleteMany({});
  let noteObject = new Note(helper.initialNotes[0]);
  await noteObject.save();
  noteObject = new Note(helper.initialNotes[1]);
  await noteObject.save();
});

// test("notes are returned as json", async () => {
//   await api
//     .get("/api/notes")
//     .expect(200)
//     .expect("Content-Type", /application\/json/);
// });

// test("there are two notes", async () => {
//   const response = await api.get("/api/notes");

//   assert.strictEqual(response.body.length, helper.initialNotes.length);
// });

// test.only("the first note is about HTTP methods", async () => {
//   const response = await api.get("/api/notes");

//   const contents = response.body.map((e) => e.content);
//   assert(contents.includes("HTML is easy"));
// });

// test("a valid note can be added ", async () => {
//   const newNote = {
//     content: "async/await simplifies making async calls 123",
//     important: true,
//     userid: "66ebaeef806a3738dae418fa",
//   };

//   await api
//     .post("/api/notes")
//     .send(newNote)
//     .expect(201)
//     .expect("Content-Type", /application\/json/);

//   const notesAtEnd = await helper.notesInDb();
//   assert.strictEqual(notesAtEnd.length, helper.initialNotes.length + 1);

//   const contents = notesAtEnd.map((n) => n.content);
//   assert(contents.includes("async/await simplifies making async calls"));
// });

// test("note without content is not added", async () => {
//   const newNote = {
//     important: true,
//   };

//   await api.post("/api/notes").send(newNote).expect(400);
//   const notesAtEnd = await helper.notesInDb();

//   assert.strictEqual(notesAtEnd.length, helper.initialNotes.length);
// });

// test.only("a specific note can be viewed", async () => {
//   const notesAtStart = await helper.notesInDb();

//   const noteToView = notesAtStart[0];

//   const resultNote = await api
//     .get(`/api/notes/${noteToView.id}`)
//     .expect(200)
//     .expect("Content-Type", /application\/json/);

//   assert.deepStrictEqual(resultNote.body, noteToView);
// });

// test.only("a note can be deleted", async () => {
//   const notesAtStart = await helper.notesInDb();
//   const noteToDelete = notesAtStart[0];

//   await api.delete(`/api/notes/${noteToDelete.id}`).expect(204);

//   const notesAtEnd = await helper.notesInDb();

//   const contents = notesAtEnd.map((r) => r.content);
//   assert(!contents.includes(noteToDelete.content));

//   assert.strictEqual(notesAtEnd.length, helper.initialNotes.length - 1);
// });

describe("when there is initially one user in db", () => {
  beforeEach(async () => {
    await User.deleteMany({});

    const passwordHash = await bcrypt.hash("sekret", 10);
    const user = new User({ username: "root", passwordHash });

    await user.save();
  });

  test("creation succeeds with a fresh username", async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: "mluukkai",
      name: "Matti Luukkainen",
      password: "salainen",
    };

    await api
      .post("/api/users")
      .send(newUser)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const usersAtEnd = await helper.usersInDb();
    assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1);

    const usernames = usersAtEnd.map((u) => u.username);
    assert(usernames.includes(newUser.username));
  });

  test("creation fails with proper statuscode and message if username already taken", async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: "root",
      name: "Superuser",
      password: "salainen",
    };

    const result = await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    const usersAtEnd = await helper.usersInDb();
    assert(result.body.error.includes("expected `username` to be unique"));

    assert.strictEqual(usersAtEnd.length, usersAtStart.length);
  });

  test.only("Get all users from database", async () => {
    const user = await api.get("/api/users");
    const userinDB = await helper.usersInDb();
    assert.strictEqual(user.body.length, userinDB.length);
  });
});

after(async () => {
  await mongoose.connection.close();
});
