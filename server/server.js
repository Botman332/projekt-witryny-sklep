const express = require('express')
const path = require('path')
const app = express()
const mysql= require('mysql');

app.use(express.static(path.resolve(__dirname, '../client/build')));

app.get("/api", (req, res) => {
    res.json({ "users": ["userOne", "UserTwo", "UserThree"] })
})

app.listen(5000, () => {console.log("Server started on port 5000")}) 

const connection = mysql.createConnection({
    host     : 'bvlmt5ugt9t6m7rdvtpm-mysql.services.clever-cloud.com',
    user     : 'uyob3vcu3sbv6pgo',
    password : 'dpuY0IRPVTnyGz64YrDs',
    database : 'bvlmt5ugt9t6m7rdvtpm'
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

