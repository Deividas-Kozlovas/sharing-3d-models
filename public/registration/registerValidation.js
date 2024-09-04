async function validateForm(event) {
    event.preventDefault(); // Prevent the default form submission

    const form = document.getElementById('registrationForm');
    const formData = new FormData(form);
    const email = formData.get('email');
    const password = formData.get('password');
    const repeatPassword = formData.get('repeatPassword');

    // Clear previous errors
    clearErrors();

    // Initialize error flag
    let hasError = false;

    if(email == '' || password == '' || repeatPassword == '') {
        displayError('Fill in all values');
        hasError = true;
    }

    // Check if passwords match
    if (password !== repeatPassword) {
        displayError('Passwords do not match');
        hasError = true;
    }

    // Check if email is already registered
    if (!hasError) {
        try {
            const response = await fetch('/register/check-email', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email })
            });

            if (response.ok) {
                const data = await response.json();
                if (data.error) {
                    displayError(data.error);
                    hasError = true;
                } else if (data.success) {
                    // Proceed with registration if no errors
                    await registerUser(formData);
                }
            } else {
                displayError('Server responded with an error');
                hasError = true;
            }
        } catch (error) {
            console.error('Error checking email:', error);
            displayError('Unable to check email availability. Please try again later.');
            hasError = true;
        }
    }

    // Prevent form submission if there are errors
    if (hasError) {
        return false;
    }
}

async function registerUser(formData) {
    try {
        // Convert FormData to a JSON object
        const formDataObj = {};
        formData.forEach((value, key) => {
            formDataObj[key] = value;
        });

        const response = await fetch('/register/submit-registration', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formDataObj)
        });

        if (response.ok) {
            const data = await response.json();
            if (data.error) {
                displayError(data.error);
            } else if (data.message) {
                window.location.href = '/dashboard'; // Redirect on success
            }
        } else {
            displayError('Registration failed');
        }
    } catch (error) {
        displayError('Network error during registration');
        console.error('Error during registration:', error);
    }
}


function clearErrors() {
    const existingErrorDiv = document.querySelector('.alert');
    if (existingErrorDiv) {
        existingErrorDiv.remove(); // Remove previous error message
    }
}

function displayError(message) {
    const form = document.getElementById('registrationForm');
    const errorDiv = document.createElement('div');
    errorDiv.className = 'alert alert-danger';
    errorDiv.textContent = message;
    form.insertBefore(errorDiv, form.firstChild);
}
