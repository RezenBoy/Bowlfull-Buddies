// Main JavaScript file for Bowlfull Buddies website

// DOM Content Loaded Event
document.addEventListener("DOMContentLoaded", () => {
  // Initialize all components
  initializeAnimations()
  initializeNavigation()
  initializeProductCards()
  initializeNewsletter()
  initializeScrollEffects()
})

window.addEventListener("scroll", handleScroll, { passive: true })

// Animation initialization - from index.html embedded script
function initializeAnimations() {
  // Intersection Observer for fade-in animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("fade-in-up")
        observer.unobserve(entry.target)
      }
    })
  }, observerOptions)

  // Observe all elements that should animate
  document.querySelectorAll(".category-card, .product-card, .testimonial-card").forEach((el) => {
    observer.observe(el)
  })
}

// Navigation functionality - from index.html embedded script
function initializeNavigation() {
  // Smooth scrolling for navigation links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()
      const target = document.querySelector(this.getAttribute("href"))
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        })
      }
    })
  })

  // Navbar background change on scroll
  window.addEventListener("scroll", () => {
    const navbar = document.querySelector(".navbar")
    if (window.scrollY > 50) {
      navbar.style.background = "rgba(255, 255, 255, 0.98)"
    } else {
      navbar.style.background = "rgba(255, 255, 255, 0.95)"
    }
  })
}

// Product card interactions - from index.html embedded script
function initializeProductCards() {
  // Add to cart functionality
  document.querySelectorAll(".btn-cart").forEach((button) => {
    button.addEventListener("click", function (e) {
      e.preventDefault()

      // Get product info
      const productCard = this.closest(".product-card")
      const productName = productCard.querySelector("h6").textContent
      const productPrice = productCard.querySelector(".product-price").textContent

      // Add bounce animation
      this.style.transform = "scale(0.95)"
      setTimeout(() => {
        this.style.transform = "scale(1)"
      }, 150)

      // Show success message
      showNotification(`${productName} added to cart!`, "success")

      // Update cart count (if cart counter exists)
      updateCartCount()
    })
  })
}

// Newsletter subscription - from index.html embedded script
function initializeNewsletter() {
  const newsletterForm = document.querySelector(".newsletter form")
  if (newsletterForm) {
    newsletterForm.addEventListener("submit", function (e) {
      e.preventDefault()

      const emailInput = this.querySelector('input[type="email"]')
      const email = emailInput.value.trim()

      if (validateEmail(email)) {
        // Simulate API call
        showNotification("Thank you for subscribing!", "success")
        emailInput.value = ""
      } else {
        showNotification("Please enter a valid email address.", "error")
      }
    })
  }
}

// Utility Functions

// Email validation
function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return re.test(email)
}

// Show notification
function showNotification(message, type = "info") {
  // Create notification element
  const notification = document.createElement("div")
  notification.className = `notification notification-${type}`
  notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${getNotificationIcon(type)}"></i>
            <span>${message}</span>
        </div>
    `

  // Add styles
  Object.assign(notification.style, {
    position: "fixed",
    top: "20px",
    right: "20px",
    padding: "1rem 1.5rem",
    borderRadius: "10px",
    color: "white",
    fontWeight: "500",
    zIndex: "9999",
    transform: "translateX(100%)",
    transition: "transform 0.3s ease",
    backgroundColor: getNotificationColor(type),
  })

  document.body.appendChild(notification)

  // Animate in
  setTimeout(() => {
    notification.style.transform = "translateX(0)"
  }, 100)

  // Remove after 3 seconds
  setTimeout(() => {
    notification.style.transform = "translateX(100%)"
    setTimeout(() => {
      document.body.removeChild(notification)
    }, 300)
  }, 3000)
}

// Get notification icon based on type
function getNotificationIcon(type) {
  const icons = {
    success: "check-circle",
    error: "exclamation-circle",
    warning: "exclamation-triangle",
    info: "info-circle",
  }
  return icons[type] || icons.info
}

// Get notification color based on type
function getNotificationColor(type) {
  const colors = {
    success: "#28a745",
    error: "#dc3545",
    warning: "#ffc107",
    info: "#17a2b8",
  }
  return colors[type] || colors.info
}

// Update cart count
function updateCartCount() {
  const cartCount = document.querySelector(".cart-count")
  if (cartCount) {
    const count = Number.parseInt(cartCount.textContent) || 0
    cartCount.textContent = count + 1

    // Add bounce animation
    cartCount.style.transform = "scale(1.2)"
    setTimeout(() => {
      cartCount.style.transform = "scale(1)"
    }, 200)
  }
}

// Create scroll to top button
function createScrollTopButton() {
  const button = document.createElement("button")
  button.innerHTML = '<i class="fas fa-arrow-up"></i>'
  button.className = "scroll-top-btn"

  Object.assign(button.style, {
    position: "fixed",
    bottom: "30px",
    right: "30px",
    width: "50px",
    height: "50px",
    borderRadius: "50%",
    border: "none",
    backgroundColor: "var(--highlight-pink)",
    color: "var(--text-dark)",
    fontSize: "1.2rem",
    cursor: "pointer",
    display: "none",
    zIndex: "1000",
    transition: "all 0.3s ease",
    boxShadow: "0 4px 15px rgba(0, 0, 0, 0.2)",
  })

  button.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  })

  button.addEventListener("mouseenter", function () {
    this.style.transform = "scale(1.1)"
    this.style.backgroundColor = "var(--accent-blue)"
  })

  button.addEventListener("mouseleave", function () {
    this.style.transform = "scale(1)"
    this.style.backgroundColor = "var(--highlight-pink)"
  })

  document.body.appendChild(button)
  return button
}

// Product search functionality
function initializeSearch() {
  const searchInput = document.querySelector("#productSearch")
  if (searchInput) {
    searchInput.addEventListener("input", function () {
      const searchTerm = this.value.toLowerCase()
      const products = document.querySelectorAll(".product-card")

      products.forEach((product) => {
        const productName = product.querySelector("h6").textContent.toLowerCase()
        if (productName.includes(searchTerm)) {
          product.style.display = "block"
        } else {
          product.style.display = "none"
        }
      })
    })
  }
}

// Initialize search if search input exists
document.addEventListener("DOMContentLoaded", () => {
  initializeSearch()
})

// Scroll effects - from index.html embedded script
let ticking = false

window.addEventListener("scroll", () => {
  if (!ticking) {
    window.requestAnimationFrame(() => {
      applyScrollEffects()
      ticking = false
    })
    ticking = true
  }
})

function applyScrollEffects() {
  const scrolled = window.pageYOffset
  const hero = document.querySelector(".hero")
  if (hero) {
    hero.style.transform = `translateY(${scrolled * 0.5}px)`
  }

  // Show/hide scroll to top
  const scrollTopBtn = document.querySelector(".scroll-top-btn")
  if (scrollTopBtn) {
    scrollTopBtn.style.display = scrolled > 300 ? "block" : "none"
  }

  // Navbar background toggle
  const navbar = document.querySelector(".navbar")
  if (navbar) {
    navbar.style.background = scrolled > 50
      ? "rgba(255, 255, 255, 0.98)"
      : "rgba(255, 255, 255, 0.95)"
  }
}
