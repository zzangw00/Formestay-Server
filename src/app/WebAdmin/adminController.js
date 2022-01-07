const jwtMiddleware = require('../../../config/jwtMiddleware');
const regexEmail = require('regex-email');
const adminProvider = require('./adminProvider');
const adminService = require('./adminService');
const AdminBaseResponse = require('../../../config/AdminBaseResponseStatus');
const { response } = require('../../../config/response');
const { errResponse } = require('../../../config/response');
const { emit } = require('nodemon');

/** 회원 전체 조회 API
 * [GET] /admin/users
 *
 * 회원 이메일 검색 조회 API
 * [GET] /admin/users?word=
 * queryString : word
 */
exports.getUsers = async function (req, res) {
    const adminIdFromJWT = req.verifiedToken.adminId;

    const userListResult = await adminProvider.retrieveUserList(adminIdFromJWT);
    return res.send(response(AdminBaseResponse.SUCCESS, userListResult));
};

/** 업체 관계자 조회 API
 * [GET] /admin/admins
 */
exports.getAdmins = async function (req, res) {
    const adminListResult = await adminProvider.retrieveAdminList();
    return res.send(response(AdminBaseResponse.SUCCESS, adminListResult));
};

/** 관리자인지 조회 API
 * [GET] /admin
 */
exports.getAdmin = async function (req, res) {
    const status = req.verifiedToken.status;
    const enterpriseId = req.verifiedToken.enterpriseId;
    const result = {
        status: status,
        enterpriseId: enterpriseId,
    };
    return res.send(response(AdminBaseResponse.SUCCESS, result));
};

/** 관리자 회원가입 API
 * [POST] /admin
 * body : email, password, nickname, phoneNumber
 */
exports.postAdmin = async function (req, res) {
    const status = req.verifiedToken.status;
    const { email, password, nickname, phoneNumber, enterpriseId } = req.body;
    if (!regexEmail.test(email)) {
        return res.send(response(AdminBaseResponse.ADMIN_SIGNUP_EMAIL_ERROR_TYPE));
    }
    if (!email) {
        return res.send(response(AdminBaseResponse.ADMIN_SIGNUP_EMAIL_EMPTY));
    }
    if (!password) {
        return res.send(response(AdminBaseResponse.ADMIN_SIGNUP_PASSWORD_EMPTY));
    }
    if (!nickname) {
        return res.send(response(AdminBaseResponse.ADMIN_SIGNUP_NICKNAME_EMPTY));
    }
    if (!phoneNumber) {
        return res.send(response(AdminBaseResponse.ADMIN_SIGNUP_PHONENUMBER_EMPTY));
    }
    if (!enterpriseId) {
        return res.send(response(AdminBaseResponse.ADMIN_SIGNUP_ENTERPRISEID_EMPTY));
    }
    if (status != 0) {
        return res.send(response(AdminBaseResponse.ADMIN_SIGNUP_STATUS));
    }

    const signUpResponse = await adminService.createAdmin(
        email,
        password,
        nickname,
        phoneNumber,
        enterpriseId,
    );

    return res.send(signUpResponse);
};

/** 관리자 로그인 API
 * [POST] /admin/login
 * body : email, password
 */
exports.loginAdmin = async function (req, res) {
    const { email, password } = req.body;

    if (!email) {
        return res.send(response(AdminBaseResponse.ADMIN_SIGNIN_EMAIL_EMPTY));
    } else if (!password) {
        return res.send(response(AdminBaseResponse.ADMIN_SIGNIN_PASSWORD_EMPTY));
    }

    const signInResponse = await adminService.postSignIn(email, password);

    return res.send(signInResponse);
};

/** 자동 로그인 API
 * [GET] /admin/auto-login
 */
exports.autoLogin = async function (req, res) {
    const adminIdFromJWT = req.verifiedToken.adminId;

    const adminInfo = await adminProvider.retrieveAdminInfoByAdminId(adminIdFromJWT);

    if (adminInfo == undefined) {
        return res.send(errResponse(AdminBaseResponse.FIND_NO_EXIST_ADMIN));
    }

    const loginData = await adminService.makeJWT(adminInfo);

    return res.send(response(AdminBaseResponse.SUCCESS, loginData));
};

/** 회원 상세조회 API
 * [GET] /admin/user/:userId
 * params : userId
 *
 */
