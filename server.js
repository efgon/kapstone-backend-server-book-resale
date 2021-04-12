require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

// it is set to save ~users~
mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});
const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to Database"));

app.use(express.json()); //middleware

const usersRouter = require("./routes/users");
app.use("/users", usersRouter);

const booksRouter = require("./routes/books");
app.use("/books", booksRouter);

app.listen(3000, () => console.log("Server started"));
