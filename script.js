// Bowlfull Buddies E-commerce JavaScript

// Sample product data
const products = [
  {
    id: 1,
    name: "Premium Dog Food",
    price: 29.99,
    category: "dogs",
    type: "food",
    image: "/placeholder.svg?height=300&width=300",
    description: "High-quality nutrition for your dog with real chicken and vegetables.",
    specs: [
      "Real chicken as first ingredient",
      "No artificial preservatives",
      "Supports healthy digestion",
      "Made in USA",
    ],
  },
  {
    id: 2,
    name: "Interactive Cat Toy",
    price: 15.99,
    category: "cats",
    type: "toys",
    image: "/placeholder.svg?height=300&width=300",
    description: "Keep your cat entertained for hours with this interactive feather toy.",
    specs: ["Battery operated", "Multiple play modes", "Safe materials", "Easy to clean"],
  },
  {
    id: 3,
    name: "Dog Chew Bone",
    price: 12.99,
    category: "dogs",
    type: "toys",
    image: "/placeholder.svg?height=300&width=300",
    description: "Durable chew bone that helps clean teeth and reduce tartar buildup.",
    specs: ["Long-lasting", "Dental health benefits", "Natural ingredients", "Various sizes available"],
  },
  {
    id: 4,
    name: "Cat Scratching Post",
    price: 45.99,
    category: "cats",
    type: "furniture",
    image: "/placeholder.svg?height=300&width=300",
    description: "Tall scratching post with multiple levels and hanging toys.",
    specs: ["36 inches tall", "Stable base", "Sisal rope covering", "Assembly required"],
  },
  {
    id: 5,
    name: "Dog Leash & Collar Set",
    price: 24.99,
    category: "dogs",
    type: "accessories",
    image: "/placeholder.svg?height=300&width=300",
    description: "Matching leash and collar set made from durable nylon material.",
    specs: ["Adjustable collar", "6-foot leash", "Reflective stitching", "Multiple colors"],
  },
  {
    id: 6,
    name: "Cat Litter Box",
    price: 34.99,
    category: "cats",
    type: "accessories",
    image: "/placeholder.svg?height=300&width=300",
    description: "Self-cleaning litter box with odor control technology.",
    specs: ["Self-cleaning mechanism", "Odor control", "Easy maintenance", "Large capacity"],
  },
  {
    id: 7,
    name: "Dog Training Treats",
    price: 8.99,
    category: "dogs",
    type: "food",
    image: "/placeholder.svg?height=300&width=300",
    description: "Small, soft training treats perfect for positive reinforcement.",
    specs: ["Bite-sized", "High-value reward", "Natural ingredients", "Resealable bag"],
  },
  {
    id: 8,
    name: "Cat Water Fountain",
    price: 39.99,
    category: "cats",
    type: "accessories",
    image: "/placeholder.svg?height=300&width=300",
    description: "Automatic water fountain encourages cats to drink more water.",
    specs: ["Continuous circulation", "Replaceable filters", "Quiet operation", "1.5L capacity"],
  },
]

// Shopping cart
let cart = JSON.parse(localStorage.getItem("cart")) || []

// Wishlist
let wishlist = JSON.parse(localStorage.getItem("wishlist")) || []

// DOM Content Loaded
document.addEventListener("DOMContentLoaded", () => {
  updateCartCount()
  initializePage()
  setupEventListeners()
})

// Initialize page-specific content
function initializePage() {
  const currentPage = window.location.pathname.split("/").pop() || "index.html"

  switch (currentPage) {
    case "index.html":
    case "":
      loadFeaturedProducts()
      break
    case "products.html":
      loadAllProducts()
      setupFilters()
      handleSearchFromURL()
      break
    case "product-detail.html":
      loadProductDetail()
      break
    case "cart.html":
      loadCartItems()
      break
    case "checkout.html":
      loadCheckoutSummary()
      break
    case "wishlist.html":
      loadWishlistItems()
      break
  }

  setupSearch()
  updateWishlistCount()
}