exports.getUser = async function (req, res) {
    const userId = req.params.userId;
    const userResult = await adminProvider.userInfo(userId);
    return res.send(response(AdminBaseResponse.SUCCESS, userResult));
};

/** 회원 탈퇴 API
 * [PATCH] /admin/user/:userId
 * params : userId
 * body : status
 */
exports.deleteUser = async function (req, res) {
    const userId = req.params.userId;
    const status = req.body.status;
    const userStatus = await adminService.patchUserStatus(status, userId);
    return res.send(userStatus);
};

/** 업체 전체 조회 API
 * [GET] /admin/enterprises
 *
 *
 */
exports.getEnterprises = async function (req, res) {
    const jwtStatus = req.verifiedToken.status;
    const jwtEnterpriseId = req.verifiedToken.enterpriseId;
    let enterpriseListResult = 0;
    if (jwtStatus == 0) {
        enterpriseListResult = await adminProvider.retrieveEnterpriseList();
    } else {
        enterpriseListResult = await adminProvider.retrieveAdminEnterpriseList(jwtEnterpriseId);
    }

    return res.send(response(AdminBaseResponse.SUCCESS, enterpriseListResult));
};

/** 업체 상세조회 API
 * [GET] /admin/enterprises/:enterpriseId
 * params : enterpriseId
 *
 */
exports.getEnterprise = async function (req, res) {
    const enterpriseId = req.params.enterpriseId;
    const jwtEnterpriseId = req.verifiedToken.enterpriseId;
    const status = req.verifiedToken.status;
    let enterpriseResult = 0;
    if (enterpriseId != jwtEnterpriseId && status == 1) {
        return res.send(errResponse(AdminBaseResponse.NOT_MATCH_ENTERPRISEID));
    } else {
        enterpriseResult = await adminProvider.enterpriseInfo(enterpriseId);
    }
    return res.send(response(AdminBaseResponse.SUCCESS, enterpriseResult));
};

/** 프로그램 전체 조회 API
 * [GET] /admin/programs
 *
 *
 */
exports.getPrograms = async function (req, res) {
    const enterpriseId = req.params.enterpriseId;

    const programListResult = await adminProvider.retrieveProgramList(enterpriseId);

    return res.send(response(AdminBaseResponse.SUCCESS, programListResult));
};

/** 유저 정보 수정 API
 * [PATCH] /admin/users/:userId
 * body : nickname
 */
exports.patchUser = async function (req, res) {
    const userId = req.params.userId;
    const { nickname } = req.body;
    if (!nickname) {
        return res.send(response(AdminBaseResponse.ADMIN_SIGNUP_NICKNAME_EMPTY));
    }

    const patchUserResponse = await adminService.patchUser(nickname, userId);

    return res.send(patchUserResponse);
};
/** 업체 정보 수정 API
 * [PATCH] /admin/enterprises/:enterpriseId
 * param : enterpriseId
 * body : korName, engName, category, phoneNumber, primeLocation, location, tag, description
 */
exports.patchEnterprise = async function (req, res) {
    const jwtEnterpriseId = req.verifiedToken.enterpriseId;
    const status = req.verifiedToken.status;
    const enterpriseId = req.params.enterpriseId;
    let {
        korName,
        engName,
        category,
        phoneNumber,
        primeLocation,
        location,
        tag,
        description,
        thumbnailURL,
    } = req.body;
    if (!korName) {
        return res.send(response(AdminBaseResponse.ENTERPRISE_PATCH_KORNAME_EMPTY));
    }
    if (!engName) {
        return res.send(response(AdminBaseResponse.ENTERPRISE_PATCH_ENGNAME_EMPTY));
    }
    if (!category) {
        return res.send(response(AdminBaseResponse.ENTERPRISE_PATCH_CATEGORY_EMPTY));
    }
    if (!phoneNumber) {
        return res.send(response(AdminBaseResponse.ENTERPRISE_PATCH_PHONENUMBER_EMPTY));
    }
    if (!primeLocation) {
        return res.send(response(AdminBaseResponse.ENTERPRISE_PATCH_PRIMELOCATION_EMPTY));
    }
    if (!location) {
        return res.send(response(AdminBaseResponse.ENTERPRISE_PATCH_LOCATION_EMPTY));
    }
    if (!tag) {
        return res.send(response(AdminBaseResponse.ENTERPRISE_PATCH_TAG_EMPTY));
    }
    if (!description) {
        return res.send(response(AdminBaseResponse.ENTERPRISE_PATCH_DESCRIPTION_EMPTY));
    }
    if (enterpriseId != jwtEnterpriseId && status == 1) {
        return res.send(errResponse(AdminBaseResponse.NOT_MATCH_ENTERPRISEID));
    }
    const patchEnterpriseResponse = await adminService.patchEnterprise(
        korName,
        engName,
        category,
        primeLocation,
        location,
        tag,
        description,
        phoneNumber,
        thumbnailURL,
        enterpriseId,
    );
    return res.send(patchEnterpriseResponse);
};

