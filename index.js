const express = require("express");
const connect = require("./database");
const user=require("./schema");
const check = require("./middleware");
const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).send("welcome to the book store");
});

app.get("/books/book/:id", async (req, res) => {
  let { id } = req.params;
  let book = await user.findById(id);
  if (book) {
    res.status(200).send(book);
  } else {
    res.status(404).send("error");
  }
});

app.delete("/books/delete/:id", async (req, res) => {
  let { id } = req.params;
  let delet = await user.findByIdAndDelete(id);
  let data = await user.find();
  console.log(delet);
  res.send(data);
});

app.get("/books", async (req, res) => {
  let book = await user.find(req.body);
  res.send(book);
});

app.post("/books/addbooks", check, async (req, res) => {
  let post = await user.create(req.body);
  res.send(post);
});

app.patch("/books/update/:id", async (req, res) => {
  let { id } = req.params;
  let updatedBook = await user.findByIdAndUpdate(id, req.body);
  let books = await user.find();
  console.log(updatedBook);
  res.send(books);
});


app.get(`/books/filter`, async (req, res) => {
  let { author, category, title, sort } = req.query;
  let titleRegex = new RegExp(title, "i");

  if (author) {
    const filteredBooks = await user.find({ author: author });
    res.send(filteredBooks);
  } else if (category) {
    const filteredBooks = await user.find({ category: category });
    res.send(filteredBooks);
  } else if (title) {
    const filteredBooks = await user.find({ title: { $regex: titleRegex } });
    res.send(filteredBooks);
  } if (sort == "lth") {
    const sortedBooks = await user.find().sort({ price: 1 });
    res.send(sortedBooks);
  } else if (sort == "htl") {
    const sortedBooks = await user.find().sort({ price: -1 });
    res.send(sortedBooks);
  }
});

app.listen(8090, () => {
  console.log("listening on port 8090")
  connect();
});


