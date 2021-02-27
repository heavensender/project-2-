const express = require('express');
const app = express();
const mongoose = require('mongoose')
const port = process.env.PORT || 3000
const authorsController = require('./controllers/authors.js');
const mongoURL = process.env.DB_URL || 'mongodb://localhost:27017/blog';
const methodOverride = require('method-override')



mongoose.connect(mongoURL);
mongoose.connection.once('open',()=> {
    console.log('connected to mongodb')
})



app.use(methodOverride('_method'));
app.use(express.urlencoded({extended:false}));
app.use('/authors', authorsController);



app.get('/',(req,res)=>{
    res.render('index.ejs');
})
app.listen(port, () =>{
    console.log(`listening at PORT ${port}....`)
});


