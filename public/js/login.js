document.addEventListener('DOMContentLoaded', () => {
    // Set up event listeners for login
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            console.log(email, password);
            loginUser(email, password);
        });
    }

});

// Function to handle user authentication
async function loginUser(email, password) {
    try {
        const response = await axios.post('/auth/login', { email, password });
        const data = response.data;
        console.log(data);
        if (data.token) {
            localStorage.setItem('token', data.token);
            window.location.href = '/home';
        } else {
            alert('Login failed');
        }
    } catch (error) {
        console.error('Error during login:', error);
        alert('Login failed');
    }
}
