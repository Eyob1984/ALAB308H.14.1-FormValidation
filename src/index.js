
  const errors = {
    userNameErr : {
      user: 'user name taken',
      blank: 'Username cannot be blank',
      usernameChar: 'Username must be at least four characters long',
      twoUnique: 'Username must contain at least two unique characters',
      specialChar: 'Username cannot contain special characters or whitespace'
    },
    userEmailErr : {
      valid: 'The email must be a valid email address',
      domain: 'The email must not be from the domain example.com'
    },
    userPasswordErr : {
      passwordChar: 'Passwords must be at least 12 characters long',
      passwordUpLow: 'Passwords must have at least one uppercase and one lowercase letter',
      passwordOneNum: 'Passwords must contain at least one number',
      PasswordSpeChar: 'Passwords must contain at least one special character',
      password: 'Passwords cannot contain the word "password" (uppercase, lowercase, or mixed).',
      passwordUserName: 'Passwords cannot contain the username.',
      passwordBoth: 'Both passwords must match.'
    }
  }

  // Registration
  const  errorDisplay = document.getElementById('errorDisplay')
  const userNameInput = document.getElementById('userNameId') 
  const userEmailId = document.querySelector('#userEmailId')
  const userPasswordId = document.getElementById('userPasswordId')
  const userConfirmPassword = document.getElementById('userConfirmPassword')
  const formSub = document.getElementById('registration');
  // Login
  const loginForm = document.getElementById('login')

  // 1. Registration - Username Validation
  const userNameHelperFunction = (e) => {
    const userName = e.target.value.trim()

    if(userName.length === 0){
      errorDisplay.textContent = errors.userNameErr.blank;
      errorDisplay.style.display = 'block';
      return 
    }
    if(userName.length < 4) {
      errorDisplay = errors.userNameErr.usernameChar;
      errorDisplay.style.display = 'block';
      return
    }
    
    const unique = {};
    for (let i = 0; i < userName.length; i++) {
      const char = userName[i];
      unique[char] = true;
    }
    const UniqueChars = Object.keys(unique).length;
    if (UniqueChars < 2) {
      errorDisplay.textContent = errors.userNameErr.twoUnique;
      errorDisplay.style.display = 'block';
      return;
    }

    const userRegex = /^[a-zA-Z]+$/;
    if(!userRegex.test(userName)){
      errorDisplay.textContent = errors.userNameErr.specialChar;
      errorDisplay.style.display = 'block';
      return
    }

    errorDisplay.textContent = ''
  } 
 
  userNameInput.addEventListener('change', userNameHelperFunction)
// 2. Refistraion - Email Validation

const userEmailHelperFunction = (e) => {
  e.preventDefault()
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const emailValue = userEmailId.value
if(!emailRegex.test(emailValue)) {
  errorDisplay.textContent = errors.userEmailErr.valid;
  errorDisplay.style.display = 'block';
  return
}
if(emailValue.endsWith('@example.com')) {
  errorDisplay.textContent = errors.userEmailErr.domain;
  errorDisplay.style.display = 'block';
  return
}

errorDisplay.textContent = '';
}
userEmailId.addEventListener('change', userEmailHelperFunction)

// 3. Registration - Password Validation:

const userPasswordHelperFunction = (e) => {
  e.preventDefault()

  if(userPasswordId.value!== userConfirmPassword.value) {
    errorDisplay.textContent = errors.userPasswordErr.passwordBoth;
    return
  }

  if(userPasswordId.value < 12) {
    errorDisplay.textContent = errors.userPasswordErr.PasswordSpeChar;
    return
  }

  if (!/[A-Z]/.test(userPasswordId.value) || !/[a-z]/.test(userPasswordId.value)) {
    errorDisplay.textContent = errors.userPasswordErr.passwordUpLow;
    return
}

if(/\d/.test(userPasswordId.value)) {
  errorDisplay.textContent = errors.userPasswordErr.passwordOneNum;
  return
}
const spechailChar = ["!", "@", "#", "$", "%", "^", "&", "*", "(", ")", "_", "+", "-", "=", "[", "]", "{", "}", ";", ":", "'", "\"", "\\", "|", ",", ".", "<", ">", "/", "?"];

if(!userPasswordId.value.includes(spechailChar)){
  errorDisplay.textContent = errors.userPasswordErr.PasswordSpeChar;
  return
}

if(userPasswordId.value === userNameInput.value) {
  errorDisplay.textContent = errors.userPasswordErr.passwordUserName;
  return
}

errorDisplay = '';
}
userPasswordId.addEventListener('input', userPasswordHelperFunction)

//. Form Submission
const regFormSubHandler = (e) => {
  e.preventDefault()

let userName = userNameInput.value;
let email = userEmailId.value;
let password = userPasswordId.value;

let users = localStorage.getItem('users')
users ? users =JSON.parse(users) : users = [];
if (users.some(user => user.username === userName)) {
  errorDisplay.textContent = errors.userNameErr.user;
  errorDisplay.style.display = 'block';
  formSub.reset()
  return; 
}

let user = {
  username: userName,
  email: email,
  password: password
}

users.push(user)

localStorage.setItem('users', JSON.stringify(users));

formSub.reset()
errorDisplay.textContent = 'Success';
errorDisplay.style.background = 'green'
}
formSub.addEventListener('submit', regFormSubHandler)

const loginFormSubHandler = (e) => {
  e.preventDefault()

let username = userNameInput.value
let password = userPasswordId.value

if(username.trim() ==='') {
  errorDisplay.textContent = errors.userNameErr.blank;
  errorDisplay.style.display = 'block';
  return
}
let users = localStorage.getItem('users')
if(users) {
  users = JSON.parse(users);
  
  let user = users.find( (user) => {
    return user.username.toLowerCase === username;
  })
  if(user && user.password === password) {
    errorDisplay.textContent = 'Success';
    errorDisplay.style.background = 'green'
    return
  }
}
errorDisplay.textContent = errors.userNameErr.blank;
errorDisplay.style.display = 'block';
}
loginForm.addEventListener('submit', loginFormSubHandler)
