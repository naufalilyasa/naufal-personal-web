const { Project } = require("../models");
const { Sequelize } = require("sequelize");
const config = require("../config/config.js");

const sequelize = new Sequelize(config.development);

// RENDER PROJECTS PAGE
async function renderProjectsPage(req, res) {
  const user = req.session.user;
  const getProjects = await Project.findAll({
    order: [["createdAt", "DESC"]],
  });

  res.render("projects", { projects: getProjects, user: user });
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
  const image = req.file.path;

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
    // image: "/img/class.webp",
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
  renderEditProjectPage,
  createProject,
  deleteProject,
  updateProject,
};
