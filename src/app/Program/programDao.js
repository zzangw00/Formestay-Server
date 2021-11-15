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

// 프로그램 아이디로 프로그램 조회
async function isExistProgramByProgramId(connection, programId) {
    const isExistProgramByProgramIdQuery = `
        SELECT COUNT(*) as CNT
        FROM Program
        WHERE programId = ? and status = "ACTIVE";
    `;
    const [isExistProgramByProgramIdRows] = await connection.query(isExistProgramByProgramIdQuery, programId);
    return isExistProgramByProgramIdRows;
}

// 찜하기 삽입
async function insertReservation(connection, programId, userId, name, phoneNumber, totalPerson, startDate, endDate, paymentWay, reservationNumber) {
    const insertReservationQuery = `
        INSERT INTO Reservation(programId, userId, name, phoneNumber, totalPerson, startDate, endDate, paymentWay, reservationNumber)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);
    `;
    const insertReservationRows = await connection.query(
        insertReservationQuery,
        [programId, userId, name, phoneNumber, totalPerson, startDate, endDate, paymentWay, reservationNumber]
    );
}

module.exports = {
    selectProgramsById,
    selectProgramImagesById,
    isExistProgramByProgramId,
    insertReservation
};
