import { Chart } from "@/components/ui/chart"
// Admin Dashboard JavaScript for Bowlfull Buddies

// Sample Data
const sampleProducts = [
  {
    id: 1,
    name: "Premium Dog Food",
    sku: "DF001",
    category: "Dog Food",
    brand: "PetNutrition",
    price: 29.99,
    stock: 150,
    minStock: 20,
    status: "Active",
    image: "https://via.placeholder.com/50x50/c1edff/000000?text=DF",
    description: "High-quality nutrition for adult dogs",
    weight: 5.0,
    featured: true,
    dateAdded: "2024-01-01",
  },
  {
    id: 2,
    name: "Cat Scratching Post",
    sku: "CA001",
    category: "Accessories",
    brand: "FelineComfort",
    price: 45.99,
    stock: 75,
    minStock: 10,
    status: "Active",
    image: "https://via.placeholder.com/50x50/ffc5e7/000000?text=CP",
    description: "Durable scratching post for cats",
    weight: 8.5,
    featured: false,
    dateAdded: "2024-01-02",
  },
  {
    id: 3,
    name: "Interactive Dog Toy",
    sku: "DT001",
    category: "Toys",
    brand: "PlayPaws",
    price: 19.99,
    stock: 5,
    minStock: 15,
    status: "Low Stock",
    image: "https://via.placeholder.com/50x50/f9f6d2/000000?text=DT",
    description: "Engaging toy for active dogs",
    weight: 0.5,
    featured: false,
    dateAdded: "2024-01-03",
  },
  {
    id: 4,
    name: "Cat Treats",
    sku: "CT001",
    category: "Cat Food",
    brand: "TastyBites",
    price: 12.99,
    stock: 200,
    minStock: 25,
    status: "Active",
    image: "https://via.placeholder.com/50x50/c1edff/000000?text=CT",
    description: "Delicious and healthy cat treats",
    weight: 0.3,
    featured: true,
    dateAdded: "2024-01-04",
  },
  {
    id: 5,
    name: "Dog Leash",
    sku: "DL001",
    category: "Accessories",
    brand: "WalkSafe",
    price: 24.99,
    stock: 0,
    minStock: 10,
    status: "Out of Stock",
    image: "https://via.placeholder.com/50x50/ffc5e7/000000?text=DL",
    description: "Strong and comfortable dog leash",
    weight: 0.4,
    featured: false,
    dateAdded: "2024-01-05",
  },
]

const sampleOrders = [
  {
    id: "ORD-001",
    customer: "John Smith",
    email: "john@example.com",
    date: "2024-01-15",
    items: 3,
    total: 89.97,
    status: "Delivered",
    products: [
      { name: "Premium Dog Food", quantity: 2, price: 29.99 },
      { name: "Dog Treats", quantity: 1, price: 29.99 },
    ],
  },
  {
    id: "ORD-002",
    customer: "Sarah Johnson",
    email: "sarah@example.com",
    date: "2024-01-14",
    items: 1,
    total: 45.99,
    status: "Shipped",
    products: [{ name: "Cat Scratching Post", quantity: 1, price: 45.99 }],
  },
  {
    id: "ORD-003",
    customer: "Mike Davis",
    email: "mike@example.com",
    date: "2024-01-13",
    items: 2,
    total: 32.98,
    status: "Pending",
    products: [
      { name: "Interactive Dog Toy", quantity: 1, price: 19.99 },
      { name: "Cat Treats", quantity: 1, price: 12.99 },
    ],
  },
  {
    id: "ORD-004",
    customer: "Emily Brown",
    email: "emily@example.com",
    date: "2024-01-12",
    items: 2,
    total: 67.5,
    status: "Cancelled",
    products: [
      { name: "Premium Dog Food", quantity: 1, price: 29.99 },
      { name: "Cat Scratching Post", quantity: 1, price: 37.51 },
    ],
  },
]

const sampleUsers = [
  {
    id: 1,
    name: "John Smith",
    email: "john@example.com",
    phone: "+1 (555) 123-4567",
    role: "Customer",
    registrationDate: "2023-12-01",
    lastLogin: "2024-01-15",
    status: "Active",
    avatar: "https://via.placeholder.com/40x40/c1edff/000000?text=JS",
    orders: 5,
    totalSpent: 234.5,
  },
  {
    id: 2,
    name: "Sarah Johnson",
    email: "sarah@example.com",
    phone: "+1 (555) 234-5678",
    role: "Customer",
    registrationDate: "2023-11-15",
    lastLogin: "2024-01-14",
    status: "Active",
    avatar: "https://via.placeholder.com/40x40/ffc5e7/000000?text=SJ",
    orders: 3,
    totalSpent: 156.75,
  },
  {
    id: 3,
    name: "Mike Davis",
    email: "mike@example.com",
    phone: "+1 (555) 345-6789",
    role: "Customer",
    registrationDate: "2023-10-20",
    lastLogin: "2024-01-10",
    status: "Banned",
    avatar: "https://via.placeholder.com/40x40/f9f6d2/000000?text=MD",
    orders: 1,
    totalSpent: 32.98,
  },
  {
    id: 4,
    name: "Admin User",
    email: "admin@bowlfullbuddies.com",
    phone: "+1 (555) 456-7890",
    role: "Admin",
    registrationDate: "2023-01-01",
    lastLogin: "2024-01-16",
    status: "Active",
    avatar: "https://via.placeholder.com/40x40/c1edff/000000?text=AU",
    orders: 0,
    totalSpent: 0,
  },
]

