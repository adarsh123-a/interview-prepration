const feedEl = document.getElementById("feed");
const pagination = document.getElementById("pagination");
const stateEl = document.getElementById("container");
const POST_PER_Page = 10;
let currentPage = 1;
let totalPosts = 0;
let usersCache = {};

let currentPosts = [];
let searchQuery = "";
let searchMode = "title";

const searchInput = document.getElementById("searchInput");
const searchModeSelect = document.getElementById("searchMode");

const handleSearch = debounce(() => {
  searchQuery = searchInput.value;
  searchMode = searchModeSelect.value;
  renderFilteredPosts();
}, 300);

searchInput.addEventListener("input", handleSearch);
searchModeSelect.addEventListener("change", (e) => {
  searchMode = e.target.value;
  renderFilteredPosts();
});

function debounce(fn, delay) {
  let timeoutId;
  return function (...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn.apply(this, args), delay);
  };
}

function matchsSearch(post) {
  if (!searchQuery) return true;

  const q = searchQuery.toLowerCase();
  const title = post.title.toLowerCase();
  const body = post.body.toLowerCase();
  const author = (usersCache[post.userId] || "").toLowerCase();

  if (searchMode === "title") {
    return title.includes(q);
  }
  if (searchMode === "body") {
    return body.includes(q);
  }
  if (searchMode === "author") {
    return author.includes(q);
  }

  if (searchMode === "fuzzy") {
    return fuzzyMatch(q, `${title} ${body} ${author}`);
  }
  return true;
}

function fuzzyMatch(query, string) {
  let qIndex = 0;
  let score = 0;
  for (let i = 0; i < string.length; i++) {
    if (qIndex === query.length) {
      return score / query.length;
    }
    if (string[i] === query[qIndex]) {
      qIndex++;
      score++;
    }
  }
  return score / query.length >= 0.7;
}

function renderFilteredPosts() {
  feedEl.innerHTML = "";
  const filtered = currentPosts.filter(matchsSearch);
  if (!filtered.length) {
    stateEl.textContent = "No posts found";
    return;
  }
  stateEl.textContent = "";
  renderPosts(filtered);
}

const API = "https://jsonplaceholder.typicode.com";
async function fetchUsers() {
  let res = await fetch(`${API}/users`);
  let data = await res.json();
  console.log(data);
  data.forEach((u) => (usersCache[u.id] = u.name));
}
async function fetchPosts(page) {
  stateEl.textContent = "Loading posts...";
  stateEl.className = "state";
  feedEl.innerHTML = "";

  try {
    await fetchUsers();
    const res = await fetch(
      `${API}/posts?_page=${page}&_limit=${POST_PER_Page}`
    );
    if (!res.ok) {
      throw new Error("Failed to load posts");
    }
    totalPosts = Number(res.headers.get("x-total-count"));
    const posts = await res.json();
    if (!posts.length) {
      stateEl.textContent = "No posts found";
      return;
    }
    stateEl.textContent = "";
    currentPosts = posts;
    renderFilteredPosts();
    renderPagination();
  } catch (error) {
    stateEl.textContent = error.message;
    stateEl.classList.add("error");
  }
}
async function renderPosts(posts) {
  for (const post of posts) {
    const commentsRes = await fetch(`${API}/comments?postId=${post.id}`);
    const comments = await commentsRes.json();
    const postEl = document.createElement("div");
    postEl.className = "post";
    postEl.innerHTML = `
            <h3>${post.title}</h3>
        <div class="meta">
          By ${usersCache[post.userId] || "Unknown"} • 
          ${comments.length} comments
        </div>
        <p>${post.body}</p>y
        `;
    feedEl.appendChild(postEl);
  }
}

function renderPagination() {
  const totalPages = Math.ceil(totalPosts / POST_PER_Page);
  pagination.innerHTML = "";

  const prevBtn = document.createElement("button");
  prevBtn.textContent = "prev";
  prevBtn.disabled = currentPage === 1;
  prevBtn.onclick = () => gotToPage(currentPage - 1);
  pagination.appendChild(prevBtn);

  const pageInfo = document.createElement("span");
  pageInfo.textContent = `${currentPage} of ${totalPages}`;
  pagination.appendChild(pageInfo);
  const nextBtn = document.createElement("button");
  nextBtn.textContent = "Next";
  nextBtn.disabled = currentPage === totalPages;
  nextBtn.onclick = () => gotToPage(currentPage + 1);
  pagination.appendChild(nextBtn);
}
function gotToPage(page) {
  currentPage = page;
  fetchPosts(page);
  feedEl.scrollTop = 0;
}
fetchPosts(currentPage);
