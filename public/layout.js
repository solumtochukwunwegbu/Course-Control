function insertLayout() {
    // Inject CSS styles
    document.head.innerHTML += 
    `<style>
              /* src/components/Header/Header.css */
          .header-container {
              display: flex;
              align-items: center;
              color: white;
              justify-content: space-between;
              margin-inline: 30px; 
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
              margin-inline: 20px;
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
              
    </style>`;

   


    // Header HTML
    const headerHTML = `
    <header class="header-container">
    <h1 class="logo">Course Control</h1>
    <nav class="nav">
        <a class="nav-link" href="/">Home</a>
        <a class="nav-link" href="/profile">Profile</a>
    </nav>
    </header>
    `;
  
    // Footer HTML
    const footerHTML = `
    <footer class="site-footer">
    <p>&copy; 2025 Course Control</p>
    <p>
      Email: coursecontrol@gmail.com |
      Phone: +234 90 567 890
    </p>
    </footer>
    `;
  
    // Insert HTML
    document.getElementById("Header").innerHTML = headerHTML;
    document.getElementById("Footer").innerHTML = footerHTML;
    console.log("Layout inserted");
  }
  

  insertLayout();