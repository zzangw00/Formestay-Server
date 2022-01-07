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

// admin 회원가입 phoneNumber check
async function checkAdminPhoneNumber(connection, phoneNumber) {
    const checkAdminPhoneNumberquery = `
        SELECT phoneNumber
        FROM Admin
        WHERE phoneNumber = ?;
    `;
    const [checkAdminPhoneNumberRows] = await connection.query(
        checkAdminPhoneNumberquery,
        phoneNumber,
    );
    return checkAdminPhoneNumberRows;
}

// admin 회원가입 enterprise 중복체크
async function checkAdminEnterprise(connection, enterpriseId) {
    const checkAdminEnterpriseQuery = `
    select enterpriseId
    from Admin
    where enterpriseId = ?;
    `;
    const [checkAdminEnterpriseRows] = await connection.query(
        checkAdminEnterpriseQuery,
        enterpriseId,
    );
    return checkAdminEnterpriseRows;
}

// admin 회원가입 enterprise 존재 체크
async function existAdminEnterprise(connection, enterpriseId) {
    const existAdminEnterpriseQuery = `
    SELECT enterpriseId
    FROM Enterprise
    WHERE enterpriseId = ?;
    `;
    const [existAdminEnterpriseRows] = await connection.query(
        existAdminEnterpriseQuery,
        enterpriseId,
    );
    return existAdminEnterpriseRows;
}

// admin 회원가입
async function insertAdminInfo(connection, insertAdminInfoParams) {
    const query = `
    INSERT INTO Admin(email,
        password,
        nickname,
        phoneNumber, enterpriseId)
      VALUES (?, ?, ?, ?, ?);
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
        SELECT adminId, nickname, status, enterpriseId
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
        select userId, nickname, email, date_format(createdAt, '%Y-%m-%d %H:%i:%S') as createdAt, snsId, status
        from UserInfo
        order by createdAt desc`;
    const [retrieveUserListRows] = await connection.query(retrieveUserListQuery, adminIdFromJWT);
    return retrieveUserListRows;
}

// 관계자 정보 가져오기
async function retrieveAdminList(connection) {
    const retrieveAdminListQuery = `
    select adminId, email, nickname, phoneNumber, enterpriseId
    from Admin
    where status = 1;`;
    const [retrieveAdminListRows] = await connection.query(retrieveAdminListQuery);
    return retrieveAdminListRows;
}

// 유저 상세정보 가져오기
async function userInfo(connection, userId) {
    const UserInfoQuery = `
        select userId, email, name, nickname, gender, date_format(birthday, '%Y-%m-%d') as birthday, phoneNumber, isPermitAlarm, snsId, profileImgURL, date_format(createdAt, '%Y-%m-%d %H:%i:%S') as createdAt, status
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
        select enterpriseId, korName, engName, primeLocation, date_format(createdAt, '%Y-%m-%d %H:%i:%S') as createdAt, status
        from Enterprise
        order by createdAt desc;`;
    const [retrieveEnterpriseListRows] = await connection.query(retrieveEnterpriseListQuery);
    return retrieveEnterpriseListRows;
}

// 업체 정보 가져오기(관계자)
async function retrieveAdminEnterpriseList(connection, enterpriseId) {
    const retrieveEnterpriseListQuery = `
        select enterpriseId, korName, engName, primeLocation, date_format(createdAt, '%Y-%m-%d %H:%i:%S') as createdAt, status
        from Enterprise
        where enterpriseId = ?;`;
    const [retrieveEnterpriseListRows] = await connection.query(
        retrieveEnterpriseListQuery,
        enterpriseId,
    );
    return retrieveEnterpriseListRows;
}

// 업체 상세정보 가져오기
async function enterpriseInfo(connection, enterpriseId) {
    const enterpriseInfoQuery = `
        select enterpriseId, korName, engName, category, primeLocation, location, tag, description, phoneNumber, thumbnailURL, date_format(createdAt, '%Y-%m-%d %H:%i:%S') as createdAt
        from Enterprise
        where enterpriseId = ?;`;
    const [enterpriseInfoRows] = await connection.query(enterpriseInfoQuery, enterpriseId);
    return enterpriseInfoRows;
}

// 프로그램 정보 가져오기
async function retrieveProgramsList(connection, enterpriseId) {
    const retrieveProgramsListQuery = `
        select programId, name, status
        from Program
        where enterpriseId = ?;`;
    const [retrieveProgramsListRows] = await connection.query(
        retrieveProgramsListQuery,
        enterpriseId,
    );
    return retrieveProgramsListRows;
}

// 유저 닉네임 체크
async function nicknameCheck(connection, userId) {
    const nicknameCheckQuery = `
        select nickname
        from UserInfo
        where userId = ?;`;
    const [nicknameCheckRows] = await connection.query(nicknameCheckQuery, userId);
    return nicknameCheckRows;
}

