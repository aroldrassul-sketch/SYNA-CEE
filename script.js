const products = [
  {id:1,name:"SYNA Logo Hoodie — Black",cat:"Clothing",price:59.99,img:"https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=800&q=85"},
  {id:2,name:"Oversized Hoodie — Grey",cat:"Clothing",price:59.99,img:"https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=800&q=85"},
  {id:3,name:"Tech Fleece Hoodie",cat:"Clothing",price:79.99,img:"https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=800&q=85"},
  {id:4,name:"Tech Fleece Sweatpants",cat:"Clothing",price:59.99,img:"https://images.unsplash.com/photo-1552902865-b72c031ac5ea?auto=format&fit=crop&w=800&q=85"},
  {id:5,name:"Black Tracksuit",cat:"Clothing",price:149.99,img:"https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?auto=format&fit=crop&w=800&q=85"},
  {id:6,name:"Grey Tracksuit",cat:"Clothing",price:129.99,img:"https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?auto=format&fit=crop&w=800&q=85"},
  {id:7,name:"Green Tracksuit",cat:"Clothing",price:129.99,img:"https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?auto=format&fit=crop&w=800&q=85"},
  {id:8,name:"Blue Tracksuit",cat:"Clothing",price:129.99,img:"https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?auto=format&fit=crop&w=800&q=85"},
  {id:9,name:"Black Graphic T-Shirt",cat:"Clothing",price:34.99,img:"https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=800&q=85"},
  {id:10,name:"White Essential T-Shirt",cat:"Clothing",price:29.99,img:"https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=800&q=85"},
  {id:11,name:"Black Puffer Jacket",cat:"Clothing",price:119.99,img:"https://images.unsplash.com/photo-1544923246-77307dd654cb?auto=format&fit=crop&w=800&q=85"},
  {id:12,name:"Blue Puffer Jacket",cat:"Clothing",price:119.99,img:"https://images.unsplash.com/photo-1544923246-77307dd654cb?auto=format&fit=crop&w=800&q=85"},
  {id:13,name:"Track Jacket",cat:"Clothing",price:69.99,img:"https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?auto=format&fit=crop&w=800&q=85"},
  {id:14,name:"Cargo Pants",cat:"Clothing",price:54.99,img:"https://images.unsplash.com/photo-1517445312882-bc9910d016b7?auto=format&fit=crop&w=800&q=85"},
  {id:15,name:"Black Shorts",cat:"Clothing",price:39.99,img:"https://images.unsplash.com/photo-1503341504253-dff4815485f1?auto=format&fit=crop&w=800&q=85"},
  {id:16,name:"Black Streetwear Cap",cat:"Clothing",price:24.99,img:"https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&w=800&q=85"},
  {id:17,name:"Grey Beanie",cat:"Clothing",price:19.99,img:"https://images.unsplash.com/photo-1576871337622-98d48d1cf531?auto=format&fit=crop&w=800&q=85"},
  {id:18,name:"Black Skull Cap",cat:"Clothing",price:19.99,img:"https://images.unsplash.com/photo-1576871337622-98d48d1cf531?auto=format&fit=crop&w=800&q=85"},
  {id:19,name:"Air Max 95 Style — Black",cat:"Shoes",price:119.99,img:"https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=85"},
  {id:20,name:"Air Max 95 Style — Grey",cat:"Shoes",price:124.99,img:"https://images.unsplash.com/photo-1495555961986-6d4c1ecb7be3?auto=format&fit=crop&w=800&q=85"},
  {id:21,name:"Air Max 95 Style — Clay",cat:"Shoes",price:129.99,img:"https://images.unsplash.com/photo-1460353581641-37baddab0fa2?auto=format&fit=crop&w=800&q=85"},
  {id:22,name:"Air Force Style — Black",cat:"Shoes",price:99.99,img:"https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&w=800&q=85"},
  {id:23,name:"Air Force Style — White",cat:"Shoes",price:89.99,img:"https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&w=800&q=85"},
  {id:24,name:"Air Force Style — Red",cat:"Shoes",price:99.99,img:"https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=800&q=85"},
  {id:25,name:"Air Max 95 Style — Neon",cat:"Shoes",price:119.99,img:"https://images.unsplash.com/photo-1539185441755-769473a23570?auto=format&fit=crop&w=800&q=85"}
];

let activeFilter = "All";
let cart = [];

function setFilter(category) {
  activeFilter = category;

  document.querySelectorAll(".filter").forEach(button => {
    button.classList.toggle("active", button.dataset.filter === category);
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
      <img class="product-image"
        src="${product.img}"
        alt="${product.name}"
        loading="lazy"
        onerror="this.onerror=null;this.src='https://placehold.co/600x700/202020/c6ff00?text=Photo+Unavailable'">

      <div class="product-info">
        <div class="product-category">${product.cat}</div>
        <h3>${product.name}</h3>
        <div class="product-bottom">
          <span class="product-price">€${product.price.toFixed(2)}</span>
          <button class="add-button" onclick="addToCart(${product.id})">ADD +</button>
        </div>
      </div>
    </article>
  `).join("");
}

function addToCart(id) {
  const item = cart.find(product => product.id === id);

  if (item) {
    item.qty++;
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
            <img src="${product.img}" alt="${product.name}">
            <div class="cart-item-details">
              <strong>${product.name}</strong>
              <small>Qty: ${item.qty} · €${(product.price * item.qty).toFixed(2)}</small>
            </div>
            <button class="remove-button" onclick="removeFromCart(${product.id})">✕</button>
          </div>
        `;
      }).join("")
    : "<p>Your bag is empty.</p>";

  const total = cart.reduce((sum, item) =>
    sum + products.find(p => p.id === item.id).price * item.qty, 0);

  document.getElementById("total").textContent = total.toFixed(2);
}

function toggleCart(open) {
  document.getElementById("cart").classList.toggle("open", open);
}

function checkout() {
  if (!cart.length) {
    alert("Your bag is empty.");
    return;
  }

  alert("Demo checkout only. A payment provider is needed for real payments.");
}

renderProducts();
updateCart();
