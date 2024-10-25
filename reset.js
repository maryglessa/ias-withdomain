// Get form and input elements
const form = document.getElementById('passwordResetForm');
const email = document.getElementById('email');
const newPassword = document.getElementById('newPassword');
const confirmPassword = document.getElementById('confirmPassword');
const passwordFields = document.querySelector('.password-fields');
const emptyFeedback = document.querySelector('.empty-feedback');

// Function to show or hide password fields
function toggleVisibility(fieldId, button) {
    const field = document.getElementById(fieldId);
    // Change input type from password to text or vice versa
    field.type = field.type === 'password' ? 'text' : 'password';
    // Update button text
    button.textContent = field.type === 'password' ? 'Show' : 'Hide';
}

// Show/hide new password
document.getElementById('toggleNewPassword').onclick = function() {
    toggleVisibility('newPassword', this);
};

// Show/hide confirm password
document.getElementById('toggleConfirmPassword').onclick = function() {
    toggleVisibility('confirmPassword', this);
};

// Handle form submission
form.onsubmit = function(event) {
    event.preventDefault(); // Stop form from submitting

    // Check if email is valid
    const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim());
    
    // Show error if email is not valid
    if (!emailValid) {
        email.classList.add('is-invalid');
        return; // Stop here if email is invalid
    }

    // Hide error for valid email
    email.classList.remove('is-invalid');
    passwordFields.style.display = 'block'; // Show password fields

    // Get values from new password and confirm password
    const newPass = newPassword.value.trim();
    const confirmPass = confirmPassword.value.trim();

    // Show feedback if new password is filled but confirm password is empty
    if (newPass && !confirmPass) {
        emptyFeedback.style.display = 'block'; // Show message
    } else {
        emptyFeedback.style.display = 'none'; // Hide message if both are filled
    }

    // If passwords match, show success message
    if (newPass && newPass === confirmPass) {
        Swal.fire({
            title: 'Password Reset Successful!',
            text: 'Your password has been updated.',
            icon: 'success'
        }).then(function() {
            form.reset(); // Reset form
            passwordFields.style.display = 'none'; // Hide password fields
        });
    } else if (newPass && confirmPass && newPass !== confirmPass) {
        confirmPassword.classList.add('is-invalid'); // Show error if passwords do not match
    }

    // Remove error message when typing in new password
    newPassword.oninput = function() {
        newPassword.classList.remove('is-invalid'); // Hide error
        emptyFeedback.style.display = 'none'; // Hide message
    };

    // Remove error message when typing in confirm password
    confirmPassword.oninput = function() {
        confirmPassword.classList.remove('is-invalid'); // Hide error
    };
};
