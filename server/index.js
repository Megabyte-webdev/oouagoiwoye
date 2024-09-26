// imports 
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const corsOption = require('./src/middleware/cors');
const errorHandler = require("./src/middleware/errorHandler")
const { swaggerUi, swaggerSpec } = require("./swagger");

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
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/api/oouweb/communities', require("./src/Routes/communityRoute"));


// error handler
app.use(errorHandler);

// port
app.listen(port, ()=>{
    console.log(`server running on port ${port}`)
    console.log(`API Docs available at http://localhost:${port}/api-docs`);
})