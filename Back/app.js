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
    "mongodb+srv://tom:azer@cluster0.pjwiz.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
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

// Tentative de permettre le maintien dans le browser de l'historique des URL

// app.use(express.static(path.join(__dirname, "public")));
// app.use("/js", express.static(__dirname + "/js"));
// app.use("/dist", express.static(__dirname + "/../dist"));
// app.use("/css", express.static(__dirname + "/css"));
// app.use("/partials", express.static(__dirname + "/partials"));

// app.all("/*", function (req, res) {
//   // Just send the index.html for other files to support HTML5Mode
//   res.sendFile("public/index.html");
// });

app.use("/api/auth", userRoutes);
app.use("/api/sauces", stuffRoutes);
app.use("/images", express.static(path.join(__dirname, "images")));

module.exports = app;
