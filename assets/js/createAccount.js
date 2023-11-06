// Create Account Page  //
const register_form = document.getElementById('register_form');

register_form.addEventListener('submit', (event)=> {

    const validateInput = (element, regex, errorElement, errorMessage, regexMsg) => {
        const value = element.value.trim();
        if (!value) {
            errorElement.innerHTML = errorMessage;
            element.classList.add('invalid');
            return false;
        } else {
            errorElement.innerHTML = '';
            element.classList.remove('invalid');
            if (regex && !regex.test(value)) {
                errorElement.innerHTML = `Please enter a valid ${regexMsg}`;
                element.classList.add('invalid');
                return false;
            }
        }
        return true;
    };

    const register_nameInput = document.getElementById('register_name');
    const register_emailInput = document.getElementById('register_email');
    const register_passwordInput = document.getElementById('register_password');
    const register_phoneInput = document.getElementById('register_phone');

    const nameError = document.getElementById('register_nameError');
    const emailError = document.getElementById('register_emailError');
    const passwordError = document.getElementById('register_passwordError');
    const phoneError = document.getElementById('register_phoneError');

    const emailRegex = /^[A-Za-z0-9._-]+@[A-Z0-9.-]+\.[a-z]{2,}$/i;
    const phoneRegex = /^[0-9]{10}$/;
    const passwordRegex = /^(?=.*[A-Za-z])[A-Za-z0-9!@#$%^&*]{8,}$/;

    const isValid = [
        validateInput(register_nameInput, null, nameError, 'Name is required', null),
        validateInput(register_emailInput, emailRegex, emailError, 'Email address is required', 'Please enter a valid email address'),
        validateInput(register_passwordInput, passwordRegex, passwordError, 'Passowrd is required',  'Password must be at least 8 characters, with at least one letter'),
        validateInput(register_phoneInput, phoneRegex, phoneError, 'Phone is required', 'Please enter a valid 10-digit phone number'),
    ].every(Boolean);

    if (!isValid) {
        event.preventDefault();
    } 
});

