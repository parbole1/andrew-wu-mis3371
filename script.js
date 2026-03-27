/*
Program name: script.js
Author: Andrew Wu
Date created: 3/27/2026
Date last edited: 3/27/2026
Version: 1.0
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
    const comments = document.getElementById('comments').value;
    if (comments.includes('"')) {
        alert("Double quotes (\") are not allowed in the comments section.");
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

    // Regex for 1 upper, 1 lower, 1 digit, 1 special character
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#%^&*()_\-+=\/><.,`~]).+$/;
    if (!passwordRegex.test(password)) {
        alert("Error: Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character.");
        return false;
    }

    // Cannot contain User ID, First Name, or Last Name
    const lowerPassword = password.toLowerCase();
    if (lowerPassword.includes(uID)) {
        alert("Error: Password cannot contain your User ID.");
        return false;
    }
    if (lowerPassword.includes(fName) || lowerPassword.includes(lName)) {
        alert("Error: Password cannot contain your First or Last name.");
        return false;
    }

    // If all validations pass
    alert("Form submitted successfully!");
    return true; 
}