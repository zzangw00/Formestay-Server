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

/** 프로그램 예약하기 API
 * [POST] app/reservations
 */
exports.postReservations = async function (req, res) {
    const userIdResult = req.verifiedToken.userInfo;
    const programId = req.body.programId;

    let now = new Date();
    let timestamp = now.getFullYear().toString();
    timestamp += (now.getMonth() < 9 ? '0' : '') + (now.getMonth() + 1).toString();
    timestamp += (now.getDate() < 10 ? '0' : '') + now.getDate().toString();
    timestamp += (now.getHours() < 10 ? '0' : '') + now.getHours().toString();
    timestamp += (now.getMinutes() < 10 ? '0' : '') + now.getMinutes().toString();
    timestamp += (now.getSeconds() < 10 ? '0' : '') + now.getSeconds().toString();
    if (now.getMilliseconds() < 10) {
        timestamp += '00' + now.getMilliseconds().toString();
    } else if (now.getMilliseconds() < 100) {
        timestamp += '0' + now.getMilliseconds().toString();
    } else {
        timestamp += now.getMilliseconds().toString();
    }
    console.log(timestamp)
    return res.send(baseResponse.SUCCESS);
};