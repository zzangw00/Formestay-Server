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