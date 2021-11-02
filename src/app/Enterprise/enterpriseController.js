const jwtMiddleware = require("../../../config/jwtMiddleware");
const enterpriseProvider = require("../../app/Enterprise/enterpriseProvider");
const enterpriseService = require("../../app/Enterprise/enterpriseService");
const baseResponse = require("../../../config/baseResponseStatus");
const {response} = require("../../../config/response");
const {errResponse} = require("../../../config/response");
const {emit} = require("nodemon");
const regex = require("../../../config/regularExpress")

/** 대표 업체 5개 조회 API
 * [GET] app/best-enterprises
 */
exports.getBestEnterprises = async function (req, res) {
    const bestEnterpriseList = await enterpriseProvider.retrieveBestEnterpriseList();

    const data = {
        bestEnterpriseList: bestEnterpriseList
    }
    return res.send(response(baseResponse.SUCCESS, data));
};

/** 업체 조회 API
 * [GET] app/enterprises
 */
exports.getEnterprises = async function (req, res) {
    const {category, page} = req.query;

    console.log(category, page)
    // const bestEnterpriseList = await enterpriseProvider.retrieveBestEnterpriseList();
    //
    // const data = {
    //     bestEnterpriseList: bestEnterpriseList
    // }
    return res.send(response(baseResponse.SUCCESS));
};