let blogs = [
    {
      title: "Pasar Coding Indonesia",
      content: 
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aperiam nostrum assumenda voluptates maiores sequi quisquam pariatur voluptatem non consequuntur dolor architecto unde magni enim itaque Nostrum quod veniam quaerat modi ducimus accusamus dolorem repellat iusto autem ex in nesciunt eos mollitia quo numquam deserunt pariatur aut fugiat id maiores enim.",
      image: "../assets/img/blog-img.png",
      author: "Alfin",
      postedAt: new Date( "Fri July 21 2024 10:15:00 GMT+0700 (Western Indonesian Time"),
      }
  ];
  

function renderBlog (req, res) {
    console.log(blogs);
    res.render("blog-list", {blogs: blogs});
};

function renderBlogDetail (req, res) {
    const id = req.params.id;
    const blogYangDipilih = blogs [id];
    res.render("detail-blog", {blog: blogYangDipilih});
};

function addBlog (req, res) {
    const {title,content} = req.body
  
  let image = "https://picsum.photos/200/150";

  let newBlog = {
    title: title,
    content: content,
    image: image,
    author: "Alfin",
    postedAt: new Date()
  };
  blogs.push(newBlog);
  res.redirect ("/blog-add")
};


function renderBlogEdit (req, res) {
    const id = req.params.id;
    const blogYangDipilih = blogs[id];
    res.render("blog-edit", {blog : blogYangDipilih});
  };
  
  function updateBlog(req, res) {
  }
  
  function deleteBlog (req, res) {
      const id = req.params.id;
      const blogYangDipilih = blogs[id];
      
      blogs.splice (id, 1);
      res.redirect ("/blog");
    }
    
module.exports = {
    blogs,
    renderBlog,
    renderBlogDetail,
    addBlog,
    deleteBlog,
    renderBlogEdit,
    updateBlog,
};