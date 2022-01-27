module.exports = function (app) {
    const admin = require('./adminController');
    const jwtMiddleware = require('../../../config/jwtMiddleware');

    // 관리자 회원가입 API
    app.post('/admin', jwtMiddleware, admin.postAdmin);

    // 관리자 로그인 API
    app.post('/admin/login', admin.loginAdmin);

    // 관리자 및 관계자 비밀번호 변경 API
    app.patch('/admin/password', jwtMiddleware, admin.patchAdminPassword);

    // 업체 관계자 조회 API
    app.get('/admin/admins', jwtMiddleware, admin.getAdmins);

    // 관리자인지 확인 API
    app.get('/admin', jwtMiddleware, admin.getAdmin);

    // 자동 로그인 API
    app.get('/admin/auto-login', jwtMiddleware, admin.autoLogin);

    // 유저 조회 API
    app.get('/admin/users', jwtMiddleware, admin.getUsers);

    // 유저 상세 조회 API
    app.get('/admin/users/:userId', jwtMiddleware, admin.getUser);

    // 유저 탈퇴 API
    app.patch('/admin/users/:userId/status', jwtMiddleware, admin.deleteUser);

    // 업체 조회 API
    app.get('/admin/enterprises', jwtMiddleware, admin.getEnterprises);

    // 업체 상세 조회 API
    app.get('/admin/enterprises/:enterpriseId', jwtMiddleware, admin.getEnterprise);

    // 프로그램 조회 API
    app.get('/admin/programs/:enterpriseId', jwtMiddleware, admin.getPrograms);

    // 유저 정보 수정 API
    app.patch('/admin/users/:userId', jwtMiddleware, admin.patchUser);

    // 업체 정보 수정 API
    app.patch('/admin/enterprises/:enterpriseId', jwtMiddleware, admin.patchEnterprise);

    // 업체 삭제 API
    app.patch('/admin/enterprises/:enterpriseId/status', jwtMiddleware, admin.deleteEnterprise);

    // 업체 추가 API
    app.post('/admin/enterprise', jwtMiddleware, admin.addEnterprise);

    // 프로그램 상세 조회 API
    app.get('/admin/program/:programId', jwtMiddleware, admin.getProgram);

    // 프로그램 삭제 API
    app.patch('/admin/program/:programId/status', jwtMiddleware, admin.deleteProgram);

    // 프로그램 정보 수정 API
    app.patch('/admin/program/:programId', jwtMiddleware, admin.patchProgram);

    // 가격 정보 추가 API
    app.post('/admin/program/price', jwtMiddleware, admin.addRoomPrice);

    // 가격 정보 수정 API
    app.patch(
        '/admin/program/programRoomPrice/:programRoomPriceId',
        jwtMiddleware,
        admin.patchRoomPrice,
    );

    // 가격 정보 조회 API
    app.get(
        '/admin/program/programRoomPrice/:programRoomPriceId',
        jwtMiddleware,
        admin.getRoomPrice,
    );

    // 가격 정보 삭제 API
    app.patch(
        '/admin/programRoomPrice/:programRoomPriceId/status',
        jwtMiddleware,
        admin.deleteRoomPrice,
    );

    // 프로그램 추가 API
    app.post('/admin/enterprise/:enterpriseId/program', jwtMiddleware, admin.addProgram);

    // 예약 리스트 조회 API
    app.get('/admin/enterprise/:enterpriseId/reservations', jwtMiddleware, admin.getReservations);

    // 예약 상세 조회 API
    app.get('/admin/reservations/:reservationId', jwtMiddleware, admin.getReservation);

    // 예약 취소 API
    app.patch(
        '/admin/reservations/:reservationId/status-out',
        jwtMiddleware,
        admin.cancleReservation,
    );

    // 예약 승인 API
    app.patch('/admin/reservations/:reservationId/status', jwtMiddleware, admin.registReservation);

    // 프로그램 이미지 조회 API
    app.get('/admin/program/:programId/images', jwtMiddleware, admin.getProgramImages);

    // 프로그램 이미지 추가 API
    app.post('/admin/program/:programId/images', jwtMiddleware, admin.addProgramImages);

    // 프로그램 이미지 삭제 API
    app.patch(
        '/admin/programImage/:programImageId/status',
        jwtMiddleware,
        admin.patchProgramImages,
    );

    // 프로그램 정보 조회 API
    app.get('/admin/program/:programId/programInfo', jwtMiddleware, admin.getProgramInfo);

    // 프로그램 정보 수정 API
    app.patch(
        '/admin/programInfo/:programInfoId/programInfo',
        jwtMiddleware,
        admin.patchProgramInfo,
    );

    // 프로그램 정보 추가 API
    app.post('/admin/program/:programId/programInfo', jwtMiddleware, admin.postProgramInfo);

    // 식단 정보 조회 API
    app.get('/admin/program/:programId/mealInfo', jwtMiddleware, admin.getMealInfo);

    // 프로그램 정보 수정 API
    app.patch('/admin/mealInfo/:mealInfoId/mealInfo', jwtMiddleware, admin.patchMealInfo);

    // 식단 정보 추가 API
    app.post('/admin/program/:programId/mealInfo', jwtMiddleware, admin.postMealInfo);

    // 결제 이력 조회 API
    app.get('/admin/payments', jwtMiddleware, admin.getPayments);
};
