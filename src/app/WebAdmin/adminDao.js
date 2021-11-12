const { pool } = require('../../../config/database');

// admin 회원가입 email check
async function emailCheck(connection, email) {
    const query = `
        SELECT email
        FROM Admin
        where email = ?;
    `;
    const [emailRows] = await connection.query(query, email);
    return emailRows;
}

// admin 회원가입 nickname check
async function checkAdminNickname(connection, nickname) {
    const query = `
        SELECT nickname
        FROM Admin
        WHERE nickname = ?;
    `;
    const [nicknameRows] = await connection.query(query, nickname);
    return nicknameRows;
}

// admin 회원가입
async function insertAdminInfo(connection, insertAdminInfoParams) {
    const query = `
    INSERT INTO Admin(email,
        password,
        nickname,
        phoneNumber)
      VALUES (?, ?, ?, ?);
    `;
    const [insertRows] = await connection.query(query, insertAdminInfoParams);
    return insertRows;
}

// admin 로그인 email 존재여부 체크
async function selectEmail(connection, email) {
    const selectIdQuery = `
            SELECT email 
            FROM Admin
            WHERE email = ?;
            `;
    const [emailRows] = await connection.query(selectIdQuery, email);
    return emailRows;
}

// admin 로그인 password 맞는지 체크
async function selectAdminPassword(connection, selectAdminPasswordParams) {
    const selectAdminPasswordQuery = `
        SELECT email, nickname, password
        FROM Admin
        WHERE email = ?;`;
    const selectAdminPasswordRow = await connection.query(
        selectAdminPasswordQuery,
        selectAdminPasswordParams,
    );
    return selectAdminPasswordRow;
}
// admin 계정 상태 체크 (jwt 생성 위해 id 값도 가져온다.)
async function selectAdminAccount(connection, email) {
    const selectAdminAccountQuery = `
        SELECT adminId, nickname
        FROM Admin 
        WHERE email = ?;`;
    const selectAdminAccountRow = await connection.query(selectAdminAccountQuery, email);
    return selectAdminAccountRow[0];
}

// admin 정보 가져오기
async function selectAdminByAdminId(connection, adminId) {
    const selectAdminByAdminIdQuery = `
        SELECT adminId, nickname, phoneNumber
        FROM Admin
        WHERE adminId = ?;`;
    const [selectAdminByAdminIdRows] = await connection.query(selectAdminByAdminIdQuery, adminId);
    return selectAdminByAdminIdRows;
}

// 유저 정보 가져오기
async function retrieveUserList(connection, adminIdFromJWT) {
    const retrieveUserListQuery = `
        select userId, nickname, email, createdAt, status
        from UserInfo;`;
    const [retrieveUserListRows] = await connection.query(retrieveUserListQuery, adminIdFromJWT);
    return retrieveUserListRows;
}

// 유저 상세정보 가져오기
async function userInfo(connection, userId) {
    const UserInfoQuery = `
        select userId, email, name, nickname, gender, birthday, phoneNumber, isPermitAlarm, appVersion, createdAt, status
        from UserInfo
        where userId = ?;`;
    const [UserInfoRows] = await connection.query(UserInfoQuery, userId);
    return UserInfoRows;
}

// 회원 탈퇴
async function changeUserStatus(connection, status, userId) {
    const changeUserStatusQuery = `
        Update UserInfo
        set status = ?
        where userId = ?;`;
    const [changeUserStatusRows] = await connection.query(changeUserStatusQuery, [status, userId]);
    return changeUserStatusRows;
}

// 업체 정보 가져오기
async function retrieveEnterpriseList(connection) {
    const retrieveEnterpriseListQuery = `
        select enterpriseId, korName, engName, primeLocation, status
        from Enterprise`;
    const [retrieveEnterpriseListRows] = await connection.query(retrieveEnterpriseListQuery);
    return retrieveEnterpriseListRows;
}

module.exports = {
    emailCheck,
    checkAdminNickname,
    insertAdminInfo,
    selectEmail,
    selectAdminPassword,
    selectAdminAccount,
    selectAdminByAdminId,
    retrieveUserList,
    userInfo,
    changeUserStatus,
    retrieveEnterpriseList,
};
