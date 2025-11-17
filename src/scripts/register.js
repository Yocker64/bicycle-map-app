import '../styles/styles.css';
import '../styles/signup.css';

document.addEventListener('DOMContentLoaded', () => {
  // Getting all the inputs
  const loginBtn = document.getElementById('loginBtn');
  const signupBtn = document.getElementById('signupBtn');
  const logemail = document.getElementById('logemail');
  const logpass = document.getElementById('logpass');
  const signname = document.getElementById('signname');
  const signemail = document.getElementById('signemail');
  const signpass = document.getElementById('signpass');

  // Getting all the feedback fields (divs)
  const logemailFeedback = document.getElementById('logemailFeedback');
  const logpassFeedback = document.getElementById('logpassFeedback');
  const signemailFeedback = document.getElementById('signemailFeedback');
  const signpassFeedback = document.getElementById('signpassFeedback');

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

  logemail.addEventListener('input', () => {
    changeValidityClasses(
      logemail,
      emailRegex.test(logemail.value),
      logemailFeedback,
      '正しいメールアドレスを入力してください。',
    );
  });

  logpass.addEventListener('input', () => {
    changeValidityClasses(
      logpass,
      logpass.value.length > 8 && passwordRegex.test(logpass.value),
      logpassFeedback,
      'パスワードは8文字以上で、大文字・数字・記号を含めてください。',
    );
  });

  signemail.addEventListener('input', () => {
    changeValidityClasses(
      signemail,
      emailRegex.test(signemail.value),
      signemailFeedback,
      '正しいメールアドレスを入力してください。',
    );
  });

  signpass.addEventListener('input', () => {
    changeValidityClasses(
      signpass,
      signpass.value.length > 8 && passwordRegex.test(signpass.value),
      signpassFeedback,
      'パスワードは8文字以上で、大文字・数字・記号を含めてください。',
    );
  });

  // Event listeners for the buttons
  loginBtn.addEventListener('click', (event) => {
    event.preventDefault();
  });
  signupBtn.addEventListener('click', (event) => {
    event.preventDefault();
    console.log(signemail.value);
    console.log(signpass.value);
    console.log(signname.value);
  });
});
