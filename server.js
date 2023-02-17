const express = require("express");
const process = require("process");

const app = express();

const mongoose = require("mongoose");

const accounts = require("./models/accounts");

const cors = require("cors");

app.use(express.json());

app.use(cors());

console.log(accounts);

// mongoose.connect("mongodb://localhost:27017/learnify", () => {
//   console.log("Database connected");
// });

mongoose.connect(
  "mongodb+srv://sachin161kr:imsachin%40161@learnifydb.xtv86fb.mongodb.net/LearnifyDB"
);

app.get("/", (req, res) => {
  res.send("Hello world");
});

app.post("/api/login", async (req, res) => {
  const user = await accounts.findOne({
    email: req.body.email,
    password: req.body.password,
  });

  if (user) {
    res.json({
      status: "ok",
    });
  } else {
    res.json({
      status: "error",
      error: "User Not Found",
    });
  }
});

app.post("/api/register", async (req, res) => {
  console.log(req.body);
  //res.send("Got it");
  const user = await accounts.findOne({
    email: req.body.email,
    password: req.body.password,
  });

  if (user) {
    res.json({
      status: "error",
      error: "Duplicate email",
    });
  } else {
    const user = await accounts.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });

    res.json({
      status: "ok",
    });
  }
});

const PORT = process.env.PORT || 1337;

app.listen(PORT, () => {
  console.log(`Server is running http://localhost:${PORT}`);
});

module.exports = app;
