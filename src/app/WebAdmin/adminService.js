const { logger } = require('../../../config/winston');
const { pool } = require('../../../config/database');
const jwt = require('jsonwebtoken');
const secret_config = require('../../../config/secret');
const adminProvider = require('./adminProvider');
const userDao = require('./adminDao');
const baseResponse = require('../../../config/AdminBaseResponseStatus');
const { response } = require('../../../config/response');
const { errResponse } = require('../../../config/response');
const { connect } = require('http2');
const security = require('../../../utils/security');

// admin 회원가입
exports.createAdmin = async function (email, password, nickname, phoneNumber) {
    try {
        // email 중복 확인
        const emailRows = await userProvider.emailCheck(email);
        if (emailRows.length > 0) return errResponse(baseResponse.ADMIN_SIGNUP_REDUNDANT_EMAIL);

        // nickname 중복 확인
        const nicknameRows = await userProvider.nicknameCheck(nickname);
        if (nicknameRows.length > 0)
            return errResponse(baseResponse.ADMIN_SIGNUP_REDUNDANT_NICKNAME);

        // 비밀번호 암호화
        const hashedPassword = await crypto.createHash('sha512').update(password).digest('hex');

        const insertAdminInfoParams = [email, hashedPassword, nickname, phoneNumber];
        const connection = await pool.getConnection(async (conn) => conn);
        const createAdmin = await userDao.insertAdminInfo(connection, insertAdminInfoParams);
        connection.release();

        return response(baseResponse.SUCCESS);
    } catch (err) {
        logger.error(`App - createUser Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
};
