const {pool} = require("../../../config/database");

// 프로그램 상세 조회
async function selectProgramsById(connection, programId) {
    const selectProgramsByIdQuery = `
        select programId, name, location, phoneNumber, maxPerson, minPerson, personPerMoney, dayPerMoney, programInfo, mealInfo, thumbnailURL as imageList, tag
        from Program left join (select enterpriseId, location, phoneNumber
                                from Enterprise
                                where status = "ACTIVE") as ENINFO on Program.enterpriseId = ENINFO.enterpriseId
        where programId = ? and status = "ACTIVE";
    `;
    const [selectProgramsByIdRows] = await connection.query(selectProgramsByIdQuery, programId);
    return selectProgramsByIdRows[0];
}

// 프로그램 이미지 리스트 조회
async function selectProgramImagesById(connection, programId) {
    const selectProgramImagesByIdQuery = `
        select imageURL
        from ProgramImage
        where programId = ?;
    `;
    const [selectProgramImagesByIdRows] = await connection.query(selectProgramImagesByIdQuery, programId);
    return selectProgramImagesByIdRows;
}

// 찜 목록 조회
async function selectBookmarksByUserId(connection, userId) {
    const selectBookmarksByUserIdQuery = `
        select BookMark.programId, category, name, location, Program.thumbnailURL, Program.tag
        from BookMark left join Program
                                on BookMark.programId = Program.programId
                      left join Enterprise
                                on Program.enterpriseId = Enterprise.enterpriseId
        where BookMark.userId = ? and BookMark.status = "ACTIVE" and Program.status="ACTIVE" and Enterprise.status="ACTIVE";
    `;
    const [selectBookmarksByUserIdRows] = await connection.query(selectBookmarksByUserIdQuery, userId);
    return selectBookmarksByUserIdRows;
}

// 존재하는 프로그램인지 조회
async function isExistProgramsById(connection, programId) {
    const isExistProgramsByIdQuery = `
        SELECT COUNT(*) as CNT
        FROM Program
        WHERE programId = ? and status = "ACTIVE";
    `;
    const [isExistProgramsByIdRows] = await connection.query(isExistProgramsByIdQuery, programId);
    return isExistProgramsByIdRows;
}

// 찜하기 삽입
async function insertBookMarks(connection, programId, userId) {
    const insertBookMarksQuery = `
        INSERT INTO BookMark(programId, userId)
        VALUES (?, ?);
    `;
    const insertBookMarksRows = await connection.query(
        insertBookMarksQuery,
        [programId, userId]
    );
}

// bookmark 정보 가져오기
async function selectBookMarkInfoById(connection, programId) {
    const selectBookMarkInfoByIdQuery = `
        select bookMarkId, programId, userId, status
        from BookMark
        where programId = ? and status = "ACTIVE";
    `;
    const [selectBookMarkInfoByIdRows] = await connection.query(selectBookMarkInfoByIdQuery, programId);
    return selectBookMarkInfoByIdRows;
}

// 찜하기 업데이트
async function updateBookMarks(connection, bookMarkId) {
    const updateBookMarksQuery = `
        update BookMark
        set status = "INACTIVE"
        where bookMarkId = ?;
    `;
    const updateBookMarksRows = await connection.query(
        updateBookMarksQuery, bookMarkId
    );
}

module.exports = {
    selectProgramsById,
    selectProgramImagesById,
    selectBookmarksByUserId,
    isExistProgramsById,
    insertBookMarks,
    selectBookMarkInfoById,
    updateBookMarks
};
