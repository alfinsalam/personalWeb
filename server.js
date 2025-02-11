const express = require ("express");
const path = require("path");
const hbs = require("hbs")

const app = express();
const PORT = 5000

app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "./views"));

app.use('/assets', express.static(path.join(__dirname, "./assets")))

hbs.registerPartials(__dirname + "/views/partials", function(err) {})

app.get("/index", (req, res) => {
  // res.send ("test");
  res.render("index")
});

app.get("/contact", (req, res) => {
  res.render("contact");
});

app.get("/blog", (req, res) => {
  res.render("blog");
});

app.get("/testimonial", (req, res) => {
  res.render("testimonial");
});

app.get("*", (req, res) => {
  res.send("pages not found 404");
});
app.listen(PORT, () => {
  console.log(`server berjalan di ${PORT}`);
});
