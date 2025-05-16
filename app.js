// Import the express module
const express = require('express');
const app = express();
const port = 3000; // You can change the port number


// Import the sql module
const mysql = require('mysql2');


// Import the ejs module
const path = require('path');
app.set('views', path.join(__dirname)); // This makes Express look in the root folder
app.set('view engine', 'ejs');


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

app.get('/courses', function(req, res) {
  res.send('hey');
  
  });






// app.get('/courses/:titleID', (req, res) => {
//   // const titleID = req.params.titleID;
//   const sql = 'SELECT * FROM course';
//   connection.query(sql, (err, results) => {
//     if (err) throw err;

  // connection.query('SELECT * FROM course WHERE titleID = ?', [titleID], function (err, results) {
  //   if (err) throw err;

  //   if (results.length === 0) {
  //     return res.status(404).send('Course not found');
  //   }

    // Still pass as an array
//     res.render('courses', { course: results });
//   });
// });






app.get('/profile', function (req, res) {
  connection.query('SELECT * FROM profile', function (err, results) {
    if (err) throw err;
    res.render('profile', {profile: results });
  });
});