/** 업체 삭제 API
 * [PATCH] /admin/enterprises/:enterpriseId/status
 * params : userId
 * body : status
 */
exports.deleteEnterprise = async function (req, res) {
    const jwtStatus = req.verifiedToken.status;
    const enterpriseId = req.params.enterpriseId;
    const status = req.body.status;
    if (jwtStatus != 0) {
        return res.send(response(AdminBaseResponse.ENTERPRISE_DELETE_STATUS));
    }
    const enterpriseStatus = await adminService.patchEnterpriseStatus(status, enterpriseId);
    return res.send(enterpriseStatus);
};

/** 업체 추가 API
 * [POST] /admin/enterprise
 *
 * body : korName, engName, category, primeLocation, location, tag, description, phoneNumber, thumbnailURL
 */
exports.addEnterprise = async function (req, res) {
    const status = req.verifiedToken.status;
    const {
        korName,
        engName,
        category,
        primeLocation,
        location,
        tag,
        description,
        phoneNumber,
        thumbnailURL,
    } = req.body;
    if (!korName) {
        return res.send(response(AdminBaseResponse.ENTERPRISE_POST_KORNAME_EMPTY));
    }
    if (!engName) {
        return res.send(response(AdminBaseResponse.ENTERPRISE_POST_ENGNAME_EMPTY));
    }
    if (!category) {
        return res.send(response(AdminBaseResponse.ENTERPRISE_POST_CATEGORY_EMPTY));
    }
    if (!phoneNumber) {
        return res.send(response(AdminBaseResponse.ENTERPRISE_POST_PHONENUMBER_EMPTY));
    }
    if (!primeLocation) {
        return res.send(response(AdminBaseResponse.ENTERPRISE_POST_PRIMELOCATION_EMPTY));
    }
    if (!location) {
        return res.send(response(AdminBaseResponse.ENTERPRISE_POST_LOCATION_EMPTY));
    }
    if (!tag) {
        return res.send(response(AdminBaseResponse.ENTERPRISE_POST_TAG_EMPTY));
    }
    if (!description) {
        return res.send(response(AdminBaseResponse.ENTERPRISE_POST_DESCRIPTION_EMPTY));
    }
    if (!thumbnailURL) {
        return res.send(response(AdminBaseResponse.ENTERPRISE_POST_IMAGE_EMPTY));
    }
    if (status != 0) {
        return res.send(response(AdminBaseResponse.ENTERPRISE_POST_STATUS));
    }

    const patchEnterpriseResponse = await adminService.addEnterprise(
        korName,
        engName,
        category,
        primeLocation,
        location,
        tag,
        description,
        phoneNumber,
        thumbnailURL,
    );
    return res.send(patchEnterpriseResponse);
};

/** 프로그램 상세 조회 API
 * [GET] /admin/programs/:programId
 *
 * param : programId
 *
 */
exports.getProgram = async function (req, res) {
    const enterpriseId = req.verifiedToken.enterpriseId;
    const status = req.verifiedToken.status;
    const programId = req.params.programId;
    const checkProgram = await adminProvider.checkProgram(programId);
    if (enterpriseId != checkProgram[0].enterpriseId && status == 1) {
        return res.send(response(AdminBaseResponse.NOT_MATCH_ENTERPRISEID));
    }
    const programInfo = await adminProvider.retrieveProgram(programId);
    const programRoomInfo = await adminProvider.retrieveProgramRoom(programId);
    const result = {
        programResult: programInfo,
        programRoomResult: programRoomInfo,
    };
    return res.send(response(AdminBaseResponse.SUCCESS, result));
};

/** 프로그램 삭제 API
 * [PATCH] /admin/program/:programId/status
 * params : programId
 * body : status
 */
