document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contact-form');
    const formMessage = document.getElementById('form-message');
    const successMessage = document.getElementById('success-message');
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    const githubIcon = document.querySelector('.social-links .github i'); // Select GitHub icon

    // Check for success parameter in URL and ONLY SHOW SUCCESS MESSAGE if it exists
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('success') === 'true') {
        // Hide the form and show success message
        if (contactForm) contactForm.style.display = 'none';
        if (successMessage) successMessage.style.display = 'block';
        
        // Scroll to the success message
        if (successMessage) {
            successMessage.scrollIntoView({ behavior: 'smooth' });
        }
    } else {
        // Make sure success message is hidden if no success parameter
        if (successMessage) successMessage.style.display = 'none';
        if (contactForm) contactForm.style.display = 'block';
    }

    // Dark Mode Toggle
    darkModeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        const isDarkMode = document.body.classList.contains('dark-mode');
        localStorage.setItem('darkMode', isDarkMode);
        updateDarkModeToggleText(isDarkMode);
        updateGitHubIconColor(isDarkMode); // Update GitHub icon color
    });

    // Initialize Dark Mode
    const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    if (savedDarkMode) {
        document.body.classList.add('dark-mode');
    }
    updateDarkModeToggleText(savedDarkMode);
    updateGitHubIconColor(savedDarkMode); // Initialize GitHub icon color

    // Update Dark Mode Toggle Text
    function updateDarkModeToggleText(isDarkMode) {
        const toggleIcon = darkModeToggle.querySelector('.toggle-icon');
        const toggleText = darkModeToggle.querySelector('.toggle-text');
        toggleIcon.textContent = isDarkMode ? '☀️' : '🌙';
        toggleText.textContent = isDarkMode ? 'Light Mode' : 'Dark Mode';
    }

    // Update GitHub Icon Color
    function updateGitHubIconColor(isDarkMode) {
        if (githubIcon) {
            githubIcon.style.color = isDarkMode ? '#f4f4f4' : '#333'; // Light color for dark mode, dark color for light mode
        }
    }

    // Form Validation
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            // Get form data for validation
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
            
            // If validation passes, show sending message
            formMessage.textContent = 'Sending...';
            formMessage.style.color = 'blue';
            
            // Let the form submit normally
            return true;
        });
    }
});