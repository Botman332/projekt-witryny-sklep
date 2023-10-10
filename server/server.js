const express = require('express')
const path = require('path')
const app = express()
const mysql= require('mysql');
require('dotenv').config();

app.use(express.static(path.resolve(__dirname, '../client/build')));

app.get("/api", (req, res) => {
    res.json({ "users": ["userOne", "UserTwo", "UserThree"] })
})

app.listen(5000, () => {console.log("Server started on port 5000")}) 

const connection = mysql.createConnection({
    host     : process.env.DB_HOST,
    user     : process.env.DB_USER,
    password : process.env.DB_PASSWORD,
    database : process.env.DB_DATABASE
  });

  connection.connect(function(err) {
    if (err) {
      console.error('error connecting: ' + err.stack);
      return;
    }
  
    console.log('connected as id ' + connection.threadId);
  });
  
  connection.query('SELECT * FROM users', function (error, results, fields) {
    if (error) throw error;
    console.log('The solution is: ', results);
  });
  
  connection.end();
// app.get('*', (req, res) => {
//     res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
//   });

