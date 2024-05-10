
const firstNameInput = document.querySelector('input[name="first_name"]');
const secondNameInput = document.querySelector('input[name="second_name"]');
const passwordInput = document.querySelector('input[name="password"]');
const emailInput = document.querySelector('input[name="email"]');


function handleSubmit(event) {
    event.preventDefault();


    const firstName = firstNameInput.value;
    const secondName = secondNameInput.value;
    const password = passwordInput.value;
    const email = emailInput.value;


    const formData = {
        firstName,
        secondName,
        password,
        email
    };

    
    const formDataJSON = JSON.stringify(formData);

    
    localStorage.setItem('formData', formDataJSON);

   
    firstNameInput.value = '';
    secondNameInput.value = '';
    passwordInput.value = '';
    emailInput.value = '';

    alert('Form data saved successfully!');
}


const form = document.querySelector('form');
form.addEventListener('submit', handleSubmit);