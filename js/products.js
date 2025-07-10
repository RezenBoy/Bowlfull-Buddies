
// Sample products data
const products = [
    {
        id: 1,
        name: "Premium Dog Treats",
        category: "dogs",
        type: "food",
        price: 24.99,
        rating: 5,
        emoji: "🦴",
        gradient: "linear-gradient(45deg, #ffeaa7, #fab1a0)",
        badge: "Best Seller"
    },
    {
        id: 2,
        name: "Interactive Cat Toy",
        category: "cats",
        type: "toys",
        type: "toys",
        price: 14.99,
        rating: 4,
        emoji: "🐭",
        gradient: "linear-gradient(45deg, #a29bfe, #74b9ff)",
        badge: "Hot"
    },
    {
        id: 3,
        name: "Dog Collar",
        category: "dogs",
        type: "accessories",
        price: 9.99,
        rating: 3,
        emoji: "🎽",
        gradient: "linear-gradient(45deg, #55efc4, #81ecec)",
        badge: "New"
    },
    {
        id: 4,
        name: "Cat Food Pack",
        category: "cats",
        type: "food",
        price: 19.99,
        rating: 5,
        emoji: "🥫",
        gradient: "linear-gradient(45deg, #ffeaa7, #fd79a8)",
        badge: "Bestseller"
    },
    {
        id: 5,
        name: "Chew Toy",
        category: "dogs",
        type: "toys",
        price: 7.99,
        rating: 4,
        emoji: "🧸",
        gradient: "linear-gradient(45deg, #e17055, #fdcb6e)",
        badge: "Fun"
    },
    {
        id: 6,
        name: "Cat Collar",
        category: "cats",
        type: "accessories",
        price: 8.99,
        rating: 4,
        emoji: "🎀",
        gradient: "linear-gradient(45deg, #fab1a0, #ff7675)",
        badge: "Trending"
    }
];

let filteredProducts = [...products];
let currentPage = 1;
const itemsPerPage = 4;

function renderProducts() {
    const grid = document.getElementById("products-grid");
    grid.innerHTML = "";

    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const currentItems = filteredProducts.slice(start, end);

    currentItems.forEach(product => {
        const card = document.createElement("div");
        card.className = "col-md-6 col-lg-4 col-xl-3 mb-4";
        card.innerHTML = `
          <div class="product-card h-100">
            <div class="product-image" style="background: ${product.gradient}">
              ${product.emoji}
              <span class="product-badge">${product.badge}</span>
            </div>
            <div class="card-body">
              <h5 class="product-title">${product.name}</h5>
              <p class="product-category">${product.category} / ${product.type}</p>
              <div class="product-rating">${'★'.repeat(product.rating)}${'☆'.repeat(5 - product.rating)}</div>
              <div class="product-price">₹${product.price.toFixed(2)}</div>
              <button class="btn-cart bounce-hover"><i class="fas fa-cart-plus"></i> Add to Cart</button>
            </div>
          </div>
        `;
        grid.appendChild(card);
    });

    renderPagination();
}

function filterProducts(filter) {
    document.querySelectorAll(".filter-btn").forEach(btn => btn.classList.remove("active"));
    event.target.classList.add("active");

    if (filter === 'all') {
        filteredProducts = [...products];
    } else {
        filteredProducts = products.filter(p => p.category === filter || p.type === filter);
    }

    currentPage = 1;
    renderProducts();
}

function sortProducts(value) {
    switch (value) {
        case "name":
            filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
            break;
        case "price-low":
            filteredProducts.sort((a, b) => a.price - b.price);
            break;
        case "price-high":
            filteredProducts.sort((a, b) => b.price - a.price);
            break;
        case "rating":
            filteredProducts.sort((a, b) => b.rating - a.rating);
            break;
    }
    renderProducts();
}

function renderPagination() {
    const pagination = document.getElementById("pagination");
    pagination.innerHTML = "";

    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
    for (let i = 1; i <= totalPages; i++) {
        const li = document.createElement("li");
        li.className = "page-item";
        const btn = document.createElement("button");
        btn.className = `page-link ${i === currentPage ? "active" : ""}`;
        btn.innerText = i;
        btn.onclick = () => {
            currentPage = i;
            renderProducts();
        };
        li.appendChild(btn);
        pagination.appendChild(li);
    }
}

// Initial Render
window.onload = renderProducts;
