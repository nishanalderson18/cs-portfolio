document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contact-form');
    const formMessage = document.getElementById('form-message');

    // Form submission handler
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const form = e.target;

        // Get and sanitize input values
        const name = sanitizeInput(document.getElementById('name').value.trim());
        const email = sanitizeInput(document.getElementById('email').value.trim());
        const message = sanitizeInput(document.getElementById('message').value.trim());
        const honeypot = form.querySelector('[name="_gotcha"]').value;

        // Reset message
        formMessage.textContent = '';
        formMessage.style.color = '';

        // Client-side validation
        try {
            // Check honeypot (anti-spam)
            if (honeypot) {
                console.warn('Possible bot detected');
                return;
            }

            // Basic field presence
            if (!name || !email || !message) {
                throw new Error('Please fill out all required fields.');
            }

            // Name validation (allows multiple words)
            const namePattern = /^[a-zA-Z]+(?:\s+[a-zA-Z]+)*$/;
            if (!namePattern.test(name) || name.length < 2 || name.length > 50) {
                throw new Error('Name must be 2-50 letters only (spaces allowed between names).');
            }

            // Email validation
            const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            if (!emailPattern.test(email)) {
                throw new Error('Please enter a valid email address.');
            }

            // Message length validation
            if (message.length < 10 || message.length > 500) {
                throw new Error('Message must be 10-500 characters.');
            }

            // Prepare form data
            const formData = new FormData(form);
            formData.set('name', name); // Use sanitized values
            formData.set('email', email);
            formData.set('message', message);

            // Disable form during submission
            form.querySelector('button').disabled = true;

            const response = await fetch(form.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json',
                },
                mode: 'cors',
                credentials: 'omit', // Prevents sending cookies
            });

            const data = await response.json();

            if (response.ok) {
                formMessage.textContent = 'Message sent successfully!';
                formMessage.style.color = 'green';
                form.reset();
            } else {
                throw new Error(data.error || 'Failed to send message.');
            }
        } catch (error) {
            formMessage.textContent = error.message || 'An unexpected error occurred.';
            formMessage.style.color = 'red';
            console.error('Form submission error:', error);
        } finally {
            form.querySelector('button').disabled = false;
        }
    });

    // Input sanitization function
    function sanitizeInput(input) {
        const div = document.createElement('div');
        div.textContent = input;
        return div.innerHTML
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#x27;');
    }
});