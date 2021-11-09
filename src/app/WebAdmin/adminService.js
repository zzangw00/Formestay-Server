const { logger } = require('../../../config/winston');
const { pool } = require('../../../config/database');
const jwt = require('jsonwebtoken');
const secret_config = require('../../../config/secret');
const adminProvider = require('./adminProvider');
const adminDao = require('./adminDao');
const AdminBaseResponse = require('../../../config/AdminBaseResponseStatus');
const { response } = require('../../../config/response');
const { errResponse } = require('../../../config/response');
const { connect } = require('http2');
const security = require('../../../utils/security');
const crypto = require('crypto');

// admin 회원가입
exports.createAdmin = async function (email, password, nickname, phoneNumber) {
    try {
        // email 중복 확인
        const emailRows = await adminProvider.emailCheck(email);
        if (emailRows.length > 0)
            return errResponse(AdminBaseResponse.ADMIN_SIGNUP_REDUNDANT_EMAIL);

        // nickname 중복 확인
        const nicknameRows = await adminProvider.nicknameCheck(nickname);
        if (nicknameRows.length > 0)
            return errResponse(AdminBaseResponse.ADMIN_SIGNUP_REDUNDANT_NICKNAME);

        // 비밀번호 암호화
        const hashedPassword = await crypto.createHash('sha512').update(password).digest('hex');

        const insertAdminInfoParams = [email, hashedPassword, nickname, phoneNumber];
        const connection = await pool.getConnection(async (conn) => conn);
        const createAdmin = await userDao.insertAdminInfo(connection, insertAdminInfoParams);
        connection.release();

        return response(AdminBaseResponse.SUCCESS);
    } catch (err) {
        logger.error(`App - createUser Service error\n: ${err.message}`);
        return errResponse(AdminBaseResponse.DB_ERROR);
    }
};

// admin 로그인
exports.postSignIn = async function (email, password) {
    try {
        // 아이디 여부 확인
        const emailRows = await adminProvider.emailCheck(email);
        if (emailRows.length < 1) return errResponse(AdminBaseResponse.ADMIN_SIGNIN_WRONG);
        const selectEmail = emailRows[0].email;

        // 비밀번호 확인
        const hashedPassword = await crypto.createHash('sha512').update(password).digest('hex');
        const selectAdminPasswordParams = [selectEmail, hashedPassword];
        const passwordRows = await adminProvider.passwordCheck(selectAdminPasswordParams);
        if (passwordRows[0].password != hashedPassword) {
            return errResponse(AdminBaseResponse.ADMIN_SIGNIN_WRONG);
        }
        const adminInfoRows = await adminProvider.accountCheck(email);
        // console.log(adminInfoRows[0].adminId); // DB의 userId
        //토큰 생성 Service
        let token = await jwt.sign(
            {
                adminId: adminInfoRows[0].adminId,
            }, // 토큰의 내용(payload)
            secret_config.jwtsecret, // 비밀키
            {
                expiresIn: '365d',
                subject: 'adminInfo',
            }, // 유효 기간 365일
        );

        return response(AdminBaseResponse.SUCCESS, {
            adminId: adminInfoRows[0].adminId,
            jwt: token,
        });
    } catch (err) {
        logger.error(`App - postSignIn Service error\n: ${err.message} \n${JSON.stringify(err)}`);
        return errResponse(AdminBaseResponse.DB_ERROR);
    }
};

// jwt 생성
exports.makeJWT = async function (adminInfo) {
    try {
        //토큰 생성 Service
        let token = await jwt.sign(
            {
                userInfo: adminInfo.adminId,
            }, // 토큰의 내용(payload)
            secret_config.jwtsecret, // 비밀 키
            {
                expiresIn: '30d',
                subject: 'adminInfo',
            }, // 유효 시간은 30일
        );

        const data = {
            jwt: token,
            email: adminInfo.email,
            nickname: adminInfo.nickname,
            phoneNumber: adminInfo.phoneNumber,
        };

        return data;
    } catch (err) {
        logger.error(`App - makeJWT Service error\n: ${err.message} \n${JSON.stringify(err)}`);
        return errResponse(AdminBaseResponse.DB_ERROR);
    }
};

// 회원 탈퇴
exports.patchUserStatus = async function (status, userId) {
    const connection = await pool.getConnection(async (conn) => conn);
    const changeStatus = await adminDao.changeUserStatus(connection, status, userId);
    connection.release();
    return changeStatus;
};
