document.getElementById('contact-form').addEventListener('submit', function (e) {
    e.preventDefault(); // Prevent the form from submitting the traditional way

    // Get form elements
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();
    const formMessage = document.getElementById('form-message');

    // Clear previous messages
    formMessage.textContent = '';
    formMessage.style.color = '';

    // Basic validation
    if (!name || !email || !message) {
        formMessage.textContent = 'Please fill out all fields.';
        formMessage.style.color = 'red';
        return; // Stop further execution if validation fails
    }

    // Name validation: Allow spaces (for first and last names)
    const namePattern = /^[a-zA-Z\s]+$/; // Allows letters and spaces
    if (!namePattern.test(name)) {
        formMessage.textContent = 'Please enter a valid name (letters and spaces only).';
        formMessage.style.color = 'red';
        return; // Stop further execution if name is invalid
    }

    // Email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        formMessage.textContent = 'Please enter a valid email address.';
        formMessage.style.color = 'red';
        return; // Stop further execution if email is invalid
    }

    // If validation passes, submit the form to Formspree
    const formData = new FormData(e.target); // Create FormData object from the form

    fetch(e.target.action, {
        method: 'POST',
        body: formData,
        headers: {
            'Accept': 'application/json'
        }
    })
    .then(response => {
        if (response.ok) {
            // Success: Display success message and reset the form
            formMessage.textContent = 'Message sent successfully!';
            formMessage.style.color = 'green';
            document.getElementById('contact-form').reset(); // Clear the form
        } else {
            // Error: Display error message
            formMessage.textContent = 'Failed to send message. Please try again.';
            formMessage.style.color = 'red';
        }
    })
    .catch(error => {
        // Network or other errors
        formMessage.textContent = 'An error occurred. Please try again.';
        formMessage.style.color = 'red';
    });
});