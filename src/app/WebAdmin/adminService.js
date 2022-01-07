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
exports.createAdmin = async function (email, password, nickname, phoneNumber, enterpriseId) {
    try {
        // email 중복 확인
        const emailRows = await adminProvider.emailCheck(email);
        if (emailRows.length > 0)
            return errResponse(AdminBaseResponse.ADMIN_SIGNUP_REDUNDANT_EMAIL);

        // nickname 중복 확인
        const nicknameRows = await adminProvider.nicknameCheck(nickname);
        if (nicknameRows.length > 0)
            return errResponse(AdminBaseResponse.ADMIN_SIGNUP_REDUNDANT_NICKNAME);

        // 전화번호 중복 확인
        const phoneNumberRows = await adminProvider.phoneNumberCheck(phoneNumber);
        if (phoneNumberRows.length > 0)
            return errResponse(AdminBaseResponse.ADMIN_SIGNUP_REDUNDANT_PHONENUMBER);

        // 업체 번호 중복 확인
        const enterpriseRows = await adminProvider.enterpriseCheck(enterpriseId);
        if (enterpriseRows.length > 0)
            return errResponse(AdminBaseResponse.ADMIN_SIGNUP_REDUNDANT_ENTERPRISEID);

        // 업체가 존재하는지 확인
        const enterpriseExist = await adminProvider.enterpriseExist(enterpriseId);
        if (enterpriseExist.length < 1)
            return errResponse(AdminBaseResponse.ADMIN_SIGNUP_REDUNDANT_ENTERPRISE);

        // 비밀번호 암호화
        const hashedPassword = await crypto.createHash('sha512').update(password).digest('hex');

        const insertAdminInfoParams = [email, hashedPassword, nickname, phoneNumber, enterpriseId];
        const connection = await pool.getConnection(async (conn) => conn);
        const createAdmin = await adminDao.insertAdminInfo(connection, insertAdminInfoParams);
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
                status: adminInfoRows[0].status,
                enterpriseId: adminInfoRows[0].enterpriseId,
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
    try {
        const connection = await pool.getConnection(async (conn) => conn);
        const changeStatus = await adminDao.changeUserStatus(connection, status, userId);
        connection.release();
        return response(AdminBaseResponse.SUCCESS);
    } catch (err) {
        logger.error(`App - patchUserStatus Service error\n: ${err.message}`);
        return errResponse(AdminBaseResponse.DB_ERROR);
    }
};

// 유저 정보 수정
exports.patchUser = async function (nickname, userId) {
    try {
        const connection = await pool.getConnection(async (conn) => conn);
        const checkNickname = await adminProvider.checkNickname(userId);
        const overlapNickname = await adminProvider.overlapNickname(nickname);
        if (nickname == checkNickname[0].nickname) {
            const patchInfo = await adminDao.patchUserInfo(connection, nickname, userId);
            connection.release();
            return response(AdminBaseResponse.SUCCESS);
        } else if (overlapNickname[0].exist == 1) {
            return errResponse(AdminBaseResponse.ADMIN_SIGNUP_REDUNDANT_NICKNAME);
        } else {
            const patchInfo = await adminDao.patchUserInfo(connection, nickname, userId);
            connection.release();
            return response(AdminBaseResponse.SUCCESS);
        }
    } catch (err) {
        logger.error(`App - patchUser Service error\n: ${err.message}`);
        return errResponse(AdminBaseResponse.DB_ERROR);
    }
};

// 업체 정보 수정
exports.patchEnterprise = async function (
    korName,
    engName,
    category,
    primeLocation,
    location,
    tag,
    description,
    phoneNumber,
    thumbnailURL,
    enterpriseId,
) {
    try {
        const connection = await pool.getConnection(async (conn) => conn);
        const checkKorName = await adminProvider.checkKorName(enterpriseId);
        const checkEngName = await adminProvider.checkEngName(enterpriseId);
        const overlapKorName = await adminProvider.overlapKorName(korName);
        const overlapEngName = await adminProvider.overlapEngName(engName);

        if (korName == checkKorName[0].korName) {
            if (engName != checkEngName[0].engName) {
                if (overlapEngName[0].exist == 1) {
                    return errResponse(AdminBaseResponse.ENTERPRISE_PATCH_REDUNDANT_ENGNAME);
                } else {
                    const patchInfo = await adminDao.patchEnterpriseInfo(
                        connection,
                        korName,
                        engName,
                        category,
                        primeLocation,
                        location,
                        tag,
                        description,
                        phoneNumber,
                        thumbnailURL,
                        enterpriseId,
                    );
                    connection.release();
                    return response(AdminBaseResponse.SUCCESS);
                }
            } else {
                const patchInfo = await adminDao.patchEnterpriseInfo(
                    connection,
                    korName,
                    engName,
                    category,
                    primeLocation,
                    location,
                    tag,
                    description,
                    phoneNumber,
                    thumbnailURL,
                    enterpriseId,
                );
                connection.release();
                return response(AdminBaseResponse.SUCCESS);
            }
        } else if (korName != checkKorName[0].korName) {
            if (overlapKorName[0].exist == 1) {
                return errResponse(AdminBaseResponse.ENTERPRISE_PATCH_REDUNDANT_KORNAME);
            } else {
                if (engName != checkEngName[0].engName) {
                    if (overlapEngName[0].exist == 1) {
                        return errResponse(AdminBaseResponse.ENTERPRISE_PATCH_REDUNDANT_ENGNAME);
                    } else {
                        const patchInfo = await adminDao.patchEnterpriseInfo(
                            connection,
                            korName,
                            engName,
                            category,
                            primeLocation,
                            location,
                            tag,
                            description,
                            phoneNumber,
                            thumbnailURL,
                            enterpriseId,
                        );
                        connection.release();
                        return response(AdminBaseResponse.SUCCESS);
                    }
                } else {
                    const patchInfo = await adminDao.patchEnterpriseInfo(
                        connection,
                        korName,
                        engName,
                        category,
                        primeLocation,
                        location,
                        tag,
                        description,
                        phoneNumber,
                        thumbnailURL,
                        enterpriseId,
                    );
                    connection.release();
                    return response(AdminBaseResponse.SUCCESS);
                }
            }
        }
    } catch (err) {
        logger.error(`App - patchEnterprise Service error\n: ${err.message}`);
        return errResponse(AdminBaseResponse.DB_ERROR);
    }
};

// 업체 추가
exports.addEnterprise = async function (
    korName,
    engName,
    category,
    primeLocation,
    location,
    tag,
    description,
    phoneNumber,
    thumbnailURL,
) {
    try {
        const connection = await pool.getConnection(async (conn) => conn);
        const overlapKorName = await adminProvider.overlapKorName(korName);
        const overlapEngName = await adminProvider.overlapEngName(engName);

        if (overlapKorName[0].exist == 1) {
            return errResponse(AdminBaseResponse.ENTERPRISE_POST_REDUNDANT_KORNAME);
        }
        if (overlapEngName[0].exist == 1) {
            return errResponse(AdminBaseResponse.ENTERPRISE_POST_REDUNDANT_ENGNAME);
        } else {
            const postEnterprise = await adminDao.postEnterprise(
                connection,
                korName,
                engName,
                category,
                primeLocation,
                location,
                tag,
                description,
                phoneNumber,
                thumbnailURL,
            );
            connection.release();
            return response(AdminBaseResponse.SUCCESS);
        }
    } catch (err) {
        logger.error(`App - patchEnterprise Service error\n: ${err.message}`);
        return errResponse(AdminBaseResponse.DB_ERROR);
    }
};
// 업체 삭제
exports.patchEnterpriseStatus = async function (status, enterpriseId) {
    try {
        const connection = await pool.getConnection(async (conn) => conn);
        const changeStatus = await adminDao.changeEnterpriseStatus(
            connection,
            status,
            enterpriseId,
        );
        connection.release();
        return response(AdminBaseResponse.SUCCESS);
    } catch (err) {
        logger.error(`App - patchEnterpriseStatus Service error\n: ${err.message}`);
        return errResponse(AdminBaseResponse.DB_ERROR);
    }
};

// 프로그램 삭제
exports.patchProgramStatus = async function (status, programId) {
    try {
        const connection = await pool.getConnection(async (conn) => conn);
        const changeStatus = await adminDao.changeProgramStatus(connection, status, programId);
        connection.release();
        return response(AdminBaseResponse.SUCCESS);
    } catch (err) {
        logger.error(`App - patchProgramStatus Service error\n: ${err.message}`);
        return errResponse(AdminBaseResponse.DB_ERROR);
    }
};

// 프로그램 정보 수정
exports.patchProgram = async function (
    name,
    description,
    tag,
    thumbnailURL,
    checkIn,
    checkOut,
    programInfo,
    mealInfo,
    programId,
) {
    try {
        const connection = await pool.getConnection(async (conn) => conn);

        const patchInfo = await adminDao.patchProgramInfo(
            connection,
            name,
            description,
            tag,
            thumbnailURL,
            checkIn,
            checkOut,
            programInfo,
            mealInfo,
            programId,
        );
        connection.release();
        return response(AdminBaseResponse.SUCCESS);
    } catch (err) {
        logger.error(`App - patchProgram Service error\n: ${err.message}`);
        return errResponse(AdminBaseResponse.DB_ERROR);
    }
};

// 가격 정보 추가
exports.addRoomPrice = async function (programId, inRoom, price) {
    try {
        const connection = await pool.getConnection(async (conn) => conn);
        const postRoomPrice = await adminDao.postRoomPrice(connection, programId, inRoom, price);
        connection.release();
        return response(AdminBaseResponse.SUCCESS);
    } catch (err) {
        logger.error(`App - postRoomPrice Service error\n: ${err.message}`);
        return errResponse(AdminBaseResponse.DB_ERROR);
    }
};

// 가격 정보 수정
exports.patchRoomPrice = async function (inRoom, price, programRoomPriceId) {
    try {
        const connection = await pool.getConnection(async (conn) => conn);
        const patchRoomPrice = await adminDao.patchRoomPrice(
            connection,
            inRoom,
            price,
            programRoomPriceId,
        );
        connection.release();
        return response(AdminBaseResponse.SUCCESS);
    } catch (err) {
        logger.error(`App - patchRoomPrice Service error\n: ${err.message}`);
        return errResponse(AdminBaseResponse.DB_ERROR);
    }
};

// 가격정보 삭제
exports.patchProgramRoomPriceStatus = async function (status, programRoomPriceId) {
    try {
        const connection = await pool.getConnection(async (conn) => conn);
        const changeStatus = await adminDao.changeProgramRoomPriceStatus(
            connection,
            status,
            programRoomPriceId,
        );
        connection.release();
        return response(AdminBaseResponse.SUCCESS);
    } catch (err) {
        logger.error(`App - patchProgramRoomPriceStatus Service error\n: ${err.message}`);
        return errResponse(AdminBaseResponse.DB_ERROR);
    }
};

// 프로그램 추가
exports.addProgram = async function (
    enterpriseId,
    name,
    description,
    tag,
    thumbnailURL,
    checkIn,
    checkOut,
    programInfo,
    mealInfo,
    roomPrice,
) {
    try {
        const connection = await pool.getConnection(async (conn) => conn);
        try {
            connection.beginTransaction(); // 트랜잭션 적용 시작
            const num = 1;
            const a = await adminDao.postProgram(
                connection,
                enterpriseId,
                name,
                description,
                tag,
                thumbnailURL,
                checkIn,
                checkOut,
                programInfo,
                mealInfo,
            );
            for (let i = 0; i < roomPrice.length; i++) {
                const b = await adminDao.postRoomPrice(
                    connection,
                    a.insertId,
                    roomPrice[i].inRoom,
                    roomPrice[i].price,
                );
            }
            await connection.commit(); // 커밋
            connection.release(); // conn 회수
            return response(AdminBaseResponse.SUCCESS);
        } catch (err) {
            await connection.rollback(); // 롤백
            connection.release(); // conn 회수
            return errResponse(AdminBaseResponse.DB_ERROR);
        }
    } catch (err) {
        logger.error(`App - postProgram Service error\n: ${err.message}`);
        return errResponse(AdminBaseResponse.DB_ERROR);
    }
};

// 가격정보 삭제
exports.cancleReservation = async function (status, reservationId) {
    try {
        const connection = await pool.getConnection(async (conn) => conn);
        const changeStatus = await adminDao.cancleReservation(connection, status, reservationId);
        connection.release();
        return response(AdminBaseResponse.SUCCESS);
    } catch (err) {
        logger.error(`App - cancleReservation Service error\n: ${err.message}`);
        return errResponse(AdminBaseResponse.DB_ERROR);
    }
};

// 가격정보 삭제
exports.registReservation = async function (status, reservationId) {
    try {
        const connection = await pool.getConnection(async (conn) => conn);
        const changeStatus = await adminDao.registReservation(connection, status, reservationId);
        connection.release();
        return response(AdminBaseResponse.SUCCESS);
    } catch (err) {
        logger.error(`App - registReservation Service error\n: ${err.message}`);
        return errResponse(AdminBaseResponse.DB_ERROR);
    }
};

// 프로그램 이미지 추가
exports.addProgramImages = async function (programId, image) {
    try {
        const connection = await pool.getConnection(async (conn) => conn);
        const postProgramImages = await adminDao.postProgramImages(connection, programId, image);
        connection.release();
        return response(AdminBaseResponse.SUCCESS);
    } catch (err) {
        logger.error(`App - postProgramImages Service error\n: ${err.message}`);
        return errResponse(AdminBaseResponse.DB_ERROR);
    }
};

// 가격정보 삭제
exports.patchProgramImageStatus = async function (programImageId) {
    try {
        const connection = await pool.getConnection(async (conn) => conn);
        const changeStatus = await adminDao.patchProgramImage(connection, programImageId);
        connection.release();
        return response(AdminBaseResponse.SUCCESS);
    } catch (err) {
        logger.error(`App - patchProgramImage Service error\n: ${err.message}`);
        return errResponse(AdminBaseResponse.DB_ERROR);
    }
};

// 프로그램 정보 수정
exports.patchProgramInfo = async function (content, programInfoId) {
    try {
        const connection = await pool.getConnection(async (conn) => conn);
        const patchProgramInfo = await adminDao.changeProgramInfo(
            connection,
            content,
            programInfoId,
        );
        connection.release();
        return response(AdminBaseResponse.SUCCESS);
    } catch (err) {
        logger.error(`App - patchProgramInfo Service error\n: ${err.message}`);
        return errResponse(AdminBaseResponse.DB_ERROR);
    }
};

// 프로그램 정보 추가
exports.postProgramInfo = async function (programId, content, date) {
    try {
        const connection = await pool.getConnection(async (conn) => conn);
        const postProgramInfo = await adminDao.postProgramInfo(
            connection,
            programId,
            content,
            date,
        );
        connection.release();
        return response(AdminBaseResponse.SUCCESS);
    } catch (err) {
        logger.error(`App - postProgramInfo Service error\n: ${err.message}`);
        return errResponse(AdminBaseResponse.DB_ERROR);
    }
};

// 식단 정보 수정
exports.patchMealInfo = async function (content, mealInfoId) {
    try {
        const connection = await pool.getConnection(async (conn) => conn);
        const patchMealInfo = await adminDao.patchMealInfo(connection, content, mealInfoId);
        connection.release();
        return response(AdminBaseResponse.SUCCESS);
    } catch (err) {
        logger.error(`App - patchMealInfo Service error\n: ${err.message}`);
        return errResponse(AdminBaseResponse.DB_ERROR);
    }
};

// 식단 정보 추가
exports.postMealInfo = async function (programId, content, date) {
    try {
        const connection = await pool.getConnection(async (conn) => conn);
        const postMealInfo = await adminDao.postMealInfo(connection, programId, content, date);
        connection.release();
        return response(AdminBaseResponse.SUCCESS);
    } catch (err) {
        logger.error(`App - postMealInfo Service error\n: ${err.message}`);
        return errResponse(AdminBaseResponse.DB_ERROR);
    }
};
