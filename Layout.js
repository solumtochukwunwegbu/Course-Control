function insertLayout() {
    // Inject CSS styles
    const style = document.createElement("style");
    style.textContent = `
      /* src/components/Header/Header.css */
.header-container {
    display: flex;
    align-items: center;
    color: white;
    justify-content: space-between;
  }
  
  .logo {
    font-size: 45px;
    font-weight: bolder;
    font-family: serif;
    /* cursor: pointer; */
  }
  
  .nav {
    display: flex;
    gap: 40px;
    cursor: pointer;
  }
  
  .nav-link {
    color: white;
    text-decoration: none;
    font-size: 18px;
  }
  
  .nav-link:hover {
    text-decoration: underline;
    color: gray;
    transition: color 0.25s ease;}
   
   
   .site-footer {
    text-align: center;
    padding: 20px;
    margin-top: 40px;
    background-color: #242424;
    border-top: solid white 1px;
    color: #333;
    font-family: Arial, sans-serif;
    font-size: 14px;
    color: white;
  }
  
  .site-footer a {
    text-decoration: none;
    cursor: pointer;
    color: white;
  }
  
  .site-footer a:hover {
    text-decoration: underline;
  }
    `;
    document.head.appendChild(style);
  
    // Header HTML
    const headerHTML = `
    <header class="header-container">
    <h1 class="logo">Course Control</h1>
    <nav class="nav">
        <a class="nav-link" href="index.html">Home</a>
        <a class="nav-link" href="profile.html">Profile</a>
    </nav>
    </header>
    `;
  
    // Footer HTML
    const footerHTML = `
    <footer class="site-footer">
    <p>&copy; 2025 Course Control</p>
    <p>
      Email: <a>coursecontrol@gmail.com</a> |
      Phone: <a>+1 (234) 567-890</a>
    </p>
    </footer>
    `;
  
    // Insert HTML
    document.getElementById("Header").innerHTML = headerHTML;
    document.getElementById("Footer").innerHTML = footerHTML;
  }
  