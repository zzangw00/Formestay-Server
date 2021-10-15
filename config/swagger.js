const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

const options = {
    swaggerDefinition: {
        info: {
            title: "Test API 3000",
            version: "1.0.0",
            description: "Test API with express",
        },
        host: 'localhost:3000',
        basePath: "/"
    },
    apis: ['./swag/*.js', './swagger/*']
};

const specs = swaggerJsdoc(options);

module.exports = {
    swaggerUi,
    specs
};