// 유저 닉네임 중복 체크
async function nicknameOverlap(connection, nickname) {
    const nicknameOverlapQuery = `
        select exists(select nickname
        from UserInfo
        where nickname = ?) as exist;`;
    const [nicknameOverlapRows] = await connection.query(nicknameOverlapQuery, nickname);
    return nicknameOverlapRows;
}

// 유저 정보 수정
async function patchUserInfo(connection, nickname, userId) {
    const patchUserQuery = `
        update UserInfo
        set nickname = ?
        where userId = ?;`;
    const [patchUserRows] = await connection.query(patchUserQuery, [nickname, userId]);
    return patchUserRows;
}

// 업체 정보 수정
async function patchEnterpriseInfo(
    connection,
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
) {
    const patchEnterpriseQuery = `
        update Enterprise
        set korName = ?,
            engName = ?,
            category = ?,
            primeLocation = ?,
            location = ?,
            tag = ?,
            description = ?,
            phoneNumber = ?,
            thumbnailURL = ?
        where enterpriseId = ?;`;
    const [patchEnterpriseRows] = await connection.query(patchEnterpriseQuery, [
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
    ]);
    return patchEnterpriseRows;
}

// 업체 한글 이름 체크
async function korNameCheck(connection, enterpriseId) {
    const korNameCheckQuery = `
        select korName
        from Enterprise
        where enterpriseId = ?;`;
    const [korNameCheckRows] = await connection.query(korNameCheckQuery, enterpriseId);
    return korNameCheckRows;
}

// 업체 영어 이름 체크
async function engNameCheck(connection, enterpriseId) {
    const engNameCheckQuery = `
        select engName
        from Enterprise
        where enterpriseId = ?;`;
    const [engNameCheckRows] = await connection.query(engNameCheckQuery, enterpriseId);
    return engNameCheckRows;
}

// 업체 한글 이름 중복 체크
async function korNameOverlap(connection, korName) {
    const korNameOverlapQuery = `
        select exists(select korName
        from Enterprise
        where korName = ?) as exist;`;
    const [korNameOverlapRows] = await connection.query(korNameOverlapQuery, korName);
    return korNameOverlapRows;
}

// 업체 영어 이름 중복 체크
async function engNameOverlap(connection, engName) {
    const engNameOverlapQuery = `
        select exists(select engName
        from Enterprise
        where engName = ?) as exist;`;
    const [engNameOverlapRows] = await connection.query(engNameOverlapQuery, engName);
    return engNameOverlapRows;
}

// 업체 삭제
async function changeEnterpriseStatus(connection, status, enterpriseId) {
    const changeEnterpriseStatusQuery = `
        Update Enterprise
        set status = ?
        where enterpriseId = ?;`;
    const [changeEnterpriseStatusRows] = await connection.query(changeEnterpriseStatusQuery, [
        status,
        enterpriseId,
    ]);
    return changeEnterpriseStatusRows;
}

// 업체 추가
async function postEnterprise(
    connection,
    korName,
    engName,
    category,
    primeLocation,
    location,
    tag,
    description,
    phoneNumber,
    thumbnailURL,
) {
    const postEnterpriseQuery = `
    insert into Enterprise(korName,
        engName,
        category,
        primeLocation,
        location,
        tag,
        description,
        phoneNumber,
        thumbnailURL)
        values (?, ?, ?, ?, ?, ?, ?, ?, ?);`;
    const [postEnterpriseRows] = await connection.query(postEnterpriseQuery, [
        korName,
        engName,
        category,
        primeLocation,
        location,
        tag,
        description,
        phoneNumber,
        thumbnailURL,
    ]);
    return postEnterpriseRows;
}

// 프로그램의 업체 고유번호 조회
async function checkProgram(connection, programId) {
    const checkProgramQuery = `
    select enterpriseId
    from Program
    where programId = ?;`;
    const [checkProgramRows] = await connection.query(checkProgramQuery, programId);
    return checkProgramRows;
}

// 프로그램 상세 조회
async function getProgram(connection, programId) {
    const getProgramQuery = `
        select programId, enterpriseId, name, description, tag, thumbnailURL, checkIn, checkOut, programInfo, mealInfo, date_format(createdAt, '%Y-%m-%d %H:%i:%S') as createdAt
        from Program
        where programId = ?;`;
    const [getProgramRows] = await connection.query(getProgramQuery, programId);
    return getProgramRows;
}

// 프로그램 상세 조회
async function getProgramRoom(connection, programId) {
    const getProgramRoomQuery = `
        select programId, programRoomPriceId, inRoom, price, status
        from ProgramRoomPrice
        where programId = ? and status = 'ACTIVE';`;
    const [getProgramRoomRows] = await connection.query(getProgramRoomQuery, programId);
    return getProgramRoomRows;
}

