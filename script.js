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

if (window.location.pathname.includes("index.html")) {
  window.onload = loadPosts;
}
