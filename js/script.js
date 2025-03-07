document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contact-form');
    const formMessage = document.getElementById('form-message');

    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Get form data
        const name = sanitizeInput(document.getElementById('name').value.trim());
        const email = sanitizeInput(document.getElementById('email').value.trim());
        const message = sanitizeInput(document.getElementById('message').value.trim());
        const honeypot = contactForm.querySelector('[name="_gotcha"]').value;

        // Reset message
        formMessage.textContent = '';
        formMessage.style.color = '';

        // Client-side validation
        try {
            // Honeypot check
            if (honeypot) {
                console.warn('Possible bot detected');
                formMessage.textContent = 'Submission blocked due to spam detection.';
                formMessage.style.color = 'red';
                return;
            }

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
            const formData = new FormData(contactForm);
            const response = await fetch('/', {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                formMessage.textContent = 'Message sent successfully!';
                formMessage.style.color = 'green';
                contactForm.reset();
            } else {
                formMessage.textContent = 'Failed to send message. Please try again.';
                formMessage.style.color = 'red';
            }
        } catch (error) {
            formMessage.textContent = 'An error occurred. Please try again.';
            formMessage.style.color = 'red';
            console.error('Form submission error:', error);
        } finally {
            contactForm.querySelector('button').disabled = false;
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