exports.deleteProgram = async function (req, res) {
    const enterpriseId = req.verifiedToken.enterpriseId;
    const jwtStatus = req.verifiedToken.status;
    const programId = req.params.programId;
    const status = req.body.status;
    const checkProgram = await adminProvider.checkProgram(programId);
    if (enterpriseId != checkProgram[0].enterpriseId && jwtStatus == 1) {
        return res.send(response(AdminBaseResponse.NOT_MATCH_ENTERPRISEID));
    }
    const programStatus = await adminService.patchProgramStatus(status, programId);
    return res.send(programStatus);
};

/** 프로그램 정보 수정 API
 * [PATCH] /admin/program/:programId
 * param : programId
 * body : name, description, tag, checkIn, checkOut, programInfo, mealInfo, thumbnailURL
 */
exports.patchProgram = async function (req, res) {
    const enterpriseId = req.verifiedToken.enterpriseId;
    const jwtStatus = req.verifiedToken.status;
    const programId = req.params.programId;
    let { name, description, tag, thumbnailURL, checkIn, checkOut, programInfo, mealInfo } =
        req.body;
    if (!name) {
        return res.send(response(AdminBaseResponse.ENTERPRISE_PATCH_KORNAME_EMPTY));
    }
    if (!description) {
        return res.send(response(AdminBaseResponse.ENTERPRISE_PATCH_ENGNAME_EMPTY));
    }
    if (!tag) {
        return res.send(response(AdminBaseResponse.ENTERPRISE_PATCH_CATEGORY_EMPTY));
    }
    if (!checkIn) {
        return res.send(response(AdminBaseResponse.ENTERPRISE_PATCH_PHONENUMBER_EMPTY));
    }
    if (!checkOut) {
        return res.send(response(AdminBaseResponse.ENTERPRISE_PATCH_PRIMELOCATION_EMPTY));
    }
    if (!programInfo) {
        return res.send(response(AdminBaseResponse.ENTERPRISE_PATCH_LOCATION_EMPTY));
    }
    if (!mealInfo) {
        return res.send(response(AdminBaseResponse.ENTERPRISE_PATCH_TAG_EMPTY));
    }
    if (!thumbnailURL) {
        return res.send(response(AdminBaseResponse.ENTERPRISE_PATCH_DESCRIPTION_EMPTY));
    }
    const checkProgram = await adminProvider.checkProgram(programId);
    if (enterpriseId != checkProgram[0].enterpriseId && jwtStatus == 1) {
        return res.send(response(AdminBaseResponse.NOT_MATCH_ENTERPRISEID));
    }

    const patchProgramResponse = await adminService.patchProgram(
        name,
        description,
        tag,
        thumbnailURL,
        checkIn,
        checkOut,
        programInfo,
        mealInfo,
        programId,
    );
    return res.send(patchProgramResponse);
};

/** 프로그램 가격 추가 API
 * [POST] /admin/program/:programId/price
 *
 * body : inRoom, price
 */
exports.addRoomPrice = async function (req, res) {
    const { programId, inRoom, price } = req.body;
    if (!inRoom) {
        return res.send(response(AdminBaseResponse.ROOMPRICE_POST_INROOM_EMPTY));
    }
    if (!price) {
        return res.send(response(AdminBaseResponse.ROOMPRICE_POST_PRICE_EMPTY));
    }
    const postRoomPriceResponse = await adminService.addRoomPrice(programId, inRoom, price);
    console.log(postRoomPriceResponse);
    return res.send(postRoomPriceResponse);
};

/** 프로그램 가격 추가 API
 * [PATCH] /admin/program/programRoomPrice/:programRoomPriceId
 *
 * body : inRoom, price
 * params : programRoomPriceId
 */
exports.patchRoomPrice = async function (req, res) {
    const { inRoom, price } = req.body;
    const programRoomPriceId = req.params.programRoomPriceId;
    const patchRoomPriceResponse = await adminService.patchRoomPrice(
        inRoom,
        price,
        programRoomPriceId,
    );
    return res.send(patchRoomPriceResponse);
};

/** 프로그램 가격 조회 API
 * [GET] /admin/program/programRoomPrice/:programRoomPriceId
 *
 * params : programRoomPriceId
 */
exports.getRoomPrice = async function (req, res) {
    const programRoomPriceId = req.params.programRoomPriceId;
    const getRoomPriceResponse = await adminProvider.getRoomPrice(programRoomPriceId);
    return res.send(response(AdminBaseResponse.SUCCESS, getRoomPriceResponse));
};

