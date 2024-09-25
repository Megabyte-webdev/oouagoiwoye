// imports 
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const corsOption = require('./middleware/cors');


// initializations 
const app = express();
dotenv.config();
const port = process.env.PORT || 5000;

//middlewares
app.use(express.urlencoded({extended: true}));
app.use(cors(corsOption));
app.use(express.json());
app.use(express.static('public'));


// routes




// port
app.listen(port, ()=>{
    console.log(`server running on port ${port}`)
})