const sampleReviews = [
  {
    id: 1,
    productName: "Premium Dog Food",
    customerName: "John Smith",
    rating: 5,
    comment: "My dog absolutely loves this food! Great quality and fast shipping.",
    date: "2024-01-15",
    status: "Approved",
    helpful: 12,
  },
  {
    id: 2,
    productName: "Cat Scratching Post",
    customerName: "Sarah Johnson",
    rating: 4,
    comment: "Good quality scratching post. My cat uses it daily.",
    date: "2024-01-14",
    status: "Pending",
    helpful: 3,
  },
  {
    id: 3,
    productName: "Interactive Dog Toy",
    customerName: "Mike Davis",
    rating: 2,
    comment: "The toy broke after just one day. Poor quality.",
    date: "2024-01-13",
    status: "Rejected",
    helpful: 1,
  },
]

// Global variables
const currentPage = 1
const itemsPerPage = 10
const currentFilter = {}
const charts = {}

// Initialize Dashboard
document.addEventListener("DOMContentLoaded", () => {
  initializeDashboard()
  setupEventListeners()
  loadDashboardData()
})

function initializeDashboard() {
  // Initialize charts
  initializeSalesChart()
  initializeCategoryChart()
  initializeAnalyticsCharts()

  // Load initial data
  loadProductsTable()
  loadOrdersTable()
  loadUsersTable()
  loadInventoryTable()
  loadReviewsContainer()
  loadRecentActivity()
  updateDashboardStats()
}

function setupEventListeners() {
  // Sidebar navigation
  document.querySelectorAll(".sidebar .nav-link").forEach((link) => {
    link.addEventListener("click", function (e) {
      if (this.getAttribute("data-page")) {
        e.preventDefault()
        showPage(this.getAttribute("data-page"))

        // Update active state
        document.querySelectorAll(".sidebar .nav-link").forEach((l) => l.classList.remove("active"))
        this.classList.add("active")
      }
    })
  })

  // Mobile sidebar toggle
  const sidebarToggle = document.getElementById("sidebarToggle")
  const sidebar = document.getElementById("sidebar")

  if (sidebarToggle) {
    sidebarToggle.addEventListener("click", () => {
      sidebar.classList.toggle("show")
    })
  }

  // Global search
  const globalSearch = document.getElementById("globalSearch")
  if (globalSearch) {
    globalSearch.addEventListener("input", debounce(handleGlobalSearch, 300))
  }

  // Form submissions
  setupFormHandlers()

  // Filter handlers
  setupFilterHandlers()

  // Settings navigation
  setupSettingsNavigation()

  // Notification handlers
  setupNotificationHandlers()
}

function setupFormHandlers() {
  // Add product form
  const addProductForm = document.getElementById("addProductForm")
  if (addProductForm) {
    addProductForm.addEventListener("submit", handleAddProduct)
  }

  // Add user form
  const addUserForm = document.getElementById("addUserForm")
  if (addUserForm) {
    addUserForm.addEventListener("submit", handleAddUser)
  }
}

function setupFilterHandlers() {
  // Product filters
  const productSearch = document.getElementById("productSearch")
  const categoryFilter = document.getElementById("categoryFilter")
  const statusFilter = document.getElementById("statusFilter")
  const sortBy = document.getElementById("sortBy")

  if (productSearch) productSearch.addEventListener("input", debounce(filterProducts, 300))
  if (categoryFilter) categoryFilter.addEventListener("change", filterProducts)
  if (statusFilter) statusFilter.addEventListener("change", filterProducts)
  if (sortBy) sortBy.addEventListener("change", filterProducts)

  // Order filters
  document.querySelectorAll('input[name="orderFilter"]').forEach((filter) => {
    filter.addEventListener("change", function () {
      filterOrders(this.id.replace("-orders", "").replace("all-", "all"))
    })
  })

  // User filters
  const userSearch = document.getElementById("userSearch")
  const roleFilter = document.getElementById("roleFilter")
  const userStatusFilter = document.getElementById("userStatusFilter")

  if (userSearch) userSearch.addEventListener("input", debounce(filterUsers, 300))
  if (roleFilter) roleFilter.addEventListener("change", filterUsers)
  if (userStatusFilter) userStatusFilter.addEventListener("change", filterUsers)
}

function setupSettingsNavigation() {
  document.querySelectorAll(".settings-nav .list-group-item").forEach((item) => {
    item.addEventListener("click", function (e) {
      e.preventDefault()
      const setting = this.getAttribute("data-setting")
      showSettingsPanel(setting)

      // Update active state
      document.querySelectorAll(".settings-nav .list-group-item").forEach((i) => i.classList.remove("active"))
      this.classList.add("active")
    })
  })
}

function setupNotificationHandlers() {
  document.querySelectorAll(".notification-item").forEach((item) => {
    item.addEventListener("click", function () {
      this.classList.remove("unread")
      updateNotificationCount()
    })
  })
}

function showPage(pageId) {
  // Hide all pages
  document.querySelectorAll(".page-content").forEach((page) => {
    page.classList.remove("active")
  })

  // Show selected page
  const targetPage = document.getElementById(pageId + "-page")
  if (targetPage) {
    targetPage.classList.add("active")

    // Load page-specific data
    switch (pageId) {
      case "analytics":
        loadAnalyticsData()
        break
      case "inventory":
        loadInventoryData()
        break
      case "reviews":
        loadReviewsData()
        break
    }
  }
}

function showSettingsPanel(panelId) {
  // Hide all panels
  document.querySelectorAll(".settings-panel").forEach((panel) => {
    panel.classList.remove("active")
  })

  // Show selected panel
  const targetPanel = document.getElementById(panelId + "-settings")
  if (targetPanel) {
    targetPanel.classList.add("active")
  }
}

