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
app.use((req, res, next) => {
  res.header({ "Access-Control-Allow-Origin": "*"});
  res.header({
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS, PUT, PATCH, DELETE",
  });
  res.header({
    "Access-Control-Allow-Headers":
      "Origin, X-Requested-With, Content-Type, Accept, Authorization",
  });
  if(req.method === "OPTIONS"){
    res.sendStatus(200)
  }
  next();
});

app.delete("/logout", (req, res) => {
  // accessToken
});

//path is /login
app.post("/login", (req, res) => {
  // const userInfo = await UserInfo.find();
  // const specificUser = userInfo.find((user) => user.email === req.body.email);
  const email = req.body.email;
  const password = req.body.password;
  const user = { email: email };
  // const firstname = req.body.firstname


  const accessToken = generateAccessToken(user);
  const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET);
  res.json({ accessToken: accessToken, refreshToken: refreshToken, email: email });
});

function generateAccessToken(user) {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "2h" });
}

module.exports = function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};
const usersRouter = require("./routes/users");
app.use("/users", usersRouter);

const booksRouter = require("./routes/books");
app.use("/books", booksRouter);

app.listen(4000, () => console.log("Server started"));
