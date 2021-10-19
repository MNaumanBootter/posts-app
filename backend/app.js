const path = require('path');
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const router = require('./routes/posts');

const postsRoutes = require('./routes/posts')

mongoose.connect('mongodb://localhost:27017/posts-app')
  .then(() => {
    console.log("Connected to database.");
  })
  .catch(() => {
    console.log("Connection to database failed!");
  })

app.use(express.json());
app.use("/images", express.static(path.join('backend/images')))

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, PUT, DELETE, OPTIONS")
  next();
});

app.use("/api/posts", postsRoutes)

module.exports = app;
