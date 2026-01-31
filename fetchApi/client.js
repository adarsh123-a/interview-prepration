const productList = document.getElementById("card");
const loginBtn = document.getElementById("loginBtn");
const cartDiv = document.getElementById("cart");
const totalSpan = document.getElementById("total");
const loginStatus = document.getElementById("loginStatus");
const categoriesDiv = document.getElementById("Categories");
const logoutBtn = document.getElementById("logoutBtn");

let cart = [];
let token = localStorage.getItem("token");

if (token) {
  loginBtn.hidden = true;
  logoutBtn.hidden = false;
  document.querySelector("h1").textContent = "Welcome Back";
} else {
  loginBtn.hidden = false;
  logoutBtn.hidden = true;
}

loginBtn.addEventListener("click", () => {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  loginStatus.textContent = "Logging in...";

  // Check for hardcoded credentials
  if (username === "adarsh" && password === "adarsh123") {
    // Simulate a successful login with a fake token
    token = "fake_token_for_adarsh";
    localStorage.setItem("token", token);
    loginStatus.textContent = "Login successful!";

    document.querySelector("h1").textContent = `Welcome ${username}`;

    loginBtn.hidden = true;
    logoutBtn.hidden = false;
  } else {
    loginStatus.textContent = "Login failed: Invalid credentials";
  }
});

fetch("https://fakestoreapi.com/products/categories")
  .then((res) => res.json())
  .then((categories) => {
    categories.forEach((category) => {
      const btn = document.createElement("button");
      btn.textContent = category;
      btn.addEventListener("click", () => {
        loadProductsByCategory(category);
      });
      categoriesDiv.appendChild(btn);
    });
  })
  .catch((error) => console.log(error));

logoutBtn.addEventListener("click", logout);

function logout() {
  token = null;
  localStorage.removeItem("token");
  loginStatus.textContent = "Logged out";
  document.querySelector("h1").textContent = "Welcome Guest";
  loginBtn.hidden = false;
  logoutBtn.hidden = true;
}

function loadProductsByCategory(category) {
  fetch(`https://fakestoreapi.com/products/category/${category}`)
    .then((res) => res.json())
    .then((products) => {
      renderProducts(products);
    })
    .catch((err) => console.log(err));
}

function renderProducts(products) {
  productList.innerHTML = "";
  products.forEach((product) => {
    const div = document.createElement("div");
    div.className = "product";
    div.innerHTML = `
      <h4>${product.title}</h4>
      <img src="${product.image}" alt="${product.title}">
      <p>$${product.price}</p>
      <button>Add to Cart</button>
    `;

    div.querySelector("button").addEventListener("click", () => {
      addToCart(product);
    });
    productList.appendChild(div);
  });
}

function addToCart(product) {
  cart.push(product);
  renderCart();
}
function renderCart() {
  cartDiv.innerHTML = "";
  let total = 0;
  cart.forEach((item) => {
    const div = document.createElement("div");
    div.className = "cart-item";
    div.textContent = `${item.title} - $${item.price}`;
    cartDiv.appendChild(div);
    total += item.price;
  });
  totalSpan.textContent = total.toFixed(2);
}
