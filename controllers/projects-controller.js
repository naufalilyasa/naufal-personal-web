const { Project, User } = require("../models");
const { Sequelize } = require("sequelize");
const config = require("../config/config.js");
require("dotenv").config();

const sequelize = new Sequelize(config[process.env.NODE_ENV]);

// RENDER PROJECTS PAGE
async function renderProjectsPage(req, res) {
  const user = req.session.user;

  const getProjects = await Project.findAll({
    include: { model: User, as: "user", attributes: { exclude: ["password"] } },
    order: [["createdAt", "DESC"]],
  });

  // console.log(getProjects);
  if (!user) {
    res.render("projects", { projects: getProjects });
  } else {
    res.render("projects", { projects: getProjects, user: user });
  }
}

// RENDER EDIT PAGE
async function renderEditProjectPage(req, res) {
  const id = req.params.id;
  const user = req.session.user;

  if (!user) {
    req.flash("warning", "Please login");
    return res.redirect("/login");
  }

  const existingProject = await Project.findOne({
    include: { model: User, as: "user", attributes: { exclude: ["password"] } },
    where: { id: id },
  });

  if (user.id !== existingProject.user.id) {
    return res.redirect("/unauthorized");
  }

  if (existingProject === null) {
    res.redirect("/404-not-found");
  } else {
    res.render("project-edit", { project: existingProject, user: user });
  }
}

// RENDER CREATE PROJECT PAGE
function renderProjectCreatePage(req, res) {
  const user = req.session.user;

  res.render("project-create", { user: user });
}

// RENDER PROJECT DETAIL PAGE
async function renderProjectDetailPage(req, res) {
  const user = req.session.user;
  const id = req.params.id;

  if (!user) {
    req.flash("warning", "Please login");
    res.redirect("/login");
  }

  const projectYangDipilih = await Project.findOne({
    include: { model: User, as: "user", attributes: { exclude: ["password"] } },
    where: { id: id },
  });

  if (projectYangDipilih === null) {
    res.render("page-404");
  } else {
    res.render("project-detail", {
      project: projectYangDipilih,
      userData: projectYangDipilih.user,
      user: user,
    });
  }
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
  const image = req.file.path;
  const userId = req.session.user.id;

  const projects = {
    projectName: projectName,
    startProjectDate: startProjectDate,
    endProjectDate: endProjectDate,
    technologyNodeJs: Boolean(nodeJs),
    technologyNextJs: Boolean(nextJs),
    technologyReactJs: Boolean(reactJs),
    technologyTypescript: Boolean(typescript),
    image: image,
    description: description,
    authorId: userId,
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
  let image = req.file;

  if (!image) {
    image = req.body.image;
  } else {
    image = image.path;
  }

  const editedProject = {
    projectName: projectName,
    startProjectDate: startProjectDate,
    endProjectDate: endProjectDate,
    technologyNodeJs: Boolean(nodeJs),
    technologyNextJs: Boolean(nextJs),
    technologyReactJs: Boolean(reactJs),
    technologyTypescript: Boolean(typescript),
    description: description,
    image: image,
    updatedAt: sequelize.fn("NOW"),
  };

  const updatedProject = await Project.update(editedProject, {
    where: { id: id },
  })
    // .then((res) => console.log(res))
    .catch((error) => console.error(error));

  res.redirect("/projects");
}

module.exports = {
  renderProjectsPage,
  renderProjectCreatePage,
  renderProjectDetailPage,
  renderEditProjectPage,
  createProject,
  deleteProject,
  updateProject,
};
