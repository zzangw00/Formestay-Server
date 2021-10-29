const {pool} = require("../../../config/database");
const {logger} = require("../../../config/winston");

const userDao = require("./userDao");

//Provider : Read의 비즈니스 로직 처리

exports.retrieveUserByPhoneNumber = async function (phoneNumber) {
    const connection = await pool.getConnection(async (conn) => conn);
    const result = await userDao.isExistUserByPhoneNumber(connection, phoneNumber);

    connection.release();

    return result[0].CNT;
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

exports.selectUsersEmailByPhoneNumber = async function (phoneNumber) {
    const connection = await pool.getConnection(async (conn) => conn);
    const result = await userDao.selectUsersEmailByPhoneNumber(connection, phoneNumber);

    connection.release();
    return result;
};

exports.retrieveUserList = async function (email) {
    if (!email) {
        const connection = await pool.getConnection(async (conn) => conn);
        const userListResult = await userDao.selectUser(connection);
        connection.release();

        return userListResult;

    } else {
        const connection = await pool.getConnection(async (conn) => conn);
        const userListResult = await userDao.selectUserEmail(connection, email);
        connection.release();

        return userListResult;
    }
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