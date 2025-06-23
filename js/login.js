// Login page specific JavaScript

document.addEventListener("DOMContentLoaded", () => {
  initializeTabs()
  initializeFormValidation()
  initializePetSelection()
  initializeFormSubmission()
})

// Tab switching functionality - from login.html embedded script
function initializeTabs() {
  const tabBtns = document.querySelectorAll(".tab-btn")
  const formContainers = document.querySelectorAll(".form-container")

  tabBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      const targetTab = this.getAttribute("data-tab")

      // Remove active class from all tabs and forms
      tabBtns.forEach((tab) => tab.classList.remove("active"))
      formContainers.forEach((form) => form.classList.remove("active"))

      // Add active class to clicked tab and corresponding form
      this.classList.add("active")
      document.getElementById(`${targetTab}-form`).classList.add("active")
    })
  })
}

// Form validation - from login.html embedded script
function initializeFormValidation() {
  const loginForm = document.getElementById("loginForm")
  const registerForm = document.getElementById("registerForm")

  // Login form validation
  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault()
      if (validateLoginForm()) {
        window.submitLoginForm()
      }
    })
  }

  // Register form validation
  if (registerForm) {
    registerForm.addEventListener("submit", (e) => {
      e.preventDefault()
      if (validateRegisterForm()) {
        window.submitRegisterForm()
      }
    })
  }

  // Real-time validation
  document.querySelectorAll("input").forEach((input) => {
    input.addEventListener("blur", function () {
      validateField(this)
    })
  })
}

// Login form validation - from login.html embedded script
function validateLoginForm() {
  const email = document.getElementById("loginEmail")
  const password = document.getElementById("loginPassword")
  let isValid = true

  // Validate email
  if (!email.value.trim()) {
    showFieldError(email, "Email is required")
    isValid = false
  } else if (!isValidEmail(email.value)) {
    showFieldError(email, "Please enter a valid email")
    isValid = false
  } else {
    clearFieldError(email)
  }

  // Validate password
  if (!password.value.trim()) {
    showFieldError(password, "Password is required")
    isValid = false
  } else {
    clearFieldError(password)
  }

  return isValid
}

// Register form validation - from login.html embedded script
function validateRegisterForm() {
  const fullName = document.getElementById("fullName")
  const email = document.getElementById("registerEmail")
  const password = document.getElementById("registerPassword")
  const confirmPassword = document.getElementById("confirmPassword")
  let isValid = true

  // Validate full name
  if (!fullName.value.trim()) {
    showFieldError(fullName, "Full name is required")
    isValid = false
  } else if (fullName.value.trim().length < 2) {
    showFieldError(fullName, "Name must be at least 2 characters")
    isValid = false
  } else {
    clearFieldError(fullName)
  }

  // Validate email
  if (!email.value.trim()) {
    showFieldError(email, "Email is required")
    isValid = false
  } else if (!isValidEmail(email.value)) {
    showFieldError(email, "Please enter a valid email")
    isValid = false
  } else {
    clearFieldError(email)
  }

  // Validate password
  if (!password.value.trim()) {
    showFieldError(password, "Password is required")
    isValid = false
  } else if (password.value.length < 6) {
    showFieldError(password, "Password must be at least 6 characters")
    isValid = false
  } else {
    clearFieldError(password)
  }

  // Validate confirm password
  if (!confirmPassword.value.trim()) {
    showFieldError(confirmPassword, "Please confirm your password")
    isValid = false
  } else if (password.value !== confirmPassword.value) {
    showFieldError(confirmPassword, "Passwords do not match")
    isValid = false
  } else {
    clearFieldError(confirmPassword)
  }

  return isValid
}

// Pet selection functionality - from login.html embedded script
function initializePetSelection() {
  const petOptions = document.querySelectorAll(".pet-option")

  petOptions.forEach((option) => {
    option.addEventListener("click", function () {
      // Remove selected class from all options
      petOptions.forEach((opt) => opt.classList.remove("selected"))

      // Add selected class to clicked option
      this.classList.add("selected")

      // Store selection
      const petType = this.getAttribute("data-pet")
      localStorage.setItem("selectedPetType", petType)
    })
  })
}

// Form submission - from login.html embedded script
function initializeFormSubmission() {
  // Login form submission
  window.submitLoginForm = () => {
    const submitBtn = document.querySelector("#loginForm .btn-primary-custom")
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

      // Redirect to dashboard or home
      showNotification("Login successful! Redirecting...", "success")
      setTimeout(() => {
        window.location.href = "index.html"
      }, 1500)
    }, 2000)
  }

  // Register form submission
  window.submitRegisterForm = () => {
    const submitBtn = document.querySelector("#registerForm .btn-primary-custom")
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

      // Show success and redirect
      showNotification("Account created successfully! Welcome to Bowlfull Buddies!", "success")
      setTimeout(() => {
        window.location.href = "index.html"
      }, 1500)
    }, 2000)
  }
}

// Utility functions

// Email validation
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

// Field validation
function validateField(field) {
  const value = field.value.trim()

  switch (field.id) {
    case "loginEmail":
    case "registerEmail":
      if (!value) {
        showFieldError(field, "Email is required")
        return false
      } else if (!isValidEmail(value)) {
        showFieldError(field, "Please enter a valid email")
        return false
      }
      break

    case "loginPassword":
    case "registerPassword":
      if (!value) {
        showFieldError(field, "Password is required")
        return false
      } else if (field.id === "registerPassword" && value.length < 6) {
        showFieldError(field, "Password must be at least 6 characters")
        return false
      }
      break

    case "fullName":
      if (!value) {
        showFieldError(field, "Full name is required")
        return false
      } else if (value.length < 2) {
        showFieldError(field, "Name must be at least 2 characters")
        return false
      }
      break

    case "confirmPassword":
      const password = document.getElementById("registerPassword").value
      if (!value) {
        showFieldError(field, "Please confirm your password")
        return false
      } else if (value !== password) {
        showFieldError(field, "Passwords do not match")
        return false
      }
      break
  }

  clearFieldError(field)
  return true
}

// Show field error
function showFieldError(field, message) {
  field.style.borderColor = "#dc3545"

  // Create or update error message
  let errorMsg = field.parentNode.querySelector(".error-message")
  if (!errorMsg) {
    errorMsg = document.createElement("div")
    errorMsg.className = "error-message"
    errorMsg.style.cssText = "color: #dc3545; font-size: 0.875rem; margin-top: 0.25rem;"
    field.parentNode.appendChild(errorMsg)
  }
  errorMsg.textContent = message
}

// Clear field error
function clearFieldError(field) {
  field.style.borderColor = "#e9ecef"

  const errorMsg = field.parentNode.querySelector(".error-message")
  if (errorMsg) {
    errorMsg.remove()
  }
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
