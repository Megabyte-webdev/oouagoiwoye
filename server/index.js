// imports 
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');


// initializations 
const app = express();
dotenv.config();
const port = process.env.PORT || 5000;

//middlewares
app.use(cors());
app.use(express.json());


// routes




// port
app.listen(port, ()=>{
    console.log(`server running on port ${port}`)
})