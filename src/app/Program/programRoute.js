module.exports = function (app) {
    const program = require('./programController');
    const jwtMiddleware = require('../../../config/jwtMiddleware');


    // 프로그램 상세 조회
    app.get('/app/programs/:programId', program.getProgramsById);

    // 찜 목록 조회
    app.get('/app/bookmarks', jwtMiddleware, program.getBookmarks);

    // 찜 하기
    app.route('/app/bookmarks').post(jwtMiddleware, program.postBookmarks);
};