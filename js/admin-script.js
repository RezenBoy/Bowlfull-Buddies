import { Chart } from "@/components/ui/chart"
// Admin Dashboard JavaScript

// Global variables
let currentPage = "dashboard"
const charts = {}

document.addEventListener("DOMContentLoaded", () => {
  initializeDashboard()
  initializeSidebar()
  initializeCharts()
  initializeNotifications()
  loadDashboardData()
})

// Dashboard initialization - from admin-dashboard.html embedded script
function initializeDashboard() {
  // Sidebar toggle for mobile
  const sidebarToggle = document.getElementById("sidebarToggle")
  const sidebar = document.getElementById("sidebar")

  if (sidebarToggle) {
    sidebarToggle.addEventListener("click", () => {
      sidebar.classList.toggle("show")
    })
  }

  // Close sidebar when clicking outside on mobile
  document.addEventListener("click", (e) => {
    if (window.innerWidth <= 768) {
      if (!sidebar.contains(e.target) && !sidebarToggle.contains(e.target)) {
        sidebar.classList.remove("show")
      }
    }
  })
}

// Sidebar navigation - from admin-dashboard.html embedded script
function initializeSidebar() {
  const navLinks = document.querySelectorAll(".sidebar .nav-link")

  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault()

      const page = this.getAttribute("data-page")
      if (page) {
        showPage(page)

        // Update active state
        navLinks.forEach((l) => l.classList.remove("active"))
        this.classList.add("active")
      }
    })
  })
}

// Page navigation - from admin-dashboard.html embedded script
function showPage(pageName) {
  // Hide all pages
  document.querySelectorAll(".page-content").forEach((page) => {
    page.classList.remove("active")
  })

  // Show selected page
  const targetPage = document.getElementById(`${pageName}-page`)
  if (targetPage) {
    targetPage.classList.add("active")
    currentPage = pageName

    // Load page-specific data
    loadPageData(pageName)
  }
}

