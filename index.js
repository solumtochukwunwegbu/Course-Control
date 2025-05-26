const signupForm = document.getElementById("signup-form");
const loginForm = document.getElementById("login-form");
const toggleLink = document.getElementById("toggle-link");
const formTitle = document.getElementById("form-title");
const errorMessage = document.getElementById("error-message");
const toggleText = document.getElementById("toggle-text");

// Form toggle logic
toggleLink.addEventListener("click", function (e) {
  e.preventDefault();

  const isLogin = loginForm.style.display === "block";

  if (isLogin) {
    loginForm.style.display = "none";
    signupForm.style.display = "block";
    toggleLink.textContent = "Login";
    formTitle.textContent = "Register To Get Started!";
    toggleText.textContent = "Already have an account?";
  } else {
    signupForm.style.display = "none";
    loginForm.style.display = "block";
    toggleLink.textContent = "Signup";
    formTitle.textContent = "Login";
    toggleText.textContent = "Don't have an account?";
  }

  errorMessage.textContent = ""; // clear previous errors
});

// ===================
// Helper Validation Functions
// ===================

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidUsername(username) {
  return /^[a-zA-Z0-9_]{3,15}$/.test(username); // simple username rule
}

// ===================
// Signup Submit
// ===================

signupForm.addEventListener("submit", async function (event) {
  event.preventDefault();

  const username = document.getElementById("signup-username").value.trim();
  const email = document.getElementById("signup-email").value.trim();
  const password = document.getElementById("signup-password").value;

  // Frontend Validation
  const errors = [];
  if (!username) {
    errors.push("Please enter a username.");
  } else if (!isValidUsername(username)) {
    errors.push("Username must be 3–15 characters (letters, numbers, or _ only).");
  }

  if (!email) {
    errors.push("Please enter your email.");
  } else if (!isValidEmail(email)) {
    errors.push("Please enter a valid email address.");
  }

  if (!password) {
    errors.push("Please enter a password.");
  } else if (password.length < 8) {
    errors.push("Password must be at least 8 characters long.");
  }

  if (errors.length > 0) {
    errorMessage.textContent = errors.join("\n");
    return;
  }

  // Backend Request
  try {
    const res = await fetch("/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, email, password })
    });

    const data = await res.json();
    if (data.message === 'Username already exists') {
      errorMessage.textContent = "That username is already taken. Please choose another.";
    } 
    else {
      alert("Signed up successfully!");
      signupForm.reset();
      // Optionally redirect or switch to login form
      document.querySelector('.wrapper').style.display = 'none';
    }
  } catch (error) {
    errorMessage.textContent = "Something went wrong. Please try again later.";
  }
});

// ===================
// Login Submit
// ===================

loginForm.addEventListener("submit", async function (event) {
  event.preventDefault();

  const email = document.getElementById("login-email").value.trim();
  const password = document.getElementById("login-password").value;

  // Frontend Validation
  const errors = [];
  if (!email) {
    errors.push("Please enter your email.");
  } else if (!isValidEmail(email)) {
    errors.push("Please enter a valid email address.");
  }

  if (!password) {
    errors.push("Please enter your password.");
  }

  if (errors.length > 0) {
    errorMessage.textContent = errors.join(". ");
    return;
  }

  // Backend Request
  try {
    const res = await fetch("/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();
    if (data.success) {
      alert("Login successful!");
      loginForm.reset();
      window.location.href = "/"; // Redirect after login
      document.querySelector('.wrapper').style.display = 'none';
    } else {
      errorMessage.textContent = data.message || "Incorrect email or password.";
    }
  } catch (error) {
    errorMessage.textContent = "Something went wrong. Please try again later.";
  }
});

// ===================
// Overlay Logic (optional)
// ===================

window.onload = function () {
  const username = sessionStorage.getItem("username");
  const email = sessionStorage.getItem("email");
  const password = sessionStorage.getItem("password");

  if (!username || !email || !password) {
    const overlay = document.getElementsByClassName('wrapper')[0];
    if (overlay) {
      overlay.style.display = "flex";
    }
  }
};