// Chart Initialization
function initializeSalesChart() {
  const ctx = document.getElementById("salesChart")
  if (!ctx) return

  charts.salesChart = new Chart(ctx, {
    type: "line",
    data: {
      labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
      datasets: [
        {
          label: "Sales ($)",
          data: [12000, 19000, 15000, 25000, 22000, 30000, 28000, 35000, 32000, 38000, 42000, 45000],
          borderColor: "#c1edff",
          backgroundColor: "rgba(193, 237, 255, 0.1)",
          borderWidth: 3,
          fill: true,
          tension: 0.4,
          pointBackgroundColor: "#ffc5e7",
          pointBorderColor: "#c1edff",
          pointBorderWidth: 2,
          pointRadius: 5,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false,
        },
        tooltip: {
          backgroundColor: "rgba(255, 255, 255, 0.9)",
          titleColor: "#2c3e50",
          bodyColor: "#2c3e50",
          borderColor: "#c1edff",
          borderWidth: 1,
          cornerRadius: 8,
        },
      },
      scales: {
        y: {
          beginAtZero: true,
          grid: {
            color: "rgba(0,0,0,0.1)",
          },
          ticks: {
            callback: (value) => "$" + value.toLocaleString(),
          },
        },
        x: {
          grid: {
            display: false,
          },
        },
      },
    },
  })
}

function initializeCategoryChart() {
  const ctx = document.getElementById("categoryChart")
  if (!ctx) return

  charts.categoryChart = new Chart(ctx, {
    type: "doughnut",
    data: {
      labels: ["Dog Food", "Cat Food", "Toys", "Accessories", "Health & Wellness"],
      datasets: [
        {
          data: [35, 25, 20, 15, 5],
          backgroundColor: ["#c1edff", "#ffc5e7", "#f9f6d2", "#e8f4f8", "#d4edda"],
          borderWidth: 0,
          hoverOffset: 10,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: "bottom",
          labels: {
            padding: 20,
            usePointStyle: true,
            font: {
              size: 12,
            },
          },
        },
        tooltip: {
          backgroundColor: "rgba(255, 255, 255, 0.9)",
          titleColor: "#2c3e50",
          bodyColor: "#2c3e50",
          borderColor: "#c1edff",
          borderWidth: 1,
          cornerRadius: 8,
          callbacks: {
            label: (context) => context.label + ": " + context.parsed + "%",
          },
        },
      },
    },
  })
}

function initializeAnalyticsCharts() {
  // Revenue Chart
  const revenueCtx = document.getElementById("revenueChart")
  if (revenueCtx) {
    charts.revenueChart = new Chart(revenueCtx, {
      type: "bar",
      data: {
        labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
        datasets: [
          {
            label: "Revenue",
            data: [8500, 12000, 9800, 15200],
            backgroundColor: "rgba(193, 237, 255, 0.8)",
            borderColor: "#c1edff",
            borderWidth: 2,
            borderRadius: 8,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false,
          },
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              callback: (value) => "$" + value.toLocaleString(),
            },
          },
        },
      },
    })
  }

  // Top Products Chart
  const topProductsCtx = document.getElementById("topProductsChart")
  if (topProductsCtx) {
    charts.topProductsChart = new Chart(topProductsCtx, {
      type: "horizontalBar",
      data: {
        labels: ["Premium Dog Food", "Cat Treats", "Dog Toy", "Cat Post", "Dog Leash"],
        datasets: [
          {
            data: [150, 120, 95, 80, 65],
            backgroundColor: ["#c1edff", "#ffc5e7", "#f9f6d2", "#e8f4f8", "#d4edda"],
            borderWidth: 0,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false,
          },
        },
        scales: {
          x: {
            beginAtZero: true,
          },
        },
      },
    })
  }

  // Demographics Chart
  const demographicsCtx = document.getElementById("demographicsChart")
  if (demographicsCtx) {
    charts.demographicsChart = new Chart(demographicsCtx, {
      type: "pie",
      data: {
        labels: ["18-25", "26-35", "36-45", "46-55", "55+"],
        datasets: [
          {
            data: [15, 30, 25, 20, 10],
            backgroundColor: ["#c1edff", "#ffc5e7", "#f9f6d2", "#e8f4f8", "#d4edda"],
            borderWidth: 0,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: "bottom",
          },
        },
      },
    })
  }

  // Traffic Sources Chart
  const trafficCtx = document.getElementById("trafficChart")
  if (trafficCtx) {
    charts.trafficChart = new Chart(trafficCtx, {
      type: "doughnut",
      data: {
        labels: ["Direct", "Social Media", "Search Engines", "Email", "Referrals"],
        datasets: [
          {
            data: [40, 25, 20, 10, 5],
            backgroundColor: ["#c1edff", "#ffc5e7", "#f9f6d2", "#e8f4f8", "#d4edda"],
            borderWidth: 0,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: "bottom",
          },
        },
      },
    })
  }
}

// Data Loading Functions
function loadDashboardData() {
  updateDashboardStats()
  loadRecentActivity()
}

