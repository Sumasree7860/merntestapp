const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

//DB configs
mongoose
  .connect("mongodb+srv://sumasreereddysumasree:e95BZtiMbmg7P0b1@cluster0.rwiewio.mongodb.net/?retryWrites=true&w=majority")
  .catch((err) => console.log(err));

const userSchema = mongoose.Schema({
  name: String,
  rollNo: String,
  passedYear: Number
});

const User = mongoose.model("User", userSchema);

app.get("/", (req, res) => {
  res.send("express is here");
});

app.post("/create", (req, res) => {
  const newPost = new User({
  name: req.body.name,
  rollNo: req.body.rollNo,
  passedYear: req.body.passedYear
  });

  newPost
    .save()
    .then((doc) => console.log(doc))
    .catch((err) => console.log(err));
});

app.get("/posts", (req, res) => {
  User.find()
    .then((items) => res.json(items))
    .catch((err) => console.log(err));
});

app.get("/posts/:year", (req, res) => {
  User.find({ passedYear: req.params.year})
    .then((items) => res.json(items))
    .catch((err) => console.log(err));
});

app.delete("/delete/:id", (req, res) => {
  console.log(req.params);
  User.findByIdAndDelete({ _id: req.params.id })
    .then((doc) => console.log(doc))
    .catch((err) => console.log(err));
});

app.put("/update/:id", (req, res) => {
  User.findByIdAndUpdate(
    { _id: req.params.id },
    {
      name: req.body.name,
      rollNo: req.body.rollNo,
      passedYear: req.body.passedYear
    }
  )
    .then((doc) => console.log(doc))
    .catch((err) => console.log(err));
});

app.listen(3001, function () {
  console.log("Express server is running");
});
