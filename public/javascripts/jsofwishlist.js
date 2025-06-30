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