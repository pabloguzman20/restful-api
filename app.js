const express = require("express");
const app = express();
const mongoose = require("mongoose");
const ejs = require("ejs");

app.set("view engine", "ejs");

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/wikiDB", { useNewUrlParser: true });

const articleSchena = {
  title: String,
  content: String,
};

const Article = mongoose.model("Article", articleSchena);
app.get("/articles", (req, res) => {
  Article.find({}, (error, result) => {
    !error ? res.send(result): res.send(error);
  });
});

app.listen(3000, () => {
  console.log("Server is listening on port 3000.");
});
