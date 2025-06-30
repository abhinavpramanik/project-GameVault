
        function removeItem(button) {
            const cartItem = button.closest('.cart-item');
            
            // Add removal animation
            cartItem.style.transform = 'translateX(-100%)';
            cartItem.style.opacity = '0';
            
            setTimeout(() => {
                cartItem.remove();
                updateCartTotals();
                checkEmptyCart();
            }, 300);
        }

        // function updateCartTotals() {
        //     const cartItems = document.querySelectorAll('.cart-item');
        //     let subtotal = 0;
            
        //     cartItems.forEach(item => {
        //         const price = parseFloat(item.dataset.price);
        //         const quantity = parseInt(item.querySelector('.quantity-display').textContent);
        //         subtotal += price * quantity;
        //     });
            
        //     const tax = subtotal * TAX_RATE;
        //     const total = subtotal + PLATFORM_FEE + DELIVERY_FEE + tax;
            
        //     // Update display
        //     document.getElementById('subtotal').textContent = `$${subtotal.toFixed(2)}`;
        //     document.getElementById('tax').textContent = `$${tax.toFixed(2)}`;
        //     document.getElementById('total').textContent = `$${total.toFixed(2)}`;
        // }

        function checkEmptyCart() {
            const cartItems = document.querySelectorAll('.cart-item');
            const cartContainer = document.getElementById('cartItems');
            
            if (cartItems.length === 0) {
                cartContainer.innerHTML = `
                    <div class="empty-cart">
                        <div class="empty-cart-icon">🛒</div>
                        <h2>Your cart is empty</h2>
                        <p>Add some amazing gaming gear to get started!</p>
                        <a href="#products" class="continue-shopping">Continue Shopping</a>
                    </div>
                `;
                
                // Update totals to zero
                document.getElementById('subtotal').textContent = '$0.00';
                document.getElementById('tax').textContent = '$0.00';
                document.getElementById('total').textContent = `$${(PLATFORM_FEE + DELIVERY_FEE).toFixed(2)}`;
            }
        }

        function proceedToCheckout() {
            const cartItems = document.querySelectorAll('.cart-item');
            
            if (cartItems.length === 0) {
                alert('Your cart is empty! Please add some items before checkout.');
                return;
            }
            
            // Show loading state
            const button = document.querySelector('.checkout-btn');
            const originalText = button.textContent;
            button.textContent = '🔄 Processing...';
            button.disabled = true;
            
            // Simulate checkout process
            setTimeout(() => {
                alert('Redirecting to secure checkout...');
                button.textContent = originalText;
                button.disabled = false;
                // Here you would redirect to your actual checkout page
                // window.location.href = '/checkout';
            }, 2000);
        }

        
        // Auto-save cart (in a real app, you'd send this to your backend)
        function saveCart() {
            const cartData = [];
            document.querySelectorAll('.cart-item').forEach(item => {
                const name = item.querySelector('.item-name').textContent;
                const price = parseFloat(item.dataset.price);
                const quantity = parseInt(item.querySelector('.quantity-display').textContent);
                cartData.push({ name, price, quantity });
            });
            
            // In a real EJS app, you'd send this to your backend
            console.log('Cart saved:', cartData);
        }

        // Save cart whenever quantities change
        document.addEventListener('click', function(e) {
            if (e.target.classList.contains('quantity-btn')) {
                setTimeout(saveCart, 100);
            }
        });


// Hamburger menu toggle
const hamburgerBtn = document.getElementById('hamburger-btn');
const navLinks = document.getElementById('nav-links');
if (hamburgerBtn && navLinks) {
    hamburgerBtn.addEventListener('click', function() {
        this.classList.toggle('active');
        navLinks.classList.toggle('open');
    });
    // Optional: close menu when a link is clicked
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            hamburgerBtn.classList.remove('active');
            navLinks.classList.remove('open');
        });
    });
}