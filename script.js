function loadPosts() {
  const postList = document.getElementById("post-list");
  if (!postList) return;

  postList.innerHTML = "";
  const posts = JSON.parse(localStorage.getItem("posts")) || [];

  posts.forEach((post, index) => {
    const postElement = document.createElement("div");
    postElement.classList.add("post");
    const shortContent =
      post.content.length > 200
        ? post.content.slice(0, 200) + "..."
        : post.content;
    postElement.innerHTML = `
            <h3>${post.title}</h3>
            <p>${shortContent}</p>
            <a href="post.html?id=${index}" class="button">Read More</a>
        `;
    postList.appendChild(postElement);
  });
}

function savePost(event) {
  event.preventDefault();
  const title = document.getElementById("title").value;
  const content = document.getElementById("content").value;

  if (!title || !content) {
    alert("Title and content are required!");
    return;
  }

  const newPost = { title, content };
  const posts = JSON.parse(localStorage.getItem("posts")) || [];
  posts.push(newPost);
  localStorage.setItem("posts", JSON.stringify(posts));
  window.location.href = "index.html";
}

if (window.location.pathname.includes("new-post.html")) {
  const postForm = document.getElementById("post-form");
  if (postForm) postForm.addEventListener("submit", savePost);
}

if (window.location.pathname.includes("index.html")) {
  window.onload = loadPosts;
}