/** 가격정보 삭제 API
 * [PATCH] /admin/program/programRoomPrice/:programRoomPriceId/status
 * params : programRoomPriceId
 * body : status
 */
exports.deleteRoomPrice = async function (req, res) {
    const programRoomPriceId = req.params.programRoomPriceId;
    const status = req.body.status;
    const programRoomPriceStatus = await adminService.patchProgramRoomPriceStatus(
        status,
        programRoomPriceId,
    );
    return res.send(programRoomPriceStatus);
};

/** 프로그램 추가 API
 * [POST] /admin/enterprise/:enterpriseId/program
 *
 * body : enterpriseId, name, description, tag, thumbnailURL, checkIn, checkOut, programInfo, mealInfo
 */
exports.addProgram = async function (req, res) {
    const {
        enterpriseId,
        name,
        description,
        tag,
        thumbnailURL,
        checkIn,
        checkOut,
        programInfo,
        mealInfo,
        roomPrice,
    } = req.body;
    const jwtStatus = req.verifiedToken.status;
    const jwtEnterpriseId = req.params.enterpriseId;
    if (enterpriseId != jwtEnterpriseId && jwtStatus == 1) {
        return res.send(response(AdminBaseResponse.NOT_MATCH_ENTERPRISEID));
    }
    if (!name) {
        return res.send(response(AdminBaseResponse.PROGRAM_POST_NAME_EMPTY));
    }
    if (!checkIn) {
        return res.send(response(AdminBaseResponse.PROGRAM_POST_CHECKIN_EMPTY));
    }
    if (!checkOut) {
        return res.send(response(AdminBaseResponse.PROGRAM_POST_CHECKOUT_EMPTY));
    }
    if (!programInfo) {
        return res.send(response(AdminBaseResponse.PROGRAM_POST_PROGRAMINFO_EMPTY));
    }
    if (!mealInfo) {
        return res.send(response(AdminBaseResponse.PROGRAM_POST_MEALINFO_EMPTY));
    }
    if (!tag) {
        return res.send(response(AdminBaseResponse.PROGRAM_POST_TAG_EMPTY));
    }
    if (!description) {
        return res.send(response(AdminBaseResponse.PROGRAM_POST_DESCRIPTION_EMPTY));
    }
    if (!thumbnailURL) {
        return res.send(response(AdminBaseResponse.PROGRAM_POST_THUMBNAILURL_EMPTY));
    }
    if (!roomPrice) {
        return res.send(response(AdminBaseResponse.PROGRAM_POST_ROOMPRICE_EMPTY));
    }

    const postProgramResponse = await adminService.addProgram(
        enterpriseId,
        name,
        description,
        tag,
        thumbnailURL,
        checkIn,
        checkOut,
        programInfo,
        mealInfo,
        roomPrice,
    );
    return res.send(postProgramResponse);
};

/** 예약 리스트 조회 API
 * [GET] /admin/enterprise/:enterpriseId/reservations
 *
 * params : enterpriseId
 */
exports.getReservations = async function (req, res) {
    const enterpriseId = req.params.enterpriseId;
    const getReservationsResponse = await adminProvider.getReservations(enterpriseId);
    return res.send(response(AdminBaseResponse.SUCCESS, getReservationsResponse));
};

/** 예약 상세 조회 API
 * [GET] /admin/reservations/:reservationId
 *
 * params : reservationId
 */
exports.getReservation = async function (req, res) {
    const reservationId = req.params.reservationId;
    const getReservationResponse = await adminProvider.getReservation(reservationId);
    return res.send(response(AdminBaseResponse.SUCCESS, getReservationResponse));
};

/** 예약 취소 API
 * [PATCH] /admin/reservations/:reservationId/status-out
 * params : reservationId
 * body : status
 */
exports.cancleReservation = async function (req, res) {
    const reservationId = req.params.reservationId;
    const status = req.body.status;
    const cancleReservation = await adminService.cancleReservation(status, reservationId);
    return res.send(cancleReservation);
};

/** 예약 승인 API
 * [PATCH] /admin/reservations/:reservationId/status-in
 * params : reservationId
 * body : status
 */
exports.registReservation = async function (req, res) {
    const reservationId = req.params.reservationId;
    const status = req.body.status;
    const registReservation = await adminService.registReservation(status, reservationId);
    return res.send(registReservation);
};

