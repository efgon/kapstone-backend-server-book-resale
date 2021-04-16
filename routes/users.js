const express = require("express");
const router = express.Router();
const { nanoid } = require("nanoid");
const UserInfo = require("../Models/user");
const autheticateToken = require("../server");

//GET
router.get("/", async (req, res) => {
  try {
    const userInfo = await UserInfo.find();
    res.status(200).json(userInfo);
  } catch (err) {
    res.status(500).json("Did not work");
  }
});

//GET (w param) still needs work when not finding user
router.get("/:id", async (req, res) => {
  const userInfo = await UserInfo.find();
  const specificUser = userInfo.find((user) => user.id === req.params.id);

  if (specificUser === undefined) {
    return res.status(404).send("User Not Found");
  } else {
    return res.status(200).json(specificUser);
  }
});

// POST
router.post("/", async (req, res) => {
  const newUserInfo = await new UserInfo({
    
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password,
      creditBalance: 50.00, 
  });
  try {
    const newUser = await newUserInfo.save();
    const userInfo = await UserInfo.find();
    res.status(201).json(userInfo);
  } catch (err) {
    console.log(err);
    res.status(400).json("Not added correctly");

    //if (!req.body.name) {
    //  return res.status(400).send("Something went wrong");
    //}
    //const newUser = {
    //  id: nanoid(),
    //  name: req.body.name,
    //  username: req.body.username,
    //};
    //userInfo.push(newUser);
    //res.status(201).json(userInfo);
  }
});

//PATCH
router.patch("/:id", autheticateToken, async (req, res) => {
  const userInfo = await UserInfo.find();
  const patchUser = await userInfo.find((user) => user.id === req.params.id);

  if (patchUser === undefined) {
    return res.status(404).send("User Not Found");
  } else if (
    req.body.name.firstName ||
    req.body.name.lastName ||
    req.body.email ||
    req.body.password ||
    //req.body.creditBalance ||
    //req.body.orderHistory ||
    req.body.address.street ||
    req.body.address.street2 ||
    req.body.address.city ||
    req.body.address.state ||
    req.body.address.zipCode
  ) {
    try {
      if (req.body.name.firstName) {
        patchUser.name.firstName = req.body.name.firstName;
      }
      if (req.body.name.lastName) {
        patchUser.name.lastName = req.body.name.lastName;
      }
      if (req.body.email) {
        patchUser.email = req.body.email;
      }
      if (req.body.password) {
        patchUser.password = req.body.password;
      }
      if (req.body.address.street) {
        patchUser.address.street = req.body.address.street;
      }
      if (req.body.address.street2) {
        patchUser.address.street2 = req.body.address.street2;
      }
      if (req.body.address.city) {
        patchUser.address.city = req.body.address.city;
      }
      if (req.body.address.state) {
        patchUser.address.state = req.body.address.state;
      }
      if (req.body.address.zipCode) {
        patchUser.address.zipCode = req.body.address.zipCode;
      }
    } catch (err) {
      console.log(err);
    }
    await patchUser.save();
    return res.status(200).json(patchUser);
  }
});

//DELETE
router.delete("/:id", autheticateToken, async (req, res) => {
  let userInfo = await UserInfo.find();
  const userIndex = userInfo.findIndex((user) => user.id === req.params.id);
  console.log(userIndex);
  if (userIndex !== -1) {
    userInfo[userIndex].remove();
    userInfo = await UserInfo.find();
    res.status(200).json(userInfo);
  } else {
    res.status(400).json("User not found.");
  }
});

module.exports = router;