// 프로그램 삭제
async function changeProgramStatus(connection, status, programId) {
    const changeProgramStatusQuery = `
        Update Program
        set status = ?
        where programId = ?;`;
    const [changeProgramStatusRows] = await connection.query(changeProgramStatusQuery, [
        status,
        programId,
    ]);
    return changeProgramStatusRows;
}

// 프로그램 정보 수정
async function patchProgramInfo(
    connection,
    name,
    description,
    tag,
    thumbnailURL,
    checkIn,
    checkOut,
    programInfo,
    mealInfo,
    programId,
) {
    const patchProgramQuery = `
        update Program
        set name         = ?,
            description  = ?,
            tag          = ?,
            thumbnailURL = ?,
            checkIn      = ?,
            checkOut     = ?,
            programInfo  = ?,
            mealInfo     = ?
        where programId = ?;`;
    const [patchProgramRows] = await connection.query(patchProgramQuery, [
        name,
        description,
        tag,
        thumbnailURL,
        checkIn,
        checkOut,
        programInfo,
        mealInfo,
        programId,
    ]);
    return patchProgramRows;
}

// 가격 정보 추가
async function postRoomPrice(connection, programId, inRoom, price) {
    const addRoomPriceQuery = `
    insert into ProgramRoomPrice(programId, inRoom, price)
    values (?, ?, ?);`;
    const [addRoomPriceRows] = await connection.query(addRoomPriceQuery, [
        programId,
        inRoom,
        price,
    ]);
    return addRoomPriceRows;
}

// 가격 정보 수정
async function patchRoomPrice(connection, inRoom, price, programRoomPriceId) {
    const addRoomPriceQuery = `
        update ProgramRoomPrice
        set inRoom = ?,
            price = ?
        where programRoomPriceId = ?;`;
    const [addRoomPriceRows] = await connection.query(addRoomPriceQuery, [
        inRoom,
        price,
        programRoomPriceId,
    ]);
    return addRoomPriceRows;
}

// 가격 정보 조회
async function getRoomPrice(connection, programRoomPriceId) {
    const getRoomPriceQuery = `
        select programRoomPriceId, inRoom, price
        from ProgramRoomPrice
        where programRoomPriceId = ?;`;
    const [getRoomPriceRows] = await connection.query(
        getRoomPriceQuery,

        programRoomPriceId,
    );
    return getRoomPriceRows;
}

// 가격정보 삭제
async function changeProgramRoomPriceStatus(connection, status, programRoomPriceId) {
    const changeProgramRoomPriceQuery = `
        update ProgramRoomPrice
        set status = ?
        where programRoomPriceId = ?;`;
    const [changeProgramRoomPriceRows] = await connection.query(changeProgramRoomPriceQuery, [
        status,
        programRoomPriceId,
    ]);
    return changeProgramRoomPriceRows;
}

