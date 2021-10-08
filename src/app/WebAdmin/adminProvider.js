const {pool} = require("../../../config/database");
const {logger} = require("../../../config/winston");

const adminDao = require("./adminDao");

//Provider : Read의 비즈니스 로직 처리

exports.retrieveUserList = async function (email) {
    if (!email) {
        const connection = await pool.getConnection(async (conn) => conn);
        const userListResult = await adminDao.selectUser(connection);
        connection.release();

        return userListResult;

    } else {
        const connection = await pool.getConnection(async (conn) => conn);
        const userListResult = await adminDao.selectUserEmail(connection, email);
        connection.release();

        return userListResult;
    }
};