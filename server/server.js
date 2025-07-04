// imports 
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const corsOption = require('./src/middleware/cors');
const errorHandler = require("./src/middleware/errorHandler")
const { swaggerDocument, swaggerUi } = require("./src/documentation/swagger");
const path = require('path');

// initializations 
const app = express();
dotenv.config();
const port = process.env.PORT || 5000;

//middlewares
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.use(cors(corsOption));
app.use(express.json());
app.use('/public', express.static(path.join(__dirname, 'public')));



//swagger UI 
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// routes
app.use("/api/oouweb/communities", require("./src/Routes/communityRoute"));
app.use("/api/oouweb/news", require("./src/Routes/newsRoute"));
app.use("/api/oouweb/campus", require("./src/Routes/campusRoute"));
app.use("/api/oouweb/faculty", require("./src/Routes/facultyRoute"));
app.use("/api/oouweb/department", require("./src/Routes/departmentRoute"));
app.use("/api/oouweb/lecturer", require("./src/Routes/lecturerRoute"));
app.use('/api/oouweb/administration', require('./src/Routes/administrationRoute'));
app.use('/api/oouweb/principal', require("./src/Routes/principalORoute"));
app.use('/api/oouweb/ceducation', require("./src/Routes/CEducationRoute"));
app.use('/api/oouweb/directorates', require("./src/Routes/DirctoratesRoute"));
app.use('/api/oouweb/admission', require("./src/Routes/admissionRequirementRoute"));
app.use("/api/oouweb/schoolfee", require("./src/Routes/schoolFeeRoute"));
app.use('/api/oouweb/admin', require("./src/Routes/AdminRoutes"));
app.use("/api/oouweb/faqs", require("./src/Routes/faqRoute"));


// error handler
app.use(errorHandler);

// port
app.listen(port, ()=>{
    console.log(`server running on port ${port}`);
    console.log(`API Docs available at http://localhost:${port}/api-docs`);
})