const express = require('express');
const app = express();
const mongoose = require('mongoose');

const Post = require('./models/post');

mongoose.connect('mongodb://localhost:27017/posts-app')
  .then(() => {
    console.log("Connected to database.");
  })
  .catch(() => {
    console.log("Connection to database failed!");
  })

app.use(express.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, OPTIONS")
  next();
});

app.post("/api/posts", (req, res, next) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content
  });

  post.save();
  console.log(post);

  res.status(201).json({
    message: "Post added succesfully."
  });
});

app.get('/api/posts', (req, res, next) => {
  Post.find()
    .then(documents => {
      console.log(documents);
      res.status(200).json({
        message: "Posts fetched succesfully.",
        posts: documents
      });
    });
});


module.exports = app;
