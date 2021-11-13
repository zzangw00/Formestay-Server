const jwtMiddleware = require("../../../config/jwtMiddleware");
const jwt = require('jsonwebtoken');
const secret_config = require('../../../config/secret');
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
        enterpriseList: bestEnterpriseList
    }
    return res.send(response(baseResponse.SUCCESS, data));
};

/** 업체 조회 API
 * [GET] app/enterprises
 */
exports.getEnterprises = async function (req, res) {
    let {category, page} = req.query;

    console.log('why');
    if (!category)
        return res.send(response(baseResponse.ENTERPRISE_CATEGORY_EMPTY));
    if (category < 0 || category > 4)
        return res.send(response(baseResponse.ENTERPRISE_CATEGORY_ERROR_TYPE));
    if (!page)
        return res.send(response(baseResponse.PAGE_EMPTY));
    if (page < 1)
        return res.send(response(baseResponse.PAGE_ERROR_TYPE));

    page = (page - 1) * 10;

    const enterpriseList = await enterpriseProvider.retrieveEnterpriseList(category, page);
    const data = {
        enterpriseList: enterpriseList
    }
    return res.send(response(baseResponse.SUCCESS, data));
};

/** 업체 상세 조회 API
 * [GET] app/enterprises/:enterpriseId
 */
exports.getEnterpriseById = async function (req, res) {
    const enterpriseId = req.params.enterpriseId;
    let userId = 0
    if (req.headers['x-access-token'] != undefined) {
        await jwt.verify(req.headers['x-access-token'], secret_config.jwtsecret, (error, decoded) => {
            if(error){
                return res.send(errResponse(baseResponse.TOKEN_VERIFICATION_FAILURE))
            }
            userId = decoded.userInfo;
        });
    }

    if (!enterpriseId)
        return res.send(response(baseResponse.ENTERPRISE_ID_EMPTY));

    const resultStatus = await enterpriseProvider.retrieveEnterprisesPrograms(enterpriseId, userId);

    return res.send(resultStatus);
};

/** 업체 검색 API
 * [GET] app/enterprises
 */
exports.getSearchEnterprises = async function (req, res) {
    let {content, page} = req.query;

    if (!content)
        return res.send(response(baseResponse.SEARCH_CONTENT_EMPTY));
    if (!page)
        return res.send(response(baseResponse.PAGE_EMPTY));
    if (page < 1)
        return res.send(response(baseResponse.PAGE_ERROR_TYPE));

    page = (page - 1) * 10;

    const enterpriseList = await enterpriseProvider.retrieveSearchEnterpriseList(content, page);
    const data = {
        enterpriseList: enterpriseList
    }
    return res.send(response(baseResponse.SUCCESS, data));
};

/** 찜 목록 조회 API
 * [GET] app/bookmarks
 */
exports.getBookmarks = async function (req, res) {
    const userIdResult = req.verifiedToken.userInfo;

    const result = await enterpriseProvider.retrieveBookmarks(userIdResult);

    return res.send(response(baseResponse.SUCCESS, result));
};

/** 찜 하기 및 해제 API
 * [POST] app/bookmarks
 */
exports.postBookmarks = async function (req, res) {
    const userIdResult = req.verifiedToken.userInfo;
    const enterpriseId = req.body.enterpriseId;

    if (!enterpriseId)
        return res.send(response(baseResponse.ENTERPRISE_ID_EMPTY));

    const resultStatus = await enterpriseService.createBookmarks(userIdResult, enterpriseId);

    return res.send(resultStatus);
};