function updateDashboardStats() {
  // Update main stats
  document.getElementById("totalProducts").textContent = sampleProducts.length.toLocaleString()
  document.getElementById("totalOrders").textContent = sampleOrders.length.toLocaleString()
  document.getElementById("totalRevenue").textContent =
    "$" + sampleOrders.reduce((sum, order) => sum + order.total, 0).toLocaleString()
  document.getElementById("totalUsers").textContent = sampleUsers.length.toLocaleString()

  // Update order stats
  const pendingOrders = sampleOrders.filter((o) => o.status === "Pending").length
  const shippedOrders = sampleOrders.filter((o) => o.status === "Shipped").length
  const deliveredOrders = sampleOrders.filter((o) => o.status === "Delivered").length
  const cancelledOrders = sampleOrders.filter((o) => o.status === "Cancelled").length

  document.getElementById("pendingOrdersCount").textContent = pendingOrders
  document.getElementById("shippedOrdersCount").textContent = shippedOrders
  document.getElementById("deliveredOrdersCount").textContent = deliveredOrders
  document.getElementById("cancelledOrdersCount").textContent = cancelledOrders

  // Update user stats
  const activeUsers = sampleUsers.filter((u) => u.status === "Active").length
  const bannedUsers = sampleUsers.filter((u) => u.status === "Banned").length

  document.getElementById("totalUsersCount").textContent = sampleUsers.length
  document.getElementById("activeUsersCount").textContent = activeUsers
  document.getElementById("newUsersCount").textContent = "45" // Mock data
  document.getElementById("bannedUsersCount").textContent = bannedUsers

  // Update inventory stats
  const outOfStock = sampleProducts.filter((p) => p.stock === 0).length
  const lowStock = sampleProducts.filter((p) => p.stock > 0 && p.stock <= p.minStock).length
  const inStock = sampleProducts.filter((p) => p.stock > p.minStock).length

  if (document.getElementById("outOfStockCount")) {
    document.getElementById("outOfStockCount").textContent = outOfStock
    document.getElementById("lowStockCount").textContent = lowStock
    document.getElementById("inStockCount").textContent = inStock
  }

  // Update review stats
  if (document.getElementById("totalReviewsCount")) {
    const pendingReviews = sampleReviews.filter((r) => r.status === "Pending").length
    const avgRating = (sampleReviews.reduce((sum, r) => sum + r.rating, 0) / sampleReviews.length).toFixed(1)

    document.getElementById("totalReviewsCount").textContent = sampleReviews.length
    document.getElementById("pendingReviewsCount").textContent = pendingReviews
    document.getElementById("averageRating").textContent = avgRating
    document.getElementById("thisMonthReviews").textContent = "89" // Mock data
  }
}

function loadRecentActivity() {
  const recentOrdersContainer = document.getElementById("recentOrders")
  const lowStockContainer = document.getElementById("lowStockAlerts")

  if (recentOrdersContainer) {
    const recentOrders = sampleOrders.slice(0, 5)
    recentOrdersContainer.innerHTML = recentOrders
      .map(
        (order) => `
      <div class="activity-item">
        <div class="activity-icon bg-success">
          <i class="bi bi-cart-check text-white"></i>
        </div>
        <div class="activity-content">
          <div class="activity-title">Order ${order.id}</div>
          <div class="activity-time">${order.customer} - $${order.total}</div>
        </div>
        <span class="badge ${getOrderStatusBadgeClass(order.status)}">${order.status}</span>
      </div>
    `,
      )
      .join("")
  }

  if (lowStockContainer) {
    const lowStockProducts = sampleProducts.filter((p) => p.stock <= p.minStock)
    lowStockContainer.innerHTML = lowStockProducts
      .map(
        (product) => `
      <div class="activity-item">
        <div class="activity-icon bg-warning">
          <i class="bi bi-exclamation-triangle text-white"></i>
        </div>
        <div class="activity-content">
          <div class="activity-title">${product.name}</div>
          <div class="activity-time">Stock: ${product.stock} (Min: ${product.minStock})</div>
        </div>
        <button class="btn btn-sm btn-outline-primary" onclick="restockProduct(${product.id})">Restock</button>
      </div>
    `,
      )
      .join("")
  }
}

// Products Management
function loadProductsTable(products = sampleProducts) {
  const tbody = document.getElementById("productsTableBody")
  if (!tbody) return

  tbody.innerHTML = products
    .map(
      (product) => `
        <tr>
            <td><input type="checkbox" class="form-check-input" value="${product.id}"></td>
            <td><img src="${product.image}" alt="${product.name}" class="product-img"></td>
            <td>
                <strong>${product.name}</strong>
                <br><small class="text-muted">SKU: ${product.sku}</small>
            </td>
            <td><span class="badge bg-secondary">${product.category}</span></td>
            <td>$${product.price}</td>
            <td>
                <span class="${product.stock <= product.minStock ? "text-danger fw-bold" : ""}">${product.stock}</span>
            </td>
            <td>
                <span class="badge ${getStatusBadgeClass(product.status)}">${product.status}</span>
            </td>
            <td>
                <button class="btn btn-sm btn-outline-primary action-btn" onclick="editProduct(${product.id})" title="Edit">
                    <i class="bi bi-pencil"></i>
                </button>
                <button class="btn btn-sm btn-outline-info action-btn" onclick="viewProduct(${product.id})" title="View">
                    <i class="bi bi-eye"></i>
                </button>
                <button class="btn btn-sm btn-outline-danger action-btn" onclick="deleteProduct(${product.id})" title="Delete">
                    <i class="bi bi-trash"></i>
                </button>
            </td>
        </tr>
    `,
    )
    .join("")

  updateTableInfo("products", products.length, sampleProducts.length)
}

function filterProducts() {
  const searchTerm = document.getElementById("productSearch")?.value.toLowerCase() || ""
  const categoryFilter = document.getElementById("categoryFilter")?.value || ""
  const statusFilter = document.getElementById("statusFilter")?.value || ""
  const sortBy = document.getElementById("sortBy")?.value || "name"

  const filteredProducts = sampleProducts.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm) || product.sku.toLowerCase().includes(searchTerm)
    const matchesCategory = !categoryFilter || product.category === categoryFilter
    const matchesStatus = !statusFilter || product.status === statusFilter

    return matchesSearch && matchesCategory && matchesStatus
  })

  // Sort products
  filteredProducts.sort((a, b) => {
    switch (sortBy) {
      case "price":
        return a.price - b.price
      case "stock":
        return a.stock - b.stock
      case "date":
        return new Date(b.dateAdded) - new Date(a.dateAdded)
      default:
        return a.name.localeCompare(b.name)
    }
  })

  loadProductsTable(filteredProducts)
}

