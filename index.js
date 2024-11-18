document.getElementById('contact-us-btn').onclick = function() {
    document.getElementById('popup-form').style.display = 'block';
};

document.getElementById('close-btn').onclick = function() {
    hideAndClearForm();
};

window.onclick = function(event) {
    if (event.target === document.getElementById('popup-form')) {
        hideAndClearForm();
    }
};


document.getElementById('submit-btn').onclick = function() {
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const country = document.getElementById('country').value;
    const message = document.getElementById('message').value.trim();
    const greetingElement = document.getElementById('greeting');

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]{10,15}$/;

    if (!name || !email || !phone === "empty" || !message) {
        greetingElement.textContent = "Please fill in all the fields.";
    } else if (!emailRegex.test(email)) {
        greetingElement.textContent = "Please enter a valid email address.";
    } else if (!phoneRegex.test(phone)) {
        greetingElement.textContent = "Please enter a valid phone number (10-15 digits).";
    } else {
        greetingElement.textContent = `Hello, ${name}! Thank you for reaching out. We will contact you at ${email}.`;
        document.getElementById('contact-form').reset();
    }
};

function hideAndClearForm() {
    document.getElementById('popup-form').style.display = 'none';
    document.getElementById('contact-form').reset(); 
    document.getElementById('greeting').textContent = ''; 
}

