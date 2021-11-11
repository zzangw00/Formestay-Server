const {pool} = require("../../../config/database");
const {logger} = require("../../../config/winston");
const common = require("../../../config/common");

const enterpriseDao = require("./enterpriseDao");
const enterpriseService = require("./enterpriseService");
const {errResponse} = require("../../../config/response");
const {response} = require("../../../config/response");
const baseResponse = require("../../../config/baseResponseStatus");

//Provider : Read의 비즈니스 로직 처리

exports.retrieveBestEnterpriseList = async function () {
    const connection = await pool.getConnection(async (conn) => conn);
    let bestEnterpriseListResult = await enterpriseDao.selectBestEnterprises(connection);
    connection.release();

    bestEnterpriseListResult = common.returnTagList(bestEnterpriseListResult);

    return bestEnterpriseListResult;
};

exports.retrieveEnterpriseList = async function (category, page) {
    const connection = await pool.getConnection(async (conn) => conn);
    let enterpriseListResult;
    if (category == 0)
        enterpriseListResult = await enterpriseDao.selectAllEnterprises(connection, page);
    else
        enterpriseListResult = await enterpriseDao.selectCategoryEnterprises(connection, category, page);
    connection.release();

    enterpriseListResult = common.returnTagList(enterpriseListResult);

    return enterpriseListResult;
};

exports.retrieveEnterprisesPrograms = async function (enterpriseId) {
    const connection = await pool.getConnection(async (conn) => conn);
    const enterpriseInfo = await enterpriseDao.selectEnterpriseById(connection, enterpriseId);
    let programList = await enterpriseDao.selectProgramsByEnterpriseId(connection, enterpriseId);
    connection.release();

    if (enterpriseInfo == undefined) {
        return errResponse(baseResponse.NON_EXIST_ENTERPRISE);
    }

    await enterpriseService.createEnterprisesEntrance(enterpriseId);
    programList = common.returnTagList(programList);
    const data = {
        enterpriseInfo: enterpriseInfo,
        programList: programList
    }

    return response(baseResponse.SUCCESS, data);
};

exports.retrieveEnterpriseByEnterpriseId = async function (enterpriseId) {
    const connection = await pool.getConnection(async (conn) => conn);
    const result = await enterpriseDao.isExistEnterpriseByEnterpriseId(connection, enterpriseId);

    connection.release();

    return result[0].CNT;
};

exports.retrieveSearchEnterpriseList = async function (content, page) {
    const connection = await pool.getConnection(async (conn) => conn);
    let enterpriseListResult = await enterpriseDao.selectSearchEnterprises(connection, content, page);
    connection.release();
    enterpriseListResult = common.returnTagList(enterpriseListResult);

    return enterpriseListResult;
};

exports.retrieveBookmarks = async function (userId) {
    const connection = await pool.getConnection(async (conn) => conn);
    let bookmarkInfo = await enterpriseDao.selectBookmarksByUserId(connection, userId);
    connection.release();
    bookmarkInfo = common.returnTagList(bookmarkInfo);

    const data = {
        bookmarkList: bookmarkInfo
    }

    return data;
};