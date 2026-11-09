const products = [
  // --- 8 HOODIES ---
  { id: 1, name: "SYNA World Hoodie — Black/Pink", category: "clothing", price: 90, image: "Hoodie 1.webp", tag: "BESTSELLER" },
  { id: 2, name: "SYNA World Hoodie — Black Out", category: "clothing", price: 90, image: "Hoodie 2.webp", tag: "SYNA COLLECTION" },
  { id: 3, name: "SYNA World Hoodie — Black/Neon Green", category: "clothing", price: 90, image: "Hoodie 3.jpg", tag: "NEW DROP" },
  { id: 4, name: "SYNA Signature Sweatshirt — Black", category: "clothing", price: 85, image: "Hoodie 4.jpg", tag: "ESSENTIAL" },
  { id: 5, name: "SYNA World Hoodie — Red Hood Print", category: "clothing", price: 90, image: "Hoodie 5.jpg", tag: "LIMITED" },
  { id: 6, name: "SYNA World Hoodie — Electric Blue", category: "clothing", price: 95, image: "Hoodie 6.jpg", tag: "HOT DROP" },
  { id: 7, name: "SYNA World Hoodie — Grey/Pink", category: "clothing", price: 90, image: "Hoodie 7.jpg", tag: "ESSENTIAL" },
  { id: 8, name: "SYNA World Zip Hoodie — Royal Blue", category: "clothing", price: 100, image: "Hoodie 8.jpg", tag: "NEW" },
  // --- 8 T-SHIRTS ---
  { id: 9, name: "SYNA Graffiti Tee — Grey/Pink", category: "clothing", price: 45, image: "T-shirts 1.jpg", tag: "POPULAR" },
  { id: 10, name: "SYNA Side Logo Tee — Olive", category: "clothing", price: 45, image: "T-shirts 2.jpg", tag: "ESSENTIAL" },
  { id: 11, name: "SYNA Graffiti Tee — Black/Lime", category: "clothing", price: 45, image: "T-shirts 3.jpg", tag: "SYNA COLLECTION" },
  { id: 12, name: "SYNA Side Logo Tee — Blue", category: "clothing", price: 50, image: "T-shirts 4.jpg", tag: "LIMITED" },
  { id: 13, name: "SYNA Side Logo Tee — Grey/Charcoal", category: "clothing", price: 50, image: "T-shirts 5.jpg", tag: "VINTAGE EDIT" },
  { id: 14, name: "SYNA Side Logo Tee — Red/White", category: "clothing", price: 45, image: "T-shirts 6.jpg", tag: "NEW DROP" },
  { id: 15, name: "SYNA Graffiti Box Tee — White", category: "clothing", price: 45, image: "T-shirts 7.jpg", tag: "EXCLUSIVE" },
  { id: 16, name: "SYNA Side Logo Tee — Maroon", category: "clothing", price: 50, image: "T-shirts 8.jpg", tag: "BESTSELLER" },
  // --- 4 TRACKSUITS ---
  { id: 17, name: "SYNA Neon Graffiti Tracksuit — Black", category: "tracksuits", price: 160, image: "Tracksuits 1.jpg", tag: "SET" },
  { id: 18, name: "SYNA Tech Fleece Tracksuit — Black/Orange", category: "tracksuits", price: 170, image: "Tracksuits 2.jpg", tag: "ESSENTIAL" },
  { id: 19, name: "SYNA World Tracksuit — Sky Blue", category: "tracksuits", price: 160, image: "Tracksuits 3.jpg", tag: "SET" },
  { id: 20, name: "SYNA Cargo Tracksuit — Olive", category: "tracksuits", price: 165, image: "Tracksuits 4.jpg", tag: "NEW" },
  // --- 4 SNEAKERS ---
  { id: 21, name: "SYNA Air Force 1 — Burgundy Patent", category: "sneakers", price: 140, image: "Sneakers 1.jpg", tag: "FOOTWEAR" },
  { id: 22, name: "SYNA Air Force 1 — Blue & Yellow", category: "sneakers", price: 140, image: "Sneakers 2.jpg", tag: "HOT DROP" },
  { id: 23, name: "SYNA City Edition — Triple Black", category: "sneakers", price: 150, image: "Sneakers 3.jpg", tag: "POPULAR" },
  { id: 24, name: "SYNA Air Force 1 — Black & White", category: "sneakers", price: 140, image: "sneakers 4.jpg", tag: "LIMITED" },
  // --- 4 ACCESSORIES ---
  { id: 25, name: "SYNA Small Logo Beanie — Black", category: "accessories", price: 30, image: "Accessories 1.jpg", tag: "HEADWEAR" },
  { id: 26, name: "SYNA Giant Graphic Beanie — Black", category: "accessories", price: 35, image: "Accessories 2.jpg", tag: "NEW DROP" },
  { id: 27, name: "SYNA Signature Leather Belt Collection", category: "accessories", price: 65, image: "Accessories 3.jpg", tag: "EXCLUSIVE" },
  { id: 28, name: "SYNA Halo Snapback Cap — Black/Gold", category: "accessories", price: 40, image: "Accessories 4.jpg", tag: "HEADWEAR" }
];
const grid = document.getElementById("product-grid");
const cartPanel = document.getElementById("cart-panel");
const cartOverlay = document.getElementById("cart-overlay");
const cartCount = document.getElementById("cart-count");
const cartItems = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");
let cart = [];
let currentFilter = "all";
function money(value) {
  return new Intl.NumberFormat("en-IE", {
    style: "currency",
    currency: "EUR"
  }).format(value);
}
function renderProducts() {
  const visible = products.filter(product =>
    currentFilter === "all" || product.category === currentFilter
  );
  grid.innerHTML = visible.map(product => `
    <article class="product-card">
      <div class="product-image">
        <img src="${product.image}" alt="${product.name}"
             onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
        <div class="img-fallback" style="display:none; width:100%; height:100%; align-items:center; justify-content:center; color:#a3929d; font-size:0.8rem;">Photo not found</div>
        <span class="tag">${product.tag}</span>
      </div>
      <div class="product-info">
        <div class="product-category">SYNA WORLD</div>
        <h3>${product.name}</h3>

        <div class="product-bottom">
          <span class="price">${money(product.price)}</span>
          <button class="add-button" data-add="${product.id}">
            + ADD TO BAG
          </button>
        </div>
      </div>
    </article>
  `).join("");
}
function renderCart() {
  const count = cart.reduce((sum, item) => sum + item.quantity, 0);
  cartCount.textContent = count;
  const total = cart.reduce((sum, item) => {
    const product = products.find(p => p.id === item.id);
    return sum + product.price * item.quantity;
  }, 0);
  cartTotal.textContent = money(total);
  if (cart.length === 0) {
    cartItems.innerHTML = '<p style="color: var(--muted); text-align:center; padding: 2rem 0;">Your bag is empty.</p>';
    return;
  }
  cartItems.innerHTML = cart.map(item => {
    const product = products.find(p => p.id === item.id);
    return `
      <div class="cart-item">
        <h4 style="font-size: 0.95rem; margin-bottom: 0.2rem;">${product.name}</h4>
        <p style="color: var(--neon); font-weight:700; margin-bottom: 0.6rem; font-size: 0.9rem;">${money(product.price)}</p>

        <div style="display: flex; justify-content: space-between; align-items: center;">
          <div class="quantity-row" style="display: flex; gap: 0.6rem; align-items: center;">
            <button data-minus="${product.id}">−</button>
            <span style="font-weight:700; font-size: 0.9rem;">${item.quantity}</span>
            <button data-plus="${product.id}">+</button>
          </div>

          <button data-remove="${product.id}" style="color: var(--muted); background:none; border:none; cursor:pointer; font-size:0.75rem; text-decoration:underline;">
            Remove
          </button>
        </div>
      </div>
    `;
  }).join("");
}
function addToCart(id) {
  const item = cart.find(i => i.id === id);
  if (item) {
    item.quantity++;
  } else {
    cart.push({ id, quantity: 1 });
  }
  renderCart();
  openCart();
}
function changeQuantity(id, amount) {
  const item = cart.find(i => i.id === id);
  if (!item) return;
  item.quantity += amount;
  cart = cart.filter(i => i.quantity > 0);
  renderCart();
}
function setCategoryFilter(cat) {
  currentFilter = cat;
  document.querySelectorAll(".filter-btn").forEach(button => {
    button.classList.toggle("active", button.dataset.filter === cat);
  });
  renderProducts();
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
  if (remove) {
    cart = cart.filter(i => i.id !== Number(remove.dataset.remove));
    renderCart();
  }
  if (filter) {
    setCategoryFilter(filter.dataset.filter);
  }
});
function openCart() {
  cartPanel.classList.add("active");
  cartOverlay.classList.add("active");
}
function closeCart() {
  cartPanel.classList.remove("active");
  cartOverlay.classList.remove("active");
}
document.getElementById("cart-button").addEventListener("click", openCart);
document.getElementById("close-cart").addEventListener("click", closeCart);
cartOverlay.addEventListener("click", closeCart);
document.getElementById("checkout-button").addEventListener("click", () => {
  alert("Demo checkout system — connected to SYNA CEE.");
});
const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();
renderProducts();
renderCart();
