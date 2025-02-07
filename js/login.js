// form and form global feedback
const loginForm = document.getElementById("login-form");
const loginFormError = document.getElementById("login-form-error");
const loginFormSuccess = document.getElementById("login-form-success");

// fields
const loginEmail = document.getElementById("login-email");
const loginPassword = document.getElementById("login-password");

// fields errors
const loginEmailError = document.getElementById("login-email-error");
const loginPasswordError = document.getElementById("login-password-error");

// check if user is already logged in
const user = localStorage.getItem("user");
if (user) {
  loginFormError.textContent = "You Already Logged In";
  loginForm.classList.add("d-none");
}

// check for email
function checkEmailField() {
  const emailRegex = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
  if (loginEmail.value === "") {
    loginEmailError.textContent = "Email is required";
    return;
  } else if (!loginEmail.value.match(emailRegex)) {
    loginEmailError.textContent = "Invalid email format";
    return;
  } else loginEmailError.textContent = "";
}

// check for password
function checkPasswordField() {
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,16}$/;
  if (loginPassword.value === "") {
    loginPasswordError.textContent = "Password is required";
    return;
  } else if (loginPassword.value.length < 8) {
    loginPasswordError.textContent = "Password must be at least 8 characters";
    return;
  } else if (loginPassword.value.length > 16) {
    loginPasswordError.textContent = "Password must be at most 16 characters";
    return;
  } else if (!loginPassword.value.match(passwordRegex)) {
    loginPasswordError.textContent =
      "Password must be at least contain one uppercase and lowercase letters, and numbers";
    return;
  } else loginPasswordError.textContent = "";
}

loginEmail.addEventListener("blur", checkEmailField);
loginPassword.addEventListener("blur", checkPasswordField);

// login user
function login(email, password) {
  const users = localStorage.getItem("users");
  if (!users)
    loginFormError.textContent =
      "User doesn't exists. please log in with another email or register this email";
  else {
    const usersData = JSON.parse(users);
    const user = usersData.find((user) => user?.email === email);

    if (!user) {
      loginFormError.textContent =
        "User doesn't exists. please log in with another email or register this email";
      return;
    }

    const isUserCorrect = user?.password === password;
    if (isUserCorrect) {
      loginFormError.textContent = "";

      // set current user to localStorage
      localStorage.setItem("user", JSON.stringify(user));

      loginFormSuccess.textContent = "User logged in successfully";
      setTimeout(() => {
        location.replace(`./profile.html`);
      }, 1000);
    } else {
      loginFormError.textContent = "Wrong password. Please try again";
    }
  }
}

// login form submit handler
loginForm.addEventListener("submit", (e) => {
  e.preventDefault();

  checkEmailField();
  checkPasswordField();

  if (
    loginEmailError.textContent !== "" ||
    loginPasswordError.textContent !== ""
  ) {
    loginFormError.textContent = "Missing Fields. Failed to login";
    return;
  } else loginFormError.textContent = "";

  const email = loginEmail.value;
  const password = loginPassword.value;

  login(email, password);
});
