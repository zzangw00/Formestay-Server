const jwtMiddleware = require("../../../config/jwtMiddleware");
const regexEmail = require("regex-email");
const userProvider = require("../../app/User/userProvider");
const userService = require("../../app/User/userService");
const baseResponse = require("../../../config/baseResponseStatus");
const {response} = require("../../../config/response");
const {errResponse} = require("../../../config/response");
const {emit} = require("nodemon");

/** 회원 전체 조회 API
 * [GET] /app/users
 *
 * 회원 이메일 검색 조회 API
 * [GET] /app/users?word=
 * queryString : word
 */
exports.getUsers = async function (req, res) {
    const email = req.query.word;
    if (!email) {
        const userListResult = await userProvider.retrieveUserList();
        return res.send(res.send(response(baseResponse.SUCCESS, userListResult)));
    } else {
        const userListByEmail = await userProvider.retrieveUserList(email);
        return res.send(res.send(response(baseResponse.SUCCESS, userListByEmail)));
    }
};

/** 회원 조회 API
 * [GET] /app/users/:userIdx
 * pathVariable : userIdx
 */
exports.getUserById = async function (req, res) {

    const userIdToToken = req.verifiedToken.userInfo
    const userIdx = req.params.userIdx;

    if (userIdToToken != userIdx) {
        res.send(errResponse(baseResponse.USER_ID_NOT_MATCH));
    } else {
        if (!userIdx) return res.send(errResponse(baseResponse.USER_USERID_EMPTY));
        const userByUserIdx = await userProvider.retrieveUser(userIdx);
        return res.send(res.send(response(baseResponse.SUCCESS, userByUserIdx)));
    }
};

/** 회원가입 API
 * [POST] /app/users
 * body : email, passsword, nickname
 */
exports.postUsers = async function (req, res) {
    const {email, password, nickname} = req.body;

    if (!email) return res.send(response(baseResponse.SIGNUP_EMAIL_EMPTY));
    if (email.length > 30)
        return res.send(response(baseResponse.SIGNUP_EMAIL_LENGTH));
    if (!regexEmail.test(email))
        return res.send(response(baseResponse.SIGNUP_EMAIL_ERROR_TYPE));
    if (!password) return res.send(response(baseResponse.SIGNUP_PASSWORD_EMPTY));
    if (password.length < 6 || password.length > 20)
        return res.send(response(baseResponse.SIGNUP_PASSWORD_LENGTH));
    if (!nickname) return res.send(response(baseResponse.SIGNUP_NICKNAME_EMPTY));
    if (nickname.length > 20)
        return res.send(response(baseResponse.SIGNUP_NICKNAME_LENGTH));

    const signUpResponse = await userService.createUser(
        email,
        password,
        nickname
    );

    return res.send(signUpResponse);
};

/** 회원 정보 수정 API
 * [PATCH] /app/users/:userIdx
 * pathVariable : userIdx
 * body : nickname
 */
exports.patchUsers = async function (req, res) {

    const userIdToToken = req.verifiedToken.userInfo
    const userIdx = req.params.userIdx;
    const nickname = req.body.nickname;

    if (userIdToToken != userIdx) {
        res.send(errResponse(baseResponse.USER_ID_NOT_MATCH));
    } else {
        if (!nickname) res.send(errResponse(baseResponse.USER_NICKNAME_EMPTY));
        const editUserInfo = await userService.editUser(userIdx, nickname)
        return res.send(editUserInfo);
    }
};

/** 로그인 하기 API
 * [POST] /app/login
 * body : email, passsword
 */
exports.login = async function (req, res) {
    const {email, password} = req.body;

    if (!email) return res.send(errResponse(baseResponse.SIGNIN_EMAIL_EMPTY));
    if (email.length > 30)
        return res.send(errResponse(baseResponse.SIGNIN_EMAIL_LENGTH));
    if (!regexEmail.test(email))
        return res.send(errResponse(baseResponse.SIGNIN_EMAIL_ERROR_TYPE));
    if (!password)
        return res.send(errResponse(baseResponse.SIGNIN_PASSWORD_EMPTY));

    const signInResponse = await userService.postSignIn(email, password);

    return res.send(signInResponse);
};

/** 회원 상태 수정 API
 * [PATCH] /app/users/:userId/status
 * body : status
 */
exports.patchUserStatus = async function (req, res) {

    const userIdToToken = req.verifiedToken.userInfo
    const userIdx = req.params.userIdx;
    const status = req.body.status;

    if (userIdToToken != userIdx) {
        res.send(errResponse(baseResponse.USER_ID_NOT_MATCH));
    } else {
        if (!status) res.send(errResponse(baseResponse.USER_STATUS_EMPTY));
        const editUserStatus = await userService.editUserStatus(userIdx, status)
        return res.send(editUserStatus);
    }

};

/** JWT 토큰 검증 API
 * [GET] app/users/check
 */
exports.check = async function (req, res) {
    const userIdResult = req.verifiedToken.userInfo;
    console.log(userIdResult);
    return res.send(response(baseResponse.TOKEN_VERIFICATION_SUCCESS));
};
