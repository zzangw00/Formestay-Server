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
    ENTERPRISE_PATCH_KORNAME_EMPTY: {
        isSuccess: false,
        code: 2509,
        message: '한글 이름을 입력해주세요',
    },
    ENTERPRISE_PATCH_ENGNAME_EMPTY: {
        isSuccess: false,
        code: 2510,
        message: '영어 이름을 입력해주세요',
    },
    ENTERPRISE_PATCH_CATEGORY_EMPTY: {
        isSuccess: false,
        code: 2511,
        message: '카테고리를 입력해주세요',
    },
    ENTERPRISE_PATCH_PHONENUMBER_EMPTY: {
        isSuccess: false,
        code: 2512,
        message: '전화 번호를 입력해주세요',
    },
    ENTERPRISE_PATCH_PRIMELOCATION_EMPTY: {
        isSuccess: false,
        code: 2513,
        message: '대표주소를 입력해주세요',
    },
    ENTERPRISE_PATCH_LOCATION_EMPTY: {
        isSuccess: false,
        code: 2514,
        message: '주소를 입력해주세요',
    },
    ENTERPRISE_PATCH_TAG_EMPTY: {
        isSuccess: false,
        code: 2515,
        message: '태그를 입력해주세요',
    },
    ENTERPRISE_PATCH_DESCRIPTION_EMPTY: {
        isSuccess: false,
        code: 2516,
        message: '설명을 입력해주세요',
    },
    ENTERPRISE_POST_KORNAME_EMPTY: {
        isSuccess: false,
        code: 2517,
        message: '한글 이름을 입력해주세요',
    },
    ENTERPRISE_POST_ENGNAME_EMPTY: {
        isSuccess: false,
        code: 2518,
        message: '영어 이름을 입력해주세요',
    },
    ENTERPRISE_POST_CATEGORY_EMPTY: {
        isSuccess: false,
        code: 2519,
        message: '카테고리를 입력해주세요',
    },
    ENTERPRISE_POST_PHONENUMBER_EMPTY: {
        isSuccess: false,
        code: 2520,
        message: '전화 번호를 입력해주세요',
    },
    ENTERPRISE_POST_PRIMELOCATION_EMPTY: {
        isSuccess: false,
        code: 2521,
        message: '대표주소를 입력해주세요',
    },
    ENTERPRISE_POST_LOCATION_EMPTY: {
        isSuccess: false,
        code: 2522,
        message: '주소를 입력해주세요',
    },
    ENTERPRISE_POST_TAG_EMPTY: {
        isSuccess: false,
        code: 2523,
        message: '태그를 입력해주세요',
    },
    ENTERPRISE_POST_DESCRIPTION_EMPTY: {
        isSuccess: false,
        code: 2524,
        message: '설명을 입력해주세요',
    },
    ENTERPRISE_POST_IMAGE_EMPTY: {
        isSuccess: false,
        code: 2525,
        message: '이미지를 입력해주세요',
    },
    ENTERPRISE_PATCH_WRONG_CATEGORY: {
        isSuccess: false,
        code: 2526,
        message: '정확한 카테고리를 입력해주세요',
    },
    ROOMPRICE_POST_INROOM_EMPTY: {
        isSuccess: false,
        code: 2527,
        message: '인실 정보를 입력해주세요',
    },
    ROOMPRICE_POST_PRICE_EMPTY: {
        isSuccess: false,
        code: 2528,
        message: '가격 정보를 입력해주세요',
    },
    PROGRAM_POST_NAME_EMPTY: {
        isSuccess: false,
        code: 2529,
        message: '프로그램명을 입력해주세요',
    },
    PROGRAM_POST_CHECKIN_EMPTY: {
        isSuccess: false,
        code: 2530,
        message: '체크인 시간을 입력해주세요',
    },
    PROGRAM_POST_CHECKOUT_EMPTY: {
        isSuccess: false,
        code: 2531,
        message: '체크아웃 시간을 입력해주세요',
    },
    PROGRAM_POST_PROGRAMINFO_EMPTY: {
        isSuccess: false,
        code: 2532,
        message: '프로그램 정보를 입력해주세요',
    },
    PROGRAM_POST_MEALINFO_EMPTY: {
        isSuccess: false,
        code: 2533,
        message: '식단 정보를 입력해주세요',
    },
    PROGRAM_POST_TAG_EMPTY: {
        isSuccess: false,
        code: 2534,
        message: '태그를 입력해주세요',
    },
    PROGRAM_POST_DESCRIPTION_EMPTY: {
        isSuccess: false,
        code: 2535,
        message: '설명을 입력해주세요',
    },
    PROGRAM_POST_THUMBNAILURL_EMPTY: {
        isSuccess: false,
        code: 2536,
        message: '이미지를 입력해주세요',
    },
    ADMIN_SIGNUP_ENTERPRISEID_EMPTY: {
        isSuccess: false,
        code: 2537,
        message: '업체 고유번호를 입력 해주세요.',
    },
    ADMIN_SIGNUP_STATUS: {
        isSuccess: false,
        code: 2538,
        message: '관리자만 관계자를 추가할 수 있습니다.',
    },
    ENTERPRISE_POST_STATUS: {
        isSuccess: false,
        code: 2539,
        message: '관리자만 업체를 추가할 수 있습니다.',
    },
    NOT_MATCH_ENTERPRISEID: {
        isSuccess: false,
        code: 2540,
        message: '해당 업체 관계자가 아닙니다.',
    },
    ENTERPRISE_DELETE_STATUS: {
        isSuccess: false,
        code: 2541,
        message: '관리자만 업체를 삭제할 수 있습니다.',
    },
    PROGRAM_POST_ROOMPRICE_EMPTY: {
        isSuccess: false,
        code: 2542,
        message: '가격 정보를 입력해주세요.',
    },
    PROGRAMINFO_PATCH_PROGRAMINFO_EMPTY: {
        isSuccess: false,
        code: 2543,
        message: '프로그램 정보를 입력해주세요.',
    },
    PROGRAMINFO_PATCH_MEALINFO_EMPTY: {
        isSuccess: false,
        code: 2544,
        message: '식단 정보를 입력해주세요.',
    },
    ADMIN_NEW_PASSWORD_EMPTY: {
        isSuccess: false,
        code: 2545,
        message: '새로운 비밀번호를 입력 해주세요.',
    },
    ADMIN_CONFIRM_PASSWORD_EMPTY: {
        isSuccess: false,
        code: 2546,
        message: '확인 비밀번호를 입력 해주세요.',
    },
    ADMIN_NOT_MATCH_PASSWORD: {
        isSuccess: false,
        code: 2547,
        message: '비밀번호가 일치하지 않습니다.',
    },
    ADMIN_NOT_EXIST: {
        isSuccess: false,
        code: 2548,
        message: '존재하지 않는 관리자입니다.',
    },
    ADMIN_NOT_MATCH_ORIGINAL_PASSWORD: {
        isSuccess: false,
        code: 2549,
        message: '기존 비밀번호와 일치하지 않습니다.',
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
    ADMIN_SIGNUP_REDUNDANT_PHONENUMBER: {
        isSuccess: false,
        code: 3504,
        message: '중복된 핸드폰 번호입니다.',
    },
    FIND_NO_EXIST_ADMIN: { isSuccess: false, code: 3505, message: '존재하지 않는 관리자입니다.' },
    ENTERPRISE_PATCH_REDUNDANT_KORNAME: {
        isSuccess: false,
        code: 3506,
        message: '중복된 한글 이름입니다.',
    },
    ENTERPRISE_PATCH_REDUNDANT_ENGNAME: {
        isSuccess: false,
        code: 3507,
        message: '중복된 영어 이름입니다.',
    },
    ENTERPRISE_POST_REDUNDANT_KORNAME: {
        isSuccess: false,
        code: 3508,
        message: '중복된 한글 이름입니다.',
    },
    ENTERPRISE_POST_REDUNDANT_ENGNAME: {
        isSuccess: false,
        code: 3509,
        message: '중복된 영어 이름입니다.',
    },
    ADMIN_SIGNUP_REDUNDANT_ENTERPRISEID: {
        isSuccess: false,
        code: 3510,
        message: '해당 업체에 이미 관계자가 존재합니다.',
    },
    ADMIN_SIGNUP_REDUNDANT_ENTERPRISE: {
        isSuccess: false,
        code: 3511,
        message: '해당 업체가 존재하지 않습니다.',
    },
    //Connection, Transaction 등의 서버 오류
    DB_ERROR: { isSuccess: false, code: 4000, message: '데이터 베이스 에러' },
    SERVER_ERROR: { isSuccess: false, code: 4001, message: '서버 에러' },
};
