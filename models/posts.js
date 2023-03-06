const mongoose = require("mongoose");

const post = mongoose.Schema(
  {
    username: { type: String, require: true, unique: false },
    email: { type: String, require: true, unique: false },
    title: { type: String, require: true, unique: false },
    body: { type: String, require: true, unique: false },
    tag: { type: String, require: true, unique: false },
  },
  {
    collection: "posts",
  }
);

const model = mongoose.model("posts", post);

module.exports = model;
