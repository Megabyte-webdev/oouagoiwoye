const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
// const file = require("./apifile.yaml")
const YAML = require("yamljs")
const path = require("path")

const swaggerDocument = YAML.load(path.join(__dirname, "apifile.yaml"))



  
  module.exports = { swaggerDocument, swaggerUi };