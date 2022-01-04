const {logger} = require("../../../config/winston");
const {pool} = require("../../../config/database");
const jwt = require("jsonwebtoken");
const secret_config = require("../../../config/secret");
const programProvider = require("./programProvider");
const programDao = require("./programDao");
const userDao = require("../User/userDao");
const baseResponse = require("../../../config/baseResponseStatus");
const {response} = require("../../../config/response");
const {errResponse} = require("../../../config/response");
const {connect} = require("http2");
const security = require("../../../utils/security");
const common = require("../../../config/common");
const axios = require('axios');
const secret = require('../../../config/secret')

// Service Create, Update, Delete 의 로직 처리

exports.createReservations = async function (userId, programId, programRoomPriceId, name, phoneNumber, startDate, endDate, receiptId, price) {
    const connection = await pool.getConnection(async (conn) => conn);
    const userExist = await userDao.SelectUserByUserId(connection, userId);
    if (userExist[0] == undefined) {
        return errResponse(baseResponse.FIND_NO_EXIST_USER);
    }

    const isExistProgram = await programDao.isExistProgramByProgramId(connection, programId);

    if (isExistProgram[0]['CNT'] == 0) {
        return errResponse(baseResponse.NON_EXIST_PROGRAM);
    }

    const isExistRoom = await programDao.isExistRoomByProgramId(connection, programId, programRoomPriceId);
    if (isExistRoom[0]['CNT'] == 0) {
        return errResponse(baseResponse.NON_EXIST_ROOM);
    }

    try {

        const accessTokenResponse = await axios.request({
            method: 'POST',
            url: "https://api.bootpay.co.kr/request/token",
            headers: {'Content-Type': 'application/json'},
            data: {
                "application_id": secret.bootpay_application_id,
                "private_key": secret.bootpay_private_key
            }
        });

        const accessToken = accessTokenResponse.data.data.token

        const paymentConfirmResponse = await axios.request({
            method: 'GET',
            url: `https://api.bootpay.co.kr/receipt/${receiptId}`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': accessToken
            }
        });

        // if (paymentConfirmResponse.data.status == 200) {
            await connection.beginTransaction(); // START TRANSACTION
            const reservationId = await programDao.insertReservation(connection, programId, userId, programRoomPriceId, name, phoneNumber, startDate, endDate, common.makeReservationNumber(), price);
            // console.log(reservationId)
            await programDao.insertPaymentHistory(connection, userId, reservationId, receiptId);
            await connection.commit(); // COMMIT
            connection.release();

            return response(baseResponse.SUCCESS);
        // } else {
        //     return errResponse(baseResponse.CANCEL_PAYMENT);
        // }
    } catch (err) {
        connection.rollback(); //ROLLBACK
        connection.release();
        logger.error(`App - createReservations Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
};

exports.createPaymentsHistory = async function (userId, receiptId) {

    try {
        let accessTokenResponse = await axios.request({
            method: 'POST',
            url: "https://api.bootpay.co.kr/request/token",
            headers: {'Content-Type': 'application/json'},
            data: {
                "application_id": secret.bootpay_application_id,
                "private_key": secret.bootpay_private_key
            }
        });

        let accessToken = accessTokenResponse.data.data.token

        let paymentCancelResponse = await axios.request({
            method: 'GET',
            url: `https://api.bootpay.co.kr/cancel`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': accessToken
            },
            data: {
                'receipt_id': receiptId,
                'name': "결제취소",
                'reason': "취소이유"
            }
        });

        return response(baseResponse.SUCCESS);
    } catch (err) {
        logger.error(`App - createPayments Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }


    // try {
    //     await connection.beginTransaction(); // START TRANSACTION
    //     await programDao.insertReservation(connection, programId, userId, programRoomPriceId, name, phoneNumber, startDate, endDate, paymentWay, common.makeReservationNumber(), price);
    //
    //     await connection.commit(); // COMMIT
    //     connection.release();
    //
    //     return response(baseResponse.SUCCESS);
    //
    // } catch (err) {
    //     connection.rollback(); //ROLLBACK
    //     connection.release();
    //     logger.error(`App - createReservations Service error\n: ${err.message}`);
    //     return errResponse(baseResponse.DB_ERROR);
    // }
};