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

// Service Create, Update, Delete 의 로직 처리

exports.createReservations = async function (userId, programId, programRoomPriceId, name, phoneNumber, startDate, endDate, paymentWay, price) {
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
        await connection.beginTransaction(); // START TRANSACTION
        await programDao.insertReservation(connection, programId, userId, programRoomPriceId, name, phoneNumber, startDate, endDate, paymentWay, common.makeReservationNumber(), price);

        await connection.commit(); // COMMIT
        connection.release();

        return response(baseResponse.SUCCESS);

    } catch (err) {
        connection.rollback(); //ROLLBACK
        connection.release();
        logger.error(`App - createReservations Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
};