// table data elements
const table = document.querySelector("table");
const profileName = document.getElementById("profile-name");
const profileEmail = document.getElementById("profile-email");

// profile feedback elements
const profileError = document.getElementById("profile-error");
const profileSuccess = document.getElementById("profile-success");

// log out button
const logOutBtn = document.getElementById("logout-btn");

// set the user data to the table data elements
function getUserData() {
  const userFromLocalStorage = localStorage.getItem("user");

  if (!userFromLocalStorage) {
    profileError.textContent =
      "User not logged in. Please log in to see your profile.";
    logOutBtn.classList.add("d-none");
    table.classList.add("d-none");
  } else {
    const { name, email } = JSON.parse(userFromLocalStorage);
    profileName.textContent = name;
    profileEmail.textContent = email;
  }
}
getUserData();

logOutBtn.addEventListener("click", () => {
  localStorage.removeItem("user");

  profileSuccess.textContent = "User logged out successfully";
  setTimeout(() => {
    location.href = "/index.html";
  }, 1000);
});