// Setup event listeners
function setupEventListeners() {
  // Newsletter form
  const newsletterForm = document.querySelector(".newsletter-form")
  if (newsletterForm) {
    newsletterForm.addEventListener("submit", handleNewsletterSubmit)
  }

  // Contact form
  const contactForm = document.getElementById("contact-form")
  if (contactForm) {
    contactForm.addEventListener("submit", handleContactSubmit)
  }

  // Login form
  const loginForm = document.getElementById("login-form")
  if (loginForm) {
    loginForm.addEventListener("submit", handleLoginSubmit)
  }

  // Register form
  const registerForm = document.getElementById("register-form")
  if (registerForm) {
    registerForm.addEventListener("submit", handleRegisterSubmit)
  }

  // Checkout form
  const checkoutForm = document.getElementById("checkout-form")
  if (checkoutForm) {
    checkoutForm.addEventListener("submit", handleCheckoutSubmit)
  }

  // Shipping address toggle
  const sameAsBilling = document.getElementById("sameAsBilling")
  if (sameAsBilling) {
    sameAsBilling.addEventListener("change", toggleShippingForm)
  }

  // Promo code
  const applyPromo = document.getElementById("apply-promo")
  if (applyPromo) {
    applyPromo.addEventListener("click", applyPromoCode)
  }
}

// Load featured products for homepage
function loadFeaturedProducts() {
  const featuredContainer = document.getElementById("featured-products")
  if (!featuredContainer) return

  const featuredProducts = products.slice(0, 4)
  featuredContainer.innerHTML = featuredProducts.map((product) => createProductCard(product)).join("")
}

// Load all products for products page
function loadAllProducts() {
  const productsGrid = document.getElementById("products-grid")
  if (!productsGrid) return

  displayProducts(products)
  updateProductCount(products.length)
}

