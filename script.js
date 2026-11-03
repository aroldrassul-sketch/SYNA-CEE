 const products = [
  {
    id: 1,
    name: "SYNA World Hoodie — Black",
    category: "clothing",
    price: 90,
    image: "images/syna-hoodie-black.webp",
    tag: "SYNA COLLECTION"
  },
  {
    id: 2,
    name: "SYNA World Hoodie — Yellow",
    category: "clothing",
    price: 90,
    image: "images/syna-hoodie-yellow.webp",
    tag: "NEW DROP"
  }
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
             onerror="this.alt='Photo not found'">
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
    cartItems.innerHTML =
      '<p class="empty-cart">Your bag is empty.</p>';
    return;
  }

  cartItems.innerHTML = cart.map(item => {
    const product = products.find(p => p.id === item.id);

    return `
      <div class="cart-item">
        <img class="cart-thumb" src="${product.image}" alt="">
        <div class="cart-item-details">
          <h3>${product.name}</h3>
          <p>${money(product.price)}</p>

          <div class="quantity-row">
            <button data-minus="${product.id}">−</button>
            <span>${item.quantity}</span>
            <button data-plus="${product.id}">+</button>
          </div>

          <button class="remove-button"
                  data-remove="${product.id}">
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
}

function changeQuantity(id, amount) {
  const item = cart.find(i => i.id === id);
  if (!item) return;

  item.quantity += amount;
  cart = cart.filter(i => i.quantity > 0);
  renderCart();
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
    currentFilter = filter.dataset.filter;

    document.querySelectorAll(".filter").forEach(button => {
      button.classList.toggle("active", button === filter);
    });

    renderProducts();
  }
});

function openCart() {
  cartPanel.classList.add("open");
  cartOverlay.classList.add("open");
}

function closeCart() {
  cartPanel.classList.remove("open");
  cartOverlay.classList.remove("open");
}

document.getElementById("cart-button").addEventListener("click", openCart);
document.getElementById("close-cart").addEventListener("click", closeCart);
cartOverlay.addEventListener("click", closeCart);

document.getElementById("checkout-button").addEventListener("click", () => {
  alert("This is a demo store. Payments are not connected yet.");
});

document.getElementById("year").textContent = new Date().getFullYear();

renderProducts();
renderCart();
