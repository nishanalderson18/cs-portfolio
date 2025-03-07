document.getElementById('contact-form').addEventListener('submit', function (e) {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);
    const formMessage = document.getElementById('form-message');

    // Basic validation
    const name = formData.get('name').trim();
    const email = formData.get('email').trim();
    const message = formData.get('message').trim();

    if (!name || !email || !message) {
        formMessage.textContent = 'Please fill out all fields.';
        formMessage.style.color = 'red';
        return;
    }

    // Email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        formMessage.textContent = 'Please enter a valid email address.';
        formMessage.style.color = 'red';
        return;
    }

    // Submit the form to Formspree
    fetch(form.action, {
        method: 'POST',
        body: formData,
        headers: {
            'Accept': 'application/json'
        }
    })
    .then(response => {
        if (response.ok) {
            formMessage.textContent = 'Message sent successfully!';
            formMessage.style.color = 'green';
            form.reset(); // Clear the form
        } else {
            formMessage.textContent = 'Failed to send message. Please try again.';
            formMessage.style.color = 'red';
        }
    })
    .catch(error => {
        formMessage.textContent = 'An error occurred. Please try again.';
        formMessage.style.color = 'red';
    });
});