const {Sequelize, QueryTypes} = require ("sequelize");
const config = require("../config/config.json");

const sequelize = new Sequelize(config.development);

let blogs = [
    {
      title: "Pasar Coding Indonesia",
      content: 
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aperiam nostrum assumenda voluptates maiores sequi quisquam pariatur voluptatem non consequuntur dolor architecto unde magni enim itaque Nostrum quod veniam quaerat modi ducimus accusamus dolorem repellat iusto autem ex in nesciunt eos mollitia quo numquam deserunt pariatur aut fugiat id maiores enim.",
      image: "../assets/img/blog-img.png",
      author: "Alfin",
      postedAt: new Date( "2024-07-21T10:15:00+07:00"),
      },

      {
        title: "Pasar Coding Indonesia",
        content: 
        "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aperiam nostrum assumenda voluptates maiores sequi quisquam pariatur voluptatem non consequuntur dolor architecto unde magni enim itaque Nostrum quod veniam quaerat modi ducimus accusamus dolorem repellat iusto autem ex in nesciunt eos mollitia quo numquam deserunt pariatur aut fugiat id maiores enim.",
        image: "../assets/img/blog-img.png",
        author: "Alfin",
        postedAt: new Date( "2024-07-21T10:15:00+07:00"),
        }
  ];
  

async function renderBlog (req, res) {
    const blogs = await sequelize.query('SELECT * FROM "Blogs" ORDER BY "createdAt" DESC', {
      type: QueryTypes.SELECT,
    })
    res.render("blog-list", {blogs: blogs});
};

async function renderBlogDetail (req, res) {
    const id = req.params.id;

    const query = `SELECT * FROM "Blogs" WHERE id =${id}`;
    const blogYangDipilih = await sequelize.query(query,{
      type: QueryTypes.SELECT,
    });
    res.render("detail-blog", {blog: blogYangDipilih [0]});
};

async function renderAddBlog (req, res) {
    const {title,content} = req.body


let image = "https://picsum.photos/200/150";

let query = `INSERT INTO "Blogs" (title, content, image)
            VALUES ('${title}', '${content}', '${image}')`;

const newBlog = await sequelize.query(query, {
  type: QueryTypes.INSERT,
})
  // let newBlog = {
  //   title: title,
  //   content: content,
  //   image: image,
  //   author: "Alfin",
  //   postedAt: new Date()
  // // };  
  // blogs.push(newBlog);
  res.redirect ("/blog")
};


async function renderBlogEdit(req, res) {
  const id = req.params.id;
  const query = 'SELECT * FROM "Blogs" WHERE id = :id';

  try {
      const blogYangDipilih = await sequelize.query(query, {
          replacements: { id: id },
          type: QueryTypes.SELECT,
      });
      
      console.log("hasil query", blogYangDipilih[0]);
      res.render("blog-edit", { blog: blogYangDipilih[0] });
  } catch (error) {
      console.error("Error saat mengambil blog:", error);
      res.status(500).send("Terjadi kesalahan saat mengambil blog.");
  }
}
  
async function updateBlog(req, res) {
  const id = req.params.id;
  const { title, content } = req.body;
  let image = "https://picsum.photos/200/150";

  try {
      const query = `UPDATE "Blogs" SET title = :title, content = :content, image = :image, "updatedAt" = NOW() WHERE id = :id`;

      await sequelize.query(query, {
          replacements: { id, title, content, image },
          type: QueryTypes.UPDATE,
      });

      console.log("Blog berhasil diperbarui:", { id, title, content });
      res.redirect("/blog");
  } catch (error) {
      console.error("Error saat memperbarui blog:", error);
      res.status(500).send("Terjadi kesalahan saat memperbarui blog.");
  }
};

  
 async function deleteBlog (req, res) {
      const id = req.params.id;
      const query = 'DELETE FROM "Blogs" WHERE id = :id';

      try {const deleteResult = await sequelize.query(query, {
        replacements: {id :id},
        type: QueryTypes.DELETE,
      })
      console.log("Hasil Delete:", deleteResult);
      res.redirect ("/blog");
    } catch (error) {
      console.log("error", error);
      res.status(500).send("terjadi kesalahan saat menghapus blog")
    }

      // blogs.splice (id, 1);
     
    }
    
module.exports = {
    blogs,
    renderBlogEdit,
    updateBlog,
};