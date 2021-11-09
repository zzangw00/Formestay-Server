const jwtMiddleware = require("../../../config/jwtMiddleware");
const programProvider = require("../../app/Program/programProvider");
const programService = require("../../app/Program/programService");
const baseResponse = require("../../../config/baseResponseStatus");
const {response} = require("../../../config/response");
const {errResponse} = require("../../../config/response");
const {emit} = require("nodemon");
const regex = require("../../../config/regularExpress")



/** 프로그램 상세 조회 API
 * [GET] app/programs/:programId
 */
exports.getProgramsById = async function (req, res) {
    const programId = req.params.programId;

    if (!programId)
        return res.send(response(baseResponse.PROGRAM_ID_EMPTY));

    const resultStatus = await programProvider.retrieveProgramsByProgramId(programId);

    return res.send(resultStatus);
};

/** 찜 목록 조회 API
 * [GET] app/bookmarks
 */
exports.getBookmarks = async function (req, res) {
    const userIdResult = req.verifiedToken.userInfo;

    const result = await programProvider.retrieveBookmarks(userIdResult);

    return res.send(response(baseResponse.SUCCESS, result));
};

/** 찜 하기 API
 * [POST] app/bookmarks
 */
exports.postBookmarks = async function (req, res) {
    const userIdResult = req.verifiedToken.userInfo;
    const programId = req.body.programId;

    if (!programId)
        return res.send(response(baseResponse.PROGRAM_ID_EMPTY));

    const resultStatus = await programService.createBookmarks(userIdResult, programId);

    return res.send(resultStatus);
};



