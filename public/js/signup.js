document.addEventListener('DOMContentLoaded', () => {

    // Set up event listeners for registration
    const registerForm = document.getElementById('signup-form');
    if (registerForm) {
        registerForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            console.log(name, email, password);
            registerUser(name, email, password);
        });
    }
});

// Function to handle user registration
async function registerUser(name, email, password) {
    try {
        const response = await axios.post('/auth/signup', { name, email, password });
        console.log(response);
        if (response.status === 201) {
            window.location.href = '/auth/login';
        } else {
            alert('Registration failed');
        }
    } catch (error) {
        console.error('Error during registration:', error);
        alert('Registration failed');
    }
}
