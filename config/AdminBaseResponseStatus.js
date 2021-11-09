module.exports = {
    // Success
    SUCCESS: { isSuccess: true, code: 1000, message: '성공' },

    // Common
    TOKEN_EMPTY: { isSuccess: false, code: 2000, message: 'JWT 토큰이 입력되지 않았습니다.' },
    TOKEN_VERIFICATION_FAILURE: { isSuccess: false, code: 3000, message: 'JWT 토큰 검증 실패' },
    TOKEN_VERIFICATION_SUCCESS: { isSuccess: true, code: 1001, message: 'JWT 토큰 검증 성공' },

    // Admin Request error
    ADMIN_SIGNUP_EMAIL_EMPTY: { isSuccess: false, code: 2501, message: '이메일을 입력해주세요' },
    ADMIN_SIGNUP_PASSWORD_EMPTY: {
        isSuccess: false,
        code: 2502,
        message: '비밀번호를 입력 해주세요.',
    },
    ADMIN_SIGNUP_NICKNAME_EMPTY: {
        isSuccess: false,
        code: 2503,
        message: '닉네임을 입력 해주세요.',
    },
    ADMIN_SIGNUP_PHONENUMBER_EMPTY: {
        isSuccess: false,
        code: 2504,
        message: '핸드폰 번호를 입력 해주세요.',
    },
    ADMIN_SIGNUP_EMAIL_ERROR_TYPE: {
        isSuccess: false,
        code: 2505,
        message: '이메일을 형식을 정확하게 입력해주세요.',
    },
    ADMIN_SIGNIN_EMAIL_ERROR_TYPE: {
        isSuccess: false,
        code: 2506,
        message: '이메일을 형식을 정확하게 입력해주세요.',
    },
    ADMIN_SIGNIN_EMAIL_EMPTY: { isSuccess: false, code: 2507, message: '이메일을 입력해주세요' },
    ADMIN_SIGNIN_PASSWORD_EMPTY: {
        isSuccess: false,
        code: 2508,
        message: '비밀번호를 입력 해주세요.',
    },

    // Admin Response error
    ADMIN_SIGNUP_REDUNDANT_EMAIL: { isSuccess: false, code: 3501, message: '중복된 이메일입니다.' },
    ADMIN_SIGNUP_REDUNDANT_NICKNAME: {
        isSuccess: false,
        code: 3502,
        message: '중복된 닉네임입니다.',
    },
    ADMIN_SIGNIN_WRONG: {
        isSuccess: false,
        code: 3503,
        message: '아이디 혹은 비밀번호가 틀렸습니다.',
    },
    FIND_NO_EXIST_ADMIN: { isSuccess: false, code: 3504, message: '존재하지 않는 관리자입니다.' },
    //Connection, Transaction 등의 서버 오류
    DB_ERROR: { isSuccess: false, code: 4000, message: '데이터 베이스 에러' },
    SERVER_ERROR: { isSuccess: false, code: 4001, message: '서버 에러' },
};
