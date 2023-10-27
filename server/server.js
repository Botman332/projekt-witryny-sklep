const express = require('express')
const path = require('path')
const app = express()
const mysql = require('mysql');
const bcrypt = require('bcrypt'); 
require('dotenv').config();

app.use(express.static(path.resolve(__dirname, '../client/build')));
app.use(express.json());
app.use(express.urlencoded({ extended: true })) ;

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
  
  // connection.query('SELECT * FROM users', function (error, results, fields) {
  //   if (error) throw error;
  //   console.log('The solution is: ', results);
    
  // });

  app.post("/register-user", async (req, res) => {
    const hashedPassword = await bcrypt.hash(req.body.password, 12);
    connection.query({
      sql: 'INSERT INTO users (email, password) VALUES(?, ?)',
      values: [req.body.email, hashedPassword]
  }, function (error, results, fields){
      if (error) throw error;
      // console.log(results);
    })
    // console.log(req.body.email);
    res.send('succes');   
})


//cft6&YGV
//Zrobić bugfixa żeby nie sprawdzał roli konta które nie istnieje
app.post("/admin-login", async (req, res) => {
    connection.query({
    sql: 'SELECT rola FROM users WHERE email=?',
    values: [req.body.email]
},  function (error, results, fields){
    if (error) throw error;
    res.json(results[0].rola)
  })   
})

app.post("/get-zamowienia", async (req, res) => {
  connection.query({
  sql: 'SELECT * FROM zamowienie',
},  function (error, results, fields){
  if (error) throw error;
  res.json(results)
  console.log(results);
})   
})
  
// connection.end();

// app.get('*', (req, res) => {
//     res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
//   });

