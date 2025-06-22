// Admin Dashboard JavaScript

// Sample admin data
const adminOrders = [
  {
    id: "ORD-001",
    customer: "John Doe",
    email: "john@example.com",
    items: 3,
    total: 89.97,
    status: "Shipped",
    date: "2024-01-15",
  },
  {
    id: "ORD-002",
    customer: "Jane Smith",
    email: "jane@example.com",
    items: 1,
    total: 29.99,
    status: "Processing",
    date: "2024-01-14",
  },
  {
    id: "ORD-003",
    customer: "Mike Johnson",
    email: "mike@example.com",
    items: 2,
    total: 54.98,
    status: "Delivered",
    date: "2024-01-13",
  },
]

const adminCustomers = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    orders: 5,
    totalSpent: 234.95,
    joined: "2023-12-01",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    orders: 3,
    totalSpent: 156.78,
    joined: "2023-11-15",
  },
  {
    id: 3,
    name: "Mike Johnson",
    email: "mike@example.com",
    orders: 7,
    totalSpent: 445.32,
    joined: "2023-10-20",
  },
]

const adminReviews = [
  {
    id: 1,
    productName: "Premium Dog Food",
    customerName: "Sarah Wilson",
    rating: 5,
    comment: "My dog absolutely loves this food! Great quality and fast shipping.",
    date: "2024-01-10",
    status: "approved",
  },
  {
    id: 2,
    productName: "Interactive Cat Toy",
    customerName: "Tom Brown",
    rating: 4,
    comment: "Good toy, keeps my cat entertained. Could be a bit more durable.",
    date: "2024-01-08",
    status: "pending",
  },
  {
    id: 3,
    productName: "Dog Chew Bone",
    customerName: "Lisa Davis",
    rating: 5,
    comment: "Perfect size for my German Shepherd. Highly recommend!",
    date: "2024-01-05",
    status: "approved",
  },
]

// Sample product data (to resolve undeclared variable error)
const products = [
  {
    id: 1,
    name: "Premium Dog Food",
    category: "Dog Food",
    price: 29.99,
    image: "https://example.com/dog-food.jpg",
  },
  {
    id: 2,
    name: "Interactive Cat Toy",
    category: "Cat Toys",
    price: 19.99,
    image: "https://example.com/cat-toy.jpg",
  },
  {
    id: 3,
    name: "Dog Chew Bone",
    category: "Dog Toys",
    price: 9.99,
    image: "https://example.com/dog-bone.jpg",
  },
]

// Sample showToast function (to resolve undeclared variable error)
function showToast(message) {
  alert(message) // Replace with a proper toast notification library if needed
}

// Initialize admin dashboard
document.addEventListener("DOMContentLoaded", () => {
  if (window.location.pathname.includes("admin.html")) {
    initializeAdminDashboard()
    setupAdminEventListeners()
  }
})

function initializeAdminDashboard() {
  loadDashboardData()
  loadAdminProducts()
  loadAdminOrders()
  loadAdminCustomers()
  loadAdminReviews()
}

function setupAdminEventListeners() {
  // Sidebar navigation
  document.querySelectorAll(".sidebar .nav-link").forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault()
      const section = e.target.closest("a").dataset.section
      showAdminSection(section)

      // Update active state
      document.querySelectorAll(".sidebar .nav-link").forEach((l) => l.classList.remove("active"))
      e.target.closest("a").classList.add("active")
    })
  })

  // Add product form
  const addProductForm = document.getElementById("addProductForm")
  if (addProductForm) {
    addProductForm.addEventListener("submit", handleAddProduct)
  }
}

function showAdminSection(sectionName) {
  // Hide all sections
  document.querySelectorAll(".admin-section").forEach((section) => {
    section.style.display = "none"
  })

  // Show selected section
  const targetSection = document.getElementById(`${sectionName}-section`)
  if (targetSection) {
    targetSection.style.display = "block"
  }
}

function loadDashboardData() {
  // Load recent orders
  const recentOrdersTable = document.getElementById("recent-orders")
  if (recentOrdersTable) {
    recentOrdersTable.innerHTML = adminOrders
      .slice(0, 5)
      .map(
        (order) => `
            <tr>
                <td>${order.id}</td>
                <td>${order.customer}</td>
                <td>$${order.total.toFixed(2)}</td>
                <td><span class="badge bg-${getStatusColor(order.status)}">${order.status}</span></td>
                <td>${formatDate(order.date)}</td>
            </tr>
        `,
      )
      .join("")
  }
}

