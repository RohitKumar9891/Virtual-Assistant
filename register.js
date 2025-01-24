const form = document.getElementById('registerForm');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    
    const data = {
        name: formData.get('name'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        password: formData.get('password')
    }

    if (data.password !== formData.get('confirm_password')) {
        alert("Password and Confirm password must be the same.");
        return;
    }

    fetch('/register', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    }).then(res => res.json())
        .then(data => {
            if (data.success) {
                alert("Registration successful! Redirecting to login page...");
                setTimeout(function () {window.location.href = '/login';}, 1000);
            } else {
                alert(data.error || "Registration failed, please try again.");
            }
        })
        .catch(error => {
            console.error("Error during registration:", error);
            alert("An error occurred, please try again.");
        });
});
