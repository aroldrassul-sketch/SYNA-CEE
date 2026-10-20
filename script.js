 const products = [
  { id: 1, name: "SYNA OG Tracksuit — Grey", category: "tracksuits", price: 180, image: "syna-grey.jpg", tag: "POPULAR" },
  { id: 2, name: "SYNA Logo Tracksuit — Black", category: "tracksuits", price: 180, image: "syna-black.jpg", tag: "ESSENTIAL" },
  { id: 3, name: "SYNA Tracksuit — Blue", category: "tracksuits", price: 180, image: "syna-blue.jpg" },
  { id: 4, name: "SYNA Tracksuit — Brown", category: "tracksuits", price: 185, image: "syna-brown.jpg" },
  { id: 5, name: "Nike x SYNA Tech Fleece — Black/Bronze", category: "tracksuits", price: 230, image: "syna-tech-fleece.jpg", tag: "COLLAB STYLE" },
  { id: 6, name: "SYNA Tracksuit — Red", category: "tracksuits", price: 180, image: "syna-red.jpg" },
  { id: 7, name: "Nike Tech Fleece — Black", category: "tracksuits", price: 150, image: "tech-fleece.jpg" },
  { id: 8, name: "SYNA Hoodie — Grey", category: "clothing", price: 90, image: "syna-hoodie-grey.jpg" },
  { id: 9, name: "SYNA Logo Hoodie — Black", category: "clothing", price: 90, image: "syna-hoodie-black.jpg" },
  { id: 10, name: "SYNA Graphic T-Shirt", category: "clothing", price: 55, image: "syna-tee.jpg" },
  { id: 11, name: "SYNA Puffer Jacket", category: "clothing", price: 200, image: "syna-puffer.jpg" },
  { id: 12, name: "SYNA Joggers — Black", category: "clothing", price: 75, image: "syna-joggers.jpg" },
  { id: 13, name: "Nike Air Max Plus TN — Triple Black", category: "sneakers", price: 190, image: "tn-black.jpg", tag: "TN" },
  { id: 14, name: "Nike Air Max Plus TN — Black/Blue", category: "sneakers", price: 190, image: "tn-blue.jpg" },
  { id: 15, name: "Nike Air Max Plus TN — White", category: "sneakers", price: 185, image: "tn-white.jpg" },
  { id: 16, name: "Nike Air Max 95 — Neon", category: "sneakers", price: 190, image: "air-max-95-neon.jpg" },
  { id: 17, name: "SYNA x Nike Air Max 95 — Black", category: "sneakers", price: 350, image: "syna-air-max-95.jpg", tag: "COLLAB STYLE" },
  { id: 18, name: "Air Jordan 4 Retro — Black Cat", category: "sneakers", price: 250, image: "jordan-4-black-cat.jpg" },
  { id: 19, name: "Air Jordan 4 Retro — Military Blue", category: "sneakers", price: 220, image: "jordan-4-blue.jpg" },
  { id: 20, name: "Air Jordan 4 Retro — White Cement", category: "sneakers", price: 230, image: "jordan-4-white.jpg" },
  { id: 21, name: "Nike Air Force 1 — White", category: "sneakers", price: 120, image: "air-force-white.jpg" },
  { id: 22, name: "Nike Air Force 1 — Black", category: "sneakers", price: 120, image: "air-force-black.jpg" },
  { id: 23, name: "SYNA Trucker Cap", category: "accessories", price: 40, image: "syna-cap.jpg" },
  { id: 24, name: "SYNA Beanie", category: "accessories", price: 35, image: "syna-beanie.jpg" },
  { id: 25, name: "SYNA Shoulder Bag", category: "accessories", price: 50, image: "syna-bag.jpg" }
];

const grid = document.getElementById("product-grid");
const cartPanel = document.getElementById("cart-panel");
const cartOverlay = document.getElementById("cart-overlay");
const cartCount = document.getElementById("cart-count");
const cartItems = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");

let cart = [];
let currentFilter = "all";