function loadAdminProducts() {
  const adminProductsTable = document.getElementById("admin-products")
  if (adminProductsTable) {
    adminProductsTable.innerHTML = products
      .map(
        (product) => `
            <tr>
                <td><img src="${product.image}" alt="${product.name}" style="width: 50px; height: 50px; object-fit: cover; border-radius: 5px;"></td>
                <td>${product.name}</td>
                <td><span class="badge bg-secondary">${product.category}</span></td>
                <td>$${product.price}</td>
                <td>${Math.floor(Math.random() * 100) + 10}</td>
                <td>
                    <button class="btn btn-sm btn-outline-primary me-1" onclick="editProduct(${product.id})">
                        <i class="bi bi-pencil"></i>
                    </button>
                    <button class="btn btn-sm btn-outline-danger" onclick="deleteProduct(${product.id})">
                        <i class="bi bi-trash"></i>
                    </button>
                </td>
            </tr>
        `,
      )
      .join("")
  }
}

function loadAdminOrders() {
  const adminOrdersTable = document.getElementById("admin-orders")
  if (adminOrdersTable) {
    adminOrdersTable.innerHTML = adminOrders
      .map(
        (order) => `
            <tr>
                <td>${order.id}</td>
                <td>
                    <div>
                        <strong>${order.customer}</strong><br>
                        <small class="text-muted">${order.email}</small>
                    </div>
                </td>
                <td>${order.items}</td>
                <td>$${order.total.toFixed(2)}</td>
                <td><span class="badge bg-${getStatusColor(order.status)}">${order.status}</span></td>
                <td>${formatDate(order.date)}</td>
                <td>
                    <div class="dropdown">
                        <button class="btn btn-sm btn-outline-secondary dropdown-toggle" data-bs-toggle="dropdown">
                            Actions
                        </button>
                        <ul class="dropdown-menu">
                            <li><a class="dropdown-item" href="#" onclick="viewOrder('${order.id}')">View Details</a></li>
                            <li><a class="dropdown-item" href="#" onclick="updateOrderStatus('${order.id}', 'Processing')">Mark Processing</a></li>
                            <li><a class="dropdown-item" href="#" onclick="updateOrderStatus('${order.id}', 'Shipped')">Mark Shipped</a></li>
                            <li><a class="dropdown-item" href="#" onclick="updateOrderStatus('${order.id}', 'Delivered')">Mark Delivered</a></li>
                        </ul>
                    </div>
                </td>
            </tr>
        `,
      )
      .join("")
  }
}

function loadAdminCustomers() {
  const adminCustomersTable = document.getElementById("admin-customers")
  if (adminCustomersTable) {
    adminCustomersTable.innerHTML = adminCustomers
      .map(
        (customer) => `
            <tr>
                <td>${customer.name}</td>
                <td>${customer.email}</td>
                <td>${customer.orders}</td>
                <td>$${customer.totalSpent.toFixed(2)}</td>
                <td>${formatDate(customer.joined)}</td>
                <td>
                    <button class="btn btn-sm btn-outline-primary me-1" onclick="viewCustomer(${customer.id})">
                        <i class="bi bi-eye"></i>
                    </button>
                    <button class="btn btn-sm btn-outline-secondary" onclick="emailCustomer('${customer.email}')">
                        <i class="bi bi-envelope"></i>
                    </button>
                </td>
            </tr>
        `,
      )
      .join("")
  }
}

