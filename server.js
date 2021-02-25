const express = require('express');
const app = express();


app.get('/' , (req, res) => {
    res.send('Welcome to the Forum !');
});









app.listen(3000, ()=> {
    console.log("I am listening for requests!!!");
  }); 