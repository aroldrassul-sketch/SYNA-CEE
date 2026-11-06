const products = [
  // --- 8 HOODIES ---
  { id: 1, name: "SYNA World Hoodie — Black", category: "clothing", price: 90, image: "syna-hoodie-black.jpg", tag: "SYNA COLLECTION" },
  { id: 2, name: "SYNA World Hoodie — Yellow", category: "clothing", price: 90, image: "syna-hoodie-yellow.jpg", tag: "NEW DROP" },
  { id: 3, name: "SYNA World Hoodie — Grey Marl", category: "clothing", price: 90, image: "syna-hoodie-grey.jpg", tag: "BESTSELLER" },
  { id: 4, name: "SYNA World Hoodie — Olive Green", category: "clothing", price: 95, image: "syna-hoodie-olive.jpg", tag: "LIMITED" },
  { id: 5, name: "SYNA World Hoodie — Baby Blue", category: "clothing", price: 90, image: "syna-hoodie-blue.jpg", tag: "SYNA COLLECTION" },
  { id: 6, name: "SYNA World Hoodie — Red Edition", category: "clothing", price: 95, image: "syna-hoodie-red.jpg", tag: "HOT DROP" },
  { id: 7, name: "SYNA World Hoodie — Off White", category: "clothing", price: 90, image: "syna-hoodie-white.jpg", tag: "ESSENTIAL" },
  { id: 8, name: "SYNA World Zip Hoodie — Charcoal", category: "clothing", price: 100, image: "syna-ziphoodie-charcoal.jpg", tag: "NEW" },

  // --- 8 T-SHIRTS ---
  { id: 9, name: "SYNA Graphic Tee — Black/Pink", category: "clothing", price: 45, image: "syna-tee-black.jpg", tag: "POPULAR" },
  { id: 10, name: "SYNA Signature Tee — White", category: "clothing", price: 45, image: "syna-tee-white.jpg", tag: "ESSENTIAL" },
  { id: 11, name: "SYNA World Logo Tee — Grey", category: "clothing", price: 45, image: "syna-tee-grey.jpg", tag: "SYNA COLLECTION" },
  { id: 12, name: "SYNA Box Logo Tee — Olive", category: "clothing", price: 50, image: "syna-tee-olive.jpg", tag: "LIMITED" },
  { id: 13, name: "SYNA Vintage Wash Tee — Brown", category: "clothing", price: 55, image: "syna-tee-brown.jpg", tag: "VINTAGE EDIT" },
  { id: 14, name: "SYNA Street Tee — Navy", category: "clothing", price: 45, image: "syna-tee-navy.jpg", tag: "NEW DROP" },
  { id: 15, name: "SYNA CEE Core Tee — Pink", category: "clothing", price: 45, image: "syna-tee-pink.jpg", tag: "EXCLUSIVE" },
  { id: 16, name: "SYNA Statement Tee — Washed Black", category: "clothing", price: 50, image: "syna-tee-washedblack.jpg", tag: "BESTSELLER" },

  // --- 4 TRACKSUITS / JOGGERS ---
  { id: 17, name: "SYNA Tech Tracksuit — Black", category: "tracksuits", price: 160, image: "syna-tracksuit-black.jpg", tag: "SET" },
  { id: 18, name: "SYNA Fleece Joggers — Grey", category: "tracksuits", price: 75, image: "syna-joggers-grey.jpg", tag: "ESSENTIAL" },
  { id: 19, name: "SYNA World Tracksuit — Navy", category: "tracksuits", price: 160, image: "syna-tracksuit-navy.jpg", tag: "SET" },
  { id: 20, name: "SYNA Cargo Joggers — Olive", category: "tracksuits", price: 85, image: "syna-joggers-olive.jpg", tag: "NEW" },

  // --- 4 SNEAKERS ---
  { id: 21, name: "SYNA Street Runner — Triple Black", category: "sneakers", price: 140, image: "syna-sneaker-black.jpg", tag: "FOOTWEAR" },
  { id: 22, name: "SYNA Court Low — White/Pink", category: "sneakers", price: 130, image: "syna-sneaker-whitepink.jpg", tag: "HOT DROP" },
  { id: 23, name: "SYNA Runner — Grey/Silver", category: "sneakers", price: 145, image: "syna-sneaker-grey.jpg", tag: "POPULAR" },
  { id: 24, name: "SYNA High Top — Neon Accent", category: "sneakers", price: 155, image: "syna-sneaker-hightop.jpg", tag: "LIMITED" },

  // --- 4 ACCESSORIES ---
  { id: 25, name: "SYNA World Crossbody Bag — Black", category: "accessories", price: 40, image: "syna-bag-black.jpg", tag: "ESSENTIAL" },
  { id: 26, name: "SYNA Structured Cap — Pink/Black", category: "accessories", price: 30, image: "syna-cap-pink.jpg", tag: "HEADWEAR" },
  { id: 27, name: "SYNA Heavyweight Socks (3-Pack)", category: "accessories", price: 20, image: "syna-socks.jpg", tag: "PACK" },
  { id: 28, name: "SYNA World Balaclava — Black", category: "accessories", price: 35, image: "syna-balaclava.jpg", tag: "NEW DROP" }
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
