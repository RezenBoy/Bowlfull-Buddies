
// Add to Cart functionality
document.querySelectorAll('.btn-cart').forEach(button => {
  button.addEventListener('click', function () {
    // Add bounce animation
    this.style.transform = 'scale(0.95)';
    setTimeout(() => {
      this.style.transform = 'scale(1)';
    }, 150);

    // Change button text temporarily
    const originalText = this.innerHTML;
    this.innerHTML = '<i class="fas fa-check"></i> Added!';
    this.style.backgroundColor = '#28a745';

    setTimeout(() => {
      this.innerHTML = originalText;
      this.style.backgroundColor = '';
    }, 2000);
  });
});

// Newsletter subscription
document.querySelector('.btn-subscribe').addEventListener('click', function () {
  const email = document.querySelector('input[type="email"]').value;
  if (email) {
    alert('Thank you for subscribing! 🐾');
    document.querySelector('input[type="email"]').value = '';
  } else {
    alert('Please enter your email address.');
  }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth'
      });
    }
  });
});

// Add scroll effect to navbar
window.addEventListener('scroll', function () {
  const navbar = document.querySelector('.navbar');
  if (window.scrollY > 50) {
    navbar.style.backgroundColor = 'rgba(249, 246, 210, 0.98)';
  } else {
    navbar.style.backgroundColor = 'rgba(249, 246, 210, 0.95)';
  }
});

// Intersection Observer for fade-in animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function (entries) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

// Observe all fade-in-up elements
document.querySelectorAll('.fade-in-up').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(30px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  observer.observe(el);
});
