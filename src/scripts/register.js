import '../styles/signup.css';

document.addEventListener('DOMContentLoaded', () => {
  // Getting all the inputs
  const submitButton = document.getElementById('signUpButton');
  const cancelButton = document.getElementById('cancelButton');
  const name = document.getElementById('name');
  const email = document.getElementById('email');
  const password = document.getElementById('password');
  const confirmPassword = document.getElementById('confirmPassword');

  // Getting all the feedback fields (divs)
  const nameFeedback = document.getElementById('nameFeedback');
  const emailFeedback = document.getElementById('emailFeedback');
  const passwordFeedback = document.getElementById('passwordFeedback');
  const confirmPasswordFeedback = document.getElementById(
    'confirmPasswordFeedback',
  );

  // RegEx for validations
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/;

  // Display message and change style depending on the input validity
  function changeValidityClasses(element, validity, feedbackElement, feedback) {
    if (validity) {
      element.classList.remove('invalid');
      element.classList.add('valid');
      feedbackElement.innerText = '';
    } else {
      element.classList.remove('valid');
      element.classList.add('invalid');
      feedbackElement.innerText = feedback;
    }
  }

  // Event listeners to the inputs
  name.addEventListener('input', () => {
    changeValidityClasses(
      name,
      name.value !== '',
      nameFeedback,
      'Let us know your name',
    );
  });
  email.addEventListener('input', () => {
    changeValidityClasses(
      email,
      emailRegex.test(email.value),
      emailFeedback,
      'Make sure to write an email address',
    );
  });

  password.addEventListener('input', () => {
    changeValidityClasses(
      password,
      password.value.length > 8 && passwordRegex.test(password.value),
      passwordFeedback,
      'The password must be longer than 8 characters, have a capital letter, a number and a symbol.',
    );
  });

  confirmPassword.addEventListener('input', () => {
    changeValidityClasses(
      confirmPassword,
      confirmPassword.value.length > 8 &&
        passwordRegex.test(confirmPassword.value) &&
        confirmPassword.value === password.value,
      confirmPasswordFeedback,
      'The passwords must match',
    );
  });

  submitButton.addEventListener('click', (event) => {
    event.preventDefault();
    checkInput();
  });

  cancelButton.addEventListener('click', (event) => {
    event.preventDefault();
    name.value = '';
    email.value = '';
    password.value = '';
    confirmPassword.value = '';
    clearValidityClass(name);
    clearValidityClass(email);
    clearValidityClass(password);
    clearValidityClass(confirmPassword);
  });
});

function clearValidityClass(elem) {
  elem.classList.remove('valid', 'invalid');
}

function checkInput() {
  console.log('hola');
}
