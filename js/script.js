document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contact-form');
    const formMessage = document.getElementById('form-message');

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();

        // Reset message
        formMessage.textContent = '';
        formMessage.style.color = '';

        // Basic validation
        if (!name || !email || !message) {
            formMessage.textContent = 'Please fill out all fields.';
            formMessage.style.color = 'red';
            return;
        }

        // If validation passes, let the form submit naturally to Formspree
        formMessage.textContent = 'Sending...';
        formMessage.style.color = 'blue';
        contactForm.querySelector('button').disabled = true;

        // Submit the form
        fetch(contactForm.action, {
            method: 'POST',
            body: new FormData(contactForm),
            headers: {
                'Accept': 'application/json'
            }
        })
        .then(response => {
            if (response.ok) {
                formMessage.textContent = 'Message sent successfully!';
                formMessage.style.color = 'green';
                contactForm.reset();
            } else {
                formMessage.textContent = 'Failed to send message. Please try again.';
                formMessage.style.color = 'red';
            }
        })
        .catch(error => {
            formMessage.textContent = 'An error occurred. Please try again.';
            formMessage.style.color = 'red';
            console.error('Fetch error:', error);
        })
        .finally(() => {
            contactForm.querySelector('button').disabled = false;
        });
    });
});