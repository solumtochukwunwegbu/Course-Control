   
    function saveData(event) {
      // Get form data
      event.preventDefault();
      const username = document.getElementById("username").value;
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;

      document.getElementById("username-error").textContent = "";
      document.getElementById("email-error").textContent = "";
      document.getElementById("password-error").textContent = ""; 
      
      // Validate username ( Udemy-like requirements )
      const usernameRegex = /^[a-zA-Z0-9._-]/;
      if (!usernameRegex.test(username) || username.length < 3 || username.length > 20) {
        // alert("Username must be between 3-20 characters, and can only contain letters, numbers, periods, underscores, and hyphens.");
        document.getElementById("username-error").textContent = "Username must be between 3-20 characters, and can only contain letters, numbers, periods, underscores, and hyphens.";  
        return;
      }

      // Validate email format
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!emailRegex.test(email)) {
        // alert("Invalid email format. Please enter a valid email address.");
        document.getElementById("email-error").textContent = "Invalid email format. Please enter a valid email address.";
        return;
      }

      // Validate password length
      if (password.length < 5) {
        // alert("Password must be at least 5 characters long.");
        document.getElementById("password-error").textContent = "Password must be at least 5 characters long.";
        return;
      }
      
      if(password.length > 20){
        // alert("Password must be at most 20 characters long.");
        document.getElementById("password-error").textContent = "Password must be at most 20 characters long.";
        return;
      } 
      
      
            fetch("/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ username, email, password })
      })
        .then(response => response.json())
        .then(data => {
          console.log(data);
        })
        .catch(error => {
          console.error(error);
        });

      // If all inputs are valid, save data to sessionStorage
      sessionStorage.setItem("username", username);
      sessionStorage.setItem("email", email);
      sessionStorage.setItem("password", password);

      document.getElementById("overlay").style.display = "none";




}


    
     window.onload = function () {
    
            const username = sessionStorage.getItem("username");
            const email = sessionStorage.getItem("email");
            const password = sessionStorage.getItem("password");
    
               if (!username || !email || !password) {
                document.getElementById("overlay").style.display = "flex";
            }
        };
 
  