// Create product card HTML
function createProductCard(product) {
  const isInWishlist = wishlist.some((item) => item.id === product.id)

  return `
    <div class="col-md-6 col-lg-3">
      <div class="card product-card border-0 shadow-sm h-100 hover-lift">
        <div class="product-image">
          <img src="${product.image}" class="card-img-top" alt="${product.name}" style="height: 200px; object-fit: cover;">
        </div>
        <div class="card-body d-flex flex-column">
          <h5 class="card-title">${product.name}</h5>
          <p class="card-text text-muted flex-grow-1">${product.description}</p>
          <div class="d-flex justify-content-between align-items-center mt-auto">
            <span class="h5 text-primary mb-0">$${product.price}</span>
            <div class="btn-group">
              <button class="btn btn-outline-primary btn-sm" onclick="viewProduct(${product.id})">
                <i class="bi bi-eye"></i>
              </button>
              <button class="btn ${isInWishlist ? "btn-warning" : "btn-outline-warning"} btn-sm" onclick="${isInWishlist ? `removeFromWishlist(${product.id})` : `addToWishlist(${product.id})`}">
                <i class="bi bi-heart${isInWishlist ? "-fill" : ""}"></i>
              </button>
              <button class="btn btn-primary btn-sm" onclick="addToCart(${product.id})">
                <i class="bi bi-cart-plus"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
}

// Display products in grid
function displayProducts(productsToShow) {
  const productsGrid = document.getElementById("products-grid")
  if (!productsGrid) return

  productsGrid.innerHTML = productsToShow.map((product) => createProductCard(product)).join("")
}

// Setup filters for products page
function setupFilters() {
  const categoryFilters = document.querySelectorAll('input[name="category"]')
  const priceFilters = document.querySelectorAll('input[name="price"]')
  const sortSelect = document.getElementById("sort-select")
  const clearFilters = document.getElementById("clear-filters")

  categoryFilters.forEach((filter) => {
    filter.addEventListener("change", applyFilters)
  })

  priceFilters.forEach((filter) => {
    filter.addEventListener("change", applyFilters)
  })

  if (sortSelect) {
    sortSelect.addEventListener("change", applyFilters)
  }

  if (clearFilters) {
    clearFilters.addEventListener("click", clearAllFilters)
  }

  // Check URL parameters for initial filters
  const urlParams = new URLSearchParams(window.location.search)
  const category = urlParams.get("category")
  if (category) {
    const categoryFilter = document.getElementById(category)
    if (categoryFilter) {
      categoryFilter.checked = true
      applyFilters()
    }
  }
}

// Apply filters
function applyFilters() {
  const selectedCategory = document.querySelector('input[name="category"]:checked')?.value || "all"
  const selectedPrice = document.querySelector('input[name="price"]:checked')?.value || "all"
  const sortBy = document.getElementById("sort-select")?.value || "name"

  let filteredProducts = [...products]

  // Filter by category
  if (selectedCategory !== "all") {
    filteredProducts = filteredProducts.filter((product) => product.category === selectedCategory)
  }

  // Filter by price
  if (selectedPrice !== "all") {
    const [min, max] = selectedPrice.split("-").map(Number)
    filteredProducts = filteredProducts.filter((product) => product.price >= min && product.price <= max)
  }

  // Sort products
  filteredProducts.sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price
      case "price-high":
        return b.price - a.price
      case "name":
      default:
        return a.name.localeCompare(b.name)
    }
  })

  displayProducts(filteredProducts)
  updateProductCount(filteredProducts.length)
}

// Clear all filters
function clearAllFilters() {
  document.getElementById("all").checked = true
  document.getElementById("all-prices").checked = true
  document.getElementById("sort-select").value = "name"
  applyFilters()
}

// Update product count display
function updateProductCount(count) {
  const productCount = document.getElementById("product-count")
  if (productCount) {
    productCount.textContent = `Showing ${count} product${count !== 1 ? "s" : ""}`
  }
}

// View product detail
function viewProduct(productId) {
  window.location.href = `product-detail.html?id=${productId}`
}

// Load product detail page
function loadProductDetail() {
  const urlParams = new URLSearchParams(window.location.search)
  const productId = Number.parseInt(urlParams.get("id"))
  const product = products.find((p) => p.id === productId)

  if (!product) {
    document.getElementById("product-detail").innerHTML =
      '<div class="col-12"><p class="text-center">Product not found.</p></div>'
    return
  }

  // Update breadcrumb
  const breadcrumb = document.getElementById("product-breadcrumb")
  if (breadcrumb) {
    breadcrumb.textContent = product.name
  }

  // Load product detail
  const productDetail = document.getElementById("product-detail")
  if (productDetail) {
    productDetail.innerHTML = `
            <div class="col-lg-6">
                <div class="product-detail-image">
                    <img src="${product.image}" class="img-fluid" alt="${product.name}">
                </div>
            </div>
            <div class="col-lg-6">
                <div class="product-info">
                    <h1 class="display-6 fw-bold mb-3">${product.name}</h1>
                    <p class="lead text-muted mb-4">${product.description}</p>
                    <div class="price mb-4">
                        <span class="h2 text-primary">$${product.price}</span>
                    </div>
                    
                    <div class="quantity-section mb-4">
                        <label for="quantity" class="form-label fw-bold">Quantity:</label>
                        <div class="input-group quantity-selector">
                            <button class="btn btn-outline-secondary" type="button" onclick="changeQuantity(-1)">-</button>
                            <input type="number" class="form-control text-center" id="quantity" value="1" min="1" max="10">
                            <button class="btn btn-outline-secondary" type="button" onclick="changeQuantity(1)">+</button>
                        </div>
                    </div>
                    
                    <div class="actions mb-4">
                        <button class="btn btn-primary btn-lg me-3" onclick="addToCartWithQuantity(${product.id})">
                            <i class="bi bi-cart-plus me-2"></i>Add to Cart
                        </button>
                        <button class="btn btn-outline-primary btn-lg">
                            <i class="bi bi-heart me-2"></i>Add to Wishlist
                        </button>
                    </div>
                    
                    <div class="product-specs">
                        <h5 class="fw-bold mb-3">Product Features:</h5>
                        <ul class="list-unstyled">
                            ${product.specs.map((spec) => `<li><i class="bi bi-check-circle text-success me-2"></i>${spec}</li>`).join("")}
                        </ul>
                    </div>
                </div>
            </div>
        `
  }

  // Load related products
  loadRelatedProducts(product.category, product.id)
}

// Load related products
function loadRelatedProducts(category, excludeId) {
  const relatedContainer = document.getElementById("related-products")
  if (!relatedContainer) return

  const relatedProducts = products.filter((p) => p.category === category && p.id !== excludeId).slice(0, 4)

  relatedContainer.innerHTML = relatedProducts.map((product) => createProductCard(product)).join("")
}

// Change quantity in product detail
function changeQuantity(change) {
  const quantityInput = document.getElementById("quantity")
  if (!quantityInput) return

  const currentValue = Number.parseInt(quantityInput.value)
  const newValue = Math.max(1, Math.min(10, currentValue + change))
  quantityInput.value = newValue
}

// Add to cart with quantity
function addToCartWithQuantity(productId) {
  const quantityInput = document.getElementById("quantity")
  const quantity = quantityInput ? Number.parseInt(quantityInput.value) : 1

  for (let i = 0; i < quantity; i++) {
    addToCart(productId)
  }
}

// Add to cart
function addToCart(productId) {
  const product = products.find((p) => p.id === productId)
  if (!product) return

  const existingItem = cart.find((item) => item.id === productId)

  if (existingItem) {
    existingItem.quantity += 1
  } else {
    cart.push({
      ...product,
      quantity: 1,
    })
  }

  localStorage.setItem("cart", JSON.stringify(cart))
  updateCartCount()
  showToast(`${product.name} added to cart!`)
}

// Update cart count in navigation
function updateCartCount() {
  const cartCount = document.getElementById("cart-count")
  if (cartCount) {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0)
    cartCount.textContent = totalItems
  }
}

// Load cart items
function loadCartItems() {
  const cartItemsContainer = document.getElementById("cart-items")
  const emptyCart = document.getElementById("empty-cart")

  if (cart.length === 0) {
    if (cartItemsContainer) cartItemsContainer.style.display = "none"
    if (emptyCart) emptyCart.style.display = "block"
    return
  }

  if (cartItemsContainer) cartItemsContainer.style.display = "block"
  if (emptyCart) emptyCart.style.display = "none"

  if (cartItemsContainer) {
    cartItemsContainer.innerHTML = cart.map((item) => createCartItemHTML(item)).join("")
  }

  updateCartSummary()
}

// Create cart item HTML
function createCartItemHTML(item) {
  return `
        <div class="cart-item">
            <div class="row align-items-center">
                <div class="col-md-2">
                    <img src="${item.image}" class="cart-item-image" alt="${item.name}">
                </div>
                <div class="col-md-4">
                    <h6 class="mb-1">${item.name}</h6>
                    <small class="text-muted">${item.description}</small>
                </div>
                <div class="col-md-2">
                    <span class="fw-bold">$${item.price}</span>
                </div>
                <div class="col-md-2">
                    <div class="input-group input-group-sm">
                        <button class="btn btn-outline-secondary" onclick="updateCartQuantity(${item.id}, -1)">-</button>
                        <input type="text" class="form-control text-center" value="${item.quantity}" readonly>
                        <button class="btn btn-outline-secondary" onclick="updateCartQuantity(${item.id}, 1)">+</button>
                    </div>
                </div>
                <div class="col-md-2 text-end">
                    <div class="fw-bold mb-2">$${(item.price * item.quantity).toFixed(2)}</div>
                    <button class="btn btn-outline-danger btn-sm" onclick="removeFromCart(${item.id})">
                        <i class="bi bi-trash"></i>
                    </button>
                </div>
            </div>
        </div>
    `
}

// Update cart quantity
function updateCartQuantity(productId, change) {
  const item = cart.find((item) => item.id === productId)
  if (!item) return

  item.quantity = Math.max(1, item.quantity + change)
  localStorage.setItem("cart", JSON.stringify(cart))
  loadCartItems()
  updateCartCount()
}

// Remove from cart
function removeFromCart(productId) {
  cart = cart.filter((item) => item.id !== productId)
  localStorage.setItem("cart", JSON.stringify(cart))
  loadCartItems()
  updateCartCount()
  showToast("Item removed from cart")
}

// Update cart summary
function updateCartSummary() {
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const tax = subtotal * 0.085 // 8.5% tax
  const shipping = subtotal > 50 ? 0 : 5.99 // Free shipping over $50
  const total = subtotal + tax + shipping

  // Update cart page summary
  const subtotalEl = document.getElementById("subtotal")
  const taxEl = document.getElementById("tax")
  const shippingEl = document.getElementById("shipping")
  const totalEl = document.getElementById("total")

  if (subtotalEl) subtotalEl.textContent = `$${subtotal.toFixed(2)}`
  if (taxEl) taxEl.textContent = `$${tax.toFixed(2)}`
  if (shippingEl) shippingEl.textContent = shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`
  if (totalEl) totalEl.textContent = `$${total.toFixed(2)}`

  // Update checkout page summary
  const checkoutSubtotal = document.getElementById("checkout-subtotal")
  const checkoutTax = document.getElementById("checkout-tax")
  const checkoutShipping = document.getElementById("checkout-shipping")
  const checkoutTotal = document.getElementById("checkout-total")

  if (checkoutSubtotal) checkoutSubtotal.textContent = `$${subtotal.toFixed(2)}`
  if (checkoutTax) checkoutTax.textContent = `$${tax.toFixed(2)}`
  if (checkoutShipping) checkoutShipping.textContent = shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`
  if (checkoutTotal) checkoutTotal.textContent = `$${total.toFixed(2)}`
}

// Load checkout summary
function loadCheckoutSummary() {
  const checkoutItems = document.getElementById("checkout-items")
  if (!checkoutItems) return

  if (cart.length === 0) {
    checkoutItems.innerHTML = '<p class="text-muted">No items in cart</p>'
    return
  }

  checkoutItems.innerHTML = cart
    .map(
      (item) => `
        <div class="d-flex justify-content-between align-items-center mb-2">
            <div>
                <h6 class="mb-0">${item.name}</h6>
                <small class="text-muted">Qty: ${item.quantity}</small>
            </div>
            <span>$${(item.price * item.quantity).toFixed(2)}</span>
        </div>
    `,
    )
    .join("")

  updateCartSummary()
}

// Toggle shipping form
function toggleShippingForm() {
  const shippingForm = document.getElementById("shipping-form")
  const sameAsBilling = document.getElementById("sameAsBilling")

  if (shippingForm && sameAsBilling) {
    shippingForm.style.display = sameAsBilling.checked ? "none" : "block"
  }
}

// Apply promo code
function applyPromoCode() {
  const promoCode = document.getElementById("promo-code").value.trim().toUpperCase()

  // Sample promo codes
  const promoCodes = {
    SAVE10: 0.1,
    WELCOME: 0.15,
    PETS20: 0.2,
  }

  if (promoCodes[promoCode]) {
    const discount = promoCodes[promoCode]
    showToast(`Promo code applied! ${discount * 100}% discount`)
    // In a real app, you'd update the cart totals here
  } else {
    showToast("Invalid promo code", "error")
  }
}

// Form handlers
function handleNewsletterSubmit(e) {
  e.preventDefault()
  const email = e.target.querySelector('input[type="email"]').value
  showToast("Thank you for subscribing to our newsletter!")
  e.target.reset()
}

function handleContactSubmit(e) {
  e.preventDefault()
  showToast("Thank you for your message! We'll get back to you soon.")
  e.target.reset()
}

function handleLoginSubmit(e) {
  e.preventDefault()
  const email = document.getElementById("loginEmail").value
  showToast(`Welcome back! Logged in as ${email}`)
  // In a real app, you'd handle authentication here
}

function handleRegisterSubmit(e) {
  e.preventDefault()
  const password = document.getElementById("registerPassword").value
  const confirmPassword = document.getElementById("confirmPassword").value

  if (password !== confirmPassword) {
    showToast("Passwords do not match!", "error")
    return
  }

  showToast("Account created successfully! Please check your email to verify.")
  e.target.reset()
}

function handleCheckoutSubmit(e) {
  e.preventDefault()

  // Simulate order processing
  showToast("Order placed successfully! You will receive a confirmation email shortly.")

  // Clear cart
  cart = []
  localStorage.setItem("cart", JSON.stringify(cart))
  updateCartCount()

  // Redirect to home page after a delay
  setTimeout(() => {
    window.location.href = "index.html"
  }, 2000)
}

// Show toast notification
function showToast(message, type = "success") {
  // Create toast element
  const toast = document.createElement("div")
  toast.className = `alert alert-${type === "error" ? "danger" : "success"} alert-dismissible fade show position-fixed`
  toast.style.cssText = "top: 20px; right: 20px; z-index: 9999; min-width: 300px;"
  toast.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `

  document.body.appendChild(toast)

  // Auto remove after 3 seconds
  setTimeout(() => {
    if (toast.parentNode) {
      toast.parentNode.removeChild(toast)
    }
  }, 3000)
}

