const express = require("express");
const app = express();
const port = 3030;
const hbs = require("hbs");
const path = require("path");

app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "./views"));

app.use(express.static("assets"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

hbs.registerPartials(__dirname + "/views/partials", function (err) {});
hbs.registerHelper("equal", function (a, b) {
  return a === b;
});

// HOME PAGE
app.get("/", (req, res) => {
  res.render("index");
});

// CONTACT PAGE
app.get("/contact", (req, res) => {
  res.render("contact");
});

// PROJECTS PAGE
app.get("/projects", (req, res) => {
  res.render("projects");
});

app.listen(port, () => {
  console.log(`app listening to port ${port}`);
});
