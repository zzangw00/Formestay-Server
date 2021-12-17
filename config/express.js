const express = require('express');
const compression = require('compression');
const methodOverride = require('method-override');
var cors = require('cors');
const {swaggerUi, specs} = require('./swagger.js');

module.exports = function () {
    const app = express();

    app.use(compression());

    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

    app.use(express.json());

    app.use(express.urlencoded({extended: true}));

    app.use(methodOverride());

    app.use(cors());

    require('../src/app/User/userRoute')(app);
    require('../src/app/WebAdmin/adminRoute')(app);
    require('../src/app/Enterprise/enterpriseRoute')(app);
    require('../src/app/Program/programRoute')(app);

    return app;
};