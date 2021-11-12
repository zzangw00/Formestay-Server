module.exports = function (app) {
    const admin = require('./adminController');
    const jwtMiddleware = require('../../../config/jwtMiddleware');

    // 관리자 회원가입 API
    app.post('/admin', admin.postAdmin);

    // 관리자 로그인 API
    app.post('/admin/login', admin.loginAdmin);

    // 자동 로그인 API
    app.get('/admin/auto-login', jwtMiddleware, admin.autoLogin);

    // 유저 조회 API
    app.get('/admin/users', jwtMiddleware, admin.getUsers);

    // 유저 상세 조회 API
    app.get('/admin/users/:userId', jwtMiddleware, admin.getUser);

    // 유저 탈퇴 API
    app.patch('/admin/users/:userId/status', jwtMiddleware, admin.deleteUser);

    // 업체 조회 API
    app.get('/admin/enterprises', jwtMiddleware, admin.getEnterprises);

    // 업체 상세 조회 API
    app.get('/admin/enterprises/:enterpriseId', jwtMiddleware, admin.getEnterprise);

    // 프로그램 조회 API
    app.get('/admin/programs/:enterpriseId', jwtMiddleware, admin.getPrograms);
};
