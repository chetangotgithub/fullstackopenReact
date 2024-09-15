const mongoose = require("mongoose");
const express = require("express");
const app = express();
const cors = require("cors");
const config = require("./utils/config");
const Blog = require("./models/blogs");

const mongoUrl = config.MONGODB_URL;
mongoose
  .connect(mongoUrl)
  .then((res) => {
    console.log("Connection Successful");
  })
  .catch((err) => {
    console.log(`Error : ${err}`);
  });

app.use(cors());
app.use(express.json());

app.get("/api/blogs", (request, response) => {
  Blog.find({}).then((blogs) => {
    response.json(blogs);
  });
});

app.post("/api/blogs", (request, response) => {
  const blog = new Blog(request.body);

  blog.save().then((result) => {
    response.status(201).json(result);
  });
});

const PORT = config.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
