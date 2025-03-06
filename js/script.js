// Scroll animations for skills section
const skillCards = document.querySelectorAll('.skill-card');

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        }
    });
});

skillCards.forEach(card => {
    card.classList.add('hidden');
    observer.observe(card);
});
/* Dark mode toggle
const darkModeToggle = document.getElementById('dark-mode-toggle');

if (darkModeToggle) {
    darkModeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        // Save user preference in localStorage
        const isDarkMode = document.body.classList.contains('dark-mode');
        localStorage.setItem('darkMode', isDarkMode);
        darkModeToggle.textContent = isDarkMode ? 'Light Mode' : 'Dark Mode';
    });

    // Check for saved user preference
    const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    if (savedDarkMode) {
        document.body.classList.add('dark-mode');
        darkModeToggle.textContent = 'Light Mode';
    }
} else {
    console.error('Dark mode toggle button not found!');
} 
*/
// Dark mode toggle
const darkModeToggle = document.getElementById('dark-mode-toggle');

if (darkModeToggle) {
    darkModeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        // Save user preference in localStorage
        const isDarkMode = document.body.classList.contains('dark-mode');
        localStorage.setItem('darkMode', isDarkMode);

        // Update button text and icon
        const toggleIcon = darkModeToggle.querySelector('.toggle-icon');
        const toggleText = darkModeToggle.querySelector('.toggle-text');
        if (isDarkMode) {
            toggleIcon.textContent = '☀️';
            toggleText.textContent = 'Light Mode';
        } else {
            toggleIcon.textContent = '🌙';
            toggleText.textContent = 'Dark Mode';
        }
    });

    // Check for saved user preference
    const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    if (savedDarkMode) {
        document.body.classList.add('dark-mode');
        const toggleIcon = darkModeToggle.querySelector('.toggle-icon');
        const toggleText = darkModeToggle.querySelector('.toggle-text');
        toggleIcon.textContent = '☀️';
        toggleText.textContent = 'Light Mode';
    }
} else {
    console.error('Dark mode toggle button not found!');
}

// Form validation
document.getElementById('contact-form').addEventListener('submit', function (e) {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    // Basic validation
    if (!name || !email || !message) {
        document.getElementById('form-message').textContent = 'Please fill out all fields.';
        document.getElementById('form-message').style.color = 'red';
        return;
    }

    // Email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        document.getElementById('form-message').textContent = 'Please enter a valid email address.';
        document.getElementById('form-message').style.color = 'red';
        return;
    }

    // Sanitize inputs (basic example)
    const sanitizedMessage = message.replace(/</g, '&lt;').replace(/>/g, '&gt;');

    // Simulate form submission
    document.getElementById('form-message').textContent = 'Thank you for your message!';
    document.getElementById('form-message').style.color = 'green';

    // Clear form
    document.getElementById('contact-form').reset();
});
document.getElementById('contact-form').addEventListener('submit', function (e) {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    // Basic validation
    if (!name || !email || !message) {
        document.getElementById('form-message').textContent = 'Please fill out all fields.';
        document.getElementById('form-message').style.color = 'red';
        return;
    }

    // Email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        document.getElementById('form-message').textContent = 'Please enter a valid email address.';
        document.getElementById('form-message').style.color = 'red';
        return;
    }

    // Send form data to the backend
    fetch('https://your-backend-url/send', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email, message })
    })
    .then(response => response.json())
    .then(data => {
        if (data.error) {
            document.getElementById('form-message').textContent = data.error;
            document.getElementById('form-message').style.color = 'red';
        } else {
            document.getElementById('form-message').textContent = data.message;
            document.getElementById('form-message').style.color = 'green';
            document.getElementById('contact-form').reset();
        }
    })
    .catch(error => {
        document.getElementById('form-message').textContent = 'Failed to send message. Please try again.';
        document.getElementById('form-message').style.color = 'red';
        console.error('Error:', error);
    });
});