function handleAddProduct(e) {
  e.preventDefault()

  const newProduct = {
    id: sampleProducts.length + 1,
    name: document.getElementById("productName").value,
    sku: document.getElementById("productSKU").value,
    category: document.getElementById("productCategory").value,
    brand: document.getElementById("productBrand").value,
    price: Number.parseFloat(document.getElementById("productPrice").value),
    stock: Number.parseInt(document.getElementById("productStock").value),
    minStock: Number.parseInt(document.getElementById("productMinStock").value),
    status: "Active",
    image: document.getElementById("productImage").value || "https://via.placeholder.com/50x50/c1edff/000000?text=NP",
    description: document.getElementById("productDescription").value,
    weight: Number.parseFloat(document.getElementById("productWeight").value) || 0,
    featured: document.getElementById("productFeatured").checked,
    dateAdded: new Date().toISOString().split("T")[0],
  }

  sampleProducts.push(newProduct)
  loadProductsTable()
  updateDashboardStats()

  // Close modal and reset form
  const modalElement = document.getElementById("addProductModal")
  const modal = bootstrap.Modal.getInstance(modalElement)
  modal.hide()
  e.target.reset()

  showToast("Product added successfully!", "success")
}

function editProduct(id) {
  const product = sampleProducts.find((p) => p.id === id)
  if (product) {
    // In a real app, you'd populate an edit modal with the product data
    showToast(`Edit product: ${product.name}`, "info")
  }
}

function viewProduct(id) {
  const product = sampleProducts.find((p) => p.id === id)
  if (product) {
    showToast(`Viewing product: ${product.name}`, "info")
  }
}

function deleteProduct(id) {
  if (confirm("Are you sure you want to delete this product?")) {
    const index = sampleProducts.findIndex((p) => p.id === id)
    if (index > -1) {
      sampleProducts.splice(index, 1)
      loadProductsTable()
      updateDashboardStats()
      showToast("Product deleted successfully!", "success")
    }
  }
}

function restockProduct(id) {
  const product = sampleProducts.find((p) => p.id === id)
  if (product) {
    const newStock = prompt(`Enter new stock quantity for ${product.name}:`, product.minStock * 2)
    if (newStock && !isNaN(newStock)) {
      product.stock = Number.parseInt(newStock)
      product.status = product.stock > product.minStock ? "Active" : "Low Stock"
      loadProductsTable()
      loadRecentActivity()
      updateDashboardStats()
      showToast(`Stock updated for ${product.name}`, "success")
    }
  }
}

// Orders Management
function loadOrdersTable(orders = sampleOrders) {
  const tbody = document.getElementById("ordersTableBody")
  if (!tbody) return

  tbody.innerHTML = orders
    .map(
      (order) => `
        <tr>
            <td><input type="checkbox" class="form-check-input" value="${order.id}"></td>
            <td><strong>${order.id}</strong></td>
            <td>
                <div>${order.customer}</div>
                <small class="text-muted">${order.email}</small>
            </td>
            <td>${formatDate(order.date)}</td>
            <td>${order.items}</td>
            <td>$${order.total.toFixed(2)}</td>
            <td>
                <span class="badge ${getOrderStatusBadgeClass(order.status)}">${order.status}</span>
            </td>
            <td>
                <button class="btn btn-sm btn-outline-primary action-btn" onclick="viewOrder('${order.id}')" title="View">
                    <i class="bi bi-eye"></i>
                </button>
                <div class="btn-group">
                    <button class="btn btn-sm btn-outline-secondary dropdown-toggle action-btn" data-bs-toggle="dropdown">
                        <i class="bi bi-three-dots"></i>
                    </button>
                    <ul class="dropdown-menu">
                        <li><a class="dropdown-item" href="#" onclick="updateOrderStatus('${order.id}', 'Pending')">Mark Pending</a></li>
                        <li><a class="dropdown-item" href="#" onclick="updateOrderStatus('${order.id}', 'Shipped')">Mark Shipped</a></li>
                        <li><a class="dropdown-item" href="#" onclick="updateOrderStatus('${order.id}', 'Delivered')">Mark Delivered</a></li>
                        <li><hr class="dropdown-divider"></li>
                        <li><a class="dropdown-item text-danger" href="#" onclick="updateOrderStatus('${order.id}', 'Cancelled')">Cancel Order</a></li>
                    </ul>
                </div>
            </td>
        </tr>
    `,
    )
    .join("")

  updateTableInfo("orders", orders.length, sampleOrders.length)
}

function filterOrders(status) {
  let filteredOrders = sampleOrders
  if (status !== "all") {
    filteredOrders = sampleOrders.filter((order) => order.status.toLowerCase() === status.toLowerCase())
  }
  loadOrdersTable(filteredOrders)
}

