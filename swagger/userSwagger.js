/**
 * @swagger
 *
 * /app/users-check:
 *  post:
 *      tags:
 *      - users
 *      description: 회원 가입전 검증 API
 *      produces:
 *      - application/json
 *      parameters:
 *        - in: body
 *          name: body
 *          required: true
 *          schema:
 *              type: object
 *              properties:
 *                  name:
 *                      type: string
 *                      required: true
 *                      description: 이름
 *                      example: 구기성
 *                  nickname:
 *                      type: string
 *                      required: true
 *                      description: 닉네임
 *                      example: 쿠키
 *                  gender:
 *                      type: integer
 *                      required: true
 *                      description: 성별(1:남자,2:여자)
 *                      example: 1
 *                  phoneNumber:
 *                      type: string
 *                      required: true
 *                      description: 핸드폰 번호
 *                      example: 01012341234
 *                  birthday:
 *                      type: string
 *                      required: true
 *                      description: 생년월일
 *                      example: 19960906
 *                  email:
 *                      type: string
 *                      required: true
 *                      description: 이메일
 *                      example: cookie-god@softsquared.com
 *                  password:
 *                      type: string
 *                      required: false
 *                      description: 비밀번호
 *                      example: cookie7869
 *                  confirmPassword:
 *                      type: string
 *                      required: false
 *                      description: 확인 비밀번호
 *                      example: cookie7869
 *                  snsId:
 *                      type: integer
 *                      required: false
 *                      description: 소셜아이디
 *                      example: 1948493973
 *
 *      responses:
 *        1000:
 *          description: 성공
 *
 *        2001:
 *          description: 이름을 입력해주세요.
 *
 *        2002:
 *          description: 닉네임을 입력해주세요.
 *
 *        2003:
 *          description: 닉네임은 2~20자리로 입력해주세요.
 *
 *        2004:
 *          description: 성별을 선택해주세요.
 *
 *        2005:
 *          description: 성별형식을 정확하게 입력해주세요.
 *
 *        2006:
 *          description: 핸드폰 번호를 선택해주세요.
 *
 *        2007:
 *          description: 핸드폰 번호을 정확하게 입력해주세요.
 *
 *        2008:
 *          description: 생년월일을 입력해주세요.
 *
 *        2009:
 *          description: 생년월일 형식을 정확하게 입력해주세요.
 *
 *        2010:
 *          description: 이메일을 입력해주세요.
 *
 *        2011:
 *          description: 이메일을 형식을 정확하게 입력해주세요.
 *
 *        2012:
 *          description: 비밀번호를 입력 해주세요.
 *
 *        2013:
 *          description: 비밀번호 형식을 정확하게 입력해주세요.
 *
 *        2014:
 *          description: 확인 비밀번호를 입력 해주세요.
 *
 *        2015:
 *          description: 비밀번호와 확인 비밀번호가 일치하지 않습니다.
 *
 *        2016:
 *          description: 이미 존재하는 핸드폰 번호입니다.
 *
 *        2017:
 *          description: 이미 존재하는 이메일입니다.
 *
 *        20029:
 *          description: 이미 소셜 아이디가 존재합니다.
 *
 *
 * /app/users:
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
 *                  name:
 *                      type: string
 *                      required: true
 *                      description: 이름
 *                      example: 구기성
 *                  nickname:
 *                      type: string
 *                      required: true
 *                      description: 닉네임
 *                      example: 쿠키
 *                  gender:
 *                      type: integer
 *                      required: true
 *                      description: 성별(1:남자,2:여자)
 *                      example: 1
 *                  phoneNumber:
 *                      type: string
 *                      required: true
 *                      description: 핸드폰 번호
 *                      example: 01012341234
 *                  birthday:
 *                      type: string
 *                      required: true
 *                      description: 생년월일
 *                      example: 19960906
 *                  email:
 *                      type: string
 *                      required: true
 *                      description: 이메일
 *                      example: cookie-god@softsquared.com
 *                  password:
 *                      type: string
 *                      required: false
 *                      description: 비밀번호
 *                      example: cookie7869
 *                  isPermitAlarm:
 *                      type: string
 *                      required: true
 *                      description: 알람 수신 동의 여부(1:수신,2:수신안함)
 *                      example: 1
 *                  snsId:
 *                      type: integer
 *                      required: false
 *                      description: 소셜아이디
 *                      example: 19203042
 *                  profileImgURL:
 *                      type: string
 *                      required: false
 *                      description: 프로필 이미지 URL
 *                      example: https://www.naver.com
 *
 *      responses:
 *        1000:
 *          description: 성공
 *
 *        2001:
 *          description: 이름을 입력해주세요.
 *
 *        2002:
 *          description: 닉네임을 입력해주세요.
 *
 *        2003:
 *          description: 닉네임은 2~20자리로 입력해주세요.
 *
 *        2004:
 *          description: 성별을 선택해주세요.
 *
 *        2005:
 *          description: 성별형식을 정확하게 입력해주세요.
 *
 *        2006:
 *          description: 핸드폰 번호를 선택해주세요.
 *
 *        2007:
 *          description: 핸드폰 번호을 정확하게 입력해주세요.
 *
 *        2008:
 *          description: 생년월일을 입력해주세요.
 *
 *        2009:
 *          description: 생년월일 형식을 정확하게 입력해주세요.
 *
 *        2010:
 *          description: 이메일을 입력해주세요.
 *
 *        2011:
 *          description: 이메일을 형식을 정확하게 입력해주세요.
 *
 *        2012:
 *          description: 비밀번호를 입력 해주세요.
 *
 *        2013:
 *          description: 비밀번호 형식을 정확하게 입력해주세요.
 *
 *        2016:
 *          description: 이미 존재하는 핸드폰 번호입니다.
 *
 *        2017:
 *          description: 이미 존재하는 이메일입니다.
 *
 *        2018:
 *          description: 푸시알람 입력 형식을 정확하게 입력해주세요.
 *
 * /app/login:
 *  post:
 *      tags:
 *      - users
 *      description: 로그인 API
 *      produces:
 *      - application/json
 *      parameters:
 *        - in: body
 *          name: body
 *          required: true
 *          schema:
 *              type: object
 *              properties:
 *                  email:
 *                      type: string
 *                      required: true
 *                      description: 이메일
 *                      example: cookie-god@softsquared.com
 *                  password:
 *                      type: string
 *                      required: true
 *                      description: 비밀번호
 *                      example: cookie7869
 *
 *      responses:
 *        1000:
 *          description: 성공
 *
 *        2010:
 *          description: 이메일을 입력해주세요.
 *
 *        2011:
 *          description: 이메일을 형식을 정확하게 입력해주세요.
 *
 *        2012:
 *          description: 비밀번호를 입력 해주세요.
 *
 *        2013:
 *          description: 비밀번호 형식을 정확하게 입력해주세요.
 *
 *        2023:
 *          description: 존재하지 않는 이메일입니다.
 *
 *        2024:
 *          description: 비밀번호가 일치하지 않습니다.
 *
 * /app/social-login:
 *  post:
 *      tags:
 *      - users
 *      description: 소셜 로그인 API
 *      produces:
 *      - application/json
 *      parameters:
 *        - in: body
 *          name: body
 *          required: true
 *          schema:
 *              type: object
 *              properties:
 *                  token:
 *                      type: string
 *                      required: true
 *                      description: 카카오 엑세스 토큰
 *                      example: Z5h4KnGSKXjUqtHfJeNCGeeR8qnNdpK9jTLthwopb1UAAAF8v4BlXA
 *
 *      responses:
 *        1000:
 *          description: 성공
 *
 *        2026:
 *          description: 존재하지 않는 회원입니다.
 *
 *        2027:
 *          description: 엑세스 토큰이 없습니다.
 *
 * /app/users/email-find:
 *  post:
 *      tags:
 *      - users
 *      description: 이메일 찾기 API
 *      produces:
 *      - application/json
 *      parameters:
 *        - in: body
 *          name: body
 *          required: true
 *          schema:
 *              type: object
 *              properties:
 *                  phoneNumber:
 *                      type: string
 *                      required: true
 *                      description: 핸드폰 번호
 *                      example: 01022237869
 *
 *      responses:
 *        1000:
 *          description: 성공
 *
 *        2006:
 *          description: 핸드폰 번호를 선택해주세요.
 *
 *        2007:
 *          description: 핸드폰 번호을 정확하게 입력해주세요.
 *
 *        2028:
 *          description: 이메일이 존재하지 않습니다.
 *
 * /app/auto-login:
 *  get:
 *      tags:
 *      - users
 *      description: 이메일 찾기 API
 *      produces:
 *      - application/json
 *      parameters:
 *        - in: header
 *          name: x-access-token
 *          required: true
 *
 *      responses:
 *        1000:
 *          description: 성공
 *
 *        2000:
 *          description: JWT 토큰이 입력되지 않았습니다.
 *
 *        2030:
 *          description: 존재하지 않는 회원입니다.
 *
 *        3000:
 *          description: JWT 토큰 검증 실패했습니다.
 *
 * /app/users-password:
 *  patch:
 *      tags:
 *      - users
 *      description: 비밀번호 변경 API
 *      produces:
 *      - application/json
 *      parameters:
 *        - in: body
 *          name: body
 *          required: true
 *          schema:
 *              type: object
 *              properties:
 *                  phoneNumber:
 *                      type: string
 *                      required: true
 *                      description: 핸드폰 번호
 *                      example: 01012341234
 *                  password:
 *                      type: string
 *                      required: true
 *                      description: 비밀번호
 *                      example: cookie7869
 *
 *                  confirmPassword:
 *                      type: string
 *                      required: true
 *                      description: 확인 비밀번호
 *                      example: cookie7869
 *
 *      responses:
 *        1000:
 *          description: 성공
 *
 *        2006:
 *          description: 핸드폰 번호를 선택해주세요.
 *
 *        2007:
 *          description: 핸드폰 번호을 정확하게 입력해주세요.
 *
 *        2012:
 *          description: 비밀번호를 입력 해주세요.
 *
 *        2013:
 *          description: 비밀번호 형식을 정확하게 입력해주세요.
 *
 *        2014:
 *          description: 확인 비밀번호를 입력 해주세요.
 *
 *        2015:
 *          description: 비밀번호와 확인 비밀번호가 일치하지 않습니다.
 *
 *        2030:
 *          description: 존재하지 않는 회원입니다.
 *
 */