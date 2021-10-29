const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

const options = {
    swaggerDefinition: {
        info: {
            title: "포미스테이 스웨거",
            version: "1.0.0",
            description: "즐거운 포미스테이",
        },
        host: '15.165.152.201',
        basePath: "/",
    },
    apis: ['./swag/*.js', './swagger/*']
};

const specs = swaggerJsdoc(options);

module.exports = {
    swaggerUi,
    specs
};