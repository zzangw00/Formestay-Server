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
    const {programId, name, phoneNumber, totalPerson, startDate, endDate, paymentWay} = req.body;

    if (!programId)
        return res.send(response(baseResponse.PROGRAM_ID_EMPTY));
    if (!name)
        return res.send(response(baseResponse.SIGNUP_NAME_EMPTY));
    if (!phoneNumber)
        return res.send(response(baseResponse.SIGNUP_PHONE_NUMBER_EMPTY));
    if (!regex.phoneNumberRegex.test(phoneNumber))
        return res.send(response(baseResponse.SIGNUP_PHONE_NUMBER_ERROR_TYPE));
    if (!totalPerson)
        return res.send(response(baseResponse.RESERVATION_TOTAL_PERSON_EMPTY));
    if (!startDate)
        return res.send(response(baseResponse.RESERVATION_START_DATE_EMPTY));
    if (!endDate)
        return res.send(response(baseResponse.RESERVATION_END_DATE_EMPTY));
    if (!paymentWay)
        return res.send(response(baseResponse.RESERVATION_PAYMENT_WAY_EMPTY));

    await programService.createReservations(userIdResult, programId, name, phoneNumber, totalPerson, startDate, endDate, paymentWay);
    return res.send(baseResponse.SUCCESS);
};

/** 예약조회 API
 * [GET] app/bookmarks
 */
exports.getReservations = async function (req, res) {
    const userIdResult = req.verifiedToken.userInfo;

    const result = await programProvider.retrieveReservations(userIdResult);

    return res.send(response(baseResponse.SUCCESS, result));
};

/** 예약상세 조회 API
 * [GET] app/bookmarks
 */
exports.getReservationsDetail = async function (req, res) {
    const userIdResult = req.verifiedToken.userInfo;
    const reservationId = req.params.reservationId;

    if (!reservationId)
        return res.send(response(baseResponse.RESERVATION_ID_EMPTY));

    const resultStatus = await programProvider.retrieveReservation(userIdResult, reservationId);

    return res.send(resultStatus);
};
