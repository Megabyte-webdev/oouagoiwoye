const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');


const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
      title: 'OOU Web API',
      version: '1.0.0',
      description: 'API documentation for OOU website',
    },
    servers: [
      {
        url: 'http://localhost:5000', // Your server URL
      },
    ],
  };


const options = {
    swaggerDefinition,
    apis: ["./src/Routes/*.js"], // Path to your route files
};
  
  // Initialize swagger-jsdoc
  const swaggerSpec = swaggerJsdoc(options);
  
  module.exports = { swaggerUi, swaggerSpec };