// 프로그램 추가
async function postProgram(
    connection,
    enterpriseId,
    name,
    description,
    tag,
    thumbnailURL,
    checkIn,
    checkOut,
    programInfo,
    mealInfo,
) {
    const postProgramQuery = `
    insert into Program(enterpriseId,
        name,
        description,
        tag,
        thumbnailURL,
        checkIn,
        checkOut,
        programInfo,
        mealInfo)
        values (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    const [postProgramRows] = await connection.query(postProgramQuery, [
        enterpriseId,
        name,
        description,
        tag,
        thumbnailURL,
        checkIn,
        checkOut,
        programInfo,
        mealInfo,
    ]);
    return postProgramRows;
}

// 예약 리스트 조회
async function getReservations(connection, enterpriseId) {
    const getReservationsQuery = `
        select r.reservationId, p.name as programName, r.name, date_format(r.startDate, '%Y-%m-%d') as startDate, date_format(r.endDate, '%Y-%m-%d') as endDate, r.status, r.createdAt
        from Reservation r join Program p on r.programId = p.programId
        where p.enterpriseId = ? and r.status != 'INACTIVE';`;
    const [getReservationsRows] = await connection.query(getReservationsQuery, enterpriseId);
    return getReservationsRows;
}

// 예약 상세 조회
async function getReservation(connection, reservationId) {
    const getReservationQuery = `
        select p.name as programName, r.userId, r.programId, r.name, r.phoneNumber, date_format(r.startDate, '%Y-%m-%d') as startDate, date_format(r.endDate, '%Y-%m-%d') as endDate, r.price, r.reservationNumber, date_format(r.createdAt, '%Y-%m-%d %H:%i:%S') as createdAt, r.status
        from Reservation r join Program p on r.programId = p.programId
        where reservationId = ?;`;
    const [getReservationRows] = await connection.query(getReservationQuery, reservationId);
    return getReservationRows;
}

// 예약 취소
async function cancleReservation(connection, status, reservationId) {
    const cancleReservationQuery = `
        update Reservation
        set status = ?
        where reservationId = ?;`;
    const [cancleReservationRows] = await connection.query(cancleReservationQuery, [
        status,
        reservationId,
    ]);
    return cancleReservationRows;
}

// 예약 승인
async function registReservation(connection, status, reservationId) {
    const registReservationQuery = `
        update Reservation
        set status = ?
        where reservationId = ?;`;
    const [registReservationRows] = await connection.query(registReservationQuery, [
        status,
        reservationId,
    ]);
    return registReservationRows;
}

// 프로그램 이미지 조회
async function getProgramImages(connection, programId) {
    const getProgramImagesQuery = `
        select imageURL, programImageId
        from ProgramImage
        where programId = ?;`;
    const [getProgramImagesRows] = await connection.query(getProgramImagesQuery, programId);
    return getProgramImagesRows;
}

// 프로그램 이미지 추가
async function postProgramImages(connection, programId, image) {
    const postProgramImagesQuery = `
        insert into ProgramImage(programId,
            imageURL)
            values (?, ?);`;
    const [postProgramImagesRows] = await connection.query(postProgramImagesQuery, [
        programId,
        image,
    ]);
    return postProgramImagesRows;
}

// 가격정보 삭제
async function patchProgramImage(connection, programImageId) {
    const patchProgramImageQuery = `
        delete from ProgramImage
        where programImageId = ?;`;
    const [patchProgramImageRows] = await connection.query(patchProgramImageQuery, programImageId);
    return patchProgramImageRows;
}

// 프로그램 정보 조회 API
async function getProgramInfo(connection, programId, date) {
    const getPrgramInfoQuery = `
    select programInfoId, content
    from ProgramInfo
    where programId = ? and date = ?;`;
    const [getPrgramInfoRows] = await connection.query(getPrgramInfoQuery, [programId, date]);
    return getPrgramInfoRows;
}

// 프로그램 정보 수정 API
async function changeProgramInfo(connection, content, programInfoId) {
    const changeProgramInfoQuery = `
    update ProgramInfo
    set content = ?
    where programInfoId = ?;`;
    const [changeProgramInfoRows] = await connection.query(changeProgramInfoQuery, [
        content,
        programInfoId,
    ]);
    return changeProgramInfoRows;
}

// 프로그램 정보 추가 API
async function postProgramInfo(connection, programId, content, date) {
    const postProgramInfoQuery = `
        insert into ProgramInfo(programId, content, date)
        values (?, ?, ?);`;
    const [postProgramInfoRows] = await connection.query(postProgramInfoQuery, [
        programId,
        content,
        date,
    ]);
    return postProgramInfoRows;
}

// 식단 정보 조회 API
async function getMealInfo(connection, programId, date) {
    const getMealInfoQuery = `
    select mealInfoId, content
    from MealInfo
    where programId = ? and date = ?;`;
    const [getMealInfoRows] = await connection.query(getMealInfoQuery, [programId, date]);
    return getMealInfoRows;
}

// 식단 정보 수정 API
async function patchMealInfo(connection, content, mealInfoId) {
    const patchMealInfoQuery = `
    update MealInfo
    set content = ?
    where mealInfoId = ?;`;
    const [patchMealInfoRows] = await connection.query(patchMealInfoQuery, [content, mealInfoId]);
    return patchMealInfoRows;
}

// 식단 정보 추가 API
async function postMealInfo(connection, programId, content, date) {
    const postMealInfoQuery = `
        insert into MealInfo(programId, content, date)
        values (?, ?, ?);`;
    const [postMealInfoRows] = await connection.query(postMealInfoQuery, [
        programId,
        content,
        date,
    ]);
    return postMealInfoRows;
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
    enterpriseInfo,
    retrieveProgramsList,
    nicknameCheck,
    nicknameOverlap,
    patchUserInfo,
    checkAdminPhoneNumber,
    patchEnterpriseInfo,
    korNameCheck,
    engNameCheck,
    korNameOverlap,
    engNameOverlap,
    changeEnterpriseStatus,
    postEnterprise,
    getProgram,
    changeProgramStatus,
    getProgramRoom,
    patchProgramInfo,
    postRoomPrice,
    patchRoomPrice,
    getRoomPrice,
    changeProgramRoomPriceStatus,
    postProgram,
    getReservations,
    getReservation,
    cancleReservation,
    registReservation,
    getProgramImages,
    postProgramImages,
    patchProgramImage,
    checkAdminEnterprise,
    existAdminEnterprise,
    retrieveAdminList,
    retrieveAdminEnterpriseList,
    checkProgram,
    getProgramInfo,
    changeProgramInfo,
    postProgramInfo,
    getMealInfo,
    patchMealInfo,
    postMealInfo,
};
