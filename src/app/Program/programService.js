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

exports.createBookmarks = async function (userId, programId) {

    const connection = await pool.getConnection(async (conn) => conn);
    const isExistProgram = await programDao.isExistProgramsById(connection, programId);

    if (isExistProgram[0]['CNT'] == 0) {
        console.log('hi')
        return errResponse(baseResponse.NON_EXIST_PROGRAM);
    }
    try {
        await connection.beginTransaction(); // START TRANSACTION
        await programDao.insertBookMarks(connection, programId, userId);
        await connection.commit(); // COMMIT
        connection.release();
        return response(baseResponse.SUCCESS);
    } catch (err) {
        connection.rollback(); //ROLLBACK
        connection.release();
        logger.error(`App - createBookmarks Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
};
