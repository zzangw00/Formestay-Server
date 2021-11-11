module.exports = function (app) {
    const program = require('./programController');
    const jwtMiddleware = require('../../../config/jwtMiddleware');


    // 프로그램 상세 조회
    app.get('/app/programs/:programId', program.getProgramsById);




};