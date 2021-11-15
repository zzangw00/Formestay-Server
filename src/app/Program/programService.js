const {logger} = require("../../../config/winston");
const {pool} = require("../../../config/database");
const jwt = require("jsonwebtoken");
const secret_config = require("../../../config/secret");
const programProvider = require("./programProvider");
const programDao = require("./programDao");
const baseResponse = require("../../../config/baseResponseStatus");
const {response} = require("../../../config/response");
const {errResponse} = require("../../../config/response");
const {connect} = require("http2");
const security = require("../../../utils/security");

// Service Create, Update, Delete 의 로직 처리

exports.createReservations = async function (userId, programId) {
    const connection = await pool.getConnection(async (conn) => conn);
    const isExistProgram = await enterpriseDao.isExistEnterpriseByEnterpriseId(connection, enterpriseId);

    if (isExistProgram[0]['CNT'] == 0) {
        return errResponse(baseResponse.NON_EXIST_ENTERPRISE);
    }
    try {
        await connection.beginTransaction(); // START TRANSACTION
        const bookmarkInfo = await enterpriseDao.selectBookMarkInfoById(connection, enterpriseId);

        if (bookmarkInfo[0] == undefined) {
            await enterpriseDao.insertBookMarks(connection, enterpriseId, userId);
        } else {
            await enterpriseDao.updateBookMarks(connection, bookmarkInfo[0].bookMarkId);
        }
        await connection.commit(); // COMMIT
        connection.release();

    } catch (err) {
        connection.rollback(); //ROLLBACK
        connection.release();
        logger.error(`App - createReservations Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
};