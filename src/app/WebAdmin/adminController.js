const jwtMiddleware = require('../../../config/jwtMiddleware');
const regexEmail = require('regex-email');
const adminProvider = require('./adminProvider');
const adminService = require('./adminService');
const AdminBaseResponse = require('../../../config/AdminBaseResponseStatus');
const { response } = require('../../../config/response');
const { errResponse } = require('../../../config/response');
const { emit } = require('nodemon');

/** 회원 전체 조회 API
 * [GET] /admin/users
 *
 * 회원 이메일 검색 조회 API
 * [GET] /admin/users?word=
 * queryString : word
 */
exports.getUsers = async function (req, res) {
    const adminIdFromJWT = req.verifiedToken.adminId;

    const userListResult = await adminProvider.retrieveUserList(adminIdFromJWT);
    return res.send(response(AdminBaseResponse.SUCCESS, userListResult));
};

/** 관리자 회원가입 API
 * [POST] /admin
 * body : email, password, nickname, phoneNumber
 */
exports.postAdmin = async function (req, res) {
    const { email, password, nickname, phoneNumber } = req.body;
    if (!regexEmail.test(email)) {
        return res.send(response(AdminBaseResponse.ADMIN_SIGNUP_EMAIL_ERROR_TYPE));
    }
    if (!email) {
        return res.send(response(AdminBaseResponse.ADMIN_SIGNUP_EMAIL_EMPTY));
    }
    if (!password) {
        return res.send(response(AdminBaseResponse.ADMIN_SIGNUP_PASSWORD_EMPTY));
    }
    if (!nickname) {
        return res.send(response(AdminBaseResponse.ADMIN_SIGNUP_NICKNAME_EMPTY));
    }
    if (!phoneNumber) {
        return res.send(response(AdminBaseResponse.ADMIN_SIGNUP_PHONENUMBER_EMPTY));
    }
    const signUpResponse = await adminService.createAdmin(email, password, nickname, phoneNumber);

    return res.send(signUpResponse);
};

/** 관리자 로그인 API
 * [POST] /admin/login
 * body : email, password
 */
exports.loginAdmin = async function (req, res) {
    const { email, password } = req.body;
    if (!email) {
        return res.send(response(AdminBaseResponse.ADMIN_SIGNIN_EMAIL_EMPTY));
    } else if (!password) {
        return res.send(response(AdminBaseResponse.ADMIN_SIGNIN_PASSWORD_EMPTY));
    }

    const signInResponse = await adminService.postSignIn(email, password);

    return res.send(signInResponse);
};

/** 자동 로그인 API
 * [GET] /admin/auto-login
 */
exports.autoLogin = async function (req, res) {
    const adminIdFromJWT = req.verifiedToken.adminId;

    const adminInfo = await adminProvider.retrieveAdminInfoByAdminId(adminIdFromJWT);

    if (adminInfo == undefined) {
        return res.send(errResponse(AdminBaseResponse.FIND_NO_EXIST_ADMIN));
    }

    const loginData = await adminService.makeJWT(adminInfo);

    return res.send(response(AdminBaseResponse.SUCCESS, loginData));
};

/** 회원 상세조회 API
 * [GET] /admin/user/:userId
 * params : userId
 *
 */
exports.getUser = async function (req, res) {
    const userId = req.params.userId;
    const userResult = await adminProvider.userInfo(userId);
    console.log(userResult);
    return res.send(response(AdminBaseResponse.SUCCESS, userResult));
};

/** 회원 탈퇴 API
 * [PATCH] /admin/user/:userId
 * params : userId
 * body : status
 */
exports.deleteUser = async function (req, res) {
    const userId = req.params.userId;
    const status = req.body.status;
    const userStatus = await adminService.patchUserStatus(status, userId);
    return res.send(response(AdminBaseResponse.SUCCESS));
};
