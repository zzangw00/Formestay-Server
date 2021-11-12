const { pool } = require('../../../config/database');
const { logger } = require('../../../config/winston');

const adminDao = require('./adminDao');

// admin 회원가입 email 중복체크
exports.emailCheck = async function (email) {
    const connection = await pool.getConnection(async (conn) => conn);
    const adminEmailResult = await adminDao.checkAdminEmail(connection, email);
    connection.release();

    return adminEmailResult;
};

// admin 회원가입 nickname 중복체크
exports.nicknameCheck = async function (nickname) {
    const connection = await pool.getConnection(async (conn) => conn);
    const adminNicknameResult = await adminDao.checkAdminNickname(connection, nickname);
    connection.release();

    return adminNicknameResult;
};

// admin 로그인 email존재여부 체크
exports.emailCheck = async function (email) {
    const connection = await pool.getConnection(async (conn) => conn);
    const emailCheckResult = await adminDao.selectEmail(connection, email);
    connection.release();

    return emailCheckResult;
};

// admin 로그인 password 맞는지 확인
exports.passwordCheck = async function (selectAdminPasswordParams) {
    const connection = await pool.getConnection(async (conn) => conn);
    const passwordCheckResult = await adminDao.selectAdminPassword(
        connection,
        selectAdminPasswordParams,
    );
    connection.release();
    return passwordCheckResult[0];
};

// admin 계정상태 체크
exports.accountCheck = async function (email) {
    const connection = await pool.getConnection(async (conn) => conn);
    const adminAccountResult = await adminDao.selectAdminAccount(connection, email);
    connection.release();

    return adminAccountResult;
};

// admin 정보 가져오기
exports.retrieveAdminInfoByAdminId = async function (adminId) {
    const connection = await pool.getConnection(async (conn) => conn);
    const result = await adminDao.selectAdminByAdminId(connection, adminId);

    connection.release();

    return result[0];
};

// 유저 정보 가져오기
exports.retrieveUserList = async function (adminIdFromJWT) {
    const connection = await pool.getConnection(async (conn) => conn);
    const userListResult = await adminDao.retrieveUserList(connection, adminIdFromJWT);
    connection.release();

    return userListResult;
};

// 유저 상세정보 가져오기
exports.userInfo = async function (userId) {
    const connection = await pool.getConnection(async (conn) => conn);
    const userResult = await adminDao.userInfo(connection, userId);
    connection.release();

    return userResult;
};

// 업체 정보 가져오기
exports.retrieveEnterpriseList = async function () {
    const connection = await pool.getConnection(async (conn) => conn);
    const enterprisesListResult = await adminDao.retrieveEnterpriseList(connection);
    connection.release();

    return enterprisesListResult;
};

// 업체 상세정보 가져오기
exports.enterpriseInfo = async function (enterpriseId) {
    const connection = await pool.getConnection(async (conn) => conn);
    const enterpriseResult = await adminDao.enterpriseInfo(connection, enterpriseId);
    connection.release();

    return enterpriseResult;
};