/** 프로그램 이미지 조회 API
 * [GET] /admin/reservations/:reservationId
 *
 * params : programId
 */
exports.getProgramImages = async function (req, res) {
    const programId = req.params.programId;
    const getProgramImagesResponse = await adminProvider.getProgramImages(programId);
    return res.send(response(AdminBaseResponse.SUCCESS, getProgramImagesResponse));
};

/** 프로그램 가격 추가 API
 * [PATCH] /admin/program/programRoomPrice/:programRoomPriceId
 *
 * body : images
 * params : programId
 */
exports.addProgramImages = async function (req, res) {
    const { images } = req.body;
    const programId = req.params.programId;
    const response = [];
    for (let i = 0; i < images.length; i++) {
        const addProgramImagesResponse = await adminService.addProgramImages(programId, images[i]);
        response.push(addProgramImagesResponse);
    }
    return res.send(response[0]);
};

/** 가격정보 삭제 API
 * [PATCH] /admin/program/programRoomPrice/:programRoomPriceId/status
 * params : programRoomPriceId
 * body : status
 */
exports.patchProgramImages = async function (req, res) {
    const programImageId = req.params.programImageId;
    const programImageStatus = await adminService.patchProgramImageStatus(programImageId);
    return res.send(programImageStatus);
};

/** 프로그램 정보 조회 API
 * [GET] /admin/program/:programId/programInfo
 *
 * params : programId
 * body : date
 */
exports.getProgramInfo = async function (req, res) {
    const programId = req.params.programId;
    const { date } = req.query;
    const getProgramInfoResponse = await adminProvider.getProgramInfo(programId, date);
    return res.send(response(AdminBaseResponse.SUCCESS, getProgramInfoResponse[0]));
};

/** 프로그램 정보 수정 API
 * [PATCH] /admin/programInfo/:programInfoId/programInfo
 *
 * params : programInfoId
 * body : content
 */
exports.patchProgramInfo = async function (req, res) {
    const programInfoId = req.params.programInfoId;
    const { content } = req.body;
    if (!content) {
        return res.send(response(AdminBaseResponse.PROGRAMINFO_PATCH_PROGRAMINFO_EMPTY));
    }
    const patchProgramInfoResponse = await adminService.patchProgramInfo(content, programInfoId);
    return res.send(patchProgramInfoResponse);
};

/** 프로그램 정보 추가 API
 * [POST] /admin/program/:programId/programInfo
 *
 * params : programId
 * body : programId, content
 */
exports.postProgramInfo = async function (req, res) {
    const programId = req.params.programId;
    const { content, date } = req.body;
    if (!content) {
        return res.send(response(AdminBaseResponse.PROGRAMINFO_PATCH_PROGRAMINFO_EMPTY));
    }
    const postProgramInfoResponse = await adminService.postProgramInfo(programId, content, date);
    return res.send(postProgramInfoResponse);
};

/** 식단 정보 조회 API
 * [GET] /admin/program/:programId/mealInfo
 *
 * params : programId
 * body : date
 */
exports.getMealInfo = async function (req, res) {
    const programId = req.params.programId;
    const { date } = req.query;
    const getMealInfoResponse = await adminProvider.getMealInfo(programId, date);
    return res.send(response(AdminBaseResponse.SUCCESS, getMealInfoResponse[0]));
};

/** 식단 정보 수정 API
 * [PATCH] /admin/mealInfo/:mealInfoId/mealInfo
 *
 * params : mealInfoId
 * body : content
 */
exports.patchMealInfo = async function (req, res) {
    const mealInfoId = req.params.mealInfoId;
    const { content } = req.body;
    if (!content) {
        return res.send(response(AdminBaseResponse.PROGRAMINFO_PATCH_MEALINFO_EMPTY));
    }
    const patchMealInfoResponse = await adminService.patchMealInfo(content, mealInfoId);
    return res.send(patchMealInfoResponse);
};

/** 식단 정보 추가 API
 * [POST] /admin/program/:programId/mealInfo
 *
 * params : programId
 * body : programId, content
 */
exports.postMealInfo = async function (req, res) {
    const programId = req.params.programId;
    const { content, date } = req.body;
    if (!content) {
        return res.send(response(AdminBaseResponse.PROGRAMINFO_PATCH_MEALINFO_EMPTY));
    }
    const postMealInfoResponse = await adminService.postMealInfo(programId, content, date);
    return res.send(postMealInfoResponse);
};
