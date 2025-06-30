
        function openImageModal() {
            document.getElementById('imageModal').classList.remove('hidden');
        }

        function closeImageModal() {
            document.getElementById('imageModal').classList.add('hidden');
            document.getElementById('imagePreview').classList.add('hidden');
            document.getElementById('imageUpload').value = '';
        }

        function previewImage(event) {
            const file = event.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    const preview = document.getElementById('imagePreview');
                    preview.src = e.target.result;
                    preview.classList.remove('hidden');
                };
                reader.readAsDataURL(file);
            }
        }

        function updateProfilePicture() {
            const preview = document.getElementById('imagePreview');
            if (!preview.classList.contains('hidden')) {
                document.getElementById('profileImage').src = preview.src;
                closeImageModal();
                alert('Profile picture updated!');
            } else {
                alert('Please select an image first.');
            }
        }

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