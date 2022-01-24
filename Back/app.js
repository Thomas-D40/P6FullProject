const express = require("express");
const app = express();

const mongoose = require("mongoose");

const Sauce = require("./models/stuff");
const User = require("./models/user");

const userRoutes = require("./routes/user");
const stuffRoutes = require("./routes/stuff");

const path = require("path");

app.use(express.json());

mongoose
  .connect(
    `mongodb+srv://${process.env.BDDID}:${process.env.BDDMDP}@cluster0.pjwiz.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`,
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("Connection réussie"))
  .catch(() => console.log("Echec de la connexion"));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  next();
});

app.use("/api/auth", userRoutes);
app.use("/api/sauces", stuffRoutes);
app.use("/images", express.static(path.join(__dirname, "images")));

module.exports = app;
