 const products = [
  {id:1,name:"SYNA Tracksuit - Grey",category:"tracksuits",price:180,image:"https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?w=600"},
  {id:2,name:"SYNA Tracksuit - Black",category:"tracksuits",price:180,image:"https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?w=600"},
  {id:3,name:"Streetwear Hoodie - Black",category:"clothing",price:90,image:"https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600"},
  {id:4,name:"Streetwear T-Shirt",category:"clothing",price:55,image:"https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600"},
  {id:5,name:"Puffer Jacket - Black",category:"clothing",price:200,image:"https://images.unsplash.com/photo-1544923246-77307dd654cb?w=600"},
  {id:6,name:"Black Joggers",category:"clothing",price:75,image:"https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?w=600"},
  {id:7,name:"Nike TN Style Sneakers",category:"sneakers",price:190,image:"https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600"},
  {id:8,name:"Retro High-Top Sneakers",category:"sneakers",price:230,image:"https://images.unsplash.com/photo-1552346154-21d32810aba3?w=600"},
  {id:9,name:"Streetwear Cap",category:"accessories",price:40,image:"https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=600"},
  {id:10,name:"Streetwear Trainers",category:"sneakers",price:150,image:"https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600"}
];
const grid = document.getElementById("product-grid");
const cartCount = document.getElementById("cart-count");
const cartItems = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");
const cartPanel = document.getElementById("cart-panel");
const cartOverlay = document.getElementById("cart-overlay");
let cart = [];
let currentFilter = "all";

function money(value) {
  return new Intl.NumberFormat("en-IE", {
    style: "currency",
    currency: "EUR"
  }).format(value);
}
function renderProducts() {
  const shown = products.filter(p =>
    currentFilter === "all" || p.category === currentFilter
  );
  grid.innerHTML = shown.map(p => `
    <article class="product-card">
      <div class="product-image">
        <img src="${p.image}" alt="${p.name}" loading="lazy"
          style="width:100%;height:100%;object-fit:cover"
          onerror="this.style.display='none';this.nextElementSibling.style.display='block'">
        <div class="image-fallback" style="display:none">Image unavailable</div>
      </div>
      <div class="product-info">
        <div class="product-category">${p.category}</div>
        <h3>${p.name}</h3>
        <div class="product-bottom">
          <span class="price">${money(p.price)}</span>
          <button class="add-button" data-add="${p.id}">+ ADD TO BAG</button>
        </div>
      </div>
    </article>
  `).join("");
}
function renderCart() {
  cartCount.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
  const total = cart.reduce((sum, item) => {
    const product = products.find(p => p.id === item.id);
    return sum + product.price * item.quantity;}, 0);
  cartTotal.textContent = money(total);
  if (cart.length === 0) {
    cartItems.innerHTML = '<p class="empty-cart">Your bag is empty.</p>';
    return;
  }
  cartItems.innerHTML = cart.map(item => {
    const p = products.find(product => product.id === item.id);
    return `
      <div class="cart-item">
        <img class="cart-thumb" src="${p.image}" alt="${p.name}">
        <div class="cart-item-details">
          <h3>${p.name}</h3>
          <p>${money(p.price)}</p>
          <div class="quantity-row">
            <button data-minus="${p.id}">−</button>
            <span>${item.quantity}</span>
            <button data-plus="${p.id}">+</button>
          </div>
          <button class="remove-button" data-remove="${p.id}">Remove</button>
        </div>
      </div>
    `;
  }).join("");
}
function addToCart(id) {
  const item = cart.find(i => i.id === id);
  if (item) item.quantity++;
  else cart.push({id, quantity: 1});
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
  const button = event.target.closest("button");
  if (!button) return;
  if (button.dataset.add) addToCart(Number(button.dataset.add));
  if (button.dataset.plus) changeQuantity(Number(button.dataset.plus), 1);
  if (button.dataset.minus) changeQuantity(Number(button.dataset.minus), -1);
  if (button.dataset.remove) {
    cart = cart.filter(i => i.id !== Number(button.dataset.remove));
    renderCart();
  }
  if (button.dataset.filter) {
    currentFilter = button.dataset.filter;
    document.querySelectorAll(".filter").forEach(b =>
      b.classList.toggle("active", b === button)
    );
    renderProducts();
  }
});
document.getElementById("cart-button").addEventListener("click", () => {
  cartPanel.classList.add("open");
  cartOverlay.classList.add("open");
});
function closeCart() {
  cartPanel.classList.remove("open");
  cartOverlay.classList.remove("open");
}
document.getElementById("close-cart").addEventListener("click", closeCart);
cartOverlay.addEventListener("click", closeCart);
document.getElementById("checkout-button").addEventListener("click", () => {
  alert("Demo shop only. Payments are not connected.");
});
document.getElementById("year").textContent = new Date().getFullYear();
renderProducts();
renderCart();
