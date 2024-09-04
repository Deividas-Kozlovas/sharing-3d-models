function validateForm() {
    const form = document.getElementById('loginForm');
    const formData = new FormData(form);

    fetch('/login/submit-login', {
        method: 'POST',
        body: formData
    })
    .then(response => {
        if (!response.ok) {
            return response.json().then(data => {
                throw new Error(data.error || 'Unknown error');
            });
        }
        return response.json();
    })
    .then(data => {
        const errorDiv = document.querySelector('.alert'); // Check for existing error div

        if (errorDiv) {
            errorDiv.remove(); // Remove previous error message
        }

        if (data.error) {
            // Display error message
            const newErrorDiv = document.createElement('div');
            newErrorDiv.className = 'alert alert-danger';
            newErrorDiv.textContent = data.error;
            form.insertBefore(newErrorDiv, form.firstChild);
        } else if (data.message) {
            // Handle successful login
            window.location.href = '/dashboard'; // Redirect to dashboard or home
        }
    })
    .catch(error => {
        // Handle fetch errors or parsing errors
        console.error('Error:', error);
    });

    // Prevent default form submission
    return false;
}
