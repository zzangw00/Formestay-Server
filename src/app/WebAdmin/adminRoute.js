module.exports = function (app) {
    const admin = require('./adminController');
    const jwtMiddleware = require('../../../config/jwtMiddleware');

    // 회원 전체 조회 + 이메일로 조회 API
    app.get('/admin/users', admin.getUsers);
};