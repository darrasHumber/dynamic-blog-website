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

function showError(elementId, message) {
  const errorElement = document.getElementById(elementId);
  errorElement.textContent = message;
  errorElement.style.color = "red";
  errorElement.style.fontSize = "0.875rem";
  errorElement.style.marginTop = "0.25rem";
}

function clearError(elementId) {
  const errorElement = document.getElementById(elementId);
  errorElement.textContent = "";
}

function validateForm() {
  let isValid = true;

  const title = document.getElementById("title").value.trim();
  const content = document.getElementById("content").value.trim();

  if (!title) {
    showError("title-error", "Title is required.");
    isValid = false;
  } else {
    clearError("title-error");
  }

  if (!content) {
    showError("content-error", "Content is required.");
    isValid = false;
  } else {
    clearError("content-error");
  }

  return isValid;
}

function savePost(event) {
  event.preventDefault();

  if (!validateForm()) return;

  const title = document.getElementById("title").value;
  const content = document.getElementById("content").value;

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
  const deletePostButton = document.getElementById("delete-post");
  const cancelEditButton = document.getElementById("cancel-edit");

  if (
    !postView ||
    !postEdit ||
    !editForm ||
    !editPostButton ||
    !deletePostButton ||
    !cancelEditButton
  )
    return;

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

  deletePostButton.addEventListener("click", () => {
    if (confirm("Are you sure you want to delete this post?")) {
      posts.splice(postId, 1);
      localStorage.setItem("posts", JSON.stringify(posts));
      window.location.href = "index.html";
    }
  });
}

if (window.location.pathname.includes("index.html")) {
  window.onload = loadPosts;
}

if (window.location.pathname.includes("new-post.html")) {
  const postForm = document.getElementById("post-form");
  if (postForm) postForm.addEventListener("submit", savePost);
}

if (window.location.pathname.includes("post.html")) {
  window.onload = loadPost;
}
