//Create web server with express
const express = require("express");
const app = express();
const port = 3000;
//Connect to database
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/CommentDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
//Create schema
const commentSchema = new mongoose.Schema({
  name: String,
  comment: String,
});
//Create model
const Comment = mongoose.model("Comment", commentSchema);
//Create middleware
app.use(express.urlencoded({ extended: true }));
//Set view engine
app.set("view engine", "ejs");
//Set public folder
app.use(express.static("public"));
//Get request
app.get("/", (req, res) => {
  Comment.find({}, (err, comments) => {
    if (err) {
      console.log(err);
    } else {
      res.render("index", { comments });
    }
  });
});
//Post request
app.post("/comment", (req, res) => {
  const newComment = new Comment({
    name: req.body.name,
    comment: req.body.comment,
  });
  newComment.save((err) => {
    if (err) {
      console.log(err);
    } else {
      res.redirect("/");
    }
  });
});
//Start server
app.listen(port, () => {
  console.log(`Server started at port ${port}`);
});