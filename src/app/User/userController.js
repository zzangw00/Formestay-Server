const jwtMiddleware = require("../../../config/jwtMiddleware");
const userProvider = require("../../app/User/userProvider");
const userService = require("../../app/User/userService");
const baseResponse = require("../../../config/baseResponseStatus");
const {response} = require("../../../config/response");
const {errResponse} = require("../../../config/response");
const {emit} = require("nodemon");
const regex = require("../../../config/regularExpress")

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
        // res.send(errResponse(baseResponse.USER_ID_NOT_MATCH));
    } else {
        if (!userIdx) return res.send(errResponse(baseResponse.USER_USERID_EMPTY));
        const userByUserIdx = await userProvider.retrieveUser(userIdx);
        return res.send(res.send(response(baseResponse.SUCCESS, userByUserIdx)));
    }
};

/** 회원가입전 유효성 검증 API
 * [POST] /app/users
 * body : name, nickname, gender, birthday, phoneNumber, email, passsword, confirmPassword
 */
exports.postUsersCheck = async function (req, res) {
    const {name, nickname, gender, birthday, phoneNumber, email, password, confirmPassword} = req.body;

    if (!name)
        return res.send(response(baseResponse.SIGNUP_NAME_EMPTY));
    if (!nickname)
        return res.send(response(baseResponse.SIGNUP_NICKNAME_EMPTY));
    if (nickname.length > 20 || nickname.length < 2)
        return res.send(response(baseResponse.SIGNUP_NICKNAME_LENGTH));
    if (!gender)
        return res.send(response(baseResponse.SIGNUP_GENDER_EMPTY));
    if (gender != 1 && gender != 2)
        return res.send(response(baseResponse.SIGNUP_GENDER_ERROR_TYPE));
    if (!phoneNumber)
        return res.send(response(baseResponse.SIGNUP_PHONE_NUMBER_EMPTY));
    if (!regex.phoneNumberRegex.test(phoneNumber))
        return res.send(response(baseResponse.SIGNUP_PHONE_NUMBER_ERROR_TYPE));
    if (!birthday)
        return res.send(response(baseResponse.SIGNUP_BIRTHDAY_EMPTY));
    if (!regex.birthdayRegex.test(birthday))
        return res.send(response(baseResponse.SIGNUP_BIRTHDAY_ERROR_TYPE));
    if (!email)
        return res.send(response(baseResponse.SIGNUP_EMAIL_EMPTY));
    if (!regex.emailRegex.test(email))
        return res.send(response(baseResponse.SIGNUP_EMAIL_ERROR_TYPE));
    if (!password)
        return res.send(response(baseResponse.SIGNUP_PASSWORD_EMPTY));
    if (!regex.passwordRegex.test(password))
        return res.send(response(baseResponse.SIGNUP_PASSWORD_ERROR_TYPE));
    if (!confirmPassword)
        return res.send(response(baseResponse.SIGNUP_CONFIRM_PASSWORD_EMPTY));
    if (!regex.passwordRegex.test(confirmPassword))
        return res.send(response(baseResponse.SIGNUP_PASSWORD_ERROR_TYPE));
    if (password !== confirmPassword)
        return res.send(response(baseResponse.SIGNUP_NOT_MATCH_PASSWORD));

    const isExistPhoneNumber = await userProvider.retrieveUserByPhoneNumber(phoneNumber);
    if (isExistPhoneNumber === 1) {
        return res.send(response(baseResponse.SIGNUP_EXIST_PHONE_NUMBER));
    }
    const isExistEmail = await userProvider.retrieveUserByEmail(email);
    if (isExistEmail === 1) {
        return res.send(response(baseResponse.SIGNUP_EXIST_EMAIL));
    }

    return res.send(response(baseResponse.SUCCESS));
};

/** 회원가입 API
 * [POST] /app/users
 * body : name, nickname, gender, birthday, phoneNumber, email, passsword, confirmPassword, isPermitAlarm
 */
exports.postUsers = async function (req, res) {
    const {name, nickname, gender, birthday, phoneNumber, email, password, isPermitAlarm} = req.body;

    if (!name)
        return res.send(response(baseResponse.SIGNUP_NAME_EMPTY));
    if (!nickname)
        return res.send(response(baseResponse.SIGNUP_NICKNAME_EMPTY));
    if (nickname.length > 20 || nickname.length < 2)
        return res.send(response(baseResponse.SIGNUP_NICKNAME_LENGTH));
    if (!gender)
        return res.send(response(baseResponse.SIGNUP_GENDER_EMPTY));
    if (gender != 1 && gender != 2)
        return res.send(response(baseResponse.SIGNUP_GENDER_ERROR_TYPE));
    if (!phoneNumber)
        return res.send(response(baseResponse.SIGNUP_PHONE_NUMBER_EMPTY));
    if (!regex.phoneNumberRegex.test(phoneNumber))
        return res.send(response(baseResponse.SIGNUP_PHONE_NUMBER_ERROR_TYPE));
    if (!birthday)
        return res.send(response(baseResponse.SIGNUP_BIRTHDAY_EMPTY));
    if (!regex.birthdayRegex.test(birthday))
        return res.send(response(baseResponse.SIGNUP_BIRTHDAY_ERROR_TYPE));
    if (!email)
        return res.send(response(baseResponse.SIGNUP_EMAIL_EMPTY));
    if (!regex.emailRegex.test(email))
        return res.send(response(baseResponse.SIGNUP_EMAIL_ERROR_TYPE));
    if (!password)
        return res.send(response(baseResponse.SIGNUP_PASSWORD_EMPTY));
    if (!regex.passwordRegex.test(password))
        return res.send(response(baseResponse.SIGNUP_PASSWORD_ERROR_TYPE));
    if (isPermitAlarm != 0 && isPermitAlarm != 1)
        return res.send(response(baseResponse.SIGNUP_ALARM_ERROR_TYPE));

    const signUpResult = await userService.createUser(name, nickname, gender, birthday, phoneNumber, email, password, isPermitAlarm)

    return res.send(signUpResult);
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
        // res.send(errResponse(baseResponse.USER_ID_NOT_MATCH));
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

    // if (!email) return res.send(errResponse(baseResponse.SIGNIN_EMAIL_EMPTY));
    // if (email.length > 30)
    //     return res.send(errResponse(baseResponse.SIGNIN_EMAIL_LENGTH));
    // if (!regexEmail.test(email))
    //     return res.send(errResponse(baseResponse.SIGNIN_EMAIL_ERROR_TYPE));
    // if (!password)
    //     return res.send(errResponse(baseResponse.SIGNIN_PASSWORD_EMPTY));

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
        // res.send(errResponse(baseResponse.USER_ID_NOT_MATCH));
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
