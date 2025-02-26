const express = require("express");
const hbs = require("hbs");
const methodOverride = require("method-override");
const path = require("path");
const flash = require("express-flash");
const session = require("express-session");
const { createClient } = require("redis");
const { RedisStore } = require("connect-redis");
const Redis = require("ioredis");

require("dotenv").config();

const app = express();

const port = process.env.SERVER_PORT || 3030;

// Local
let redisClient = createClient();
redisClient.connect().catch(console.error);
// const redisUrl = new URL(process.env.REDIS_URL);

let redisStore = new RedisStore({
  // url: process.env.REDIS_URL,
  socket: {
    host: "127.0.0.1",
    port: 6379,
    tls: true,
  },
  // password: process.env.REDIS_PASSWORD || null,
  client: redisClient,
  // password: redisUrl.password,
  ttl: 1000 * 60 * 30,
  prefix: "sess:",
});
// console.log("Current Vercel Environment:", process.env.VERCEL_ENV);

// Vercel
const redisClientProd = new Redis(process.env.REDIS_URL, {
  tls: {
    rejectUnauthorized: false,
  },
});

const redisStoreProd = new RedisStore({
  client: redisClientProd,
  prefix: "sess:",
});

const {
  renderProjectsPage,
  renderProjectCreatePage,
  createProject,
  deleteProject,
  renderEditProjectPage,
  updateProject,
} = require("./controllers/projects-controller.js");
const {
  renderBlogPage,
  renderBlogDetailPage,
  renderCreateBlogPage,
  renderEditBlogPage,
  createBlog,
  updateBlog,
  deleteBlog,
} = require("./controllers/blogs-controller.js");
const {
  authLoginPage,
  authRegisterPage,
  authLogin,
  authRegister,
  authLogout,
} = require("./controllers/auth-controller.js");
const {
  renderHomePage,
  renderContactPage,
  renderTestimonialsPage,
  renderUnauthorizedPage,
  render404NotFoundPage,
} = require("./controllers/controller-v1.js");

const { projectDuration } = require("./utils/projectDuration.js");
const { formatDateToWIB, getRelativeTime } = require("./utils/time.js");

const upload = require("./middlewares/upload-file.js");
const { checkUser, checkAuth } = require("./middlewares/auth.js");

app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "./views"));

// app.use(express.static("assets"));
app.use("/assets", express.static(path.join(__dirname, "./assets")));
app.use("/uploads", express.static(path.join(__dirname, "./uploads")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(flash());
app.use(
  session({
    store: redisStoreProd,
    name: "mySession",
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === "production",
      httpOnly: true,
      maxAge: 1000 * 60 * 30, // 30 minutes
    },
  })
);

hbs.registerPartials(__dirname + "/views/partials", function (err) {});
hbs.registerHelper("equal", function (a, b) {
  return a === b;
});
hbs.registerHelper("projectDuration", projectDuration);
hbs.registerHelper("formatDateToWIB", formatDateToWIB);
hbs.registerHelper("getRelativeTime", getRelativeTime);

// RENDER HOME PAGE
app.get("/", renderHomePage);

// RENDER CONTACT PAGE
app.get("/contact", renderContactPage);

// RENDER TESTIMONIALS PAGE
app.get("/testimonials", renderTestimonialsPage);

// RENDER PROJECTS PAGE
app.get("/projects", renderProjectsPage);

// RENDER CREATE PROJECT PAGE
app.get("/project-create", renderProjectCreatePage);

// RENDER EDIT PROJECT PAGE
app.get("/project-edit/:id", renderEditProjectPage);

// CREATE PROJECT
app.post("/project-create", upload.single("image"), createProject);

// DELETE PROJECT
app.delete("/project-delete/:id", deleteProject);

// UPDATE PROJECT
app.put("/project-update/:id", upload.single("image"), updateProject);

// RENDER LOGIN PAGE
app.get("/login", authLoginPage);

// RENDER REGISTER PAGE
app.get("/register", authRegisterPage);

// LOGIN
app.post("/login", authLogin);

// REGISTER
app.post("/register", authRegister);

// LOGOUT
app.get("/logout", authLogout);

// BLOG-LIST PAGE
app.get("/blogs", renderBlogPage);

// BLOG-DETAIL PAGE
app.get("/blog-detail/:id", renderBlogDetailPage);

// BLOG-CREATE PAGE
app.get("/blog-create", renderCreateBlogPage);

// BLOG-EDIT PAGE
app.get("/blog-edit/:id", renderEditBlogPage);

// CREATE BLOG
app.post("/blog-create", checkUser, upload.single("image"), createBlog);

// UPDATE BLOG
app.put("/blog-update/:id", upload.single("image"), updateBlog);
// app.put("/blog-edit/:id", checkUser, upload.single("image"), updateBlog);

// DELETE BLOG
app.delete("/blog-delete/:id", deleteBlog);

// RENDER UNAUTHORIZED PAGE
app.get("/unauthorized", renderUnauthorizedPage);

// RENDER 404 NOT FOUND PAGE
app.get("*", render404NotFoundPage);
app.get("/404-not-found", render404NotFoundPage);

app.listen(port, () => {
  console.log(`app listening to port ${port}`);
});
