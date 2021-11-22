const jwtMiddleware = require("../../../config/jwtMiddleware");
const userProvider = require("../../app/User/userProvider");
const userService = require("../../app/User/userService");
const baseResponse = require("../../../config/baseResponseStatus");
const {response} = require("../../../config/response");
const {errResponse} = require("../../../config/response");
const {emit} = require("nodemon");
const regex = require("../../../config/regularExpress")
const jwt = require('jsonwebtoken');
const secret_config = require('../../../config/secret');

/** 회원가입전 유효성 검증 API
 * [POST] /app/users
 * body : name, nickname, gender, birthday, phoneNumber, email, passsword, confirmPassword
 */
exports.postUsersCheck = async function (req, res) {
    const {name, nickname, gender, birthday, phoneNumber, email, password, confirmPassword, snsId} = req.body;

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
    if (password != undefined && confirmPassword != undefined) {
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
    }

    if (snsId != undefined) {
        const isExistSNSId = await userProvider.retrieveUserBySNSId(snsId);
        if (isExistSNSId === 1) {
            return res.send(response(baseResponse.EXIST_SNS_ID));
        }
    }

    const isExistPhoneNumber = await userProvider.retrieveUserByPhoneNumber(phoneNumber);
    if (isExistPhoneNumber === 1) {
        return res.send(response(baseResponse.EXIST_PHONE_NUMBER));
    }

    const isExistEmail = await userProvider.retrieveUserByEmail(email);
    if (isExistEmail === 1) {
        return res.send(response(baseResponse.EXIST_EMAIL));
    }

    return res.send(response(baseResponse.SUCCESS));
};

/** 회원가입 API
 * [POST] /app/users
 * body : name, nickname, gender, birthday, phoneNumber, email, passsword, confirmPassword, isPermitAlarm
 */
exports.postUsers = async function (req, res) {
    let {name, nickname, gender, birthday, phoneNumber, email, password, isPermitAlarm, snsId, profileImgURL} = req.body;

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
    if (snsId == undefined) {
        if (!password)
            return res.send(response(baseResponse.SIGNUP_PASSWORD_EMPTY));
        if (!regex.passwordRegex.test(password))
            return res.send(response(baseResponse.SIGNUP_PASSWORD_ERROR_TYPE));
        snsId = 0;
        profileImgURL = null;
    } else {
        if (profileImgURL != undefined) {
            if (profileImgURL.length == 0) {
                profileImgURL = null;
            }
        } else {
            profileImgURL = null;
        }
    }

    if (isPermitAlarm != 1 && isPermitAlarm != 2)
        return res.send(response(baseResponse.SIGNUP_ALARM_ERROR_TYPE));

    const signUpResult = await userService.createUser(name, nickname, gender, birthday, phoneNumber, email, password, isPermitAlarm, snsId, profileImgURL)


    return res.send(signUpResult);
};

/** 자동 로그인 API
 * [GET] /app/users/auto-login
 */
exports.autoLogin = async function (req, res) {
    const userIdToToken = req.verifiedToken.userInfo

    const userInfo = await userProvider.retrieveUserInfoByUserId(userIdToToken);

    if (userInfo == undefined) {
        return res.send(errResponse(baseResponse.FIND_NO_EXIST_USER));
    }

    const loginData = await userService.makeJWT(userInfo);

    return res.send(response(baseResponse.SUCCESS, loginData));
};

/** 비밀번호 수정 API
 * [PATCH] /app/users-password
 * body : phoneNumber
 */
exports.patchUsersPassword = async function (req, res) {

    const {phoneNumber, password, confirmPassword} = req.body;

    if (!phoneNumber)
        return res.send(response(baseResponse.SIGNUP_PHONE_NUMBER_EMPTY));
    if (!regex.phoneNumberRegex.test(phoneNumber))
        return res.send(response(baseResponse.SIGNUP_PHONE_NUMBER_ERROR_TYPE));
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

    const editUsersPassword = await userService.editUserPassword(phoneNumber, password);

    return res.send(editUsersPassword);
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

    if (!email)
        return res.send(errResponse(baseResponse.SIGNIN_EMAIL_EMPTY));
    if (!regex.emailRegex.test(email))
        return res.send(errResponse(baseResponse.SIGNIN_EMAIL_ERROR_TYPE));
    if (!password)
        return res.send(errResponse(baseResponse.SIGNIN_PASSWORD_EMPTY));
    if (!regex.passwordRegex.test(password))
        return res.send(response(baseResponse.SIGNIN_PASSWORD_ERROR_TYPE));

    const signInResponse = await userService.postSignIn(email, password);

    return res.send(signInResponse);
};

/** 소셜 로그인 하기 API
 * [POST] /app/login
 * body : email, passsword
 */
exports.socialLogin = async function (req, res) {
    const token = req.body.token;

    if (!token)
        return res.send(errResponse(baseResponse.SIGNIN_ACCESS_TOKEN_EMPTY));

    const socialLoginResponse = await userService.postSocialLogin(token);
    return res.send(socialLoginResponse);
};

/** 이메일 찾기 API
 * [POST] /app/users/email-find
 * body : phoneNumber
 */
exports.findUserEmail = async function (req, res) {
    const phoneNumber = req.body.phoneNumber;

    if (!phoneNumber)
        return res.send(response(baseResponse.SIGNUP_PHONE_NUMBER_EMPTY));
    if (!regex.phoneNumberRegex.test(phoneNumber))
        return res.send(response(baseResponse.SIGNUP_PHONE_NUMBER_ERROR_TYPE));

    const findEmailResponse = await userService.postFindEmail(phoneNumber);
    return res.send(findEmailResponse);
};

/** 비밀번호 변경전 유저 검증 API
 * [POST] /app/users-password
 * body : phoneNumber
 */
exports.findUserPhoneNumber = async function (req, res) {
    const phoneNumber = req.body.phoneNumber;

    if (!phoneNumber)
        return res.send(response(baseResponse.SIGNUP_PHONE_NUMBER_EMPTY));
    if (!regex.phoneNumberRegex.test(phoneNumber))
        return res.send(response(baseResponse.SIGNUP_PHONE_NUMBER_ERROR_TYPE));

    const findPhoneNumberResponse = await userService.postFindPhoneNumber(phoneNumber);
    return res.send(findPhoneNumberResponse);
};

/** 유저 프로필 사진 수정 API
 * [PATCH] /app/users-profile-image
 */
exports.patchUsersProfileImg = async function (req, res) {

    const userIdToToken = req.verifiedToken.userInfo
    const profileImgURL = req.body.profileImgURL;

    const resultResponse = await userService.patchUserProfileImage(userIdToToken, profileImgURL)
    return res.send(resultResponse)
};

/** 마이페이지 조회 API
 * [GET] app/my-page
 */
exports.getMyPage = async function (req, res) {

    let userId = 0
    if (req.headers['x-access-token'] != undefined) {
        await jwt.verify(req.headers['x-access-token'], secret_config.jwtsecret, (error, decoded) => {
            if(error){
                return res.send(errResponse(baseResponse.TOKEN_VERIFICATION_FAILURE))
            }
            userId = decoded.userInfo;
        });
    }

    const resultStatus = await userProvider.retrieveMyPage(userId);

    return res.send(resultStatus);
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
