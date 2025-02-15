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

// RENDER CREATE PROJECTS PAGE
function renderProjectCreatePage(req, res) {
  res.render("project-create");
}

function createProject(req, res) {}

module.exports = {
  renderHomePage,
  renderContactPage,
  renderProjectsPage,
  renderProjectCreatePage,
};
