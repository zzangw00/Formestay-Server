const {pool} = require("../../../config/database");

// 유저 snsId 체크
async function isExistUserBySNSId(connection, snsId) {
    const isExistUserBySNSIdQuery = `
        SELECT COUNT(*) as CNT
        FROM UserInfo
        WHERE snsId = ? and status = "ACTIVE";
    `;
    const [isExistUserBySNSIdRows] = await connection.query(isExistUserBySNSIdQuery, snsId);
    return isExistUserBySNSIdRows;
}

// 유저 핸드폰 번호 존재 체크
async function isExistUserByPhoneNumber(connection, phoneNumber) {
    const isExistUserByPhoneNumberQuery = `
        SELECT COUNT(*) as CNT, snsId
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
        INSERT INTO UserInfo(name, nickname, gender, birthday, phoneNumber, email, password, salt, isPermitAlarm, snsId, profileImgURL)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
    `;
    const insertUserInfoRow = await connection.query(
        insertUserInfoQuery,
        insertUserInfoParams
    );

    return insertUserInfoRow;
}

// 이메일 찾기
async function selectUsersEmailByPhoneNumber(connection, phoneNumber) {
    const selectUsersEmailByPhoneNumberQuery = `
        SELECT email, date_format(createdAt, "%Y-%m-%d") as createdAt
        FROM UserInfo
        WHERE phoneNumber = ? and snsId = 0 and status = "ACTIVE";
    `;

    const [selectUsersEmailByPhoneNumberRows] = await connection.query(selectUsersEmailByPhoneNumberQuery, phoneNumber);
    return selectUsersEmailByPhoneNumberRows;
}

// 유저 아이디 찾기 찾기
async function selectUserIdByPhoneNumber(connection, phoneNumber) {
    const selectUserIdByPhoneNumberQuery = `
        SELECT userId
        FROM UserInfo
        WHERE phoneNumber = ? and snsId = 0 and status = "ACTIVE";
    `;

    const [selectUserIdByPhoneNumberRows] = await connection.query(selectUserIdByPhoneNumberQuery, phoneNumber);
    return selectUserIdByPhoneNumberRows;
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

async function SelectUserByUserId(connection, userId) {
    const SelectUserByUserIdQuery = `
        SELECT userId, name, nickname, phoneNumber
        FROM UserInfo
        WHERE userId = ? and status = "ACTIVE";`;
    const [SelectUserByUserIdRows] = await connection.query(SelectUserByUserIdQuery, userId);
    return SelectUserByUserIdRows;
}

async function updateUsersPassword(connection, userId, password, salt) {
    const updateUsersPasswordQuery = `
        UPDATE UserInfo
        SET password = ?, salt = ?
        WHERE userId = ? and status = "ACTIVE";`;

    await connection.query(updateUsersPasswordQuery, [password, salt, userId]);
}


async function updateUserInfo(connection, userIdx, nickname) {
    const updateUserQuery = `
        UPDATE UserInfo
        SET nickname = ?
        WHERE userIdx = ?;`;
    const updateUserRow = await connection.query(updateUserQuery, [nickname, userIdx]);
    return updateUserRow[0];
}

async function updateUserStatus(connection, userId) {
    const updateUserStatusQuery = `
        UPDATE UserInfo
        SET status = "INACTIVE"
        WHERE userId = ?;`;
    const updateUserStatusRow = await connection.query(updateUserStatusQuery, userId);
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

async function selectAppVersion(connection) {
    const selectAppVersionQuery = `
        SELECT version
        FROM AppVersion;
    `;
    const [selectAppVersionRows] = await connection.query(selectAppVersionQuery);
    return selectAppVersionRows[0];
}

async function selectMyPage(connection, userId) {
    const selectMyPageQuery = `
        SELECT userId, phoneNumber, email, profileImgURL
        FROM UserInfo
        WHERE userId = ? and status = "ACTIVE";
    `;
    const [selectMyPageRows] = await connection.query(selectMyPageQuery, userId);
    return selectMyPageRows[0];
}

async function updateUserProfileImage(connection, userId, profileImgURL) {
    const updateUserProfileImageQuery = `
        UPDATE UserInfo
        SET profileImgURL = ?
        WHERE userId = ?;`;
    const updateUserProfileImageRows = await connection.query(updateUserProfileImageQuery, [profileImgURL, userId]);
}

module.exports = {
    isExistUserByPhoneNumber,
    isExistUserByEmail,
    isExistUserBySNSId,
    selectUserInfoBySocialId,
    selectUserId,
    selectUserNickname,
    SelectUserByUserId,
    insertUserInfo,
    insertUserSalt,
    insertUserLevel,
    selectUsersEmailByPhoneNumber,
    selectUserIdByPhoneNumber,
    selectUserPassword,
    selectUserAccount,
    selectUserInfoByEmail,
    updateUsersPassword,
    updateUserInfo,
    updateUserStatus,
    selectUserHashedPasswordAndSalt,
    selectAppVersion,
    selectMyPage,
    updateUserProfileImage
};
