const fullName = sessionStorage.getItem('fullName');
        const email = sessionStorage.getItem('email');
        const firstName = fullName.split(' ')[0];

        document.getElementById('confirmationMessage').textContent = `Dear ${firstName}, Thank you for your inquiry. A 4 digit verification number has been sent to your email: ${email}, please enter it in the following box and submit for confirmation:`;

        const otp = Math.floor(1000 + Math.random() * 9000);
        console.log("Generated OTP:", otp);

        let attempts = 0;

        document.getElementById('otpForm').addEventListener('submit', function(event) {
            event.preventDefault();
            attempts++;
            const enteredOtp = document.getElementById('otp').value.trim();
            const otpError = document.getElementById('otpError');
            const resultMessage = document.getElementById('resultMessage');

            if (enteredOtp == otp) {
                otpError.textContent = '';
                resultMessage.textContent = 'Validation Successful!';
                setTimeout(() => {
                    window.location.href = 'https://www.pixel6.co/';
                }, 100);
            } else {
                otpError.textContent = 'Invalid OTP. Please try again.';
                document.getElementById('otp').value = '';
                if (attempts >= 3) {
                    resultMessage.textContent = 'Validation Failed!';
                    setTimeout(() => {
                        window.location.href = 'https://www.pixel6.co/404';
                    }, 100);
                }
            }
        });