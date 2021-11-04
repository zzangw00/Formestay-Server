/**
 * @swagger
 *
 * /app/programs/{programId}:
 *  get:
 *      tags:
 *      - programs
 *      description: 프로그램 상세 조회 API
 *      produces:
 *      - application/json
 *      parameters:
 *        - in : path
 *          name: programId
 *          schema:
 *             type: Integer
 *          required: true
 *          example: 4
 *          description: 프로그램 아이디
 *
 *      responses:
 *        1000:
 *          description: 성공
 *
 *        2038:
 *          description: 프로그램 아이디가 없습니다.
 *
 *        2039:
 *          description: 존재하지 않는 프로그램입니다.
 *
 */