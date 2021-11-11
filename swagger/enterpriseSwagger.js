/**
 * @swagger
 *
 * /app/best-enterprises:
 *  get:
 *      tags:
 *      - enterprises
 *      description: 대표 업체 조회 API
 *
 *      responses:
 *          1000:
 *              description: 성공
 *
 * /app/enterprises:
 *  get:
 *      tags:
 *      - enterprises
 *      description: 업체 조회 API
 *      produces:
 *      - application/json
 *      parameters:
 *          - in: query
 *            name: category
 *            schema:
 *              type: Integer
 *            required: true
 *            example: 0
 *            description: 0은 모두보기, 1은 단식원, 2는 템플스테이, 3은 힐링캠프, 4는 산후조리원 입니다.
 *
 *          - in: query
 *            name: page
 *            schema:
 *              type: Integer
 *            required: true
 *            example: 1
 *            description: 1부터 입력해주세요. 10개씩 페이징 처리되었습니다.
 *
 *      responses:
 *          1000:
 *              description: 성공
 *
 *          2031:
 *              description: 업체 조회 카테고리가 없습니다.
 *
 *          2032:
 *              description: 업체 조회 카테고리 번호가 잘못됐습니다.
 *
 *          2033:
 *              description: 페이지 번호가 없습니다.
 *
 *          2034:
 *              description: 페이지 번호는 1 이상입니다.
 *
 *
 * /app/enterprises/{enterpriseId}:
 *  get:
 *      tags:
 *      - enterprises
 *      description: 업체 상세 조회 API
 *      produces:
 *      - application/json
 *      parameters:
 *        - in : path
 *          name: enterpriseId
 *          schema:
 *             type: Integer
 *          required: true
 *          example: 1
 *          description: 업체 아이디
 *
 *      responses:
 *        1000:
 *          description: 성공
 *
 *        2035:
 *          description: 업체 아이디가 없습니다.
 *
 *        2036:
 *          description: 존재하지 않는 업체입니다.
 *
 * /app/enterprises-search:
 *  get:
 *      tags:
 *      - enterprises
 *      description: 업체 검색 API
 *      produces:
 *      - application/json
 *      parameters:
 *          - in: query
 *            name: content
 *            schema:
 *              type: string
 *            required: true
 *            example: 하우스
 *            description: 검색내용
 *
 *          - in: query
 *            name: page
 *            schema:
 *              type: Integer
 *            required: true
 *            example: 1
 *            description: 1부터 입력해주세요. 10개씩 페이징 처리되었습니다.
 *
 *      responses:
 *          1000:
 *              description: 성공
 *
 *          2033:
 *              description: 페이지 번호가 없습니다.
 *
 *          2034:
 *              description: 페이지 번호는 1 이상입니다.
 *
 *          2037:
 *              description: 검색 문구가 비었습니다.
 *
 * /app/bookmarks:
 *  get:
 *      tags:
 *      - enterprises
 *      description: 찜 목록 조회 API
 *      produces:
 *      - application/json
 *      parameters:
 *          - in: header
 *            name: x-access-token
 *            required: true
 *            example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWR4IjozNywiaWQiOiJrb29raXN1bmciLCJwdyI6IjkxNmNiNGRmYWUzNDJhNTM4ZjA2NjBiN2IyYjUyZTNkOTY2NmQzOTBmZjMxMTgzYWM4YTJhNzkzZThiYmUxZTc5ZGI5Mjc5ZjczODBlYmNhZGI0OGY3YmE2ZWM3NzhiMDZlOTFlZWNiZDgyZTMxZTViNGEwODZkZjRlZGZkZjVkIiwiaWF0IjoxNjEwNTg5OTQ4LCJleHAiOjE2MTU3NzM5NDgsInN1YiI6InVzZXJJbmZvIn0.74H9MLRWsHnG2tKKZtsdI55aul6qIEu97BQxyqeBTX0
 *
 *      responses:
 *          1000:
 *              description: 성공
 *
 *          2000:
 *              description: JWT 토큰이 입력되지 않았습니다.
 *
 *          3000:
 *              description: JWT 토큰 검증 실패했습니다.
 *
 */