let projects = {
  name: "Dumbways Mobile App - 2021",
  startDate: "2020-03-25",
  endDate: "2021-03-25",
  nodeJs: true,
  nextJs: false,
  reactJs: true,
  typescript: true,
  description:
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum blanditiis optio voluptas aut consectetur nesciunt velit asperiores cupiditate sunt doloremque dolorum ipsum, facilis repellat delectus amet assumenda laborum eum fugit non, voluptatibus culpa itaque facere! Culpa suscipit non inventore saepe officiis laborum, ad placeat rerum quia labore tempora architecto laboriosam.",
  image: "https://picsum.photos/id/237/200/100",
};
function renderHomePage(req, res) {
  res.render("index");
}

function renderContactPage(req, res) {
  res.render("contact");
}

function renderProjectsPage(req, res) {
  res.render("projects");
}

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
