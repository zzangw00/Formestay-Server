const jwtMiddleware = require('../../../config/jwtMiddleware');
const regexEmail = require('regex-email');
const adminProvider = require('./adminProvider');
const adminService = require('./adminService');
const baseResponse = require('../../../config/baseResponseStatus');
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
    const email = req.query.word;
    if (!email) {
        const userListResult = await adminProvider.retrieveUserList();
        return res.send(res.send(response(baseResponse.SUCCESS, userListResult)));
    } else {
        const userListByEmail = await adminProvider.retrieveUserList(email);
        return res.send(res.send(response(baseResponse.SUCCESS, userListByEmail)));
    }
};

/** 관리자 회원가입 API
 * [POST] /admin/users
 * body : email, password, nickname, phoneNumber
 */
exports.postAdmin = async function (req, res) {
    const { email, password, nickname, phoneNumber } = req.body;
    if (!regexEmail.test(email)) {
        return res.send(response(baseResponse.ADMIN_SIGNUP_EMAIL_ERROR_TYPE));
    }
    if (!email) {
        return res.send(response(baseResponse.ADMIN_SIGNUP_EMAIL_EMPTY));
    }
    if (!password) {
        return res.send(response(baseResponse.ADMIN_SIGNUP_PASSWORD_EMPTY));
    }
    if (!nickname) {
        return res.send(response(baseResponse.ADMIN_SIGNUP_NICKNAME_EMPTY));
    }
    if (!phoneNumber) {
        return res.send(response(baseResponse.ADMIN_SIGNUP_PHONENUMBER_EMPTY));
    }
    const signUpResponse = await adminService.createAdmin(email, password, nickname, phoneNumber);

    return res.send(signUpResponse);
};

/** 관리자 로그인 API
 * [POST] /admin/users/login
 * body : email, password
 */
exports.loginAdmin = async function (req, res) {
    const { email, password } = req.body;
    if (!email) {
        return res.send(response(baseResponse.ADMIN_SIGNIN_EMAIL_EMPTY));
    }
    if (!password) {
        return res.send(response(baseResponse.ADMIN_SIGNIN_PASSWORD_EMPTY));
    }
};
