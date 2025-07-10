
// Thumbnail click changes the emoji in main image
function changeImage(emoji) {
    const mainImage = document.getElementById('main-image');
    mainImage.innerHTML = emoji + mainImage.innerHTML.slice(2); // Keep badge
    document.querySelectorAll('.thumbnail').forEach(thumb => thumb.classList.remove('active'));
    event.currentTarget.classList.add('active');
}

// Size selection
function selectSize(element) {
    document.querySelectorAll('.size-option').forEach(el => el.classList.remove('active'));
    element.classList.add('active');
}

// Quantity controls
function increaseQuantity() {
    const qtyInput = document.getElementById('quantity');
    qtyInput.value = parseInt(qtyInput.value) + 1;
}

function decreaseQuantity() {
    const qtyInput = document.getElementById('quantity');
    const current = parseInt(qtyInput.value);
    if (current > 1) {
        qtyInput.value = current - 1;
    }
}

// Add to cart
function addToCart() {
    const size = document.querySelector('.size-option.active')?.textContent || 'Medium';
    const quantity = document.getElementById('quantity').value;
    alert(`Added ${quantity} ${size} Premium Steel Bowl(s) to cart!`);
}

// Wishlist toggle
function toggleWishlist(btn) {
    btn.classList.toggle('active');
    if (btn.classList.contains('active')) {
        alert("Added to wishlist!");
    } else {
        alert("Removed from wishlist!");
    }
}
