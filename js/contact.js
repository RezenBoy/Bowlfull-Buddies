// Contact page specific JavaScript

document.addEventListener("DOMContentLoaded", () => {
  initializeContactForm()
  initializeAnimations()
  initializeCopyToClipboard()
})

// Contact form initialization - from contact.html embedded script
function initializeContactForm() {
  const form = document.getElementById("contactForm")
  const alertContainer = document.getElementById("alertContainer")

  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault()

      if (validateContactForm()) {
        submitContactForm()
      }
    })

    // Real-time validation
    const inputs = form.querySelectorAll("input, select, textarea")
    inputs.forEach((input) => {
      input.addEventListener("blur", function () {
        validateField(this)
      })

      input.addEventListener("input", function () {
        if (this.classList.contains("is-invalid")) {
          validateField(this)
        }
      })
    })
  }
}

// Form validation - from contact.html embedded script
function validateContactForm() {
  const form = document.getElementById("contactForm")
  let isValid = true

  // Validate name
  const name = document.getElementById("name")
  if (!name.value.trim()) {
    showFieldError(name, "Name is required")
    isValid = false
  } else if (name.value.trim().length < 2) {
    showFieldError(name, "Name must be at least 2 characters")
    isValid = false
  } else {
    clearFieldError(name)
  }

  // Validate email
  const email = document.getElementById("email")
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!email.value.trim()) {
    showFieldError(email, "Email is required")
    isValid = false
  } else if (!emailRegex.test(email.value)) {
    showFieldError(email, "Please enter a valid email address")
    isValid = false
  } else {
    clearFieldError(email)
  }

  // Validate subject
  const subject = document.getElementById("subject")
  if (!subject.value) {
    showFieldError(subject, "Please select a subject")
    isValid = false
  } else {
    clearFieldError(subject)
  }

  // Validate message
  const message = document.getElementById("message")
  if (!message.value.trim()) {
    showFieldError(message, "Message is required")
    isValid = false
  } else if (message.value.trim().length < 10) {
    showFieldError(message, "Message must be at least 10 characters")
    isValid = false
  } else {
    clearFieldError(message)
  }

  return isValid
}

// Individual field validation - from contact.html embedded script
function validateField(field) {
  const value = field.value.trim()

  switch (field.id) {
    case "name":
      if (!value) {
        showFieldError(field, "Name is required")
        return false
      } else if (value.length < 2) {
        showFieldError(field, "Name must be at least 2 characters")
        return false
      }
      break

    case "email":
    case "registerEmail":
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!value) {
        showFieldError(field, "Email is required")
        return false
      } else if (!emailRegex.test(value)) {
        showFieldError(field, "Please enter a valid email address")
        return false
      }
      break

    case "subject":
      if (!value) {
        showFieldError(field, "Please select a subject")
        return false
      }
      break

    case "message":
      if (!value) {
        showFieldError(field, "Message is required")
        return false
      } else if (value.length < 10) {
        showFieldError(field, "Message must be at least 10 characters")
        return false
      }
      break
  }

  clearFieldError(field)
  return true
}

// Show field error - from contact.html embedded script
function showFieldError(field, message) {
  field.classList.add("is-invalid")
  const feedback = field.nextElementSibling
  if (feedback && feedback.classList.contains("invalid-feedback")) {
    feedback.textContent = message
  }
}

// Clear field error - from contact.html embedded script
function clearFieldError(field) {
  field.classList.remove("is-invalid")
  const feedback = field.nextElementSibling
  if (feedback && feedback.classList.contains("invalid-feedback")) {
    feedback.textContent = ""
  }
}

// Submit contact form - from contact.html embedded script
function submitContactForm() {
  const submitBtn = document.querySelector(".btn-submit")
  const originalText = submitBtn.innerHTML

  // Show loading state
  submitBtn.classList.add("btn-loading")
  submitBtn.disabled = true

  // Simulate API call
  setTimeout(() => {
    // Reset button
    submitBtn.classList.remove("btn-loading")
    submitBtn.disabled = false
    submitBtn.innerHTML = originalText

    // Show success message
    showAlert("Thank you for your message! We'll get back to you within 24 hours.", "success")

    // Reset form
    document.getElementById("contactForm").reset()

    // Clear any validation states
    document.querySelectorAll(".is-invalid").forEach((field) => {
      field.classList.remove("is-invalid")
    })
  }, 2000)
}

// Show alert message - from contact.html embedded script
function showAlert(message, type) {
  const alertContainer = document.getElementById("alertContainer")
  const alertClass = type === "success" ? "alert-success-custom" : "alert-error-custom"

  const alertHTML = `
        <div class="alert ${alertClass} alert-custom alert-dismissible fade show" role="alert">
            <i class="fas fa-${type === "success" ? "check-circle" : "exclamation-circle"} me-2"></i>
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        </div>
    `

  alertContainer.innerHTML = alertHTML

  // Auto-dismiss after 5 seconds
  setTimeout(() => {
    const alert = alertContainer.querySelector(".alert")
    if (alert) {
      alert.classList.remove("show")
      setTimeout(() => {
        alertContainer.innerHTML = ""
      }, 150)
    }
  }, 5000)
}

// Copy to clipboard functionality - from contact.html embedded script
function initializeCopyToClipboard() {
  // This function is called when contact info items are clicked
  window.copyToClipboard = (text) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        showNotification("Copied to clipboard!", "success")
      })
      .catch(() => {
        // Fallback for older browsers
        const textArea = document.createElement("textarea")
        textArea.value = text
        document.body.appendChild(textArea)
        textArea.select()
        document.execCommand("copy")
        document.body.removeChild(textArea)
        showNotification("Copied to clipboard!", "success")
      })
  }
}

// Animation initialization - from contact.html embedded script
function initializeAnimations() {
  // Scroll reveal animation
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("revealed")
        observer.unobserve(entry.target)
      }
    })
  }, observerOptions)

  // Observe elements for scroll reveal
  document.querySelectorAll(".scroll-reveal").forEach((el) => {
    observer.observe(el)
  })
}

// Show notification (reused from main script)
function showNotification(message, type = "info") {
  const notification = document.createElement("div")
  notification.className = `notification notification-${type}`
  notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${getNotificationIcon(type)}"></i>
            <span>${message}</span>
        </div>
    `

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
