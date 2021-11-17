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

// 찜 목록 조회
async function selectReservationsByUserId(connection, userId) {
    const selectReservationsByUserIdQuery = `
        select Reservation.reservationId,
               reservationNumber,
               case
                   when category = 1
                       then '단식원'
                   when category = 2
                       then '템플스테이'
                   when category = 3
                       then '힐링캠프'
                   when category = 4
                       then '산후조리원'
                   end as category,
               PE.name,
               PE.tag,
               PE.phoneNumber,
               DATEDIFF(endDate, startDate) as totalDate,
               totalPerson,
               date_format(startDate, "%Y-%m-%d") as startDate,
               date_format(endDate, "%Y-%m-%d") as endDate,
               case
                   when weekday(startDate) = 0
                       then '월'
                   when weekday(startDate) = 1
                       then '화'
                   when weekday(startDate) = 2
                       then '수'
                   when weekday(startDate) = 3
                       then '목'
                   when weekday(startDate) = 4
                       then '금'
                   when weekday(startDate) = 5
                       then '토'
                   when weekday(startDate) = 6
                       then '일'
                   end as startWeekDay,
               case
                   when weekday(endDate) = 0
                       then '월'
                   when weekday(endDate) = 1
                       then '화'
                   when weekday(endDate) = 2
                       then '수'
                   when weekday(endDate) = 3
                       then '목'
                   when weekday(endDate) = 4
                       then '금'
                   when weekday(endDate) = 5
                       then '토'
                   when weekday(endDate) = 6
                       then '일'
                   end as endWeekDay,
               checkIn,
               checkOut,
               case
                   when date_format(now(), "%Y-%m-%d") between startDate and endDate
                       then '이용중'
                   when date_format(now(), "%Y-%m-%d") < startDate
                       then '예약중'
                   when date_format(now(), "%Y-%m-%d") > endDate
                       then '이용완료'
                   end as reservationStatus,
               thumbnailURL,
               Reservation.createdAt

        from Reservation left join (select Program.programId, name, category, Program.tag, checkIn, checkOut, Program.thumbnailURL, Enterprise.phoneNumber
                                    from Program left join Enterprise
                                                           on Program.enterpriseId = Enterprise.enterpriseId
                                    where Program.status = "ACTIVE" and Enterprise.status = "ACTIVE") as PE
                                   on Reservation.programId = PE.programId
        where userId = ? and Reservation.status = "ACTIVE";
    `;
    const [selectReservationsByUserIdRows] = await connection.query(selectReservationsByUserIdQuery, userId);
    return selectReservationsByUserIdRows;
}

module.exports = {
    selectProgramsById,
    selectProgramImagesById,
    isExistProgramByProgramId,
    insertReservation,
    selectReservationsByUserId
};
