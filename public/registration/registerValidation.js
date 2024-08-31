function validateForm() {
        const email = document.getElementById('inputEmail1').value;
        const password = document.getElementById('inputPassword1').value;
        const repeatPassword = document.getElementById('inputPasswordRepeat').value;

        if (password !== repeatPassword) {
            alert('Passwords do not match');
            return false;
        }

        if (password.length < 6) {
            alert('Password must be at least 6 characters long');
            return false;
        }

        // Add more client-side validations as needed

        return true; // Submit the form if validation passes
    }