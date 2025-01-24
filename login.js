const form = document.getElementById('loginForm');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(form);

    const data = {
        emailOrPhone: formData.get('emailOrPhone'),
        password: formData.get('password')
    };

    fetch('/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert("Login successful! Redirecting...");
            window.location.href = '/';
        } else {
            alert(data.error || "Invalid credentials. Please try again.");
        }
    })
    .catch(error => {
        console.error("Error during login:", error);
        alert("An error occurred, please try again.");
    })
});
