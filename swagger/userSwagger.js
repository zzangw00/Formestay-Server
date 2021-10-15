/**
 * @swagger
 * /users/signup:
 *  post:
 *      tags:
 *      - users
 *      description: 사용자 회원가입
 *      produces:
 *      - application/json
 *      parameters:
 *        - in: body
 *          name: body
 *          required: true
 *          schema:
 *              type: object
 *              properties:
 *                  id:
 *                      type: string
 *                      required: true
 *                      description: 사용자 아이디
 *                      example: kookisung
 *                  pw:
 *                      type: string
 *                      required: true
 *                      description: 사용자 비밀번호
 *                      example: rnrltjd7869!
 *                  email:
 *                      type: string
 *                      required: true
 *                      description: 사용자 이메일
 *                      example: lion0193@gmail.com
 *                  nickname:
 *                      type: string
 *                      required: true
 *                      description: 사용자 닉네임
 *                      example: 구기성
 *                  gender:
 *                      type: string
 *                      required: true
 *                      description: 사용자 성별
 *                      example: M
 *                  birthday:
 *                      type: string
 *                      required: true
 *                      description: 사용자 생년월일
 *                      example: 1996-09-06
 *                  isIos:
 *                      type: string
 *                      required: false
 *                      description: 모바일 운영체제
 *                      example: N
 *
 *      responses:
 *        200:
 *          description: 회원가입 성공
 *
 *        301:
 *          description: 아이디를 입력해주세요.
 *
 *        302:
 *          description: 아이디는 6~15자리로 입력해주세요.
 *
 *        303:
 *          description: 아이디는 영어 대소문자, 숫자로만 구성됩니다.
 *
 *        304:
 *          description: 비밀번호를 입력해주세요.
 *
 *        305:
 *          description: 비밀번호는 10~16자리로 입력해주세요.
 *
 *        306:
 *          description: 비밀번호는 영문, 숫자, 특수문자로 이뤄져야 합니다.
 *
 *        307:
 *          description: 이메일을 입력해주세요.
 *
 *        308:
 *          description: 유효하지 않은 이메일입니다.
 *
 *        309:
 *          description: 닉네임을 입력해주세요.
 *
 *        310:
 *          description: 닉네임은 특수문자를 제외한 1-10자로 입력해주세요.
 *
 *        311:
 *          description: 닉네임은 한글로만 입력해주세요.
 *
 *        312:
 *          description: 성별을 입력해주세요.
 *
 *        313:
 *          description: 성별은 M 또는 F 입니다.
 *
 *        314:
 *          description: 생년월일이 비어있습니다.
 *
 *        315:
 *          description: 생년월일이 yyyy-mm-dd 형식이 아닙니다.
 *
 *        316:
 *          description: 모바일 운영체제 선택이 잘못됐습니다.
 *
 *        317:
 *          description: 중복된 아이디입니다.
 *
 *        318:
 *          description: 중복된 닉네임입니다.
 *
 *        319:
 *          description: 중복된 이메일입니다.
 *
 *        500:
 *          description: sql문 에러입니다.
 */