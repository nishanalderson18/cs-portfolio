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

    // Form Submission
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Get form data
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();

        // Reset message
        formMessage.textContent = '';
        formMessage.style.color = '';

        // Client-side validation
        try {
            // Basic field presence
            if (!name || !email || !message) {
                formMessage.textContent = 'Please fill out all required fields.';
                formMessage.style.color = 'red';
                return;
            }

            // Name validation
            const namePattern = /^[a-zA-Z]+(?:\s+[a-zA-Z]+)*$/;
            if (!namePattern.test(name) || name.length < 2 || name.length > 50) {
                formMessage.textContent = 'Name must be 2-50 letters only (spaces allowed between names).';
                formMessage.style.color = 'red';
                return;
            }

            // Email validation
            const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            if (!emailPattern.test(email)) {
                formMessage.textContent = 'Please enter a valid email address.';
                formMessage.style.color = 'red';
                return;
            }

            // Message length validation
            if (message.length < 10 || message.length > 500) {
                formMessage.textContent = 'Message must be 10-500 characters.';
                formMessage.style.color = 'red';
                return;
            }

            // If validation passes, submit the form
            formMessage.textContent = 'Sending...';
            formMessage.style.color = 'blue';
            contactForm.querySelector('button').disabled = true;

            // Submit to Netlify
            const formData = new URLSearchParams(new FormData(contactForm));
            const response = await fetch('/', {
                method: 'POST',
                body: formData,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            });

            if (response.ok) {
                formMessage.textContent = 'Message sent successfully!';
                formMessage.style.color = 'green';
                contactForm.reset();
            } else {
                formMessage.textContent = 'Failed to send message. Please try again.';
                formMessage.style.color = 'red';
                console.error('Response status:', response.status);
                console.error('Response text:', await response.text());
            }
        } catch (error) {
            formMessage.textContent = 'An error occurred. Please try again.';
            formMessage.style.color = 'red';
            console.error('Form submission error:', error);
        } finally {
            contactForm.querySelector('button').disabled = false;
        }
    });
});