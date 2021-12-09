const {pool} = require("../../../config/database");
const {logger} = require("../../../config/winston");
const {errResponse} = require("../../../config/response");
const {response} = require("../../../config/response");
const baseResponse = require("../../../config/baseResponseStatus");

const userDao = require("./userDao");

//Provider : Read의 비즈니스 로직 처리

exports.retrieveUserByPhoneNumber = async function (phoneNumber) {
    const connection = await pool.getConnection(async (conn) => conn);
    const result = await userDao.isExistUserByPhoneNumber(connection, phoneNumber);

    connection.release();

    return result[0];
};

exports.retrieveUserBySNSId = async function (snsId) {
    const connection = await pool.getConnection(async (conn) => conn);
    const result = await userDao.isExistUserBySNSId(connection, snsId);

    connection.release();

    return result[0].CNT;
};

exports.retrieveUserByEmail = async function (email) {
    const connection = await pool.getConnection(async (conn) => conn);
    const result = await userDao.isExistUserByEmail(connection, email);

    connection.release();

    return result[0].CNT;
};

exports.selectUserInfoByEmail = async function (email) {
    const connection = await pool.getConnection(async (conn) => conn);
    const result = await userDao.selectUserInfoByEmail(connection, email);

    connection.release();

    return result[0];
};

exports.selectUserInfoBySocialId = async function (kakaoId) {
    const connection = await pool.getConnection(async (conn) => conn);
    const result = await userDao.selectUserInfoBySocialId(connection, kakaoId);

    connection.release();

    return result[0];
};

exports.retrieveUserInfoByUserId = async function (userId) {
    const connection = await pool.getConnection(async (conn) => conn);
    const result = await userDao.SelectUserByUserId(connection, userId);

    connection.release();

    return result[0];
};

exports.retrieveMyPage = async function (userId) {
    const connection = await pool.getConnection(async (conn) => conn);
    let data = {};

    const appVersion = await userDao.selectAppVersion(connection);
    data.appVersion = appVersion.version;

    if (userId != 0) {
        const userExist = await userDao.SelectUserByUserId(connection, userId);
        if (userExist[0] == undefined) {
            return errResponse(baseResponse.FIND_NO_EXIST_USER);
        }
        const myPageInfo = await userDao.selectMyPage(connection, userId);
        data.userId = myPageInfo.userId;
        data.phoneNumber = myPageInfo.phoneNumber.split('-')[2];
        data.email = myPageInfo.email;
        data.profileImgURL = myPageInfo.profileImgURL
        connection.release();
        return response(baseResponse.MY_PAGE_LOGIN_SUCCESS, data);
    } else {
        connection.release();
        return response(baseResponse.MY_PAGE_NO_LOGIN_SUCCESS, data);
    }

};

exports.retrieveUserIdByPhoneNumber = async function (phoneNumber) {
    const connection = await pool.getConnection(async (conn) => conn);
    const result = await userDao.selectUserIdByPhoneNumber(connection, phoneNumber);

    connection.release();
    return result[0];
};

exports.retrieveUsersEmailByPhoneNumber = async function (phoneNumber) {
    const connection = await pool.getConnection(async (conn) => conn);
    const result = await userDao.selectUsersEmailByPhoneNumber(connection, phoneNumber);

    connection.release();
    return result[0];
};

exports.retrieveUser = async function (userIdx) {
    const connection = await pool.getConnection(async (conn) => conn);
    const userResult = await userDao.selectUserId(connection, userIdx);

    connection.release();

    return userResult[0];
};

exports.emailCheck = async function (email) {
    const connection = await pool.getConnection(async (conn) => conn);
    const emailCheckResult = await userDao.selectUserEmail(connection, email);
    connection.release();

    return emailCheckResult;
};

exports.nicknameCheck = async function (nickname) {
    const connection = await pool.getConnection(async (conn) => conn);
    const nicknameCheckResult = await userDao.selectUserNickname(
        connection,
        nickname
    );
    connection.release();

    return nicknameCheckResult;
};

exports.passwordCheck = async function (selectUserPasswordParams) {
    const connection = await pool.getConnection(async (conn) => conn);
    const passwordCheckResult = await userDao.selectUserPassword(
        connection,
        selectUserPasswordParams
    );
    connection.release();
    return passwordCheckResult[0];
};

exports.accountCheck = async function (email) {
    const connection = await pool.getConnection(async (conn) => conn);
    const userAccountResult = await userDao.selectUserAccount(connection, email);
    connection.release();

    return userAccountResult;
};

exports.findByUserId = async function (userIdx) {
    const connection = await pool.getConnection(async (conn) => conn);
    const userInfoResult = await userDao.selectUserInfo(connection, userIdx);
    connection.release();

    return userInfoResult[0];
};

// TODO: hashedPassword, salt 가져오는 로직
exports.retrieveUserHashedPasswordAndSalt = async function (userIdx) {
    const connection = await pool.getConnection(async (conn) => conn);
    const userSecurityResult = await userDao.selectUserHashedPasswordAndSalt(connection, userIdx);

    connection.release();

    return userSecurityResult[0];
};