document.getElementById('contact-form').addEventListener('submit', async function(e) {
    e.preventDefault();

    const form = e.target;
    const formMessage = document.getElementById('form-message');
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    // Clear previous messages
    formMessage.textContent = '';
    formMessage.style.color = '';

    // Validation
    if (!name || !email || !message) {
        formMessage.textContent = 'Please fill out all fields.';
        formMessage.style.color = 'red';
        return;
    }

    // Enhanced name validation
    const namePattern = /^[a-zA-Z]+(?:\s+[a-zA-Z]+)*$/;
    if (!namePattern.test(name)) {
        formMessage.textContent = 'Please enter a valid name (letters only, spaces allowed between names)';
        formMessage.style.color = 'red';
        console.log('Name validation failed for:', name); // Debug log
        return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        formMessage.textContent = 'Please enter a valid email address.';
        formMessage.style.color = 'red';
        return;
    }

    try {
        const formData = new FormData(form);
        
        if (!form.action) {
            formMessage.textContent = 'Form action URL is missing!';
            formMessage.style.color = 'red';
            return;
        }

        console.log('Submitting form with name:', name); // Debug log

        const response = await fetch(form.action, {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        });

        const data = await response.json();

        if (response.ok) {
            formMessage.textContent = 'Message sent successfully!';
            formMessage.style.color = 'green';
            form.reset();
        } else {
            formMessage.textContent = data.error || 'Failed to send message. Please try again.';
            formMessage.style.color = 'red';
            console.log('Formspree response:', data); // Debug log
        }
    } catch (error) {
        console.error('Error:', error);
        formMessage.textContent = 'An error occurred. Please try again.';
        formMessage.style.color = 'red';
    }
});