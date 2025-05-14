// Import the sql module
const mysql = require('mysql2');


// Import the express module
const express = require('express');
const app = express();
const port = 3000; // You can change the port number

// Import the ejs module
app.set("view engine","ejs");


//===============================================
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'coursecontrol'
});

connection.connect(
  function(err) {
  if (err) {
    throw err;
  }
  console.log('Connected to MySQL!');
  }
);

//===================================================
// Basic route that responds with "Hello World"
app.get('/', (req, res) => {
  res.render("index");
});

// Start the server and listen on the specified port
app.listen(port, () => {
  console.log(`Server is running on http://localhost:`+ port);
});

