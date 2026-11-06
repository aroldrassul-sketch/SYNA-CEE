 const products = [
  // --- 8 HOODIES ---
  { id: 1, name: "SYNA World Hoodie — Black", category: "clothing", price: 90, image: "images/syna-hoodie-black.webp", tag: "SYNA COLLECTION" },
  { id: 2, name: "SYNA World Hoodie — Yellow", category: "clothing", price: 90, image: "images/syna-hoodie-yellow.webp", tag: "NEW DROP" },
  { id: 3, name: "SYNA World Hoodie — Grey Marl", category: "clothing", price: 90, image: "images/syna-hoodie-grey.webp", tag: "BESTSELLER" },
  { id: 4, name: "SYNA World Hoodie — Olive Green", category: "clothing", price: 95, image: "images/syna-hoodie-olive.webp", tag: "LIMITED" },
  { id: 5, name: "SYNA World Hoodie — Baby Blue", category: "clothing", price: 90, image: "images/syna-hoodie-blue.webp", tag: "SYNA COLLECTION" },
  { id: 6, name: "SYNA World Hoodie — Red Edition", category: "clothing", price: 95, image: "images/syna-hoodie-red.webp", tag: "HOT DROP" },
  { id: 7, name: "SYNA World Hoodie — Off White", category: "clothing", price: 90, image: "images/syna-hoodie-white.webp", tag: "ESSENTIAL" },
  { id: 8, name: "SYNA World Zip Hoodie — Charcoal", category: "clothing", price: 100, image: "images/syna-ziphoodie-charcoal.webp", tag: "NEW" },

  // --- 8 T-SHIRTS ---
  { id: 9, name: "SYNA Graphic Tee — Black/Pink", category: "clothing", price: 45, image: "images/syna-tee-black.webp", tag: "POPULAR" },
  { id: 10, name: "SYNA Signature Tee — White", category: "clothing", price: 45, image: "images/syna-tee-white.webp", tag: "ESSENTIAL" },
  { id: 11, name: "SYNA World Logo Tee — Grey", category: "clothing", price: 45, image: "images/syna-tee-grey.webp", tag: "SYNA COLLECTION" },
  { id: 12, name: "SYNA Box Logo Tee — Olive", category: "clothing", price: 50, image: "images/syna-tee-olive.webp", tag: "LIMITED" },
  { id: 13, name: "SYNA Vintage Wash Tee — Brown", category: "clothing", price: 55, image: "images/syna-tee-brown.webp", tag: "VINTAGE EDIT" },
  { id: 14, name: "SYNA Street Tee — Navy", category: "clothing", price: 45, image: "images/syna-tee-navy.webp", tag: "NEW DROP" },
  { id: 15, name: "SYNA CEE Core Tee — Pink", category: "clothing", price: 45, image: "images/syna-tee-pink.webp", tag: "EXCLUSIVE" },
  { id: 16, name: "SYNA Statement Tee — Washed Black", category: "clothing", price: 50, image: "images/syna-tee-washedblack.webp", tag: "BESTSELLER" },

  // --- 4 TRACKSUITS / JOGGERS ---
  { id: 17, name: "SYNA Tech Tracksuit — Black", category: "tracksuits", price: 160, image: "images/syna-tracksuit-black.webp", tag: "SET" },
  { id: 18, name: "SYNA Fleece Joggers — Grey", category: "tracksuits", price: 75, image: "images/syna-joggers-grey.webp", tag: "ESSENTIAL" },
  { id: 19, name: "SYNA World Tracksuit — Navy", category: "tracksuits", price: 160, image: "images/syna-tracksuit-navy.webp", tag: "SET" },
  { id: 20, name: "SYNA Cargo Joggers — Olive", category: "tracksuits", price: 85, image: "images/syna-joggers-olive.webp", tag: "NEW" },

  // --- 4 SNEAKERS ---
  { id: 21, name: "SYNA Street Runner — Triple Black", category: "sneakers", price: 140, image: "images/syna-sneaker-black.webp", tag: "FOOTWEAR" },
  { id: 22, name: "SYNA Court Low — White/Pink", category: "sneakers", price: 130, image: "images/syna-sneaker-whitepink.webp", tag: "HOT DROP" },
  { id: 23, name: "SYNA Runner — Grey/Silver", category: "sneakers", price: 145, image: "images/syna-sneaker-grey.webp", tag: "POPULAR" },
  { id: 24, name: "SYNA High Top — Neon Accent", category: "sneakers", price: 155, image: "images/syna-sneaker-hightop.webp", tag: "LIMITED" },

  // --- 4 ACCESSORIES ---
  { id: 25, name: "SYNA World Crossbody Bag — Black", category: "accessories", price: 40, image: "images/syna-bag-black.webp", tag: "ESSENTIAL" },
  { id: 26, name: "SYNA Structured Cap — Pink/Black", category: "accessories", price: 30, image: "images/syna-cap-pink.webp", tag: "HEADWEAR" },
  { id: 27, name: "SYNA Heavyweight Socks (3-Pack)", category: "accessories", price: 20, image: "images/syna-socks.webp", tag: "PACK" },
  { id: 28, name: "SYNA World Balaclava — Black", category: "accessories", price: 35, image: "images/syna-balaclava.webp", tag: "NEW DROP" }
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
