const express = require("express");
const router = express.Router();
const { nanoid } = require("nanoid");
const BookInfo = require("../Models/book");
const autheticateToken = require("../server");

//GET
router.get("/", async (req, res) => {
  try {
    const bookInfo = await BookInfo.find();
    res.status(200).json(bookInfo);
  } catch (err) {
    res.status(500).json("Did not work");
  }
});

//GET (w param) still needs work when not finding user
router.get("/:id", async (req, res) => {
  const bookInfo = await BookInfo.find();
  const specificBook = bookInfo.find((book) => book.id === req.params.id);

  if (specificBook === undefined) {
    return res.status(404).send("Book Not Found");
  } else {
    return res.status(200).json(specificBook);
  }
});

// Search engine
//router.get("/:URL?", async (req, res) => {
//    const bookInfo = await BookInfo.find();
//    const specificBook = bookInfo.find((book) => book.category === req.params.category);
//
//    if (specificBook === undefined) {
//      return res.status(404).send("Book Not Found");
//    } else {
//      return res.status(200).json(specificBook);
//    }
//  });

// POST
router.post("/", autheticateToken, async (req, res) => {
  const newBookInfo = await new BookInfo({
    title: req.body.title,
    author: req.body.author,
    //image: req.body.image,
    category: req.body.category,
  });
  try {
    const newBook = await newBookInfo.save();
    const bookInfo = await BookInfo.find();
    res.status(201).json(bookInfo);
  } catch (err) {
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

//PATCH NEEDS SOME WORK UPDATING AND KEEPING INFO UPDATED
router.patch("/:id", autheticateToken, async (req, res) => {
  const bookInfo = await BookInfo.find();
  const patchBook = await bookInfo.find((book) => book.id === req.params.id);

  if (patchBook === undefined) {
    return res.status(404).send("Book Not Found");
  } else if (
    req.body.title ||
    req.body.author ||
    req.body.category ||
    req.body.tag ||
    req.body.image
  ) {
    try {
      if (req.body.title) {
        patchBook.title = req.body.title;
      }
      if (req.body.author) {
        patchBook.author = req.body.author;
      }
      if (req.body.category) {
        patchBook.category = req.body.category;
      }
      if (req.body.tag) {
        patchBook.tag = req.body.tag;
      }
      if (req.body.image) {
        patchBook.image = req.body.image;
      }
    } catch (err) {
      console.log(err);
    }
    await patchBook.save();
    return res.status(200).json(patchBook);
  }
});

//DELETE
router.delete("/:id", autheticateToken, async (req, res) => {
  let bookInfo = await BookInfo.find();
  const bookIndex = bookInfo.findIndex((book) => book.id === req.params.id);
  console.log(bookIndex);
  if (bookIndex !== -1) {
    bookInfo[bookIndex].remove();
    bookInfo = await BookInfo.find();
    res.status(200).json(bookInfo);
  } else {
    res.status(400).json("Book not found.");
  }
});

module.exports = router;
