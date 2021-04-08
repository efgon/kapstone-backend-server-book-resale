const express = require("express");
const router = express.Router();
const { nanoid } = require("nanoid");

const userInfo = [
  {
    id: nanoid(),
    name: "test 1",
    username: "test",
  },
  {
    id: nanoid(),
    name: "test 2",
    username: "another test",
  },
];

//GET
router.get("/", (req, res) => {
  //console.log(userInfo);

  res.status(200).send(userInfo);
});

//GET (w param) still needs work when not finding user
router.get("/:id", (req, res) => {
  const specificUser = userInfo.find((user) => user.id === req.params.id);
  console.log(specificUser, req.params.id);
  if (specificUser === undefined) {
    //console.log(user.id, req.params.id);

    return res.status(404).send("User Not Found");
  } else {
    return res.status(200).json(specificUser);
  }

  //console.log("The last line of code is working");
});

// POST
router.post("/", (req, res) => {
  if (!req.body.name) {
    return res.status(400).send("Something went wrong");
  }
  const newUser = {
    id: nanoid(),
    name: req.body.name,
    username: req.body.username,
  };
  userInfo.push(newUser);
  res.status(201).json(userInfo);
});

//PATCH
router.patch("/:id", (req, res) => {
  const patchUser = userInfo.find((user) => user.id === req.params.id);
  //console.log(user, user.id, req.params.id);
  if (patchUser === undefined) {
    //console.log(user.id, req.params.id);

    return res.status(404).send("User Not Found");
  } else if (req.body.name || req.body.username) {
    if (req.body.name) {
      patchUser.name = req.body.name;
    }
    if (req.body.username) {
      patchUser.username = req.body.username;
    }

    return res.status(200).json(patchUser);
  }
});

//DELETE
router.delete("/:id", (req, res) => {
  const userIndex = userInfo.findIndex((user) => user.id === req.params.id);
  console.log(userIndex);
  if (userIndex !== -1) {
    userInfo.splice(userIndex, 1);
    res.status(200).json(userInfo);
  } else {
    res.status(400).json("User not found.");
  }
});

module.exports = router;
