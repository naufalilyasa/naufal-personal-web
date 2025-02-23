const { Sequelize } = require("sequelize");
const config = require("../config/config.json");
const { Blog, User } = require("../models");

const sequelize = new Sequelize(config.development);

// RENDER BLOGS PAGE
async function renderBlogPage(req, res) {
  const user = req.session.user;
  const blogs = await Blog.findAll({
    include: { model: User, as: "user", attributes: { exclude: ["password"] } },
    order: [["createdAt", "DESC"]],
  });

  if (!user) {
    res.render("blog-list", { blogs: blogs });
  } else {
    res.render("blog-list", { blogs: blogs, user: user });
  }
  // console.log(blogs);
}

// BLOG-CREATE PAGE
function renderCreateBlogPage(req, res) {
  const user = req.session.user;

  if (!user) {
    res.redirect("/login");
  }
  res.render("blog-create");
}

// RENDER EDIT BLOG PAGE
async function renderEditBlogPage(req, res) {
  const user = req.session.user;
  const id = req.params.id;
  // console.log("user:", user);

  if (!user) {
    req.flash("warning", "Please login");
    return res.redirect("/login");
  }

  const blogYangDipilih = await Blog.findOne({
    include: { model: User, as: "user", attributes: { exclude: ["password"] } },
    where: { id: id },
  });
  // console.log("blog yg dipilij: ", blogYangDipilih.user.id);
  if (user.id !== blogYangDipilih.user.id) {
    return res.redirect("/unauthorized");
  }

  if (blogYangDipilih === null) {
    res.render("page-404");
  } else {
    res.render("blog-edit", { blog: blogYangDipilih, user: user });
  }
}

// RENDER BLOG DETAIL PAGE
async function renderBlogDetailPage(req, res) {
  const user = req.session.user;
  const id = req.params.id;

  if (!user) {
    req.flash("warning", "Please login");
    res.redirect("/login");
  }

  const blogYangDipilih = await Blog.findOne({
    include: { model: User, as: "user", attributes: { exclude: ["password"] } },
    where: { id: id },
  });

  if (blogYangDipilih === null) {
    res.render("page-404");
  } else {
    res.render("blog-detail", {
      blog: blogYangDipilih,
      userData: blogYangDipilih.user,
    });
  }
}

// CREATE BLOG
async function createBlog(req, res) {
  const userData = req.session.user;
  const { title, content } = req.body;
  // let dummyImage = "https://picsum.photos/200/150";
  const image = req.file.path;

  if (!userData) {
    req.flash("error", "Please login");
    return res.redirect("/login");
  }

  const createdBlog = await Blog.create({
    title: title,
    authorId: userData.id,
    image: image,
    content: content,
  })
    // .then((res) => {
    //   console.log(res);
    // })
    .catch((error) => console.error(error));

  res.redirect("/blogs");
}

// DELETE BLOG
async function deleteBlog(req, res) {
  const id = req.params.id;

  const user = req.session.user;

  if (!user) {
    return res.redirect("/login");
  }

  const deletedBlog = await Blog.destroy({
    where: { id: id },
  });

  res.redirect("/blogs");
}

// UPDATE BLOG
async function updateBlog(req, res) {
  const id = req.params.id;
  const { title, content } = req.body;
  let image = req.file;

  if (!image) {
    image = req.body.image;
  } else {
    image = image.path;
  }

  const updatedBlog = await Blog.update(
    {
      title: title,
      content: content,
      image: image,
      updatedAt: sequelize.fn("NOW"),
    },
    {
      where: { id: id },
    }
  );

  res.redirect("/blogs");
}

module.exports = {
  renderBlogPage,
  renderCreateBlogPage,
  renderEditBlogPage,
  renderBlogDetailPage,
  deleteBlog,
  updateBlog,
  createBlog,
};
