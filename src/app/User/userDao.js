const {pool} = require("../../../config/database");

// 모든 유저 조회
async function selectUser(connection) {
    const selectUserListQuery = `
        SELECT email, nickname
        FROM UserInfo;
    `;
    const [userRows] = await connection.query(selectUserListQuery);
    return userRows;
}

// 유저 핸드폰 번호 존재 체크
async function isExistUserByPhoneNumber(connection, phoneNumber) {
    const isExistUserByPhoneNumberQuery = `
        SELECT COUNT(*) as CNT
        FROM UserInfo
        WHERE phoneNumber = ? and status = "ACTIVE";
    `;
    const [isExistUserByPhoneNumberRows] = await connection.query(isExistUserByPhoneNumberQuery, phoneNumber);
    return isExistUserByPhoneNumberRows;
}

// 유저 이메일 존재 체크
async function isExistUserByEmail(connection, email) {
    const isExistUserByEmailQuery = `
        SELECT COUNT(*) as CNT
        FROM UserInfo
        WHERE email = ? and status = "ACTIVE";
    `;
    const [isExistUserByEmailRows] = await connection.query(isExistUserByEmailQuery, email);
    return isExistUserByEmailRows;
}

// 이메일로 회원 조회
async function selectUserEmail(connection, email) {
    const selectUserEmailQuery = `
        SELECT userIdx, email, nickname
        FROM UserInfo
        WHERE email = ?;
    `;
    const [emailRows] = await connection.query(selectUserEmailQuery, email);
    return emailRows;
}

// userId 회원 조회
async function selectUserId(connection, userIdx) {
    const selectUserIdQuery = `
        SELECT userIdx, email, nickname
        FROM UserInfo
        WHERE userIdx = ?;
    `;
    const [userRow] = await connection.query(selectUserIdQuery, userIdx);
    return userRow;
}

// 닉네임 체크
async function selectUserNickname(connection, nickname) {
    const selectNicknameQuery = `
        SELECT email, nickname
        FROM UserInfo
        WHERE nickname = ?;
    `;
    const [nicknameRows] = await connection.query(selectNicknameQuery, nickname);
    return nicknameRows;
}

// 유저 생성
async function insertUserInfo(connection, insertUserInfoParams) {
    const insertUserInfoQuery = `
        INSERT INTO UserInfo(name, nickname, gender, birthday, phoneNumber, email, password, salt, isPermitAlarm)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);
    `;
    const insertUserInfoRow = await connection.query(
        insertUserInfoQuery,
        insertUserInfoParams
    );

    return insertUserInfoRow;
}

// SNS 유저 생성
async function insertSNSUserInfo(connection, insertSNSUserInfoParams) {
    const insertSNSUserInfoQuery = `
        INSERT INTO UserInfo(name, nickname, gender, birthday, phoneNumber, email, password, salt, isPermitAlarm, snsId, profileImgURL)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
    `;
    const insertSNSUserInfoRow = await connection.query(
        insertSNSUserInfoQuery,
        insertSNSUserInfoParams
    );

    return insertSNSUserInfoRow;
}

// UserSalt 테이블 컬럼 추가
async function insertUserSalt(connection, insertUserSaltParams) {
    const insertUserSaltQuery = `
        INSERT INTO UserSalt(userIdx, salt)
        VALUES (?, ?);
    `;
    const insertUserSaltRow = await connection.query(
        insertUserSaltQuery,
        insertUserSaltParams
    );

    return insertUserSaltRow;
}

// 유저 레벨 생성
async function insertUserLevel(connection, userIdx) {
    const insertUserLevelQuery = `
        INSERT INTO Level (userIdx, level)
        VALUES (?, 1);
    `;
    const insertUserLevelRow = await connection.query(
        insertUserLevelQuery,
        userIdx
    );

    return insertUserLevelRow;
}

// 패스워드 체크
async function selectUserPassword(connection, selectUserPasswordParams) {
    const selectUserPasswordQuery = `
        SELECT email, nickname, password
        FROM UserInfo
        WHERE email = ?
          AND password = ?;`;
    const selectUserPasswordRow = await connection.query(
        selectUserPasswordQuery,
        selectUserPasswordParams
    );

    return selectUserPasswordRow;
}

// 유저 계정 상태 체크
async function selectUserAccount(connection, email) {
    const selectUserAccountQuery = `
        SELECT status, userIdx
        FROM UserInfo
        WHERE email = ?;`;
    const selectUserAccountRow = await connection.query(
        selectUserAccountQuery,
        email
    );
    return selectUserAccountRow[0];
}

async function selectUserInfoByEmail(connection, email) {
    const selectUserQuery = `
        SELECT userId, name, nickname, phoneNumber, password, salt
        FROM UserInfo
        WHERE email = ? and status = "ACTIVE";`;
    const selectUserRow = await connection.query(selectUserQuery, email);
    return selectUserRow[0];
}

async function selectUserInfoBySocialId(connection, kakaoId) {
    const selectUserInfoBySocialIdQuery = `
        SELECT userId, name, nickname, phoneNumber
        FROM UserInfo
        WHERE snsId = ? and status = "ACTIVE";`;
    const selectUserInfoBySocialIdRows = await connection.query(selectUserInfoBySocialIdQuery, kakaoId);
    return selectUserInfoBySocialIdRows[0];
}

async function updateUserInfo(connection, userIdx, nickname) {
    const updateUserQuery = `
        UPDATE UserInfo
        SET nickname = ?
        WHERE userIdx = ?;`;
    const updateUserRow = await connection.query(updateUserQuery, [nickname, userIdx]);
    return updateUserRow[0];
}

async function updateUserStatus(connection, userIdx, status) {
    const updateUserStatusQuery = `
        UPDATE UserInfo
        SET status = ?
        WHERE userIdx = ?;`;
    const updateUserStatusRow = await connection.query(updateUserStatusQuery, [
        status,
        userIdx,
    ]);
    return updateUserStatusRow[0];
}

async function selectUserHashedPasswordAndSalt(connection, userIdx) {
    const selectUserHashedPasswordAndSaltQuery = `
        SELECT UI.password hashedPassword, US.salt
        FROM UserInfo UI
                 INNER JOIN UserSalt US on UI.userIdx = US.userIdx
        WHERE UI.userIdx = ?
          AND UI.status = 'ACTIVE'
          AND US.status = 'ACTIVE';
    `;
    const [userSecurityRow] = await connection.query(selectUserHashedPasswordAndSaltQuery, userIdx);
    return userSecurityRow;
}


module.exports = {
    selectUser,
    isExistUserByPhoneNumber,
    isExistUserByEmail,
    selectUserEmail,
    selectUserInfoBySocialId,
    selectUserId,
    selectUserNickname,
    insertUserInfo,
    insertSNSUserInfo,
    insertUserSalt,
    insertUserLevel,
    selectUserPassword,
    selectUserAccount,
    selectUserInfoByEmail,
    updateUserInfo,
    updateUserStatus,
    selectUserHashedPasswordAndSalt,
};
