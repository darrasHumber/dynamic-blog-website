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

function loadPost() {
  const postView = document.getElementById("post-view");
  const postEdit = document.getElementById("post-edit");
  const editForm = document.getElementById("edit-form");
  const editPostButton = document.getElementById("edit-post");
  const cancelEditButton = document.getElementById("cancel-edit");

  const urlParams = new URLSearchParams(window.location.search);
  const postId = urlParams.get("id");
  const posts = JSON.parse(localStorage.getItem("posts")) || [];

  if (postId === null || postId < 0 || postId >= posts.length) {
    postView.innerHTML = "<p>Post not found.</p>";
    return;
  }

  const post = posts[postId];
  postView.innerHTML = `
      <h3>${post.title}</h3>
      <p>${post.content}</p>
  `;

  document.getElementById("edit-title").value = post.title;
  document.getElementById("edit-content").value = post.content;

  editPostButton.addEventListener("click", () => {
    postView.style.display = "none";
    postEdit.style.display = "block";
    editPostButton.style.display = "none";
    deletePostButton.style.display = "none";
  });

  cancelEditButton.addEventListener("click", () => {
    postView.style.display = "block";
    postEdit.style.display = "none";
    editPostButton.style.display = "inline-block";
    deletePostButton.style.display = "inline-block";
  });

  editForm.addEventListener("submit", (event) => {
    event.preventDefault();
    posts[postId].title = document.getElementById("edit-title").value;
    posts[postId].content = document.getElementById("edit-content").value;
    localStorage.setItem("posts", JSON.stringify(posts));
    window.location.reload();
  });
}

if (window.location.pathname.includes("post.html")) {
  window.onload = loadPost;
}

if (window.location.pathname.includes("new-post.html")) {
  const postForm = document.getElementById("post-form");
  if (postForm) postForm.addEventListener("submit", savePost);
}

if (window.location.pathname.includes("index.html")) {
  window.onload = loadPosts;
}
