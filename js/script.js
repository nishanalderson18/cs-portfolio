document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contact-form');
    const formMessage = document.getElementById('form-message');
    const darkModeToggle = document.getElementById('dark-mode-toggle');

    // Dark Mode Toggle
    darkModeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        const isDarkMode = document.body.classList.contains('dark-mode');
        localStorage.setItem('darkMode', isDarkMode);
        updateDarkModeToggleText(isDarkMode);
    });

    // Initialize Dark Mode
    const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    if (savedDarkMode) {
        document.body.classList.add('dark-mode');
    }
    updateDarkModeToggleText(savedDarkMode);

    // Update Dark Mode Toggle Text
    function updateDarkModeToggleText(isDarkMode) {
        const toggleIcon = darkModeToggle.querySelector('.toggle-icon');
        const toggleText = darkModeToggle.querySelector('.toggle-text');
        toggleIcon.textContent = isDarkMode ? '☀️' : '🌙';
        toggleText.textContent = isDarkMode ? 'Light Mode' : 'Dark Mode';
    }

    // Form Submission - IMPORTANT: Let Netlify handle the form submission natively
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            // Don't prevent default - let the form submit naturally
            // e.preventDefault();
            
            // Get form data for validation only
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();
            
            // Reset message
            formMessage.textContent = '';
            formMessage.style.color = '';
            
            // Client-side validation
            if (!name || !email || !message) {
                e.preventDefault();
                formMessage.textContent = 'Please fill out all required fields.';
                formMessage.style.color = 'red';
                return false;
            }
            
            // Name validation
            const namePattern = /^[a-zA-Z]+(?:\s+[a-zA-Z]+)*$/;
            if (!namePattern.test(name) || name.length < 2 || name.length > 50) {
                e.preventDefault();
                formMessage.textContent = 'Name must be 2-50 letters only (spaces allowed between names).';
                formMessage.style.color = 'red';
                return false;
            }
            
            // Email validation
            const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            if (!emailPattern.test(email)) {
                e.preventDefault();
                formMessage.textContent = 'Please enter a valid email address.';
                formMessage.style.color = 'red';
                return false;
            }
            
            // Message length validation
            if (message.length < 10 || message.length > 500) {
                e.preventDefault();
                formMessage.textContent = 'Message must be 10-500 characters.';
                formMessage.style.color = 'red';
                return false;
            }
            
            // If validation passes, show sending message but let form submit naturally
            formMessage.textContent = 'Sending...';
            formMessage.style.color = 'blue';
            
            // The form will submit naturally to Netlify
            return true;
        });
    }
});