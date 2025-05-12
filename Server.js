// Import the express module
const express = require('express');
const app = express();
const port = 3000; // You can change the port number

// Basic route that responds with "Hello World"
app.get('/', (req, res) => {
  res.send('Hello World');
});

// Start the server and listen on the specified port
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
