module.exports = function (app) {
    const user = require('./userController');
    const jwtMiddleware = require('../../../config/jwtMiddleware');

    // 회원가입 검증 API
    app.route('/app/users-check').post(user.postUsersCheck);

    // 회원가입 API
    app.route('/app/users').post(user.postUsers);

    // 로그인 하기 API
    app.route('/app/login').post(user.login);

    // 소셜 로그인 하기 API
    app.route('/app/social-login').post(user.socialLogin);

    // 아이디 찾기 API
    app.route('/app/users/email-find').post(user.findUserEmail);

    // 자동 로그인 API
    app.get('/app/auto-login', jwtMiddleware, user.autoLogin);

    // 비밀번호 변경 API
    app.route('/app/users-password').patch(user.patchUsersPassword);

    // 비밀번호 변경전 유저 검증 API
    app.route('/app/users-password').post(user.findUserPhoneNumber);

    //회원 정보 수정 API
    app.route('/app/users/:userIdx').patch(jwtMiddleware, user.patchUsers);

    //회원 정보 수정 API
    app.route('/app/users/:userIdx/status').patch(jwtMiddleware, user.patchUserStatus);



};