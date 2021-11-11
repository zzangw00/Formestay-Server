module.exports = function (app) {
    const enterprise = require('./enterpriseController');
    const jwtMiddleware = require('../../../config/jwtMiddleware');

    // 대표 업체 5개 조회
    app.get('/app/best-enterprises', enterprise.getBestEnterprises);

    // 업체 조회
    app.get('/app/enterprises', enterprise.getEnterprises);

    // 업체 상세 조회
    app.get('/app/enterprises/:enterpriseId', enterprise.getEnterpriseById);

    // 업체 검색 조회
    app.get('/app/enterprises-search', enterprise.getSearchEnterprises);

    // 찜 목록 조회
    app.get('/app/bookmarks', jwtMiddleware, enterprise.getBookmarks);

    // 찜 하기
    app.route('/app/bookmarks').post(jwtMiddleware, enterprise.postBookmarks);
};