// Smooth scrolling for anchor links
document.addEventListener("click", (e) => {
  if (e.target.matches('a[href^="#"]')) {
    e.preventDefault()
    const target = document.querySelector(e.target.getAttribute("href"))
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  }
})

// Add scroll animations
function addScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("fade-in")
      }
    })
  }, observerOptions)

  // Observe elements that should animate on scroll
  document.querySelectorAll(".card, .testimonial-card, .category-card").forEach((el) => {
    observer.observe(el)
  })
}

// Initialize scroll animations when page loads
window.addEventListener("load", addScrollAnimations)

// Handle back button for product detail page
window.addEventListener("popstate", (e) => {
  if (window.location.pathname.includes("product-detail.html")) {
    loadProductDetail()
  }
})

// Format currency
function formatCurrency(amount) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount)
}

// Debounce function for search
function debounce(func, wait) {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

// Search functionality
function setupSearch() {
  const searchInput = document.getElementById("search-input")
  const searchBtn = document.getElementById("search-btn")

  if (searchInput && searchBtn) {
    searchInput.addEventListener("input", debounce(performSearch, 300))
    searchBtn.addEventListener("click", (e) => {
      e.preventDefault()
      performSearch()
    })
  }
}

function performSearch() {
  const searchTerm = document.getElementById("search-input")?.value.toLowerCase().trim()
  if (!searchTerm) {
    if (window.location.pathname.includes("products.html")) {
      displayProducts(products)
      updateProductCount(products.length)
    }
    return
  }

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm) ||
      product.description.toLowerCase().includes(searchTerm) ||
      product.category.toLowerCase().includes(searchTerm),
  )

  if (window.location.pathname.includes("products.html")) {
    displayProducts(filteredProducts)
    updateProductCount(filteredProducts.length)
  } else {
    // Redirect to products page with search results
    window.location.href = `products.html?search=${encodeURIComponent(searchTerm)}`
  }
}

