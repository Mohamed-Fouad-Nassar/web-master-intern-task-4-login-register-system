// form and form global feedback
const registerForm = document.getElementById("register-form");
const registerFormError = document.getElementById("register-form-error");
const registerFormSuccess = document.getElementById("register-form-success");

// fields
const registerName = document.getElementById("register-name");
const registerEmail = document.getElementById("register-email");
const registerPassword = document.getElementById("register-password");

// fields errors
const registerNameError = document.getElementById("register-name-error");
const registerEmailError = document.getElementById("register-email-error");
const registerPasswordError = document.getElementById(
  "register-password-error"
);

// check if user is already logged in
const user = localStorage.getItem("user");
if (user) {
  registerFormError.textContent = "You Already Logged In";
  registerForm.classList.add("d-none");
}

// check for name
function checkNameField() {
  if (registerName.value === "") {
    registerNameError.textContent = "Name is required";
    return;
  } else if (registerName.value.length < 3) {
    registerNameError.textContent = "Name must be at least 3 characters";
    return;
  } else if (registerName.value.length > 20) {
    registerNameError.textContent = "Name must be at most 20 characters";
    return;
  } else registerNameError.textContent = "";
}

// check for email
function checkEmailField() {
  const emailRegex = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
  if (registerEmail.value === "") {
    registerEmailError.textContent = "Email is required";
    return;
  } else if (!registerEmail.value.match(emailRegex)) {
    registerEmailError.textContent = "Invalid email format";
    return;
  } else registerEmailError.textContent = "";
}

// check for password
function checkPasswordField() {
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,16}$/;
  if (registerPassword.value === "") {
    registerPasswordError.textContent = "Password is required";
    return;
  } else if (registerPassword.value.length < 8) {
    registerPasswordError.textContent =
      "Password must be at least 8 characters";
    return;
  } else if (registerPassword.value.length > 16) {
    registerPasswordError.textContent =
      "Password must be at most 16 characters";
    return;
  } else if (!registerPassword.value.match(passwordRegex)) {
    registerPasswordError.textContent =
      "Password must be at least contain one uppercase and lowercase letters, and numbers";
    return;
  } else registerPasswordError.textContent = "";
}

registerName.addEventListener("blur", checkNameField);
registerEmail.addEventListener("blur", checkEmailField);
registerPassword.addEventListener("blur", checkPasswordField);

// add user to local storage with success feedback
function addUserToLocalStorage(data) {
  localStorage.setItem("users", data);

  registerFormSuccess.textContent = "User registered successfully";

  setTimeout(() => {
    location.replace(`./index.html`);
  }, 1000);
}
// register
function register(name, email, password) {
  const users = localStorage.getItem("users");

  // if users is null add the users within an array directly to localStorage
  if (users === null)
    addUserToLocalStorage(JSON.stringify([{ email, password, name }]));
  else {
    // if users is not null add the users within an array to localStorage after check the email not registered yet
    const usersData = JSON.parse(users);
    const isUserExists = usersData.some((user) => user?.email === email);
    if (isUserExists)
      registerFormError.textContent =
        "User already exists. please log in or register with a different email";
    else {
      usersData.push({ email, password, name });
      addUserToLocalStorage(JSON.stringify(usersData));
    }
  }
}

// register form submit handler
registerForm.addEventListener("submit", (e) => {
  e.preventDefault();

  checkNameField();
  checkEmailField();
  checkPasswordField();

  if (
    registerNameError.textContent !== "" ||
    registerEmailError.textContent !== "" ||
    registerPasswordError.textContent !== ""
  ) {
    registerFormError.textContent = "Missing Fields. Failed to register";
    return;
  } else registerFormError.textContent = "";

  const name = registerName.value;
  const email = registerEmail.value;
  const password = registerPassword.value;

  register(name, email, password);
});
