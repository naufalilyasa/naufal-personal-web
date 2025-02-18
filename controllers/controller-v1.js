const { Project, User } = require("../models");
const { Sequelize } = require("sequelize");
const bcript = require("bcrypt");
const config = require("../config/config");

const sequelize = new Sequelize(config.development);

// RENDER HOME PAGE
function renderHomePage(req, res) {
  const user = req.session.user;
  res.render("index", { user: user });
}

// RENDER CONTACT PAGE
function renderContactPage(req, res) {
  res.render("contact");
}

// RENDER PROJECTS PAGE
async function renderProjectsPage(req, res) {
  const getProjects = await Project.findAll({
    order: [["createdAt", "DESC"]],
  });

  res.render("projects", { projects: getProjects });
}

// RENDER EDIT PAGE
async function renderEditProjectPage(req, res) {
  const id = req.params.id;

  const existingProject = await Project.findOne({
    where: { id: id },
  });

  if (existingProject === null) {
    res.redirect("/404-not-found");
  } else {
    res.render("project-edit", { project: existingProject });
  }
}

// RENDER CREATE PROJECT PAGE
function renderProjectCreatePage(req, res) {
  res.render("project-create");
}

// CREATE PROJECT
async function createProject(req, res) {
  let {
    startProjectDate,
    endProjectDate,
    nodeJs,
    nextJs,
    reactJs,
    typescript,
  } = req.body;
  const { projectName, description } = req.body;

  const projects = {
    projectName: projectName,
    startProjectDate: startProjectDate,
    endProjectDate: endProjectDate,
    technologyNodeJs: Boolean(nodeJs),
    technologyNextJs: Boolean(nextJs),
    technologyReactJs: Boolean(reactJs),
    technologyTypescript: Boolean(typescript),
    description: description,
    image: "/img/class.webp",
  };

  await Project.create(projects)
    // .then((res) => console.log(res))
    .catch((error) => console.error(error));
  res.redirect("/projects");
}

// DELETE PROJECT
async function deleteProject(req, res) {
  const id = req.params.id;

  const deletedProject = await Project.destroy({
    where: { id: id },
  });

  res.redirect("/projects");
}

// UPDATE PROJECT
async function updateProject(req, res) {
  const id = req.params.id;
  let {
    projectName,
    startProjectDate,
    endProjectDate,
    nodeJs,
    nextJs,
    reactJs,
    typescript,
    description,
  } = req.body;

  const editedProject = {
    projectName: projectName,
    startProjectDate: startProjectDate,
    endProjectDate: endProjectDate,
    technologyNodeJs: Boolean(nodeJs),
    technologyNextJs: Boolean(nextJs),
    technologyReactJs: Boolean(reactJs),
    technologyTypescript: Boolean(typescript),
    description: description,
    updatedAt: sequelize.fn("NOW"),
  };

  const updatedProject = await Project.update(editedProject, {
    where: { id: id },
  })
    .then((res) => console.log(res))
    .catch((error) => console.error(error));

  res.redirect("/projects");
}

// LOGIN PAGE
function authLoginPage(req, res) {
  res.render("auth-login");
}

// REGISTER PAGE
function authRegisterPage(req, res) {
  res.render("auth-register");
}

// LOGIN
async function authLogin(req, res) {
  const { email, password } = req.body;

  const userData = await User.findOne({ where: { email } });

  if (!userData) {
    req.flash("error", "Email tidak ditemukan");
    return res.redirect("/login");
  }

  const isValidatedPassword = await bcript.compare(password, userData.password);

  if (!isValidatedPassword) {
    req.flash("error", "Password salah!");
    return res.redirect("/login");
  }

  let loggedInUser = userData.toJSON();
  req.session.user = loggedInUser;

  req.flash("success", "Berhasil Login");
  return res.redirect("/");
}

// REGISTER
async function authRegister(req, res) {
  const { name, email, password, confirmPassword } = req.body;
  const user = await User.findOne({ where: { email } });
  if (user) {
    req.flash("error", "Email sudah terpakai!");
    return res.redirect("/register");
  }

  if (password !== confirmPassword) {
    req.flash("error", "password and confirm password mismatch!");
    return res.redirect("/register");
  }

  const hashedPassword = await bcript.hash(password, 10);
  const userDataInput = {
    name,
    email,
    password: hashedPassword,
  };
  console.log(userDataInput);

  const newUser = await User.create(userDataInput);

  req.flash("success", "Berhasil mendaftar silahkan login!");
  res.redirect("/login");
}

// LOGOUT
function authLogout(req, res) {
  req.session.user = null;
  res.redirect("/login");
}

// RENDER 404 NOT FOUND PAGE
function render404NotFoundPage(req, res) {
  res.render("404-not-found");
}

module.exports = {
  renderHomePage,
  renderContactPage,
  renderProjectsPage,
  renderProjectCreatePage,
  renderEditProjectPage,
  createProject,
  deleteProject,
  updateProject,
  authLoginPage,
  authRegisterPage,
  authLogin,
  authRegister,
  authLogout,
  render404NotFoundPage,
};
