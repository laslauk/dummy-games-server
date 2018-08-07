const express = require('express');
var pgp = require('pg-promise')(/*options*/)

const app = express();

app.get('/' , (req,res) => {
    res.send('Hello!');
});



var db = pgp('postgres://postgres:lol0802@localhost:5432/lassetesti')

db.one('SELECT * AS value', 123)
  .then(function (data) {
    console.log('DATA:', data.value)
  })
  .catch(function (error) {
    console.log('ERROR:', error)
  })



app.listen(8000, () => console.log("express server running on port 4000"));