const signupForm = document.getElementById("signup-form");
const loginForm = document.getElementById("login-form");
const toggleLink = document.getElementById("toggle-link");
const formTitle = document.getElementById("form-title");
const errorMessage = document.getElementById("error-message");
const toggleText = document.getElementById("toggle-text");

// ===================
// Form Toggle Logic
// ===================
toggleLink.addEventListener("click", function (e) {
  e.preventDefault();

  const isLoginVisible = loginForm.style.display === "block" || window.getComputedStyle(loginForm).display === "block";

  if (!isLoginVisible) {
    // Show login
    loginForm.style.display = "block";
    signupForm.style.display = "none";
    toggleLink.textContent = "Signup";
    formTitle.textContent = "Login";
    toggleText.textContent = "Don't have an account?";
  } else {
    // Show signup
    loginForm.style.display = "none";
    signupForm.style.display = "block";
    toggleLink.textContent = "Login";
    formTitle.textContent = "Register To Get Started!";
    toggleText.textContent = "Already have an account?";
  }

  errorMessage.textContent = "";
});


// ===================
// Helper Validation
// ===================
function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidUsername(username) {
  return /^[a-zA-Z0-9_]{3,15}$/.test(username);
}

// ===================
// Signup Handler
// ===================
signupForm.addEventListener("submit", async function (event) {
  event.preventDefault();

  const username = document.getElementById("signup-username").value.trim();
  const email = document.getElementById("signup-email").value.trim();
  const password = document.getElementById("signup-password").value;

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

  try {
    const res = await fetch("/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, email, password })
    });

    const data = await res.json();

    if (data.message === "Username already exists") {
      errorMessage.textContent = "That username is already taken. Please choose another.";
    } else {
      alert("Signed up successfully!");
      signupForm.reset();
      document.querySelector(".wrapper").style.display = "none";
    }
  } catch (error) {
    errorMessage.textContent = "Something went wrong. Please try again later.";
  }
});

// ===================
// Login Handler
// ===================
loginForm.addEventListener("submit", async function (event) {
  event.preventDefault();

  const email = document.getElementById("login-email").value.trim();
  const password = document.getElementById("login-password").value;

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

  try {
    const res = await fetch("/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();

    if (data.success) {
  sessionStorage.setItem("isLoggedIn", "true");

  alert("Login successful!");
  loginForm.reset();

  // Hide overlay
  document.querySelector(".wrapper").style.display = "none";

  // Redirect to home page
  window.location.href = "/";
} else {
  errorMessage.textContent = data.message || "Incorrect email or password.";
}

  } catch (error) {
    errorMessage.textContent = "Something went wrong. Please try again later.";
  }
});

// ===================
// Optional Overlay Logic
// ===================
window.onload = function () {
  const isLoggedIn = sessionStorage.getItem("isLoggedIn");

  if (!isLoggedIn) {
    const overlay = document.getElementsByClassName("wrapper")[0];
    if (overlay) {
      overlay.style.display = "flex";
    }
  } else {
    // Hide overlay if already logged in
    const overlay = document.getElementsByClassName("wrapper")[0];
    if (overlay) {
      overlay.style.display = "none";
    }
  }
};

