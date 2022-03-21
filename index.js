const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config({
  path: "./config.env",
});

const authors = require("./authors.json");

// ROUTES

// Home
app.get("/", (_req, res) => {
  res.send("Authors API");
});

// Author & nationality
app.get("/authors/:id", (req, res) => {
  const author = authors.find((_a, i) => {
    const id = i + 1;
    return req.params.id === id.toString();
  });

  if (!author) {
    return res.send("This author does not exist, enter other ID.");
  }

  res.send(`${author.name}, ${author.nationality}`);
});

// Books of one said author
app.get("/authors/:id/books", (req, res) => {
  const books = authors[req.params.id - 1].books;

  if (!books) {
    return res.send("This author can't be found");
  }

  res.send(books.join(", "));
});

// Json route : author
app.get("/json/authors/:id", (req, res) => {
  const author = authors[req.params.id];

  if (!author) {
    return res.json({ messsage: "This ID does not exist" });
  }

  delete author.books;

  res.json(author);
});

// Json route : books
app.get("/json/authors/:id/books", (req, res) => {
  const books = authors[req.params.id].books;

  if (!books) {
    return res.json({ messsage: "This author can't be found" });
  }

  res.json({ books });
});

// ERROR
app.get("*", (req, res) => {
  res.status(404).send("Page not found - 404");
});

// Listen
app.listen(8000, () => {
  console.log("Listening on port 8000"); // localhost:8000
});
