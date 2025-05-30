// Import the express module
const express = require('express');
const path = require('path');
const app = express();
const port = 3000; // You can change the port number
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));



// Import the sql module
const mysql = require('mysql2');


// Import the ejs module
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');





// Import the multer module
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });


//Import the bodyParser
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());





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




// Import epress-session module

const session = require('express-session');

app.use(session({
  secret: 'your-secret-key', // Change this to a strong secret in production
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false, // Set to true in production if using HTTPS
    maxAge: 24 * 60 * 60 * 1000 // 1 day
  }
}));





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
    if (err) return res.status(500).json({ message: 'Database error' });

    if (results.length > 0) {
     req.session.profile = results[0]; // Contains everything, including password

     res.json({ success: true });
    } else {
      res.json({ success: false, message: 'Invalid email or password' });
    }
  });
});




// app.get('/profile', (req, res) => {
//   if (!req.session.profile) {
//     return res.redirect('/');  
//   }
 
//   res.render('profile', { profile: req.session.profile });
// });
app.get('/profile', (req, res) => {
  if (!req.session.profile) {
    return res.redirect('/');
  }

  const userID = req.session.profile.userID;
  const sql = 'SELECT * FROM profile WHERE userID = ?';

  connection.query(sql, [userID], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Database error");
    }

    if (results.length > 0) {
      req.session.profile = results[0]; // Refresh session data
      res.render('profile', { profile: results[0] });
    } else {
      res.status(404).send("User not found");
    }
  });
});





app.post('/upload-profile-picture', upload.single('profile-picture'), (req, res) => {
    const file = req.file;
    const userID = req.session.profile.userID;

    const sql = 'UPDATE profile SET profilePic = ? WHERE userID = ?';
    connection.query(sql, [file.filename, userID], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Database error' });
        }

        // Update the session object with new profilePic
        req.session.profile.profilePicture = file.filename;

        res.json({ message: 'Profile picture uploaded successfully' });
    });
});








const axios = require('axios');
const { profile } = require('console');

const transfer = async (req, res) => {
  try {

    const response = await axios.post(
      'https://api.paystack.co/transaction/initialize',
      {
        email: email,
        // amount: 500000, // amount in kobo
        reason: 'Payment for services',
      },
      {
        headers: {
          Authorization: 'Bearer sk_test_8e8c742d421d7ea4caf2b3fc392ef207ecf44440',
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