// Charts initialization - from admin-dashboard.html embedded script
function initializeCharts() {
  // Sales Chart
  const salesCtx = document.getElementById("salesChart")
  if (salesCtx) {
    charts.sales = new Chart(salesCtx, {
      type: "line",
      data: {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
        datasets: [
          {
            label: "Sales ($)",
            data: [12000, 19000, 15000, 25000, 22000, 30000],
            borderColor: "#ffc5e7",
            backgroundColor: "rgba(255, 197, 231, 0.1)",
            borderWidth: 3,
            fill: true,
            tension: 0.4,
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
            grid: {
              color: "rgba(0, 0, 0, 0.05)",
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

  // Category Chart
  const categoryCtx = document.getElementById("categoryChart")
  if (categoryCtx) {
    charts.category = new Chart(categoryCtx, {
      type: "doughnut",
      data: {
        labels: ["Dog Products", "Cat Products", "Accessories", "Food"],
        datasets: [
          {
            data: [45, 35, 12, 8],
            backgroundColor: ["#c1edff", "#ffc5e7", "#f9f6d2", "#a8e6cf"],
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
            labels: {
              padding: 20,
              usePointStyle: true,
            },
          },
        },
      },
    })
  }
}

// Load dashboard data - from admin-dashboard.html embedded script
function loadDashboardData() {
  // Load recent orders
  loadRecentOrders()

  // Load low stock alerts
  loadLowStockAlerts()

  // Update stats with animation
  animateStats()
}

// Load recent orders - from admin-dashboard.html embedded script
function loadRecentOrders() {
  const container = document.getElementById("recentOrders")
  if (!container) return

  const orders = [
    {
      id: "#12345",
      customer: "Sarah Johnson",
      product: "Premium Dog Food",
      amount: "$45.99",
      status: "completed",
      time: "2 hours ago",
    },
    {
      id: "#12346",
      customer: "Mike Chen",
      product: "Cat Toy Set",
      amount: "$23.50",
      status: "processing",
      time: "4 hours ago",
    },
    {
      id: "#12347",
      customer: "Emily Davis",
      product: "Dog Leash",
      amount: "$18.99",
      status: "shipped",
      time: "6 hours ago",
    },
  ]

  const ordersHTML = orders
    .map(
      (order) => `
        <div class="activity-item">
            <div class="activity-icon bg-${getStatusColor(order.status)}">
                <i class="bi bi-receipt text-white"></i>
            </div>
            <div class="activity-content">
                <div class="activity-title">${order.id} - ${order.customer}</div>
                <div class="text-muted small">${order.product} - ${order.amount}</div>
                <div class="activity-time">${order.time}</div>
            </div>
            <span class="badge bg-${getStatusColor(order.status)}">${order.status}</span>
        </div>
    `,
    )
    .join("")

  container.innerHTML = ordersHTML
}

// Load low stock alerts - from admin-dashboard.html embedded script
function loadLowStockAlerts() {
  const container = document.getElementById("lowStockAlerts")
  if (!container) return

  const alerts = [
    {
      product: "Premium Dog Food",
      stock: 5,
      threshold: 10,
      category: "Food",
    },
    {
      product: "Cat Scratching Post",
      stock: 2,
      threshold: 5,
      category: "Accessories",
    },
    {
      product: "Dog Treats",
      stock: 8,
      threshold: 15,
      category: "Treats",
    },
  ]

  const alertsHTML = alerts
    .map(
      (alert) => `
        <div class="activity-item">
            <div class="activity-icon bg-warning">
                <i class="bi bi-exclamation-triangle text-white"></i>
            </div>
            <div class="activity-content">
                <div class="activity-title">${alert.product}</div>
                <div class="text-muted small">${alert.category} - ${alert.stock} left</div>
                <div class="activity-time">Threshold: ${alert.threshold}</div>
            </div>
            <button class="btn btn-sm btn-outline-primary" onclick="restockProduct('${alert.product}')">
                Restock
            </button>
        </div>
    `,
    )
    .join("")

  container.innerHTML = alertsHTML
}

// Animate statistics - from admin-dashboard.html embedded script
function animateStats() {
  const stats = [
    { id: "totalProducts", target: 1234 },
    { id: "totalOrders", target: 856 },
    { id: "totalUsers", target: 2891 },
  ]

  stats.forEach((stat) => {
    const element = document.getElementById(stat.id)
    if (element) {
      animateNumber(element, 0, stat.target, 2000)
    }
  })

  // Animate revenue separately (with $ sign)
  const revenueElement = document.getElementById("totalRevenue")
  if (revenueElement) {
    animateNumber(revenueElement, 0, 24567, 2000, "$")
  }
}

// Number animation utility - from admin-dashboard.html embedded script
function animateNumber(element, start, end, duration, prefix = "") {
  const startTime = performance.now()

  function update(currentTime) {
    const elapsed = currentTime - startTime
    const progress = Math.min(elapsed / duration, 1)

    const current = Math.floor(start + (end - start) * progress)
    element.textContent = prefix + current.toLocaleString()

    if (progress < 1) {
      requestAnimationFrame(update)
    }
  }

  requestAnimationFrame(update)
}

// Notification system - from admin-dashboard.html embedded script
function initializeNotifications() {
  // Mark notification as read
  window.markAllRead = () => {
    document.querySelectorAll(".notification-item.unread").forEach((item) => {
      item.classList.remove("unread")
    })

    // Update notification count
    const badge = document.querySelector(".notification-count")
    if (badge) {
      badge.textContent = "0"
      badge.style.display = "none"
    }

    showNotification("All notifications marked as read", "success")
  }

  // Show all notifications
  window.showAllNotifications = () => {
    showNotification("Opening notifications panel...", "info")
    // In a real app, this would open a dedicated notifications page
  }
}

// Quick actions - from admin-dashboard.html embedded script
window.quickAddProduct = () => {
  showNotification("Opening product creation form...", "info")
  // In a real app, this would open a modal or redirect to add product page
}

window.quickAddUser = () => {
  showNotification("Opening user creation form...", "info")
  // In a real app, this would open a modal or redirect to add user page
}

window.exportData = () => {
  showNotification("Preparing data export...", "info")
  // In a real app, this would trigger a data export
  setTimeout(() => {
    showNotification("Data export completed!", "success")
  }, 2000)
}

// Profile and settings - from admin-dashboard.html embedded script
window.showProfile = () => {
  showNotification("Opening profile settings...", "info")
}

window.showSettings = () => {
  showNotification("Opening system settings...", "info")
}

window.showHelp = () => {
  showNotification("Opening help documentation...", "info")
}

window.logout = () => {
  if (confirm("Are you sure you want to logout?")) {
    showNotification("Logging out...", "info")
    setTimeout(() => {
      window.location.href = "login.html"
    }, 1000)
  }
}

// Restock product function - from admin-dashboard.html embedded script
window.restockProduct = (productName) => {
  showNotification(`Restocking ${productName}...`, "info")
  setTimeout(() => {
    showNotification(`${productName} has been restocked!`, "success")
    loadLowStockAlerts() // Refresh the alerts
  }, 1500)
}

// Load page-specific data - from admin-dashboard.html embedded script
function loadPageData(pageName) {
  switch (pageName) {
    case "dashboard":
      loadDashboardData()
      break
    case "products":
      showNotification("Loading products...", "info")
      break
    case "orders":
      showNotification("Loading orders...", "info")
      break
    case "users":
      showNotification("Loading users...", "info")
      break
    case "analytics":
      showNotification("Loading analytics...", "info")
      break
    case "inventory":
      showNotification("Loading inventory...", "info")
      break
    case "reviews":
      showNotification("Loading reviews...", "info")
      break
    case "settings":
      showNotification("Loading settings...", "info")
      break
  }
}

// Utility functions

// Get status color for orders
function getStatusColor(status) {
  const colors = {
    completed: "success",
    processing: "warning",
    shipped: "info",
    cancelled: "danger",
  }
  return colors[status] || "secondary"
}

// Show notification (reused from main script)
function showNotification(message, type = "info") {
  const notification = document.createElement("div")
  notification.className = `notification notification-${type}`
  notification.innerHTML = `
        <div class="notification-content">
            <i class="bi bi-${getNotificationIcon(type)}"></i>
            <span>${message}</span>
        </div>
    `

  Object.assign(notification.style, {
    position: "fixed",
    top: "80px",
    right: "20px",
    padding: "1rem 1.5rem",
    borderRadius: "10px",
    color: "white",
    fontWeight: "500",
    zIndex: "9999",
    transform: "translateX(100%)",
    transition: "transform 0.3s ease",
    backgroundColor: getNotificationColor(type),
    boxShadow: "0 4px 15px rgba(0, 0, 0, 0.2)",
  })

  document.body.appendChild(notification)

  setTimeout(() => {
    notification.style.transform = "translateX(0)"
  }, 100)

  setTimeout(() => {
    notification.style.transform = "translateX(100%)"
    setTimeout(() => {
      if (document.body.contains(notification)) {
        document.body.removeChild(notification)
      }
    }, 300)
  }, 3000)
}

// Helper functions for notifications
function getNotificationIcon(type) {
  const icons = {
    success: "check-circle",
    error: "exclamation-circle",
    warning: "exclamation-triangle",
    info: "info-circle",
  }
  return icons[type] || icons.info
}

function getNotificationColor(type) {
  const colors = {
    success: "#28a745",
    error: "#dc3545",
    warning: "#ffc107",
    info: "#17a2b8",
  }
  return colors[type] || colors.info
}

// Global search functionality
document.addEventListener("DOMContentLoaded", () => {
  const globalSearch = document.getElementById("globalSearch")
  if (globalSearch) {
    globalSearch.addEventListener("input", function () {
      const searchTerm = this.value.toLowerCase()
      if (searchTerm.length > 2) {
        showNotification(`Searching for "${searchTerm}"...`, "info")
        // In a real app, this would perform actual search
      }
    })
  }
})

// Period filter functionality
document.addEventListener("DOMContentLoaded", () => {
  const periodBtns = document.querySelectorAll("[data-period]")
  periodBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      // Remove active class from all buttons
      periodBtns.forEach((b) => b.classList.remove("active"))

      // Add active class to clicked button
      this.classList.add("active")

      const period = this.getAttribute("data-period")
      showNotification(`Loading ${period} data...`, "info")

      // In a real app, this would update the charts and stats
      setTimeout(() => {
        showNotification(`${period} data loaded!`, "success")
      }, 1000)
    })
  })
})
