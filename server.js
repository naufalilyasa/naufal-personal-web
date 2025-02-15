const express = require("express");
const hbs = require("hbs");
const methodOverride = require("method-override");
const path = require("path");

const app = express();
const port = 3030;

const {
  renderHomePage,
  renderContactPage,
  renderProjectsPage,
  renderProjectCreatePage,
} = require("./controllers/controller-v1.js");

app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "./views"));

app.use(express.static("assets"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

hbs.registerPartials(__dirname + "/views/partials", function (err) {});
hbs.registerHelper("equal", function (a, b) {
  return a === b;
});

// HOME PAGE
app.get("/", renderHomePage);

// CONTACT PAGE
app.get("/contact", renderContactPage);

// PROJECTS PAGE
app.get("/projects", renderProjectsPage);

// CREATE PROJECT PAGE
app.get("/project-create", renderProjectCreatePage);

app.listen(port, () => {
  console.log(`app listening to port ${port}`);
});
