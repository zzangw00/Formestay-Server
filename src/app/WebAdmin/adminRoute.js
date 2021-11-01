module.exports = function (app) {
    const admin = require('./adminController');
    const jwtMiddleware = require('../../../config/jwtMiddleware');

    // 관리자 조회 API
    app.get('/admin/users', admin.getUsers);

    // 관리자 회원가입 API
    app.post('/admin/users', admin.postAdmin);

    // 관리자 로그인 API
    app.post('/admin/users/login', admin.loginAdmin);
};