function viewOrder(orderId) {
  const order = sampleOrders.find((o) => o.id === orderId)
  if (order) {
    const modal = new bootstrap.Modal(document.getElementById("orderDetailsModal"))
    const content = document.getElementById("orderDetailsContent")

    content.innerHTML = `
      <div class="row">
        <div class="col-md-6">
          <h6>Order Information</h6>
          <p><strong>Order ID:</strong> ${order.id}</p>
          <p><strong>Date:</strong> ${formatDate(order.date)}</p>
          <p><strong>Status:</strong> <span class="badge ${getOrderStatusBadgeClass(order.status)}">${order.status}</span></p>
          <p><strong>Total:</strong> $${order.total.toFixed(2)}</p>
        </div>
        <div class="col-md-6">
          <h6>Customer Information</h6>
          <p><strong>Name:</strong> ${order.customer}</p>
          <p><strong>Email:</strong> ${order.email}</p>
        </div>
      </div>
      <hr>
      <h6>Order Items</h6>
      <div class="table-responsive">
        <table class="table table-sm">
          <thead>
            <tr>
              <th>Product</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            ${order.products
              .map(
                (product) => `
              <tr>
                <td>${product.name}</td>
                <td>${product.quantity}</td>
                <td>$${product.price.toFixed(2)}</td>
                <td>$${(product.quantity * product.price).toFixed(2)}</td>
              </tr>
            `,
              )
              .join("")}
          </tbody>
        </table>
      </div>
    `

    modal.show()
  }
}

function updateOrderStatus(orderId, newStatus) {
  const order = sampleOrders.find((o) => o.id === orderId)
  if (order) {
    order.status = newStatus
    loadOrdersTable()
    updateDashboardStats()
    showToast(`Order ${orderId} status updated to ${newStatus}`, "success")
  }
}

// Users Management
function loadUsersTable(users = sampleUsers) {
  const tbody = document.getElementById("usersTableBody")
  if (!tbody) return

  tbody.innerHTML = users
    .map(
      (user) => `
        <tr>
            <td><input type="checkbox" class="form-check-input" value="${user.id}"></td>
            <td><img src="${user.avatar}" alt="${user.name}" class="user-avatar"></td>
            <td>
                <strong>${user.name}</strong>
                <br><small class="text-muted">${user.orders} orders, $${user.totalSpent}</small>
            </td>
            <td>${user.email}</td>
            <td><span class="badge bg-info">${user.role}</span></td>
            <td>${formatDate(user.registrationDate)}</td>
            <td>${formatDate(user.lastLogin)}</td>
            <td>
                <span class="badge ${getUserStatusBadgeClass(user.status)}">${user.status}</span>
            </td>
            <td>
                <button class="btn btn-sm btn-outline-primary action-btn" onclick="viewUser(${user.id})" title="View">
                    <i class="bi bi-eye"></i>
                </button>
                <button class="btn btn-sm btn-outline-warning action-btn" onclick="toggleUserStatus(${user.id})" title="${user.status === "Active" ? "Ban" : "Unban"}">
                    <i class="bi bi-${user.status === "Active" ? "slash-circle" : "check-circle"}"></i>
                </button>
                <button class="btn btn-sm btn-outline-danger action-btn" onclick="deleteUser(${user.id})" title="Delete">
                    <i class="bi bi-trash"></i>
                </button>
            </td>
        </tr>
    `,
    )
    .join("")

  updateTableInfo("users", users.length, sampleUsers.length)
}

function filterUsers() {
  const searchTerm = document.getElementById("userSearch")?.value.toLowerCase() || ""
  const roleFilter = document.getElementById("roleFilter")?.value || ""
  const statusFilter = document.getElementById("userStatusFilter")?.value || ""

  const filteredUsers = sampleUsers.filter((user) => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm) || user.email.toLowerCase().includes(searchTerm)
    const matchesRole = !roleFilter || user.role === roleFilter
    const matchesStatus = !statusFilter || user.status === statusFilter

    return matchesSearch && matchesRole && matchesStatus
  })

  loadUsersTable(filteredUsers)
}

function handleAddUser(e) {
  e.preventDefault()

  const newUser = {
    id: sampleUsers.length + 1,
    name: document.getElementById("userName").value,
    email: document.getElementById("userEmail").value,
    phone: document.getElementById("userPhone").value,
    role: document.getElementById("userRole").value,
    registrationDate: new Date().toISOString().split("T")[0],
    lastLogin: "Never",
    status: "Active",
    avatar: `https://via.placeholder.com/40x40/c1edff/000000?text=${document.getElementById("userName").value.charAt(0)}`,
    orders: 0,
    totalSpent: 0,
  }

  sampleUsers.push(newUser)
  loadUsersTable()
  updateDashboardStats()

  // Close modal and reset form
  const modal = bootstrap.Modal.getInstance(document.getElementById("addUserModal"))
  modal.hide()
  e.target.reset()

  showToast("User added successfully!", "success")
}

function viewUser(userId) {
  const user = sampleUsers.find((u) => u.id === userId)
  if (user) {
    showToast(`Viewing user: ${user.name}`, "info")
  }
}

function toggleUserStatus(userId) {
  const user = sampleUsers.find((u) => u.id === userId)
  if (user) {
    user.status = user.status === "Active" ? "Banned" : "Active"
    loadUsersTable()
    updateDashboardStats()
    showToast(`User ${user.name} ${user.status.toLowerCase()}`, "success")
  }
}

function deleteUser(userId) {
  if (confirm("Are you sure you want to delete this user?")) {
    const index = sampleUsers.findIndex((u) => u.id === userId)
    if (index > -1) {
      const user = sampleUsers[index]
      sampleUsers.splice(index, 1)
      loadUsersTable()
      updateDashboardStats()
      showToast(`User ${user.name} deleted successfully!`, "success")
    }
  }
}

