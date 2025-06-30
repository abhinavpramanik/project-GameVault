
        // Password toggle functionality
        function togglePassword(inputId) {
            const passwordInput = document.getElementById(inputId);
            const toggleBtn = passwordInput.nextElementSibling;
            
            if (passwordInput.type === 'password') {
                passwordInput.type = 'text';
                toggleBtn.textContent = '👁️‍🗨️';
            } else {
                passwordInput.type = 'password';
                toggleBtn.textContent = '👁️';
            }
        }

        // Focus functions for cross-form navigation
        function focusLogin() {
            document.querySelector('.login-section').scrollIntoView({ 
                behavior: 'smooth',
                block: 'center'
            });
            document.getElementById('loginEmail').focus();
        }

        function focusSignup() {
            document.querySelector('.signup-section').scrollIntoView({ 
                behavior: 'smooth',
                block: 'center'
            });
            document.getElementById('firstName').focus();
        }

        // Form validation and submission
        // document.getElementById('signupForm').addEventListener('submit', function(e) {
        //     e.preventDefault();
            
        //     const password = document.getElementById('signupPassword').value;
        //     const confirmPassword = document.getElementById('confirmPassword').value;
            
        //     if (password !== confirmPassword) {
        //         alert('Passwords do not match!');
        //         return;
        //     }
            
        //     const submitBtn = this.querySelector('.submit-btn');
        //     const originalText = submitBtn.innerHTML;
            
        //     submitBtn.innerHTML = '<span>Creating Account...</span>';
        //     submitBtn.style.background = 'linear-gradient(45deg, #00ff88, #00d4ff)';
            
        //     // Simulate API call
        //     setTimeout(() => {
        //         submitBtn.innerHTML = '<span>✓ Account Created!</span>';
        //         submitBtn.style.background = 'linear-gradient(45deg, #00ff88, #00ff88)';
                
        //         setTimeout(() => {
        //             alert('Welcome to GameVault! Please check your email to verify your account.');
        //             submitBtn.innerHTML = originalText;
        //             submitBtn.style.background = 'linear-gradient(45deg, #00d4ff, #ff0080)';
        //         }, 2000);
        //     }, 1500);
        // });

        // document.getElementById('loginForm').addEventListener('submit', function(e) {
        //     e.preventDefault();
            
        //     const submitBtn = this.querySelector('.submit-btn');
        //     const originalText = submitBtn.innerHTML;
            
        //     submitBtn.innerHTML = '<span>Signing In...</span>';
        //     submitBtn.style.background = 'linear-gradient(45deg, #00ff88, #00d4ff)';
            
        //     // Simulate API call
        //     setTimeout(() => {
        //         submitBtn.innerHTML = '<span>✓ Welcome Back!</span>';
        //         submitBtn.style.background = 'linear-gradient(45deg, #00ff88, #00ff88)';
                
        //         setTimeout(() => {
        //             alert('Login successful! Redirecting to your dashboard...');
        //             submitBtn.innerHTML = originalText;
        //             submitBtn.style.background = 'linear-gradient(45deg, #00d4ff, #ff0080)';
        //         }, 2000);
        //     }, 1500);
        // });

        function showForgotPassword() {
            const email = prompt('Enter your email address to reset your password:');
            if (email) {
                alert(`Password reset link sent to ${email}. Check your inbox!`);
            }
        }

        // Real-time password strength indicator
        document.getElementById('signupPassword').addEventListener('input', function() {
            const password = this.value;
            const strength = getPasswordStrength(password);
            
            // You can add visual feedback here
            this.style.borderColor = strength.color;
        });

        function getPasswordStrength(password) {
            let score = 0;
            if (password.length >= 8) score++;
            if (/[A-Z]/.test(password)) score++;
            if (/[a-z]/.test(password)) score++;
            if (/\d/.test(password)) score++;
            if (/[^A-Za-z0-9]/.test(password)) score++;
            
            const levels = [
                { color: '#ff4444', text: 'Very Weak' },
                { color: '#ff8800', text: 'Weak' },
                { color: '#ffaa00', text: 'Fair' },
                { color: '#88ff00', text: 'Good' },
                { color: '#00ff88', text: 'Strong' }
            ];
            
            return levels[score] || levels[0];
        }

        // Form input animations
        document.querySelectorAll('.form-input').forEach(input => {
            input.addEventListener('focus', function() {
                this.parentElement.style.transform = 'scale(1.02)';
                this.parentElement.style.transition = 'transform 0.2s ease';
            });
            
            input.addEventListener('blur', function() {
                this.parentElement.style.transform = 'scale(1)';
            });
        });
