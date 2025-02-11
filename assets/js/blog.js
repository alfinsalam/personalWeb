let blogs = []

function addBlog(event) {
    event.preventDefault()

    let title = document.getElementById('title').value;
    let content = document.getElementById('content').value;
    let image = document.getElementById('image')

    let imageFileName = URL.createObjectURL(image.files[0])

    let blog = {
        title: title,
        content: content,
        image: imageFileName,
        author: "Alfin Abdussalam"
    }

    blogs.push(blog)

    console.log(blogs)

    renderBlog()
}

function renderBlog() {
    let blogListElement = document.getElementById('blogList')

    blogListElement.innerHTML = firstBlogContent()

    for (let index = 0; index < blogs.length; index++) {
        console.log(blogs[index])

        blogListElement.innerHTML += `
            <article class="blog-item">
                <div class="blog-item-img">
                    <img src="${blogs[index].image}" alt="">
                </div>
                <div class="blog-item-text">
                    <div class="blog-item-buttons">
                        <button class="blog-edit-button">Edit Blog</button>
                        <button class="blog-post-button">Post Blog</button>
                    </div>
                    <h1>${blogs[index].title}</h1>
                    <p>30 Jan 2025 11:22 WIB | ${blogs[index].author}</p>
                    <p>${blogs[index].content}</p>
                </div>
            </article>
        `
    }
}

function firstBlogContent() {
    return `
        <article class="blog-item">
            <div class="blog-item-img">
                <img src="assets/img/blog-img.png" alt="">
            </div>
            <div class="blog-item-text">
                <div class="blog-item-buttons">
                    <button class="blog-edit-button">Edit Blog</button>
                    <button class="blog-post-button">Post Blog</button>
                </div>
                <h1>Pasar Coding di Indonesia</h1>
                <p>30 Jan 2025 11:22 WIB | Alfin Abdussalam</p>
                <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aperiam nostrum assumenda, voluptates maiores sequi quisquam pariatur voluptatem non consequuntur dolor architecto, unde magni enim itaque. Nostrum quod veniam quaerat modi ducimus accusamus dolorem, repellat iusto, autem, ex in nesciunt eos mollitia quo numquam deserunt pariatur aut fugiat id maiores enim.</p>
            </div>
        </article>
    `
}
function formatDateToWIB(date) {
  let months = [
    "Jan", 
    "Feb", 
    "Mar", 
    "Apr", 
    "Mei", 
    "Jun", 
    "Jul", 
    "Aug", 
    "Sep", 
    "Okt", 
    "Nov", 
    "Des", 
  ];

  let day = date.getDate().toString().padStart(2, "0");
  let month = months[date.getMonth()]; // ===>>> bukan nama bulan, bukan angka bulan, tapi index dari bulan tersebut
  let year = date.getFullYear();

  let hours = date.getHours().toString().padStart(2, "0"); // ===> "2"

  let minutes = date.getMinutes().toString().padStart(2, "0");

  let formattedDate = `${day} ${month} ${year} ${hours}:${minutes} WIB`;

  return formattedDate;
}

function getRelativeTime(targetDate) {
  let now = new Date();
  let diffInSeconds = Math.floor((now - targetDate) / 1000); // satuan dari ms ke detik

  console.log(diffInSeconds);

  if (diffInSeconds < 60) {
    return `${diffInSeconds} second${diffInSeconds > 1 ? "s" : ""} ago`;
  }

  let diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    return `${diffInMinutes} minute${diffInMinutes > 1 ? "s" : ""} ago`;
  }
}
