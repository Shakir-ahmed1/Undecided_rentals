const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'RentEase',
      version: '1.0.0',
    },
  },
  apis: ['src/api/routes/User.js', 'src/api/routes/profile.js', 'src/api/routes/location.js'], // files containing annotations as above
};

const openapiSpecification = swaggerJsdoc(options);

module.exports = openapiSpecification;
