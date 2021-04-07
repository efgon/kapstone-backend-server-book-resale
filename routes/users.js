const express = require("express");
const router = express.Router();

const userInfo = [
  {
    id: 1,
    name: "test",
    username: "another test",
  },
  {
    id: 2,
    name: "test",
    username: "another test",
  },
];

//GET
router.get("/", (req, res) => {
  console.log(userInfo);
  res.send(userInfo);
});

//GET (w param)
router.get("/:id", (req, res) => {});

// POST
router.post("/", (req, res) => {});

//PATCH
router.patch("/:id", (req, res) => {});

//DELETE
router.delete("/:id", (req, res) => {});

module.exports = router;
