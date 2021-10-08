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

module.exports = {
    selectUser,
    selectUserEmail
};
