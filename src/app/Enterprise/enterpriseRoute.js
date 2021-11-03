module.exports = function (app) {
    const enterprise = require('./enterpriseController');
    const jwtMiddleware = require('../../../config/jwtMiddleware');

    // 대표 업체 5개 조회
    app.get('/app/best-enterprises', enterprise.getBestEnterprises);

    // 업체 조회
    app.get('/app/enterprises', enterprise.getEnterprises);

    // 업체 상세 조회
    app.get('/app/enterprises/:enterpriseId', enterprise.getEnterpriseById);

    // 업체 입장
    app.route('/app/enterprises-entrance').post(enterprise.postEnterEnterprises);

    // 업체 검색 조회
    app.get('/app/enterprises-search', enterprise.getSearchEnterprises);
};