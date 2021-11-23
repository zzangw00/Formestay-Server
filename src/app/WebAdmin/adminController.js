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

/** 관리자 회원가입 API
 * [POST] /admin
 * body : email, password, nickname, phoneNumber
 */
exports.postAdmin = async function (req, res) {
    const { email, password, nickname, phoneNumber } = req.body;
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
    const signUpResponse = await adminService.createAdmin(email, password, nickname, phoneNumber);

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
    const enterpriseListResult = await adminProvider.retrieveEnterpriseList();
    return res.send(response(AdminBaseResponse.SUCCESS, enterpriseListResult));
};

/** 업체 상세조회 API
 * [GET] /admin/enterprises/:enterpriseId
 * params : enterpriseId
 *
 */
exports.getEnterprise = async function (req, res) {
    const enterpriseId = req.params.enterpriseId;
    const enterpriseResult = await adminProvider.enterpriseInfo(enterpriseId);
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
    const enterpriseId = req.params.enterpriseId;
    const status = req.body.status;
    const enterpriseStatus = await adminService.patchEnterpriseStatus(status, enterpriseId);
    return res.send(enterpriseStatus);
};

/** 업체 추가 API
 * [POST] /admin/enterprise
 *
 * body : korName, engName, category, primeLocation, location, tag, description, phoneNumber, thumbnailURL
 */
exports.addEnterprise = async function (req, res) {
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
    const programId = req.params.programId;
    const programResult = await adminProvider.retrieveProgram(programId);
    return res.send(response(AdminBaseResponse.SUCCESS, programResult));
};

/** 프로그램 삭제 API
 * [PATCH] /admin/program/:programId/status
 * params : programId
 * body : status
 */
exports.deleteProgram = async function (req, res) {
    const programId = req.params.programId;
    const status = req.body.status;
    const programStatus = await adminService.patchProgramStatus(status, programId);
    return res.send(programStatus);
};
