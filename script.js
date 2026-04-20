/*
Program name: script.js
Author: Andrew Wu
Date created: 3/27/2026
Date last edited: 4/19/2026
Version: 2.0
Description: JavaScript file that provides functionality for the patient registration form */

// --- REVIEW BUTTON FUNCTIONALITY ---
document.getElementById('reviewBtn').addEventListener('click', function() {
    
    // Collect standard text/number/date inputs
    const fName = document.getElementById('fName').value;
    const mInitial = document.getElementById('mInitial').value;
    const lName = document.getElementById('lName').value;
    const dob = document.getElementById('dob').value;
    const ssn = document.getElementById('ssn').value; 
    const address1 = document.getElementById('address1').value;
    const address2 = document.getElementById('address2').value;
    const city = document.getElementById('city').value;
    const state = document.getElementById('state').value;
    const zip = document.getElementById('zip').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const healthRating = document.getElementById('healthRating').value;
    const symptoms = document.getElementById('symptoms').value;
    const userID = document.getElementById('userID').value;

    // Collect Checkboxes
    let races = [];
    document.querySelectorAll('input[name="race"]:checked').forEach(function(checkbox) {
        races.push(checkbox.value);
    });
    const raceStr = races.length > 0 ? races.join(", ") : "None selected";

    // Collect Radio Buttons
    const gender = document.querySelector('input[name="gender"]:checked')?.value || "Not selected";
    const ethnicity = document.querySelector('input[name="ethnicity"]:checked')?.value || "Not selected";
    const language = document.querySelector('input[name="language"]:checked')?.value || "Not selected";

    // Secure sensitive data before displaying
    // Only show the last 4 digits of the SSN
    const ssnDisplay = ssn ? "***-**-" + ssn.slice(-4) : "Not entered";

    // Construct the HTML string to inject into the page
    const reviewHTML = `
        <p><strong>Name:</strong> <span>${fName} ${mInitial} ${lName}</span></p>
        <p><strong>Date of Birth:</strong> <span>${dob}</span></p>
        <p><strong>SSN:</strong> <span>${ssnDisplay}</span></p>
        <p><strong>Address:</strong> <span>${address1} ${address2 ? ', ' + address2 : ''}</span></p>
        <p><strong>Location:</strong> <span>${city}, ${state} ${zip}</span></p>
        <p><strong>Contact:</strong> <span>${email} | ${phone}</span></p>
        <hr style="border-top: 1px solid beige; margin: 15px 0; opacity: 0.5;">
        <p><strong>Race:</strong> <span>${raceStr}</span></p>
        <p><strong>Gender:</strong> <span><span style="text-transform: capitalize;">${gender}</span></span></p>
        <p><strong>Ethnicity:</strong> <span><span style="text-transform: capitalize;">${ethnicity}</span></span></p>
        <p><strong>Language:</strong> <span><span style="text-transform: capitalize;">${language}</span></span></p>
        <p><strong>Health Rating:</strong> <span>${healthRating} / 100</span></p>
        <p><strong>Symptoms:</strong> <span>${symptoms || "None described"}</span></p>
        <hr style="border-top: 1px solid beige; margin: 15px 0; opacity: 0.5;">
        <p><strong>User ID:</strong> <span>${userID}</span></p>
        <p><strong>Password:</strong> <span>(Hidden for security)</span></p>
    `;

    // Inject the built HTML into the DOM and make the section visible
    const reviewSection = document.getElementById('reviewSection');
    document.getElementById('reviewContent').innerHTML = reviewHTML;
    reviewSection.style.display = 'block';
    
    reviewSection.scrollIntoView({ behavior: 'smooth' });
});

