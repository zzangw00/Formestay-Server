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
