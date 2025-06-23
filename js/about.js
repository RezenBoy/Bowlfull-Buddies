// About page specific JavaScript

document.addEventListener("DOMContentLoaded", () => {
  initializeScrollAnimations()
  initializeMissionCards()
  initializeTeamCards()
})

// Scroll animations - from about.html embedded script
function initializeScrollAnimations() {
  const observerOptions = {
    threshold: 0.2,
    rootMargin: "0px 0px -50px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animate")
        observer.unobserve(entry.target)
      }
    })
  }, observerOptions)

  // Observe mission cards
  document.querySelectorAll("[data-animate]").forEach((el) => {
    observer.observe(el)
  })
}

// Mission cards animation - from about.html embedded script
function initializeMissionCards() {
  const missionCards = document.querySelectorAll(".mission-card")

  missionCards.forEach((card, index) => {
    // Add staggered animation delay
    card.style.animationDelay = `${index * 0.2}s`

    // Add hover effects
    card.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-15px) scale(1.02)"
    })

    card.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0) scale(1)"
    })
  })
}

// Team cards interaction - from about.html embedded script
function initializeTeamCards() {
  const teamCards = document.querySelectorAll(".team-card")

  teamCards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      const avatar = this.querySelector(".team-avatar")
      avatar.style.transform = "scale(1.1) rotate(5deg)"
    })

    card.addEventListener("mouseleave", function () {
      const avatar = this.querySelector(".team-avatar")
      avatar.style.transform = "scale(1) rotate(0deg)"
    })
  })
}

// Smooth scrolling for CTA button
document.addEventListener("DOMContentLoaded", () => {
  const ctaBtn = document.querySelector(".cta-btn")
  if (ctaBtn) {
    ctaBtn.addEventListener("click", (e) => {
      e.preventDefault()
      // Scroll to shop section or redirect to shop page
      window.location.href = "index.html#shop"
    })
  }
})
