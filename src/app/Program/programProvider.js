const {pool} = require("../../../config/database");
const {logger} = require("../../../config/winston");
const {errResponse} = require("../../../config/response");
const {response} = require("../../../config/response");
const baseResponse = require("../../../config/baseResponseStatus");
const programDao = require("./programDao");
const common = require("../../../config/common");

//Provider : Read의 비즈니스 로직 처리

exports.retrieveProgramsByProgramId = async function (programId) {
    const connection = await pool.getConnection(async (conn) => conn);
    let programInfo = await programDao.selectProgramsById(connection, programId);
    let imageList = await programDao.selectProgramImagesById(connection, programId);
    connection.release();

    if (programInfo == undefined) {
        return errResponse(baseResponse.NON_EXIST_PROGRAM);
    }
    let inputImageList = [];
    inputImageList.push(programInfo['imageList'])
    for (let image of imageList) {
        inputImageList.push(image['imageURL']);
    }
    programInfo['imageList'] = inputImageList;
    programInfo = common.returnOneTagList(programInfo);
    const data = {
        programInfo: programInfo
    }

    return response(baseResponse.SUCCESS, data);
};

exports.retrieveReservations = async function (userId) {
    const connection = await pool.getConnection(async (conn) => conn);
    let reservationList = await programDao.selectReservationsByUserId(connection, userId);
    connection.release();
    reservationList = common.returnTagList(reservationList);

    const data = {
        reservationList: reservationList
    }

    return data;
};
