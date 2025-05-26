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


app.post('/signup', (req, res) => {
  const { username, email, password } = req.body;

  const sqlCheck = 'SELECT * FROM profile WHERE username = ?';
  connection.query(sqlCheck, [username], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Database error' });
    }

    if (results.length > 0) {
      return res.json({ message: 'Username already exists' });
    } else {
      const sqlInsert = 'INSERT INTO profile (username, email, password) VALUES (?, ?, ?)';
      connection.query(sqlInsert, [username, email, password], (err, results) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ message: 'Database error' });
        }
        res.json({ message: 'Data saved successfully' });
      });
    }
  });
});




app.post("/login", (req, res) => {
  const { email, password } = req.body;

  const sql = 'SELECT * FROM profile WHERE email = ? AND password = ?';
  connection.query(sql, [email, password], (err, results) => {
    if (err) throw err;

    if (results.length > 0) {
      res.json({ success: true });
    } else {
      res.json({ success: false, message: 'Invalid email or password' });
    }
  });
});



app.get('/profile', function (req, res) {
  connection.query('SELECT * FROM profile ORDER BY userID DESC LIMIT 1', function (err, results) {
    if (err) throw err;
    // res.json(results[0]);
    res.render('profile', { profile: results[0] });
  });
});



const axios = require('axios');

const transfer = async (req, res) => {
  try {
    const response = await axios.post(
      'https://api.paystack.co/transfer',
      {
        source: 'balance',
        amount: 500000, // amount in kobo
        recipient: 'RCP_xxxxxxxx',
        reason: 'Payment for services',
      },
      {
        headers: {
          Authorization: 'Bearer sk_test_XXXXXXXXXXXXXXXXX',
          'Content-Type': 'application/json',
        },
      }
    );

    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};






// Start the server and listen on the specified port
app.listen(port, () => {
  console.log(`Server is running on http://localhost:`+ port);
});

