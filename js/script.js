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
    fetch('https://tavernofmoe.onrender.com/send', {
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