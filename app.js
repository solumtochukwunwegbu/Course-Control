// Import the express module
const express = require('express');
const app = express();
const port = 3000; // You can change the port number


// Import the sql module
const mysql = require('mysql2');


// Import the ejs module
app.set("view engine","ejs");
app.set('views', __dirname);

//Import the bodyParser
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended : true}));


// Serve the root folder as static
app.use(express.static(__dirname));



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




// Start the server and listen on the specified port
app.listen(port, () => {
  console.log(`Server is running on http://localhost:`+ port);
});




//==========================================================================================================
//==========================================================================================================
//==========================================================================================================
//==========================================================================================================
//==========================================================================================================



app.get('/', (req, res) => {
  const sql = 'SELECT * FROM course';

  connection.query(sql, (err, results) => {
    if (err) throw err;

    res.render('index', { course: results });
  });
});

app.get('/courses', function (req, res) {
  connection.query('SELECT * FROM course', function (err, results) {
    if (err) throw err;
    res.render('courses', { course: results });
  });
});

app.get('/profile', function (req, res) {
  connection.query('SELECT * FROM course', function (err, results) {
    if (err) throw err;
    res.render('profile', {profile: results });
  });
});


