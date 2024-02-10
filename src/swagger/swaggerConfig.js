const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'RentEase',
      version: '1.0.0',
    },
  },
  apis: ['api/routes/User.js'], // files containing annotations as above
};


const openapiSpecification = swaggerJsdoc(options);

module.exports = openapiSpecification;