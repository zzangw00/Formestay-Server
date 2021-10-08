const jwtMiddleware = require("../../../config/jwtMiddleware");
const regexEmail = require("regex-email");
const adminProvider = require("./adminProvider");
const adminService = require("./adminService");
const baseResponse = require("../../../config/baseResponseStatus");
const {response} = require("../../../config/response");
const {errResponse} = require("../../../config/response");
const {emit} = require("nodemon");

/** 회원 전체 조회 API
 * [GET] /app/users
 *
 * 회원 이메일 검색 조회 API
 * [GET] /app/users?word=
 * queryString : word
 */
exports.getUsers = async function (req, res) {
    const email = req.query.word;
    if (!email) {
        const userListResult = await adminProvider.retrieveUserList();
        return res.send(res.send(response(baseResponse.SUCCESS, userListResult)));
    } else {
        const userListByEmail = await adminProvider.retrieveUserList(email);
        return res.send(res.send(response(baseResponse.SUCCESS, userListByEmail)));
    }
};
