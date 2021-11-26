const {pool} = require("../../../config/database");
const {logger} = require("../../../config/winston");
const {errResponse} = require("../../../config/response");
const {response} = require("../../../config/response");
const userDao = require("../User/userDao");
const baseResponse = require("../../../config/baseResponseStatus");
const programDao = require("./programDao");
const common = require("../../../config/common");

//Provider : Read의 비즈니스 로직 처리

exports.retrieveProgramsByProgramId = async function (programId) {
    const connection = await pool.getConnection(async (conn) => conn);
    let programInfo = await programDao.selectProgramsById(connection, programId);
    if (programInfo == undefined) {
        return errResponse(baseResponse.NON_EXIST_PROGRAM);
    }

    let imageList = await programDao.selectProgramImagesById(connection, programId);
    let roomList = await programDao.selectProgramRoomListById(connection, programId);

    connection.release();

    let inputImageList = [];
    inputImageList.push(programInfo['imageList'])
    for (let image of imageList) {
        inputImageList.push(image['imageURL']);
    }
    programInfo['roomList'] = roomList;
    programInfo['imageList'] = inputImageList;
    programInfo = common.returnOneTagList(programInfo);
    const data = {
        programInfo: programInfo
    }

    return response(baseResponse.SUCCESS, data);
};

exports.retrieveReservations = async function (userId) {
    const connection = await pool.getConnection(async (conn) => conn);
    const userExist = await userDao.SelectUserByUserId(connection, userId);
    if (userExist[0] == undefined) {
        return errResponse(baseResponse.FIND_NO_EXIST_USER);
    }

    let reservationList = await programDao.selectReservationsByUserId(connection, userId);
    connection.release();
    reservationList = common.returnTagList(reservationList);

    const data = {
        reservationList: reservationList
    }

    return data;
};

exports.retrieveReservation = async function (userId, reservationId) {
    const connection = await pool.getConnection(async (conn) => conn);
    let reservationInfo = await programDao.selectReservationsDetailById(connection, userId, reservationId);
    connection.release();
    if (reservationInfo != undefined)
        reservationInfo = common.returnOneTagList(reservationInfo);
    else
        return response(baseResponse.NOT_RESERVATION_USER)

    const data = {
        reservationInfo: reservationInfo
    }

    return response(baseResponse.SUCCESS, data);
};

