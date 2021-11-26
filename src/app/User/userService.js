const {logger} = require("../../../config/winston");
const {pool} = require("../../../config/database");
const jwt = require("jsonwebtoken");
const secret_config = require("../../../config/secret");
const userProvider = require("./userProvider");
const userDao = require("./userDao");
const baseResponse = require("../../../config/baseResponseStatus");
const {response} = require("../../../config/response");
const {errResponse} = require("../../../config/response");
const {connect} = require("http2");
const security = require("../../../utils/security");
const axios = require('axios')

// Service Create, Update, Delete 의 로직 처리

exports.createUser = async function (name, nickname, gender, birthday, phoneNumber, email, password, isPermitAlarm, snsId, profileImgURL) {
    const isExistPhoneNumber = await userProvider.retrieveUserByPhoneNumber(phoneNumber);
    if (isExistPhoneNumber === 1) {
        return errResponse(baseResponse.EXIST_PHONE_NUMBER);
    }

    const isExistEmail = await userProvider.retrieveUserByEmail(email);
    if (isExistEmail === 1) {
        return errResponse(baseResponse.EXIST_EMAIL);
    }

    const connection = await pool.getConnection(async (conn) => conn);
    try {


        // 비밀번호 암호화
        let securityData
        let userHashedPassword
        let userSalt

        if (snsId == 0) {
            securityData = security.saltHashPassword(password);
            userHashedPassword = securityData.hashedPassword;
            userSalt = securityData.salt;
        } else {
            userHashedPassword = "NONE";
            userSalt = "NONE";
        }

        // Transaction 예제
        // 회원가입 동시에 Level 테이블에도 컬럼 추가
        await connection.beginTransaction(); // START TRANSACTION

        // UserInfo 테이블에 데이터 추가
        const insertUserInfoParams = [name, nickname, gender, birthday, phoneNumber, email, userHashedPassword, userSalt, isPermitAlarm, snsId, profileImgURL];
        const userIdResult = await userDao.insertUserInfo(connection, insertUserInfoParams);

        const userId = userIdResult[0].insertId;

        await connection.commit(); // COMMIT
        connection.release();

        //토큰 생성 Service
        let token = await jwt.sign(
            {
                userInfo: userId,
            }, // 토큰의 내용(payload)
            secret_config.jwtsecret, // 비밀 키
            {
                expiresIn: "30d",
                subject: "userInfo",
            } // 유효 시간은 30일
        );

        const data = {
            jwt: token,
            name: name,
            nickname: nickname,
            phoneNumber: phoneNumber
        }
        return response(baseResponse.SUCCESS, data);

    } catch (err) {
        connection.rollback(); //ROLLBACK
        connection.release();
        logger.error(`App - createUser Transaction error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
};

exports.postSignIn = async function (email, password) {
    try {
        // 이메일 확인
        const userInfo = await userProvider.selectUserInfoByEmail(email);
        if (userInfo === undefined) {
            return errResponse(baseResponse.SIGNIN_NO_EXIST_EMAIL);
        }

        const isValidate = security.validatePassword(password, userInfo.salt, userInfo.password);
        if (isValidate === false) {
            return errResponse(baseResponse.SIGNIN_USERINFO_WRONG);
        }

        //토큰 생성 Service
        let token = await jwt.sign(
            {
                userInfo: userInfo.userId,
            }, // 토큰의 내용(payload)
            secret_config.jwtsecret, // 비밀 키
            {
                expiresIn: "30d",
                subject: "userInfo",
            } // 유효 시간은 30일
        );

        const data = {
            jwt: token,
            name: userInfo.name,
            nickname: userInfo.nickname,
            phoneNumber: userInfo.phoneNumber
        }
        return response(baseResponse.SUCCESS, data);

    } catch (err) {
        logger.error(`App - postSignIn Service error\n: ${err.message} \n${JSON.stringify(err)}`);
        return errResponse(baseResponse.DB_ERROR);
    }
};

exports.postSocialLogin = async function (token) {
    let accessToken = token
    try {
        let kakaoProfile = await axios.request({
            method: 'GET',
            url: 'https://kapi.kakao.com/v2/user/me',
            headers: {'Authorization': 'Bearer ' + accessToken},

        });

        let kakaoId = kakaoProfile.data.id;
        let kakaoProfileImgURL = "";
        let kakaoNickname = "";
        let kakaoEmail = "";
        if (kakaoProfile.data.properties != undefined) {
            if (kakaoProfile.data.properties.profile_image != undefined) {
                kakaoProfileImgURL = kakaoProfile.data.properties.profile_image
            }
            if (kakaoProfile.data.properties.nickname != undefined) {
                kakaoNickname = kakaoProfile.data.properties.nickname
            }
        }

        if (kakaoProfile.data.kakao_account != undefined) {
            if (kakaoProfile.data.kakao_account.email != undefined) {
                kakaoEmail = kakaoProfile.data.kakao_account.email
            }
        }

        // SNS ID로 정보 가져오기
        const userInfo = await userProvider.selectUserInfoBySocialId(kakaoId);
        if (userInfo === undefined) {
            const kakaoData = {
                jwt: "",
                name: "",
                nickname: "",
                phoneNumber: "",
                snsId: kakaoId,
                snsProfileImgURL: kakaoProfileImgURL,
                snsNickname: kakaoNickname,
                snsEmail: kakaoEmail
            }
            return response(baseResponse.SIGNIN_NO_EXIST_SOCIAL, kakaoData);
        }

        //토큰 생성 Service
        let token = await jwt.sign(
            {
                userInfo: userInfo.userId,
            }, // 토큰의 내용(payload)
            secret_config.jwtsecret, // 비밀 키
            {
                expiresIn: "30d",
                subject: "userInfo",
            } // 유효 시간은 30일
        );

        const data = {
            jwt: token,
            name: userInfo.name,
            nickname: userInfo.nickname,
            phoneNumber: userInfo.phoneNumber,
            snsId: kakaoId,
            snsProfileImgURL: kakaoProfileImgURL,
            snsNickname: kakaoNickname,
            snsEmail: kakaoEmail
        }
        return response(baseResponse.SUCCESS, data);

    } catch (err) {
        logger.error(`App - postSocialLogin Service error\n: ${err.message} \n${JSON.stringify(err)}`);
        return errResponse(baseResponse.DB_ERROR);
    }
};

exports.makeJWT = async function (userInfo) {
    try {
        //토큰 생성 Service
        let token = await jwt.sign(
            {
                userInfo: userInfo.userId,
            }, // 토큰의 내용(payload)
            secret_config.jwtsecret, // 비밀 키
            {
                expiresIn: "30d",
                subject: "userInfo",
            } // 유효 시간은 30일
        );

        const data = {
            jwt: token,
            name: userInfo.name,
            nickname: userInfo.nickname,
            phoneNumber: userInfo.phoneNumber,
        }

        return data;

    } catch (err) {
        logger.error(`App - makeJWT Service error\n: ${err.message} \n${JSON.stringify(err)}`);
        return errResponse(baseResponse.DB_ERROR);
    }
};

exports.postFindEmail = async function (phoneNumber) {

    try {
        const userEmailInfos = await userProvider.retrieveUsersEmailByPhoneNumber(phoneNumber);

        if (userEmailInfos.length == 0) {
            return errResponse(baseResponse.FIND_NO_EXIST_EMAIL);
        } else {
            const data = {
                userInfo: userEmailInfos
            }
            return response(baseResponse.SUCCESS, data);
        }

    } catch (err) {
        logger.error(`App - postFindEmail Service error\n: ${err.message} \n${JSON.stringify(err)}`);
        return errResponse(baseResponse.DB_ERROR);
    }
};

exports.postFindPhoneNumber = async function (phoneNumber) {

    try {
        const isExistPhoneNumber = await userProvider.retrieveUserByPhoneNumber(phoneNumber);
        if (isExistPhoneNumber === 0) {
            return errResponse(baseResponse.FIND_NO_EXIST_USER);
        } else {
            return response(baseResponse.SUCCESS);
        }

    } catch (err) {
        logger.error(`App - postFindPhoneNumber Service error\n: ${err.message} \n${JSON.stringify(err)}`);
        return errResponse(baseResponse.DB_ERROR);
    }
};

exports.editUserPassword = async function (phoneNumber, password) {

    try {
        const userInfo = await userProvider.retrieveUserIdByPhoneNumber(phoneNumber);
        if (userInfo == undefined) {
            return errResponse(baseResponse.FIND_NO_EXIST_USER);
        }

        const securityData = security.saltHashPassword(password);
        const userHashedPassword = securityData.hashedPassword;
        const userSalt = securityData.salt;

        const connection = await pool.getConnection(async (conn) => conn);
        await userDao.updateUsersPassword(connection, userInfo.userId, userHashedPassword, userSalt);
        connection.release();

        return response(baseResponse.SUCCESS);
    } catch (err) {
        logger.error(`App - editUserPassword Service error\n: ${err.message} \n${JSON.stringify(err)}`);
        return errResponse(baseResponse.DB_ERROR);
    }
};

exports.editUser = async function (userIdx, nickname) {
    try {
        console.log(userIdx)
        const connection = await pool.getConnection(async (conn) => conn);
        const editUserResult = await userDao.updateUserInfo(connection, userIdx, nickname)
        connection.release();

        return response(baseResponse.SUCCESS);

    } catch (err) {
        logger.error(`App - editUser Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
}

exports.editUserStatus = async function (userId) {
    try {
        const connection = await pool.getConnection(async (conn) => conn);
        const result = await userDao.SelectUserByUserId(connection, userId);
        if (result[0] == undefined) {
            return errResponse(baseResponse.FIND_NO_EXIST_USER);
        }
        await userDao.updateUserStatus(connection, userId)
        connection.release();

        return response(baseResponse.SUCCESS);

    } catch (err) {
        logger.error(`App - editUserStatus Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
}


exports.getUserFindById = async function (userIdx) {
    try {
        // 이메일 중복 확인
        const userInfo = await userProvider.findByUserId(userIdx);
        if (userInfo.length === 0) return errResponse(baseResponse.USER_USERID_NOT_EXIST);

        return response(baseResponse.SUCCESS, userInfo);

    } catch (err) {
        logger.error(`App - getUserFindById Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
};

exports.getUserFindByEmail = async function (email) {
    try {
        // 이메일 확인
        const userInfo = await userProvider.findByUserEmail(email);
        if (userInfo.length === 0) return errResponse(baseResponse.USER_USEREMAIL_NOT_EXIST);

        return response(baseResponse.SUCCESS, userInfo);

    } catch (err) {
        logger.error(`App - getUserFindByEmail Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }

}

exports.patchUserProfileImage = async function (userId, profileImgURL) {

    try {
        const isExistUser = await userProvider.retrieveUserInfoByUserId(userId);
        if (isExistUser == undefined) {
            return errResponse(baseResponse.FIND_NO_EXIST_USER);
        }
        const connection = await pool.getConnection(async (conn) => conn);
        await userDao.updateUserProfileImage(connection, userId, profileImgURL);
        connection.release();

        return response(baseResponse.SUCCESS)

    } catch (err) {
        logger.error(`App - postFindPhoneNumber Service error\n: ${err.message} \n${JSON.stringify(err)}`);
        return errResponse(baseResponse.DB_ERROR);
    }
};
