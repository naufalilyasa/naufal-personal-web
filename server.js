const express = require("express");
const hbs = require("hbs");
const methodOverride = require("method-override");
const path = require("path");
const flash = require("express-flash");
const session = require("express-session");

const app = express();
const port = 3030;

const {
  renderHomePage,
  renderContactPage,
  renderProjectsPage,
  renderProjectCreatePage,
  createProject,
  deleteProject,
  renderEditProjectPage,
  render404NotFoundPage,
  updateProject,
  authLoginPage,
  authRegisterPage,
  authLogin,
  authRegister,
  authLogout,
} = require("./controllers/controller-v1.js");
const { projectDuration } = require("./utils/projectDuration.js");

app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "./views"));

app.use(express.static("assets"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(flash());
app.use(
  session({
    name: "mySession",
    secret: "mySecret",
    resave: false,
    saveUninitialized: true,
  })
);

hbs.registerPartials(__dirname + "/views/partials", function (err) {});
hbs.registerHelper("equal", function (a, b) {
  return a === b;
});
hbs.registerHelper("projectDuration", projectDuration);

// RENDER HOME PAGE
app.get("/", renderHomePage);

// RENDER CONTACT PAGE
app.get("/contact", renderContactPage);

// RENDER PROJECTS PAGE
app.get("/projects", renderProjectsPage);

// RENDER CREATE PROJECT PAGE
app.get("/project-create", renderProjectCreatePage);

// RENDER EDIT PROJECT PAGE
app.get("/project-edit/:id", renderEditProjectPage);

// CREATE PROJECT
app.post("/project-create", createProject);

// DELETE PROJECT
app.delete("/project/:id", deleteProject);

// UPDATE PROJECT
app.put("/project-update/:id", updateProject);

// LOGIN PAGE
app.get("/login", authLoginPage);

// REGISTER PAGE
app.get("/register", authRegisterPage);

// LOGIN
app.post("/login", authLogin);

// REGISTER
app.post("/register", authRegister);

// LOGOUT
app.post("/logout", authLogout);

// 404 NOT FOUND PAGE
app.get("*", render404NotFoundPage);
app.get("/404-not-found", render404NotFoundPage);

app.listen(port, () => {
  console.log(`app listening to port ${port}`);
});
