module.exports = function (app) {
    const user = require('./userController');
    const jwtMiddleware = require('../../../config/jwtMiddleware');

    // 회원 전체 조회 + 이메일로 조회 API
    app.get('/app/users', user.getUsers);

    // 회원 조회 API
    app.get('/app/users/:userIdx', jwtMiddleware, user.getUserById);

    // 회원가입 검증 API
    app.route('/app/users-check').post(user.postUsersCheck);

    // 회원가입 API
    app.route('/app/users').post(user.postUsers);

    // 로그인 하기 API
    app.route('/app/login').post(user.login);

    // 소셜 로그인 하기 API
    app.route('/app/social-login').post(user.socialLogin);

    //회원 정보 수정 API
    app.route('/app/users/:userIdx').patch(jwtMiddleware, user.patchUsers);

    //회원 정보 수정 API
    app.route('/app/users/:userIdx/status').patch(jwtMiddleware, user.patchUserStatus);

    // JWT 검증 API
    app.get('/app/users/check', jwtMiddleware, user.check);

};