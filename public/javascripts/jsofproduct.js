
        function toggleSidebar() {
            const sidebar = document.getElementById('sidebar');
            sidebar.classList.toggle('collapsed');
        }

        function toggleCategory(header) {
            const category = header.parentElement;
            const allCategories = document.querySelectorAll('.category');
            
            // Close other categories
            allCategories.forEach(cat => {
                if (cat !== category) {
                    cat.classList.remove('active');
                }
            });
            
            // Toggle current category
            category.classList.toggle('active');
        }

        // Add click events to category items
        document.querySelectorAll('.category-item').forEach(item => {
            item.addEventListener('click', function() {
                // Remove active class from all items
                document.querySelectorAll('.category-item').forEach(i => i.classList.remove('active'));
                // Add active class to clicked item
                this.classList.add('active');
                // Here you would filter products based on the selected category
                console.log('Selected category:', this.textContent);
            });
        });

        // Add to cart functionality
        document.querySelectorAll('.add-to-cart').forEach(button => {
            button.addEventListener('click', function() {
                this.textContent = 'Added!';
                this.style.background = 'linear-gradient(45deg, #00ff00, #00aa00)';
                setTimeout(() => {
                    this.textContent = 'Add to Cart';
                    this.style.background = 'linear-gradient(45deg, #ff006e, #8338ec)';
                }, 5000);
            });
        });

        // Search functionality
        const searchInput = document.querySelector('.search-bar input');
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            const products = document.querySelectorAll('.product-card');
            
            products.forEach(product => {
                const title = product.querySelector('.product-title').textContent.toLowerCase();
                const description = product.querySelector('.product-description').textContent.toLowerCase();
                
                if (title.includes(searchTerm) || description.includes(searchTerm)) {
                    product.style.display = 'block';
                } else {
                    product.style.display = searchTerm === '' ? 'block' : 'none';
                }
            });
        });


//     function toggleCategory(clickedHeader) {
//     // Remove active from all category headers
//     document.querySelectorAll('.category-header').forEach(header => {
//         header.classList.remove('active');
//     });
//     // Add active to the clicked one
//     clickedHeader.classList.add('active');
// }


// Hamburger menu toggle

function toggleCategory(header) {
    // Remove active from all category headers
    document.querySelectorAll('.category-header').forEach(h => h.classList.remove('active'));
    // Add active to the clicked one
    header.classList.add('active');
    // Get category from data attribute
    const category = header.getAttribute('data-category');
    filterCategory(category);
}

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

function filterCategory(category) {
    const products = document.querySelectorAll('.product-card');
    products.forEach(product => {
        if (category === 'All' || product.getAttribute('data-category') === category) {
            product.style.display = 'block';
        } else {
            product.style.display = 'none';
        }
    });
}

function showAllProducts(){
    const products = document.querySelectorAll('.product-card');
    products.forEach(product => {
        product.style.display = 'block';
    });

    document.querySelectorAll('.category-header').forEach(h => h.classList.remove('active'));
}