const {logger} = require("../../../config/winston");
const {pool} = require("../../../config/database");
const jwt = require("jsonwebtoken");
const secret_config = require("../../../config/secret");
const enterpriseProvider = require("./enterpriseProvider");
const enterpriseDao = require("./enterpriseDao");
const baseResponse = require("../../../config/baseResponseStatus");
const {response} = require("../../../config/response");
const {errResponse} = require("../../../config/response");
const {connect} = require("http2");
const security = require("../../../utils/security");

// Service Create, Update, Delete 의 로직 처리

exports.createEnterprisesEntrance = async function (enterpriseId) {
    const connection = await pool.getConnection(async (conn) => conn);
    try {
        await connection.beginTransaction(); // START TRANSACTION
        await enterpriseDao.insertEnterpriseEntrance(connection, enterpriseId);
        await connection.commit(); // COMMIT
        connection.release();
    } catch (err) {
        connection.rollback(); //ROLLBACK
        connection.release();
        logger.error(`App - createEnterprisesEntrance Service error\n: ${err.message}`);
    }
};

exports.createBookmarks = async function (userId, enterpriseId) {
    let flag = false;
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
            flag = true;
        } else {
            await enterpriseDao.updateBookMarks(connection, bookmarkInfo[0].bookMarkId);
            flag = false;
        }
        await connection.commit(); // COMMIT
        connection.release();

        if (flag == true) {
            return response(baseResponse.BOOKMARK_ENROLL_SUCCESS);
        } else {
            return response(baseResponse.BOOKMARK_END_SUCCESS);
        }
    } catch (err) {
        connection.rollback(); //ROLLBACK
        connection.release();
        logger.error(`App - createBookmarks Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
};
