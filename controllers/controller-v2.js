const { Sequelize, where } = require("sequelize");
const config = require("../config/config.json");
const { Blog, User } = require("../models");
const bcrypt = require("bcrypt");

const sequelize = new Sequelize(config.development);

const saltRounds = 10

async function renderHome(req, res) {
  const user = req.session.user;
  res.render("index",{user, currentPage: "Home"});
}

async function authLogin(req, res) {
  const { email, password } = req.body;
  const user = await User.findOne({
    where: {
      email: email,
    },
  });

  console.log("User  found:", user); // Tambahkan log di sini

  if (!user) {
    req.flash("error", "User  tidak ditemukan");
    return res.redirect("/login");
  }

  // Check password
  const isValidated = await bcrypt.compare(password, user.password);

  if (!isValidated) {
    req.flash("error", "Password mismatch");
    return res.redirect("/login");
  }

  let loggedInUser  = user.toJSON();
  delete loggedInUser.password;

  req.session.user = loggedInUser ;
  console.log("Logged in user:", req.session.user); // Tambahkan log di sini
  req.flash("success", `${loggedInUser .name} Berhasil login :)`);
  res.redirect("/index");
}


async function authRegister(req, res) {
  const {name, email, password, confirmPassword} = req.body;
  if(password != confirmPassword){
   return res.render("auth-register", {
      error: "password and confirm password mismatch"
    });
  }
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  const newUser ={
    name: name,
    email: email,
    password: hashedPassword  
  }
  const userInsert = await User.create(newUser);
  req.flash("success", "berhasil mendaftar silahkan login")
  res.redirect("/login")
};

async function renderBlog(req, res) {
  const blogs = await Blog.findAll({ order: [["createdAt", "DESC"]] });

  console.log("hasil fetch dari controller-v2", blogs);
  res.render("blog-list", { blogs: blogs });
}

async function renderBlogDetail(req, res) {
  const id = req.params.id;

  const blogYangDipilih = await Blog.findOne({
    where: {
      id: id,
    },
  });

  if (blogYangDipilih === null) {
    res.render("page-404");
  } else {
    res.render("blog-detail", { blog: blogYangDipilih });
  }
}

async function deleteBlog(req, res) {
  const { id } = req.params;
  const deleteResult = await Blog.destroy({
    where: {
      id: id,
    },
  });
  console.log("result delete", deleteResult);
  res.redirect("/blog");
}

async function renderAddBlog(req, res) {
  res.render("blog-add");
}

async function AddBlog(req, res) {
  res.render("blog-add");
  const { title, content } = req.body;

  let dummyImage = "https://picsum.photos/200/150";

  const newBlog = {
    title,
    content,
    image: dummyImage,
  };

  const resultSubmit = await Blog.create(newBlog);
  console.log("result add blog", resultSubmit);

  res.redirect("/blog");
}

async function renderBlogEdit(req, res) {
  const id = req.params.id;
  const blogYangDipilih = await Blog.findOne({
    where: {
      id: id,
    },
  });
  if (blogYangDipilih === null) {
    res.render("page-404");
  } else {
    res.render("blog-edit", { blog: blogYangDipilih });
  }
}

async function updateBlog(req, res) {
  const id = req.params.id;
  const { title, content } = req.body;

  const updateResult = await Blog.update(
    {
      title,
      content,
      updatedAt: sequelize.fn("NOW"),
    },
    {
      where: {
        id,
      },
    }
  );
  res.redirect("/blog");
}
module.exports = {
  authLogin,
  authRegister,
  renderBlog,
  renderHome,
  renderBlogDetail,
  renderAddBlog,
  AddBlog,
  deleteBlog,
  renderBlogEdit,
  updateBlog,
};
