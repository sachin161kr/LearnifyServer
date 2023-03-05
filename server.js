const express = require("express");
const process = require("process");

const bycrypt = require("bcrypt");

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
  "mongodb+srv://sachin161kr:imsachin%40161@learnifydb.xtv86fb.mongodb.net/LearnifyDB",
  () => {
    console.log("Database connected");
  }
);

app.get("/", (req, res) => {
  res.send("Hello world");
});

app.post("/api/login", async (req, res) => {
  // bycrypt.hashSync(req.body.password, 3, (err, hash) => {
  //   mainhash = hash;
  // });

  const user = await accounts.findOne({
    email: req.body.email,
  });

  if (!user) {
    return res.json({
      status: "error",
      error: "user not found",
    });
  }

  if (await bycrypt.compare(req.body.password, user.password)) {
    res.json({
      status: "okay",
    });
  } else {
    res.json({
      status: "error",
    });
  }
});

app.post("/api/register", async (req, res) => {
  //let hash = "";
  //res.send("Got it");
  const user = await accounts.findOne({
    email: req.body.email,
  });

  if (user) {
    res.json({
      status: "error",
      error: "Duplicate email",
    });
  } else {
    const hashPass = await bycrypt.hash(req.body.password, 10);

    const user = await accounts.create({
      name: req.body.name,
      email: req.body.email,
      password: hashPass,
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
