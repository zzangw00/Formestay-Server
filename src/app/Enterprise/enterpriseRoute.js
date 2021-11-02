module.exports = function (app) {
    const enterprise = require('./enterpriseController');
    const jwtMiddleware = require('../../../config/jwtMiddleware');

    // 대표 업체 5개 가져오기
    app.get('/app/best-enterprises', enterprise.getBestEnterprises);

    // 업체 가져오기
    app.get('/app/enterprises', enterprise.getEnterprises);

    // 업체 상세 조회
    app.get('/app/enterprises/:enterpriseId', enterprise.getEnterpriseById);
};