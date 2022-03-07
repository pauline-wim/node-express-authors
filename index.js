const express = require("express");
const app = express();

const authors = [
  {
    name: "Lawrence Nowell",
    nationality: "UK",
    books: ["Beowulf"],
  },
  {
    name: "William Shakespeare",
    nationality: "UK",
    books: ["Hamlet", "Othello", "Romeo and Juliet", "MacBeth"],
  },
  {
    name: "Charles Dickens",
    nationality: "US",
    books: ["Oliver Twist", "A Christmas Carol"],
  },
  {
    name: "Oscar Wilde",
    nationality: "UK",
    books: ["The Picture of Dorian Gray", "The Importance of Being Earnest"],
  },
];

// ROUTES

// Home
app.get("/", (req, res) => {
  res.send("Authors API");
});

// Author & nationality
app.get("/authors/:id", (req, res) => {
  const author = authors.find((_a, i) => {
    const id = i + 1;
    return req.params.id === id.toString();
  });

  if (!author) {
    return res.send("This author does not exist");
  }

  res.send(`${author.name}, ${author.nationality}`);
});

// Books of one said author
app.get("/authors/:id/books", (req, res) => {
  const author = authors.find((_a, i) => {
    const id = i + 1;
    return req.params.id === id.toString();
  });

  if (!author) {
    return res.send("This author does not exist");
  }

  res.send(author.books.toString());
});

// Json route : author
app.get("/json/authors/:id", (req, res) => {
  const author = authors.find((_a, i) => {
    return req.params.id === i.toString();
  });

  if (!author) {
    return res.send("This ID does not exist");
  }

  res.send({ name: author.name, nationality: author.nationality });
});

// Json route : books
app.get("/json/authors/:id/books", (req, res) => {
  const author = authors.find((_a, i) => {
    return req.params.id === i.toString();
  });

  if (!author) {
    return res.send("This ID does not exist");
  }

  res.send({ books: author.books });
});

// ERROR
app.get("*", (req, res) => {
  res.send("Page not found - 404");
});

// Listen
app.listen(8000, () => {
  console.log("Listening on port 8000"); // localhost:8000
});
