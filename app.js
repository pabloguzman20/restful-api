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

app
  .route("/articles")
  .get((req, res) => {
    Article.find({}, (error, result) => {
      !error ? res.send(result) : res.send(error);
    });
  })
  .post((req, res) => {
    const article = new Article({
      title: req.body.title,
      content: req.body.content,
    });
    article.save((error) => {
      !error ? res.send("Succesfully added a new article.") : res.send(error);
    });
  })
  .delete((req, res) => {
    Article.deleteMany((error) => {
      !error
        ? res.send("Succesfully all the articles was removed")
        : res.send(error);
    });
  });

app
  .route("/articles/:articleTitle")
  .get((req, res) => {
    Article.findOne({ title: req.params.articleTitle }, (error, result) => {
      !result ? res.send("No matches") : res.send(result);
    });
  })
  .put((req, res) => {
    Article.updateMany(
      { title: req.params.articleTitle },
      { title: req.body.title, content: req.body.content },
      { overwrite: true },
      (error) => {
        !error ? res.send("Successfully update") : res.send(error);
      }
    );
  })
  .patch((req, res) => {
    Article.updateOne(
      { title: req.params.articleTitle },
      { $set: { title: req.body } },
      (error) => {
        !error ? res.send("Succesfully updated article.") : res.send(error);
      }
    );
  })
  .delete((req, res) => {
    Article.deleteOne({ title: req.params.articleTitle }, (error) => {
      !error ? res.send("Article was removed succesfully.") : res.send(error);
    });
  });

app.listen(3000, () => {
  console.log("Server is listening on port 3000.");
});
