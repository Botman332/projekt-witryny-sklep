const express = require('express')
const path = require('path')
const app = express()

app.use(express.static(path.resolve(__dirname, '../client/build')));

app.get("/api", (req, res) => {
    res.json({ "users": ["userOne", "UserTwo", "UserThree"] })
})

app.listen(5000, () => {console.log("Server started on port 5000")}) 

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
  });

