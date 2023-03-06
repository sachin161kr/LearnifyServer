const mongoose = require("mongoose");

const post = mongoose.Schema(
  {
    username: { type: String, require: true },
    email: { type: String, require: true },
    title: { type: String, require: true, unique: true },
    body: { type: String, require: true },
    tag: { type: String, require: true },
  },
  {
    collection: "posts",
  }
);

const model = mongoose.model("posts", post);

module.exports = model;
