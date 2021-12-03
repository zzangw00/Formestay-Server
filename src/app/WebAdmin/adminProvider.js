const { pool } = require('../../../config/database');
const { logger } = require('../../../config/winston');

const adminDao = require('./adminDao');

// admin 회원가입 email 중복체크
exports.emailCheck = async function (email) {
    const connection = await pool.getConnection(async (conn) => conn);
    const adminEmailResult = await adminDao.checkAdminEmail(connection, email);
    connection.release();

    return adminEmailResult;
};

// admin 회원가입 nickname 중복체크
exports.nicknameCheck = async function (nickname) {
    const connection = await pool.getConnection(async (conn) => conn);
    const adminNicknameResult = await adminDao.checkAdminNickname(connection, nickname);
    connection.release();

    return adminNicknameResult;
};

// admin 회원가입 phoneNumber 중복체크
exports.phoneNumberCheck = async function (phoneNumber) {
    const connection = await pool.getConnection(async (conn) => conn);
    const adminPhoneNumberResult = await adminDao.checkAdminPhoneNumber(connection, phoneNumber);
    connection.release();

    return adminPhoneNumberResult;
};

// admin 로그인 email존재여부 체크
exports.emailCheck = async function (email) {
    const connection = await pool.getConnection(async (conn) => conn);
    const emailCheckResult = await adminDao.selectEmail(connection, email);
    connection.release();

    return emailCheckResult;
};

// admin 로그인 password 맞는지 확인
exports.passwordCheck = async function (selectAdminPasswordParams) {
    const connection = await pool.getConnection(async (conn) => conn);
    const passwordCheckResult = await adminDao.selectAdminPassword(
        connection,
        selectAdminPasswordParams,
    );
    connection.release();
    return passwordCheckResult[0];
};

// admin 계정상태 체크
exports.accountCheck = async function (email) {
    const connection = await pool.getConnection(async (conn) => conn);
    const adminAccountResult = await adminDao.selectAdminAccount(connection, email);
    connection.release();

    return adminAccountResult;
};

// admin 정보 가져오기
exports.retrieveAdminInfoByAdminId = async function (adminId) {
    const connection = await pool.getConnection(async (conn) => conn);
    const result = await adminDao.selectAdminByAdminId(connection, adminId);

    connection.release();

    return result[0];
};

// 유저 정보 가져오기
exports.retrieveUserList = async function (adminIdFromJWT) {
    const connection = await pool.getConnection(async (conn) => conn);
    const userListResult = await adminDao.retrieveUserList(connection, adminIdFromJWT);
    connection.release();

    return userListResult;
};

// 유저 상세정보 가져오기
exports.userInfo = async function (userId) {
    const connection = await pool.getConnection(async (conn) => conn);
    const userResult = await adminDao.userInfo(connection, userId);
    connection.release();

    return userResult;
};

// 업체 정보 가져오기
exports.retrieveEnterpriseList = async function () {
    const connection = await pool.getConnection(async (conn) => conn);
    const enterprisesListResult = await adminDao.retrieveEnterpriseList(connection);
    connection.release();

    return enterprisesListResult;
};

// 업체 상세정보 가져오기
exports.enterpriseInfo = async function (enterpriseId) {
    const connection = await pool.getConnection(async (conn) => conn);
    const enterpriseResult = await adminDao.enterpriseInfo(connection, enterpriseId);
    connection.release();

    return enterpriseResult;
};

// 업체 정보 가져오기
exports.retrieveProgramList = async function (enterpriseId) {
    const connection = await pool.getConnection(async (conn) => conn);
    const programsListResult = await adminDao.retrieveProgramsList(connection, enterpriseId);
    connection.release();
    return programsListResult;
};

// 유저가 기존의 자기와 같은 닉네임으로 바꾸는지 체크
exports.checkNickname = async function (userId) {
    const connection = await pool.getConnection(async (conn) => conn);
    const nicknameResult = await adminDao.nicknameCheck(connection, userId);
    connection.release();
    return nicknameResult;
};

// 닉네임 중복 체크
exports.overlapNickname = async function (nickname) {
    const connection = await pool.getConnection(async (conn) => conn);
    const overlapResult = await adminDao.nicknameOverlap(connection, nickname);
    connection.release();
    return overlapResult;
};

// 기존의 자기와 같은 한글 이름으로 바꾸는지 체크
exports.checkKorName = async function (enterpriseId) {
    const connection = await pool.getConnection(async (conn) => conn);
    const korNameResult = await adminDao.korNameCheck(connection, enterpriseId);
    connection.release();
    return korNameResult;
};

// 기존의 자기와 같은 영어 이름으로 바꾸는지 체크
exports.checkEngName = async function (enterpriseId) {
    const connection = await pool.getConnection(async (conn) => conn);
    const engNameResult = await adminDao.engNameCheck(connection, enterpriseId);
    connection.release();
    return engNameResult;
};

// 한글 이름 중복 체크
exports.overlapKorName = async function (korName) {
    const connection = await pool.getConnection(async (conn) => conn);
    const overlapResult = await adminDao.korNameOverlap(connection, korName);
    connection.release();
    return overlapResult;
};

// 영어 이름 중복 체크
exports.overlapEngName = async function (engName) {
    const connection = await pool.getConnection(async (conn) => conn);
    const overlapResult = await adminDao.engNameOverlap(connection, engName);
    connection.release();
    return overlapResult;
};

// 프로그램 상세 정보 조회
exports.retrieveProgram = async function (programId) {
    const connection = await pool.getConnection(async (conn) => conn);
    const programResult = await adminDao.getProgram(connection, programId);
    connection.release();
    return programResult;
};

// 프로그램 방 가격 정보 상세 정보 조회
exports.retrieveProgramRoom = async function (programId) {
    const connection = await pool.getConnection(async (conn) => conn);
    const programRoomResult = await adminDao.getProgramRoom(connection, programId);
    connection.release();
    return programRoomResult;
};

// 가격 상세 조회
exports.getRoomPrice = async function (programRoomPriceId) {
    const connection = await pool.getConnection(async (conn) => conn);
    const programRoomResult = await adminDao.getRoomPrice(connection, programRoomPriceId);
    connection.release();
    return programRoomResult;
};

// 예약 리스트 조회
exports.getReservations = async function (enterpriseId) {
    const connection = await pool.getConnection(async (conn) => conn);
    const reservationsResult = await adminDao.getReservations(connection, enterpriseId);
    connection.release();
    return reservationsResult;
};

// 예약 상세 조회
exports.getReservation = async function (reservationId) {
    const connection = await pool.getConnection(async (conn) => conn);
    const reservationResult = await adminDao.getReservation(connection, reservationId);
    connection.release();
    return reservationResult;
};