// Inventory Management
function loadInventoryTable() {
  const tbody = document.getElementById("inventoryTableBody")
  if (!tbody) return

  tbody.innerHTML = sampleProducts
    .map(
      (product) => `
        <tr class="${product.stock === 0 ? "table-danger" : product.stock <= product.minStock ? "table-warning" : ""}">
            <td>
                <div class="d-flex align-items-center">
                    <img src="${product.image}" alt="${product.name}" class="product-img me-2">
                    <div>
                        <strong>${product.name}</strong>
                        <br><small class="text-muted">${product.category}</small>
                    </div>
                </div>
            </td>
            <td><code>${product.sku}</code></td>
            <td>
                <span class="${product.stock <= product.minStock ? "text-danger fw-bold" : ""}">${product.stock}</span>
            </td>
            <td>${product.minStock}</td>
            <td>
                <span class="badge ${getInventoryStatusBadgeClass(product)}">${getInventoryStatus(product)}</span>
            </td>
            <td>${formatDate(product.dateAdded)}</td>
            <td>
                <button class="btn btn-sm btn-outline-primary action-btn" onclick="updateStock(${product.id})" title="Update Stock">
                    <i class="bi bi-arrow-repeat"></i>
                </button>
                <button class="btn btn-sm btn-outline-info action-btn" onclick="viewStockHistory(${product.id})" title="Stock History">
                    <i class="bi bi-clock-history"></i>
                </button>
            </td>
        </tr>
    `,
    )
    .join("")
}

function getInventoryStatus(product) {
  if (product.stock === 0) return "Out of Stock"
  if (product.stock <= product.minStock) return "Low Stock"
  return "In Stock"
}

function getInventoryStatusBadgeClass(product) {
  if (product.stock === 0) return "bg-danger"
  if (product.stock <= product.minStock) return "bg-warning"
  return "bg-success"
}

function updateStock(productId) {
  const product = sampleProducts.find((p) => p.id === productId)
  if (product) {
    const newStock = prompt(`Update stock for ${product.name}:`, product.stock)
    if (newStock !== null && !isNaN(newStock)) {
      product.stock = Number.parseInt(newStock)
      product.status = getInventoryStatus(product)
      loadInventoryTable()
      loadProductsTable()
      updateDashboardStats()
      showToast(`Stock updated for ${product.name}`, "success")
    }
  }
}

function viewStockHistory(productId) {
  const product = sampleProducts.find((p) => p.id === productId)
  if (product) {
    showToast(`Viewing stock history for ${product.name}`, "info")
  }
}

