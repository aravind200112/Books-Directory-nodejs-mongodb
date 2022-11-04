const express = require('express');
const mongoose = require('mongoose');
const url = 'mongodb://localhost:27017/Books';

const app = express();
mongoose.connect(url, {UseNewUrlParser:true});
const con = mongoose.connection

con.on('open', function(){

    console.log("Connected successfully");
})

app.use(express.json())

const bookRouter = require("./routes/books.js");
app.use('/books', bookRouter);  

app.listen(5000, function(){

    console.log("Server connected to port 5000 successfully");
})