module.exports = function (app) {
    const program = require('./programController');
    const jwtMiddleware = require('../../../config/jwtMiddleware');


    // 프로그램 상세 조회
    app.get('/app/programs/:programId', program.getProgramsById);

    // 예약하기
    app.route('/app/reservations').post(jwtMiddleware, program.postReservations);

    // 예약조회
    app.get('/app/reservations', jwtMiddleware, program.getReservations);

    // 예약 상세 조회
    app.get('/app/reservations/:reservationId', jwtMiddleware, program.getReservationsDetail);
};