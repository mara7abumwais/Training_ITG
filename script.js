const register_form = document.getElementById('register_form');
const register_message = document.getElementById('register_message');

register_form.addEventListener('submit', function (event) {
    event.preventDefault();

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

    const student_fname = document.querySelector('#student_fname');
    const student_lname = document.querySelector('#student_lname');
    const student_email = document.querySelector('#student_email');
    const student_phone = document.querySelector('#student_phone');
    const student_major = document.querySelector('#student_major');

    const fnameError = document.querySelector('#register_fnameError');
    const lnameError = document.querySelector('#register_lnameError');
    const emailError = document.querySelector('#register_emailError');
    const trainError = document.querySelector('#register_majorError');
    const phoneError = document.querySelector('#register_phoneError');

    const emailRegex = /^[A-Za-z0-9._-]+@[A-Z0-9.-]+\.[a-z]{2,}$/i;
    const phoneRegex = /^\d{10}$/;

    const isValid = [
        validateInput(student_fname, null, fnameError, 'First name is required', null),
        validateInput(student_lname, null, lnameError, 'Last name is required', null),
        validateInput(student_email, emailRegex, emailError, 'email address is required',  'Please enter a valid email address'),
        validateInput(student_major, null, trainError, 'Major is required', null),
        validateInput(student_phone, phoneRegex, phoneError, 'phone number is required',  'Please enter a valid 10-digit phone number')
    ].every(Boolean);

    if (isValid) {
        register_form.reset();
        register_message.style.display = 'block';
    } else {
        register_message.style.display = 'none';
    }
});