document.getElementById('validateBtn').addEventListener('click', function() {
    let errors = [];
    const errorDisplay = document.getElementById('errorDisplay');
    const submitBtn = document.getElementById('submitBtn');

    // Retrieve all data
    const fName = document.getElementById('fName').value.trim();
    const mInitial = document.getElementById('mInitial').value.trim();
    const lName = document.getElementById('lName').value.trim();
    const dob = document.getElementById('dob').value;
    const ssn = document.getElementById('ssn').value.trim();
    const address1 = document.getElementById('address1').value.trim();
    const address2 = document.getElementById('address2').value.trim();
    const city = document.getElementById('city').value.trim();
    const state = document.getElementById('state').value;
    const zip = document.getElementById('zip').value.trim();
    
    // Force lowercase on email and User ID
    const emailField = document.getElementById('email');
    emailField.value = emailField.value.toLowerCase().trim();
    const email = emailField.value;

    const phone = document.getElementById('phone').value.trim();
    const symptoms = document.getElementById('symptoms').value.trim();
    
    const userIDField = document.getElementById('userID');
    userIDField.value = userIDField.value.toLowerCase().trim();
    const userID = userIDField.value;

    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    // Radio/Checkbox checks
    const gender = document.querySelector('input[name="gender"]:checked');
    const ethnicity = document.querySelector('input[name="ethnicity"]:checked');
    const language = document.querySelector('input[name="language"]:checked');

    // Validation

    const nameRegex = /^[A-Za-z\s\-']+$/;
    if (!fName || !nameRegex.test(fName)) errors.push("First Name is required and can only contain letters, spaces, dashes, and apostrophes.");
    if (mInitial && !/^[A-Za-z]$/.test(mInitial)) errors.push("Middle Initial must be a single letter.");
    if (!lName || !nameRegex.test(lName)) errors.push("Last Name is required and can only contain letters, spaces, dashes, and apostrophes.");

    if (!dob) errors.push("Date of Birth is required.");

    const ssnRegex = /^\d{3}-\d{2}-\d{4}$/;
    if (!ssn || !ssnRegex.test(ssn)) errors.push("SSN must be 9 digits in the format XXX-XX-XXXX.");

    const addressRegex = /^[A-Za-z0-9\s.,#'\-]+$/;
    const cityRegex = /^[A-Za-z\s.\-']+$/;
    if (!address1 || !addressRegex.test(address1)) errors.push("Address Line 1 is required and contains invalid characters.");
    if (address2 && !addressRegex.test(address2)) errors.push("Address Line 2 contains invalid characters.");
    if (!city || !cityRegex.test(city)) errors.push("City is required and can only contain letters, spaces, dashes, and periods.");
    if (!state) errors.push("State selection is required.");

    const zipRegex = /^\d{5}(?:-\d{4})?$/;
    if (!zip || !zipRegex.test(zip)) errors.push("Zip code must be 5 digits (e.g., 12345) or 9 digits (e.g., 12345-6789).");

    const emailRegex = /^[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$/;
    if (!email || !emailRegex.test(email)) errors.push("A valid Email Address is required.");

    const phoneRegex = /^\d{3}-\d{3}-\d{4}$/;
    if (phone && !phoneRegex.test(phone)) errors.push("Phone Number must be in the format XXX-XXX-XXXX.");

    if (!gender) errors.push("Gender selection is required.");
    if (!ethnicity) errors.push("Ethnicity selection is required.");
    if (!language) errors.push("Primary Language selection is required.");

    if (symptoms.includes('"')) errors.push("Symptoms cannot contain double quotes (\").");

    const userIDRegex = /^[a-z][a-z0-9_\-]{4,19}$/;
    if (!userID || !userIDRegex.test(userID)) errors.push("User ID must be 5-20 characters, start with a letter, and contain no spaces or special characters (except _ and -).");

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    if (!password) {
        errors.push("Password is required.");
    } else {
        if (!passwordRegex.test(password)) errors.push("Password must be at least 8 characters long, with 1 uppercase, 1 lowercase, and 1 digit.");
        if (password.includes('"')) errors.push("Password cannot contain double quotes (\").");
        if (password.toLowerCase() === userID) errors.push("Password cannot equal your User ID.");
        if (password !== confirmPassword) errors.push("Passwords do not match.");
    }

    if (errors.length > 0) {
        // Hide submit button, show errors
        submitBtn.style.display = 'none';
        errorDisplay.style.display = 'block';
        
        // Format errors as a bulleted list
        let errorHtml = "<strong>Please fix the following errors:</strong><ul>";
        errors.forEach(err => errorHtml += `<li>${err}</li>`);
        errorHtml += "</ul>";
        errorDisplay.innerHTML = errorHtml;
    } else {
        // Show submit button, hide errors
        errorDisplay.style.display = 'none';
        submitBtn.style.display = 'inline-block';
        alert("Validation successful! You may now submit the form.");
    }
});

// Hide the Submit button again if the user edits the form after validating
document.getElementById('registrationForm').addEventListener('input', function() {
    document.getElementById('submitBtn').style.display = 'none';
    document.getElementById('errorDisplay').style.display = 'none';
});

document.addEventListener("DOMContentLoaded", function() {
    // Setup Today's Date in Header
    const today = new Date();
    const formattedDate = (today.getMonth() + 1) + '/' + today.getDate() + '/' + today.getFullYear();
    document.getElementById('today-date').innerHTML = formattedDate;

    // Set Min and Max dates for DOB
    const dobInput = document.getElementById('dob');
    
    // Format dates for the HTML <input type="date">
    const isoToday = today.toISOString().split('T')[0];
    
    const minDate = new Date();
    minDate.setFullYear(today.getFullYear() - 120);
    const isoMinDate = minDate.toISOString().split('T')[0];

    dobInput.setAttribute('max', isoToday);
    dobInput.setAttribute('min', isoMinDate);

});

// For state dropdown menu, populate with all 50 states + DC and PR
document.addEventListener("DOMContentLoaded", function() {
    const states = [
        "AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "DC", "FL", "GA", 
        "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD", "MA", 
        "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ", "NM", "NY", 
        "NC", "ND", "OH", "OK", "OR", "PA", "PR", "RI", "SC", "SD", "TN", 
        "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY"
    ];

    const stateSelect = document.getElementById('state');
    
    states.forEach(state => {
        let option = document.createElement('option');
        option.value = state;
        option.textContent = state;
        stateSelect.appendChild(option);
    });
});

function formValidation() {
    
    let zipField = document.getElementById('zip');
    if (zipField.value.length > 5) {
        zipField.value = zipField.value.substring(0, 5);
        // The form will temporarily pause here to show the alert if an error occurs below, allowing the user to see the truncated zip code.
    }

    // Convert User ID to lowercase and re-display
    let userIDField = document.getElementById('userID');
    userIDField.value = userIDField.value.toLowerCase();

    // Check Textarea for double quotes
    const symptoms = document.getElementById('symptoms').value;
    if (symptoms.includes('"')) {
        alert("Double quotes (\") are not allowed in the symptoms section.");
        return false;
    }

    // Password Validation
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const fName = document.getElementById('fName').value.toLowerCase();
    const lName = document.getElementById('lName').value.toLowerCase();
    const uID = userIDField.value; // Already lowercase

    // Passwords must match
    if (password !== confirmPassword) {
        alert("Error: Passwords do not match.");
        return false;
    }

    // Check for double quotes in password
    if (password.includes('"')) {
        alert("Error: Passwords cannot contain double quotes (\").");
        return false;
    }

    // Regex for at least 1 upper, 1 lower, 1 digit (no special char required)
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/;
    if (!passwordRegex.test(password)) {
        alert("Error: Password must contain at least 1 uppercase letter, 1 lowercase letter, and 1 number.");
        return false;
    }

    // Cannot equal User ID
    if (password === uID || lowerPassword === uID) {
        alert("Error: Password cannot equal your User ID.");
        return false;
    }

    // If all validations pass
    alert("Form submitted successfully!");
    return true; 
}

// Correct functionality for inputting ssn
document.getElementById('ssn').addEventListener('input', function(e) {
    // Strip out all non-numeric characters
    let val = e.target.value.replace(/\D/g, ''); 

    // Add dashes back in
    if (val.length > 3 && val.length <= 5) {
        val = val.slice(0, 3) + '-' + val.slice(3);
    } else if (val.length > 5) {
        val = val.slice(0, 3) + '-' + val.slice(3, 5) + '-' + val.slice(5, 9);
    }

    e.target.value = val;
});