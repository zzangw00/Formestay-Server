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
async function nicknameCheck(connection, nickname) {
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
module.exports = {
    emailCheck,
    nicknameCheck,
    insertAdminInfo,
};
