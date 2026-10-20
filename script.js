const products = [
  {id:1,name:"SYNA Logo Hoodie — Black",cat:"Clothing",price:59.99,img:"hoodie-black.jpg"},
  {id:2,name:"Oversized Hoodie — Grey",cat:"Clothing",price:59.99,img:"hoodie-grey.jpg"},
  {id:3,name:"Nike Tech Fleece Hoodie",cat:"Clothing",price:79.99,img:"tech-fleece.jpg"},
  {id:4,name:"Tech Fleece Sweatpants",cat:"Clothing",price:59.99,img:"sweatpants-black.jpg"},
  {id:5,name:"Black Tech Fleece Tracksuit",cat:"Clothing",price:149.99,img:"tracksuit-black.jpg"},
  {id:6,name:"Grey Tracksuit",cat:"Clothing",price:129.99,img:"tracksuit-grey.jpg"},
  {id:7,name:"Green Tracksuit",cat:"Clothing",price:129.99,img:"tracksuit-green.jpg"},
  {id:8,name:"Blue Tracksuit",cat:"Clothing",price:129.99,img:"tracksuit-blue.jpg"},
  {id:9,name:"Black Graphic T-Shirt",cat:"Clothing",price:34.99,img:"tshirt-black.jpg"},
  {id:10,name:"White Essential T-Shirt",cat:"Clothing",price:29.99,img:"tshirt-white.jpg"},
  {id:11,name:"Black Puffer Jacket",cat:"Clothing",price:119.99,img:"puffer-black.jpg"},
  {id:12,name:"Blue Puffer Jacket",cat:"Clothing",price:119.99,img:"puffer-blue.jpg"},
  {id:13,name:"Grey Track Jacket",cat:"Clothing",price:69.99,img:"jacket-grey.jpg"},
  {id:14,name:"Cargo Pants",cat:"Clothing",price:54.99,img:"cargo-pants.jpg"},
  {id:15,name:"Black Shorts",cat:"Clothing",price:39.99,img:"shorts-black.jpg"},
  {id:16,name:"Black Cap",cat:"Clothing",price:24.99,img:"cap-black.jpg"},
  {id:17,name:"Grey Beanie",cat:"Clothing",price:19.99,img:"beanie-grey.jpg"},
  {id:18,name:"Black Skull Cap",cat:"Clothing",price:19.99,img:"skull-cap.jpg"},
  {id:19,name:"Air Max 95 Style — Black",cat:"Shoes",price:119.99,img:"airmax95-black.jpg"},
  {id:20,name:"Air Max 95 Style — Grey",cat:"Shoes",price:124.99,img:"airmax95-grey.jpg"},
  {id:21,name:"Air Max 95 Style — Clay",cat:"Shoes",price:129.99,img:"airmax95-clay.jpg"},
  {id:22,name:"Air Force 1 Style — Black",cat:"Shoes",price:99.99,img:"airforce-black.jpg"},
  {id:23,name:"Air Force 1 Style — White",cat:"Shoes",price:89.99,img:"airforce-white.jpg"},
  {id:24,name:"Air Force 1 Style — Red",cat:"Shoes",price:99.99,img:"airforce-red.jpg"},
  {id:25,name:"Air Max 95 Style — Neon",cat:"Shoes",price:119.99,img:"airmax95-neon.jpg"}
];

let activeFilter = "All";
let cart = [];

function setFilter(category) {
  activeFilter = category;

  document.querySelectorAll(".filter").forEach(button => {
    button.classList.toggle(
      "active",
      button.dataset.filter === category
    );
  });

  renderProducts();
}

function renderProducts() {
  const search = document.getElementById("search").value.toLowerCase();

  const filtered = products.filter(product =>
    (activeFilter === "All" || product.cat === activeFilter) &&
    product.name.toLowerCase().includes(search)
  );

  document.getElementById("products").innerHTML = filtered.map(product => `
    <article class="product">
      <img
        class="product-image"
        src="images/${product.img}"
        alt="${product.name}"
        loading="lazy"
        onerror="this.onerror=null;this.src='https://placehold.co/600x700/202020/c6ff00?text=Upload+Photo'"
      >
      <div class="product-info">
        <div class="product-category">${product.cat}</div>
        <h3>${product.name}</h3>
        <div class="product-bottom">
          <span class="product-price">€${product.price.toFixed(2)}</span>
          <button class="add-button" onclick="addToCart(${product.id})">
            ADD +
          </button>
        </div>
      </div>
    </article>
  `).join("");
}

function addToCart(id) {
  const existing = cart.find(item => item.id === id);

  if (existing) {
    existing.qty++;
  } else {
    cart.push({id, qty:1});
  }

  updateCart();
  toggleCart(true);
}

function removeFromCart(id) {
  cart = cart.filter(item => item.id !== id);
  updateCart();
}

function updateCart() {
  document.getElementById("count").textContent =
    cart.reduce((sum, item) => sum + item.qty, 0);

  document.getElementById("cartItems").innerHTML = cart.length
    ? cart.map(item => {
        const product = products.find(p => p.id === item.id);

        return `
          <div class="cart-item">
            <img src="images/${product.img}" alt="${product.name}">
            <div class="cart-item-details">
              <strong>${product.name}</strong>
              <small>Qty: ${item.qty} · €${(product.price * item.qty).toFixed(2)}</small>
            </div>
            <button class="remove-button" onclick="removeFromCart(${product.id})">✕</button>
          </div>
        `;
      }).join("")
    : "<p>Your bag is empty.</p>";

  const total = cart.reduce((sum, item) => {
    const product = products.find(p => p.id === item.id);
    return sum + product.price * item.qty;
  }, 0);

  document.getElementById("total").textContent = total.toFixed(2);
}

function toggleCart(open) {
  document.getElementById("cart").classList.toggle("open", open);
}

function checkout() {
  if (cart.length === 0) {
    alert("Your bag is empty.");
    return;
  }

  alert("This is a demo checkout. A secure payment provider is needed for real payments.");
}

renderProducts();
updateCart();
