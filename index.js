document.getElementById('loanForm').addEventListener('submit', function(event) {
    event.preventDefault();
    let valid = true;

    // Full Name validation
    const fullName = document.getElementById('fullName').value.trim();
    const fullNameError = document.getElementById('fullNameError');
    const fullNamePattern = /^(?=.*[a-zA-Z]{4,})(?=.*\s[a-zA-Z]{4,}).*$/;
    if (!fullNamePattern.test(fullName)) {
        fullNameError.textContent = 'Full Name must contain at least two words, each with a minimum of 4 characters.';
        valid = false;
    } else {
        fullNameError.textContent = '';
    }

    // Email validation
    const email = document.getElementById('email').value.trim();
    const emailError = document.getElementById('emailError');
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(email)) {
        emailError.textContent = 'Please enter a valid email address.';
        valid = false;
    } else {
        emailError.textContent = '';
    }

    // PAN validation
    const pan = document.getElementById('pan').value.trim();
    const panError = document.getElementById('panError');
    const panPattern = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
    if (!panPattern.test(pan)) {
        panError.textContent = 'PAN must be in the format ABCDE1234F.';
        valid = false;
    } else {
        panError.textContent = '';
    }

    // Loan Amount validation
    const loanAmount = document.getElementById('loanAmount').value.trim();
    const loanAmountError = document.getElementById('loanAmountError');
    const loanAmountWords = document.getElementById('loanAmountWords');
    const loanAmountPattern = /^\d{1,9}$/;
    if (!loanAmountPattern.test(loanAmount)) {
        loanAmountError.textContent = 'Loan Amount must be numeric and up to 9 digits.';
        valid = false;
    } else {
        loanAmountError.textContent = '';
        // Convert amount to words or show estimated EMI
        loanAmountWords.textContent = `Estimated EMI: ${calculateEMI(loanAmount)} Rs.`;
    }

    if (valid) {
        // Store form data in session storage
        sessionStorage.setItem('fullName', fullName);
        sessionStorage.setItem('email', email);
        // Redirect to confirmation page
        window.location.href = 'confirm.html';
    }
});

function calculateEMI(amount) {
    const principal = parseFloat(amount);
    const interestRate = 8.5 / 100 / 12;
    const tenure = 15 * 12;
    const emi = (principal * interestRate * Math.pow((1 + interestRate), tenure)) / (Math.pow((1 + interestRate), tenure) - 1);
    return emi.toFixed(2);
}