const euro = value => new Intl.NumberFormat("en-IE", {
  style: "currency", currency: "EUR"
}).format(value);

function renderProducts() {
  const visible = products.filter(product =>
    currentFilter === "all" || product.category === currentFilter
  );

  grid.innerHTML = visible.map(product => `
    <article class="product-card">
      <div class="product-image">
        <img src="images/${product.image}" alt="${product.name}"
          loading="lazy"
          onerror="this.style.display='none'; this.nextElementSibling.style.display='block'">
        <div class="image-fallback" style="display:none">
          Add photo:<br><strong>${product.image}</strong>
        </div>
        ${product.tag ? `<span class="tag">${product.tag}</span>` : ""}
      </div>
      <div class="product-info">
        <div class="product-category">${product.category}</div>
        <h3>${product.name}</h3>
        <div class="product-bottom">
          <span class="price">${euro(product.price)}</span>
          <button class="add-button" data-add="${product.id}">+ ADD TO BAG</button>
        </div>
      </div>
    </article>
  `).join("");
}

function addToCart(id) {
  const found = cart.find(item => item.id === id);
  if (found) found.quantity++;
  else cart.push({ id, quantity: 1 });
  renderCart();
}

function changeQuantity(id, amount) {
  const item = cart.find(item => item.id === id);
  if (!item) return;
  item.quantity += amount;
  if (item.quantity <= 0) cart = cart.filter(product => product.id !== id);
  renderCart();
}

function renderCart() {
  const count = cart.reduce((sum, item) => sum + item.quantity, 0);
  const total = cart.reduce((sum, item) => {
    const product = products.find(p => p.id === item.id);
    return sum + product.price * item.quantity;
  }, 0);

  cartCount.textContent = count;
  cartTotal.textContent = euro(total);

  if (cart.length === 0) {
    cartItems.innerHTML = '<p class="empty-cart">Your bag is empty. Find your next fit.</p>';
    return;
  }

  cartItems.innerHTML = cart.map(item => {
    const product = products.find(p => p.id === item.id);
    return `
      <div class="cart-item">
        <img class="cart-thumb" src="images/${product.image}" alt=""
          onerror="this.style.visibility='hidden'">
        <div class="cart-item-details">
          <h3>${product.name}</h3>
          <p>${euro(product.price)}</p>
          <div class="quantity-row">
            <button data-minus="${product.id}">−</button>
            <span>${item.quantity}</span>
            <button data-plus="${product.id}">+</button>
          </div>
          <button class="remove-button" data-remove="${product.id}">Remove</button>
        </div>
      </div>
    `;
  }).join("");
}

function openCart() {
  cartPanel.classList.add("open");
  cartOverlay.classList.add("open");
}
function closeCart() {
  cartPanel.classList.remove("open");
  cartOverlay.classList.remove("open");
}

document.addEventListener("click", event => {
  const add = event.target.closest("[data-add]");
  const plus = event.target.closest("[data-plus]");
  const minus = event.target.closest("[data-minus]");
  const remove = event.target.closest("[data-remove]");
  const filter = event.target.closest("[data-filter]");

  if (add) addToCart(Number(add.dataset.add));
  if (plus) changeQuantity(Number(plus.dataset.plus), 1);
  if (minus) changeQuantity(Number(minus.dataset.minus), -1);
  if (remove) cart = cart.filter(item => item.id !== Number(remove.dataset.remove)), renderCart();

  if (filter) {
    currentFilter = filter.dataset.filter;
    document.querySelectorAll(".filter").forEach(button =>
      button.classList.toggle("active", button === filter)
    );
    renderProducts();
  }
});

document.getElementById("cart-button").addEventListener("click", openCart);
document.getElementById("close-cart").addEventListener("click", closeCart);
cartOverlay.addEventListener("click", closeCart);

document.getElementById("checkout-button").addEventListener("click", () => {
  alert("This is a demo store. Online payments and checkout have not been connected yet.");
});

document.getElementById("year").textContent = new Date().getFullYear();

renderProducts();
renderCart();
