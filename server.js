const express = require("express");
const app = express();
const PORT = 5000;
const path = require("path");
const hbs = require("hbs");
require("dotenv").config();
const methodOverride = require("method-override");
const flash = require ("express-flash");
const session = require("express-session");

// const {
//   r
// } = require("./controllers/controller-v1");

const {
  renderHome,
  authLogin,
  authRegister,
  renderBlog,
  renderBlogDetail,
  deleteBlog,
  renderAddBlog,
  AddBlog,
  renderBlogEdit,
  updateBlog,
} = require("./controllers/controller-v2");
const { formatDateToWIB, getRelativeTime } = require("./utils/time");
const exp = require("constants");


app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "./views"));

// modul yang digunakan
app.use(express.json());
app.use("/assets", express.static(path.join(__dirname, "./assets")));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(flash());
app.use(session({
  name: "my-session",
  secret: "qwdsalknalkcn",
  resave: false,
  saveUninitialized: true,
}));

hbs.registerPartials(__dirname + "/views/partials", function (err) {});
hbs.registerHelper("equal", function (a, b) {
  return a === b;
});
hbs.registerHelper("formatDateToWIB", formatDateToWIB);
hbs.registerHelper("getRelativeTime", getRelativeTime);

app.get("/index",renderHome);
// login and register
app.get("/login", (req, res) => {
  res.render("auth-login");
});
app.get("/register", (req, res) => {
  res.render("auth-register");
});

app.post("/login", authLogin);
app.post("/register", authRegister);

// blog-list
app.get("/blog", renderBlog);

// add-blog

app.get("/blog-add", renderAddBlog);

// submit add
app.post("/blog-add", AddBlog);

// edit blog
app.get("/blog-edit/:id", renderBlogEdit);

//submit /save blog
app.post("/blog-update/:id", updateBlog);

// delete blog
app.delete("/blog/:id", deleteBlog);

// blog detail
app.get("/blog/:id", renderBlogDetail);

// project
app.get("/project", (req, res) => {
  res.render("project");
});

// project detail
app.get("/project-detail", (req, res) => {
  res.render("project-detail");
});

app.get("/testimonial", (req, res) => {
  res.render("testimonial");
});

app.get("/contact", (req, res) => {
  res.render("contact");
});

app.get("*", (req, res) => {
  res.render("page-404");
});
app.listen(PORT, () => {
  console.log(`server berjalan di ${PORT}`);
});