// Wishlist functions
function addToWishlist(productId) {
  const product = products.find((p) => p.id === productId)
  if (!product) return

  const existingItem = wishlist.find((item) => item.id === productId)
  if (existingItem) {
    showToast("Item already in wishlist!")
    return
  }

  wishlist.push(product)
  localStorage.setItem("wishlist", JSON.stringify(wishlist))
  updateWishlistCount()
  showToast(`${product.name} added to wishlist!`)
}

function removeFromWishlist(productId) {
  wishlist = wishlist.filter((item) => item.id !== productId)
  localStorage.setItem("wishlist", JSON.stringify(wishlist))
  updateWishlistCount()
  loadWishlistItems()
  showToast("Item removed from wishlist")
}

function updateWishlistCount() {
  const wishlistCount = document.getElementById("wishlist-count")
  if (wishlistCount) {
    wishlistCount.textContent = wishlist.length
  }
}

function loadWishlistItems() {
  const wishlistContainer = document.getElementById("wishlist-items")
  const emptyWishlist = document.getElementById("empty-wishlist")

  if (wishlist.length === 0) {
    if (wishlistContainer) wishlistContainer.style.display = "none"
    if (emptyWishlist) emptyWishlist.style.display = "block"
    return
  }

  if (wishlistContainer) wishlistContainer.style.display = "block"
  if (emptyWishlist) emptyWishlist.style.display = "none"

  if (wishlistContainer) {
    wishlistContainer.innerHTML = wishlist.map((item) => createWishlistItemHTML(item)).join("")
  }
}

