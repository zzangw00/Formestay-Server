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







