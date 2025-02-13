const express = require("express");
const app = express();
const PORT = 5000;
const path = require("path");
const hbs = require("hbs");
const methodOverride = require ("method-override")

const {blogs, renderBlog, renderBlogDetail, addBlog, deleteBlog, renderBlogEdit, updateBlog} = require ("./controllers/controller-v1")

const{formatDateToWIB, getRelativeTime} = require("./utils/time");

app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "./views"));

app.use("/assets", express.static(path.join(__dirname, "./assets")));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(methodOverride("__method"));


hbs.registerPartials(__dirname + "/views/partials", function (err) {});
hbs.registerHelper("equal", function (a, b) {
  return a === b;
});
hbs.registerHelper("formatDateToWIB", formatDateToWIB);
hbs.registerHelper("getRelativeTime", getRelativeTime);

app.get("/index", (req, res) => {
  // res.send ("test");
  res.render("index");
});

app.get("/contact", (req, res) => {
  res.render("contact");
});

// blog-list
app.get("/blog", renderBlog);

// add-blog
app.get("/blog-add", addBlog);

// edit blog
app.get("/blog-edit/:id", renderBlogEdit)

//submit /save blog 
app.post("/blog-update/:id", updateBlog);

// delete blog
app.delete("/blog/:id", deleteBlog);

// blog detail
app.get("/blog/:id", renderBlogDetail);

app.get("/testimonial", (req, res) => {
  res.render("testimonial");
});

app.get("*", (req, res) => {
  res.send("pages not found 404");
});
app.listen(PORT, () => {
  console.log(`server berjalan di ${PORT}`);
});