function createWishlistItemHTML(item) {
  return `
    <div class="col-md-6 col-lg-4">
      <div class="card product-card border-0 shadow-sm h-100 hover-lift">
        <div class="product-image">
          <img src="${item.image}" class="card-img-top" alt="${item.name}" style="height: 200px; object-fit: cover;">
        </div>
        <div class="card-body d-flex flex-column">
          <h5 class="card-title">${item.name}</h5>
          <p class="card-text text-muted flex-grow-1">${item.description}</p>
          <div class="d-flex justify-content-between align-items-center mt-auto">
            <span class="h5 text-primary mb-0">$${item.price}</span>
            <div class="btn-group">
              <button class="btn btn-primary btn-sm" onclick="addToCart(${item.id})">
                <i class="bi bi-cart-plus"></i> Add to Cart
              </button>
              <button class="btn btn-outline-danger btn-sm" onclick="removeFromWishlist(${item.id})">
                <i class="bi bi-heart-fill"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
}

// Product reviews functionality
const productReviews = {
  1: [
    {
      id: 1,
      customerName: "Sarah J.",
      rating: 5,
      comment: "Amazing quality! My dog loves it.",
      date: "2024-01-10",
      verified: true,
    },
    {
      id: 2,
      customerName: "Mike D.",
      rating: 4,
      comment: "Good product, fast shipping.",
      date: "2024-01-08",
      verified: true,
    },
  ],
  2: [
    {
      id: 3,
      customerName: "Lisa K.",
      rating: 5,
      comment: "My cat is obsessed with this toy!",
      date: "2024-01-05",
      verified: true,
    },
  ],
}

function loadProductReviews(productId) {
  const reviews = productReviews[productId] || []
  const reviewsContainer = document.getElementById("product-reviews")

  if (!reviewsContainer) return

  if (reviews.length === 0) {
    reviewsContainer.innerHTML = `
      <div class="text-center py-4">
        <p class="text-muted">No reviews yet. Be the first to review this product!</p>
      </div>
    `
    return
  }

  reviewsContainer.innerHTML = `
    <div class="reviews-summary mb-4">
      <div class="d-flex align-items-center">
        <div class="average-rating me-3">
          <span class="h3 mb-0">${calculateAverageRating(reviews).toFixed(1)}</span>
          <div class="stars">
            ${generateStars(Math.round(calculateAverageRating(reviews)))}
          </div>
        </div>
        <div>
          <p class="mb-0">${reviews.length} review${reviews.length !== 1 ? "s" : ""}</p>
        </div>
      </div>
    </div>
    <div class="reviews-list">
      ${reviews.map((review) => createReviewHTML(review)).join("")}
    </div>
  `
}

function createReviewHTML(review) {
  function formatDate(dateString) {
    const date = new Date(dateString)
    const options = { year: "numeric", month: "long", day: "numeric" }
    return date.toLocaleDateString(undefined, options)
  }

  return `
    <div class="review-item border-bottom pb-3 mb-3">
      <div class="d-flex justify-content-between align-items-start mb-2">
        <div>
          <strong>${review.customerName}</strong>
          ${review.verified ? '<span class="badge bg-success ms-2">Verified Purchase</span>' : ""}
        </div>
        <small class="text-muted">${formatDate(review.date)}</small>
      </div>
      <div class="stars mb-2">
        ${generateStars(review.rating)}
      </div>
      <p class="mb-0">${review.comment}</p>
    </div>
  `
}

function calculateAverageRating(reviews) {
  if (reviews.length === 0) return 0
  const sum = reviews.reduce((acc, review) => acc + review.rating, 0)
  return sum / reviews.length
}

function generateStars(rating) {
  let stars = ""
  for (let i = 1; i <= 5; i++) {
    stars += `<i class="bi bi-star${i <= rating ? "-fill" : ""} text-warning"></i>`
  }
  return stars
}

function handleSearchFromURL() {
  const urlParams = new URLSearchParams(window.location.search)
  const searchTerm = urlParams.get("search")
  if (searchTerm) {
    const searchInput = document.getElementById("search-input")
    if (searchInput) {
      searchInput.value = searchTerm
      performSearch()
    }
  }
}

// Initialize tooltips and popovers if Bootstrap is available
document.addEventListener("DOMContentLoaded", () => {
  // Initialize Bootstrap tooltips
  const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
  tooltipTriggerList.map((tooltipTriggerEl) => new bootstrap.Tooltip(tooltipTriggerEl))

  // Initialize Bootstrap popovers
  const popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'))
  popoverTriggerList.map((popoverTriggerEl) => new bootstrap.Popover(popoverTriggerEl))
})