// Reviews Management
function loadReviewsContainer() {
  const container = document.getElementById("reviewsContainer")
  if (!container) return

  container.innerHTML = sampleReviews
    .map(
      (review) => `
    <div class="review-card">
      <div class="review-header">
        <div>
          <h6 class="mb-1">${review.productName}</h6>
          <div class="review-rating">
            ${generateStars(review.rating)}
          </div>
        </div>
        <span class="badge ${getReviewStatusBadgeClass(review.status)}">${review.status}</span>
      </div>
      <div class="review-content">
        "${review.comment}"
      </div>
      <div class="review-footer">
        <div>
          <strong>${review.customerName}</strong> • ${formatDate(review.date)}
          <br><small class="text-muted">${review.helpful} people found this helpful</small>
        </div>
        <div class="btn-group">
          ${
            review.status === "Pending"
              ? `
            <button class="btn btn-sm btn-success" onclick="approveReview(${review.id})">Approve</button>
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

function getReviewStatusBadgeClass(status) {
  const classes = {
    Approved: "bg-success",
    Pending: "bg-warning",
    Rejected: "bg-danger",
  }
  return classes[status] || "bg-secondary"
}

function approveReview(reviewId) {
  const review = sampleReviews.find((r) => r.id === reviewId)
  if (review) {
    review.status = "Approved"
    loadReviewsContainer()
    updateDashboardStats()
    showToast("Review approved!", "success")
  }
}

function rejectReview(reviewId) {
  const review = sampleReviews.find((r) => r.id === reviewId)
  if (review) {
    review.status = "Rejected"
    loadReviewsContainer()
    updateDashboardStats()
    showToast("Review rejected!", "warning")
  }
}

function deleteReview(reviewId) {
  if (confirm("Are you sure you want to delete this review?")) {
    const index = sampleReviews.findIndex((r) => r.id === reviewId)
    if (index > -1) {
      sampleReviews.splice(index, 1)
      loadReviewsContainer()
      updateDashboardStats()
      showToast("Review deleted!", "success")
    }
  }
}

// Utility Functions
function getStatusBadgeClass(status) {
  const classes = {
    Active: "bg-success",
    "Low Stock": "bg-warning",
    "Out of Stock": "bg-danger",
  }
  return classes[status] || "bg-secondary"
}

function getOrderStatusBadgeClass(status) {
  const classes = {
    Pending: "bg-warning",
    Shipped: "bg-info",
    Delivered: "bg-success",
    Cancelled: "bg-danger",
  }
  return classes[status] || "bg-secondary"
}

function getUserStatusBadgeClass(status) {
  const classes = {
    Active: "bg-success",
    Banned: "bg-danger",
    Pending: "bg-warning",
  }
  return classes[status] || "bg-secondary"
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

function updateTableInfo(type, showing, total) {
  const showingElement = document.getElementById(`${type}Showing`)
  const totalElement = document.getElementById(`${type}Total`)

  if (showingElement) showingElement.textContent = `1-${Math.min(showing, itemsPerPage)}`
  if (totalElement) totalElement.textContent = total
}

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

function handleGlobalSearch() {
  const searchTerm = document.getElementById("globalSearch").value.toLowerCase()
  if (!searchTerm) return

  // Search across products, orders, and users
  const productResults = sampleProducts.filter(
    (p) => p.name.toLowerCase().includes(searchTerm) || p.sku.toLowerCase().includes(searchTerm),
  )

  const orderResults = sampleOrders.filter(
    (o) => o.id.toLowerCase().includes(searchTerm) || o.customer.toLowerCase().includes(searchTerm),
  )

  const userResults = sampleUsers.filter(
    (u) => u.name.toLowerCase().includes(searchTerm) || u.email.toLowerCase().includes(searchTerm),
  )

  // Show search results (in a real app, you'd show a dropdown or modal)
  console.log("Search results:", { productResults, orderResults, userResults })
}

function showToast(message, type = "info") {
  // Create toast element
  const toast = document.createElement("div")
  toast.className = `toast align-items-center text-white bg-${type} border-0`
  toast.setAttribute("role", "alert")
  toast.innerHTML = `
    <div class="d-flex">
      <div class="toast-body">${message}</div>
      <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button>
    </div>
  `

  // Add to toast container or create one
  let toastContainer = document.querySelector(".toast-container")
  if (!toastContainer) {
    toastContainer = document.createElement("div")
    toastContainer.className = "toast-container position-fixed top-0 end-0 p-3"
    toastContainer.style.zIndex = "9999"
    document.body.appendChild(toastContainer)
  }

  toastContainer.appendChild(toast)

  // Initialize and show toast
  const bsToast = new bootstrap.Toast(toast)
  bsToast.show()

  // Remove toast element after it's hidden
  toast.addEventListener("hidden.bs.toast", () => {
    toast.remove()
  })
}

// Quick Actions
function quickAddProduct() {
  const modal = new bootstrap.Modal(document.getElementById("addProductModal"))
  modal.show()
}

function quickAddUser() {
  const modal = new bootstrap.Modal(document.getElementById("addUserModal"))
  modal.show()
}

function exportData() {
  showToast("Exporting data...", "info")
  // In a real app, you'd generate and download a file
}

function exportProducts() {
  showToast("Exporting products...", "info")
}

function exportOrders() {
  showToast("Exporting orders...", "info")
}

function exportUsers() {
  showToast("Exporting users...", "info")
}

function importProducts() {
  showToast("Import feature coming soon!", "info")
}

function createManualOrder() {
  showToast("Manual order creation coming soon!", "info")
}

function bulkUpdateStock() {
  showToast("Bulk stock update coming soon!", "info")
}

function showLowStockOnly() {
  const lowStockProducts = sampleProducts.filter((p) => p.stock <= p.minStock)
  loadInventoryTable(lowStockProducts)
}

function clearFilters() {
  document.getElementById("productSearch").value = ""
  document.getElementById("categoryFilter").value = ""
  document.getElementById("statusFilter").value = ""
  document.getElementById("sortBy").value = "name"
  loadProductsTable()
}

function clearUserFilters() {
  document.getElementById("userSearch").value = ""
  document.getElementById("roleFilter").value = ""
  document.getElementById("userStatusFilter").value = ""
  loadUsersTable()
}

function markAllRead() {
  document.querySelectorAll(".notification-item").forEach((item) => {
    item.classList.remove("unread")
  })
  updateNotificationCount()
  showToast("All notifications marked as read", "success")
}

function updateNotificationCount() {
  const unreadCount = document.querySelectorAll(".notification-item.unread").length
  document.querySelector(".notification-count").textContent = unreadCount
}

function showAllNotifications() {
  showToast("Showing all notifications...", "info")
}

function showProfile() {
  showToast("Profile page coming soon!", "info")
}

function showSettings() {
  showPage("settings")
}

function showHelp() {
  showToast("Help documentation coming soon!", "info")
}

function printOrder() {
  window.print()
}

function logout() {
  if (confirm("Are you sure you want to logout?")) {
    showToast("Logging out...", "info")
    setTimeout(() => {
      window.location.href = "login.html"
    }, 1000)
  }
}

// Load analytics data
function loadAnalyticsData() {
  // Update charts with new data if needed
  console.log("Loading analytics data...")
}

function loadInventoryData() {
  loadInventoryTable()
}

function loadReviewsData() {
  loadReviewsContainer()
}

// Initialize everything when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  // Set up period filters for dashboard
  document.querySelectorAll("[data-period]").forEach((btn) => {
    btn.addEventListener("click", function () {
      document.querySelectorAll("[data-period]").forEach((b) => b.classList.remove("active"))
      this.classList.add("active")

      // Update charts based on selected period
      const period = this.getAttribute("data-period")
      updateChartsForPeriod(period)
    })
  })

  // Set up review filters
  document.querySelectorAll("[data-review-filter]").forEach((btn) => {
    btn.addEventListener("click", function () {
      document.querySelectorAll("[data-review-filter]").forEach((b) => b.classList.remove("active"))
      this.classList.add("active")

      const filter = this.getAttribute("data-review-filter")
      filterReviews(filter)
    })
  })
})

function updateChartsForPeriod(period) {
  // Update chart data based on selected period
  console.log(`Updating charts for period: ${period}`)
}

function filterReviews(filter) {
  let filteredReviews = sampleReviews
  if (filter !== "all") {
    filteredReviews = sampleReviews.filter((review) => review.status.toLowerCase() === filter.toLowerCase())
  }

  // Update reviews display
  const container = document.getElementById("reviewsContainer")
  if (container) {
    container.innerHTML = filteredReviews
      .map(
        (review) => `
      <div class="review-card">
        <div class="review-header">
          <div>
            <h6 class="mb-1">${review.productName}</h6>
            <div class="review-rating">
              ${generateStars(review.rating)}
            </div>
          </div>
          <span class="badge ${getReviewStatusBadgeClass(review.status)}">${review.status}</span>
        </div>
        <div class="review-content">
          "${review.comment}"
        </div>
        <div class="review-footer">
          <div>
            <strong>${review.customerName}</strong> • ${formatDate(review.date)}
            <br><small class="text-muted">${review.helpful} people found this helpful</small>
          </div>
          <div class="btn-group">
            ${
              review.status === "Pending"
                ? `
              <button class="btn btn-sm btn-success" onclick="approveReview(${review.id})">Approve</button>
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
