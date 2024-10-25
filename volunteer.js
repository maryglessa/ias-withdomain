document.getElementById('volunteerForm').addEventListener('submit', function(event) {
    event.preventDefault();
    let isValid = true;

    // List of field IDs to validate
    const fields = ['firstName', 'lastName', 'email', 'skills', 'availability', 'startTime', 'endTime'];

    // Validate each field
    fields.forEach(field => {
        const input = document.getElementById(field);
        
        // Email 
        if (field === 'email') {
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 
            if (!emailPattern.test(input.value.trim())) {
                input.classList.add('is-invalid');
                isValid = false;
            } else {
                input.classList.remove('is-invalid');
            }
        } else if (input.value.trim() === '') {
            input.classList.add('is-invalid');
            isValid = false;
        } else {
            input.classList.remove('is-invalid');
        }

        // Add input event listener to remove error styling when corrected
        input.addEventListener('input', function() {
            if (input.value.trim() !== '') {
                input.classList.remove('is-invalid');
            }
        });
    });

    if (isValid) {
        // Show SweetAlert success message
        Swal.fire({
            title: 'Volunteer Sign-Up Successful!',
            text: 'Thank you for signing up as a volunteer.',
            icon: 'success',
            confirmButtonText: 'OK'
        }).then(() => {
            // Clear the input fields after the success message
            document.getElementById('volunteerForm').reset();
        });
        // Add form submission logic here if needed
    }
});