function loadAdminReviews() {
  const adminReviewsContainer = document.getElementById("admin-reviews")
  if (adminReviewsContainer) {
    adminReviewsContainer.innerHTML = adminReviews
      .map(
        (review) => `
            <div class="col-md-6 col-lg-4 mb-4">
                <div class="card">
                    <div class="card-header d-flex justify-content-between align-items-center">
                        <h6 class="mb-0">${review.productName}</h6>
                        <span class="badge bg-${review.status === "approved" ? "success" : "warning"}">${review.status}</span>
                    </div>
                    <div class="card-body">
                        <div class="d-flex align-items-center mb-2">
                            <strong class="me-2">${review.customerName}</strong>
                            <div class="stars">
                                ${generateStars(review.rating)}
                            </div>
                        </div>
                        <p class="card-text">${review.comment}</p>
                        <small class="text-muted">${formatDate(review.date)}</small>
                    </div>
                    <div class="card-footer">
                        ${
                          review.status === "pending"
                            ? `
                            <button class="btn btn-sm btn-success me-2" onclick="approveReview(${review.id})">Approve</button>
                            <button class="btn btn-sm btn-danger" onclick="rejectReview(${review.id})">Reject</button>
                        `
                            : `
                            <button class="btn btn-sm btn-outline-danger" onclick="deleteReview(${review.id})">Delete</button>
                        `
                        }
                    </div>
                </div>
            </div>
        `,
      )
      .join("")
  }
}

function handleAddProduct(e) {
  e.preventDefault()

  const formData = new FormData(e.target)
  const newProduct = {
    id: products.length + 1,
    name: document.getElementById("productName").value,
    price: Number.parseFloat(document.getElementById("productPrice").value),
    category: document.getElementById("productCategory").value,
    type: document.getElementById("productCategory").value,
    description: document.getElementById("productDescription").value,
    image: document.getElementById("productImage").value,
    specs: ["New product", "High quality", "Customer favorite"],
  }

  products.push(newProduct)
  loadAdminProducts()

  // Close modal and reset form
  const modal = bootstrap.Modal.getInstance(document.getElementById("addProductModal"))
  modal.hide()
  e.target.reset()

  showToast("Product added successfully!")
}

function editProduct(productId) {
  const product = products.find((p) => p.id === productId)
  if (product) {
    showToast(`Edit product: ${product.name}`)
    // In a real app, you'd open an edit modal here
  }
}

function deleteProduct(productId) {
  if (confirm("Are you sure you want to delete this product?")) {
    const index = products.findIndex((p) => p.id === productId)
    if (index > -1) {
      products.splice(index, 1)
      loadAdminProducts()
      showToast("Product deleted successfully!")
    }
  }
}

function viewOrder(orderId) {
  const order = adminOrders.find((o) => o.id === orderId)
  if (order) {
    showToast(`Viewing order: ${order.id}`)
    // In a real app, you'd open an order details modal here
  }
}

function updateOrderStatus(orderId, newStatus) {
  const order = adminOrders.find((o) => o.id === orderId)
  if (order) {
    order.status = newStatus
    loadDashboardData()
    loadAdminOrders()
    showToast(`Order ${orderId} status updated to ${newStatus}`)
  }
}

function viewCustomer(customerId) {
  const customer = adminCustomers.find((c) => c.id === customerId)
  if (customer) {
    showToast(`Viewing customer: ${customer.name}`)
    // In a real app, you'd open a customer details modal here
  }
}

function emailCustomer(email) {
  showToast(`Opening email client for: ${email}`)
  // In a real app, you'd open the default email client
  // In a real app, you'd open the default email client
}

function approveReview(reviewId) {
  const review = adminReviews.find((r) => r.id === reviewId)
  if (review) {
    review.status = "approved"
    loadAdminReviews()
    showToast("Review approved!")
  }
}

function rejectReview(reviewId) {
  const review = adminReviews.find((r) => r.id === reviewId)
  if (review) {
    review.status = "rejected"
    loadAdminReviews()
    showToast("Review rejected!")
  }
}

function deleteReview(reviewId) {
  if (confirm("Are you sure you want to delete this review?")) {
    const index = adminReviews.findIndex((r) => r.id === reviewId)
    if (index > -1) {
      adminReviews.splice(index, 1)
      loadAdminReviews()
      showToast("Review deleted!")
    }
  }
}

// Utility functions
function getStatusColor(status) {
  const colors = {
    Processing: "warning",
    Shipped: "info",
    Delivered: "success",
    Cancelled: "danger",
  }
  return colors[status] || "secondary"
}

function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  })
}

function generateStars(rating) {
  let stars = ""
  for (let i = 1; i <= 5; i++) {
    stars += `<i class="bi bi-star${i <= rating ? "-fill" : ""} text-warning"></i>`
  }
  return stars
}
