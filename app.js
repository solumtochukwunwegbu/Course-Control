// Import the express module
const express = require('express');
const app = express();
const port = 3000; // You can change the port number

// Start the server and listen on the specified port
app.listen(port, () => {
  console.log(`Server is running on http://localhost:`+ port);
});


// Import the sql module
const mysql = require('mysql2');


// Import the ejs module
const path = require('path');
app.set('views', path.join(__dirname)); // This makes Express look in the root folder
app.set('view engine', 'ejs');


//Import the bodyParser
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());


// Serve the root folder as static
app.use(express.static(__dirname));



//===============================================
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'coursecontrol'
});

connection.connect(function(err) {
  if (err) {
    console.warn("\x1b[31m" + "CONNECT TO SQL SERVER!" + "\x1b[0m\x1b[39m");
    return;
  }
  console.log('Connected to MySQL!');
  }
);









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



// app.get('/courses', function(req, res) {
//   const sql = 'SELECT * FROM course';
//   connection.query(sql, (err, results) => {
//     if (err) throw err;
//     res.render('courses',);
//   });
// });

app.get('/courses/:titleID', function(req, res) {
  const sql = 'SELECT * FROM course WHERE titleID = ?';
  connection.query(sql, [req.params.titleID], (err, results) => {
    if (err) throw err;
    const course = results[0];
    // res.render('courses', { course });
    if (course) {
      res.render('courses', { course });
    } else {
      res.render('courses', { course: {} });
    }
  });
});






// app.get('/profile', function (req, res) {
//   connection.query('SELECT * FROM profile', function (err, results) {
//     if (err) throw err;
//     res.render('profile', {profile: results });
//   });
// });

app.post('/submit', (req, res) => {
  const { username, email, password } = req.body;

  const sql = 'INSERT INTO profile (username, email, password) VALUES (?, ?, ?)';
  connection.query(sql, [username, email, password], (err, results) => {
    if (err) throw err;
    res.json({ message: 'Data saved successfully' });
  });
});

app.get('/profile', function (req, res) {
  connection.query('SELECT * FROM profile ORDER BY userID DESC LIMIT 1', function (err, results) {
    if (err) throw err;
    // res.json(results[0]);
    res.render('profile', { profile: results[0] });
  });
});