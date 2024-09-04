function validateForm() {
    const form = document.getElementById('loginForm');
    const formData = new FormData(form);
    
    // Get values directly from form elements
    const email = formData.get('email');
    const password = formData.get('password');

    // Clear previous errors
    clearErrors();

    // Initialize error flag
    let hasError = false;

    // Check if email or password is empty
    if (!email || !password) {
        displayError('Fill in all values');
        hasError = true;
    }

    // If there's an error, prevent form submission
    if (hasError) {
        return false;
    }

    // Convert FormData to a plain object
    const formDataObj = {};
    formData.forEach((value, key) => {
        formDataObj[key] = value;
    });

    // Send request
    fetch('/login/submit-login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formDataObj)
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
        const errorDiv = document.getElementById('formErrors');

        // Clear previous errors
        errorDiv.innerHTML = '';
        errorDiv.style.display = 'none';

        if (data.error) {
            // Display error message
            errorDiv.textContent = data.error;
            errorDiv.style.display = 'block';
        } else if (data.message) {
            // Handle successful login
            window.location.href = '/dashboard'; // Redirect to dashboard or home
        }
    })
    .catch(error => {
        // Handle fetch errors or parsing errors
        const errorDiv = document.getElementById('formErrors');
        errorDiv.innerHTML = '';
        errorDiv.style.display = 'block';
        errorDiv.textContent = error.message || 'Unable to process the request. Please try again later.';
        console.error('Error:', error);
    });

    // Prevent default form submission
    return false;
}

function clearErrors() {
    const errorDiv = document.getElementById('formErrors');
    if (errorDiv) {
        errorDiv.innerHTML = '';
        errorDiv.style.display = 'none';
    }
}

function displayError(message) {
    const errorDiv = document.getElementById('formErrors');
    errorDiv.textContent = message;
    errorDiv.style.display = 'block';
}
