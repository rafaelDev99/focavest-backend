const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

const options = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'FocaVest Api',
        version: '1.0.0',
        description: 'Focavest API with Swagger documentation',
      },
    },
    apis: ['./routes/*.js'],
};

const specs = swaggerJsdoc(options);

module.exports = {
    specs,
    swaggerUi,
};