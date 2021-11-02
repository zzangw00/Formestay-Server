const {pool} = require("../../../config/database");
const {logger} = require("../../../config/winston");
const common = require("../../../config/common");

const enterpriseDao = require("./enterpriseDao");

//Provider : Read의 비즈니스 로직 처리

exports.retrieveBestEnterpriseList = async function () {
    const connection = await pool.getConnection(async (conn) => conn);
    let bestEnterpriseListResult = await enterpriseDao.selectBestEnterprises(connection);
    connection.release();

    bestEnterpriseListResult = common.returnTagList(bestEnterpriseListResult);

    return bestEnterpriseListResult;
};
