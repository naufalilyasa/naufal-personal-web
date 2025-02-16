const { Project } = require("../models");

// RENDER HOME PAGE
function renderHomePage(req, res) {
  res.render("index");
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
  };

  const updatedProject = await Project.update(editedProject, {
    where: { id: id },
  })
    .then((res) => console.log(res))
    .catch((error) => console.error(error));

  res.redirect("/projects");
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
  render404NotFoundPage,
};
