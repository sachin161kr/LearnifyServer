const mongoose = require("mongoose");

const account = mongoose.Schema(
  {
    username: { type: String, require: true },
    email: { type: String, require: true, unique: true },
    password: { type: String, require: true },
  },
  {
    collection: "accounts",
  }
);

const model = mongoose.model("accounts", account);

module.exports = model;
