module.exports = {
    // Success
    SUCCESS : { "isSuccess": true, "code": 1000, "message":"성공" },
    BOOKMARK_ENROLL_SUCCESS : { "isSuccess": true, "code": 1001, "message":"찜하기 성공" },
    BOOKMARK_END_SUCCESS : { "isSuccess": true, "code": 1002, "message":"찜 해제 성공" },

    // Common
    TOKEN_EMPTY : { "isSuccess": false, "code": 2000, "message":"JWT 토큰이 입력되지 않았습니다." },
    TOKEN_VERIFICATION_FAILURE : { "isSuccess": false, "code": 3000, "message":"JWT 토큰 검증 실패했습니다." },
    TOKEN_VERIFICATION_SUCCESS : { "isSuccess": true, "code": 1001, "message":"JWT 토큰 검증 성공했습니다." },

    //Request error
    SIGNUP_NAME_EMPTY : { "isSuccess": false, "code": 2001, "message":"이름을 입력해주세요." },
    SIGNUP_NICKNAME_EMPTY : { "isSuccess": false, "code": 2002, "message":"닉네임을 입력해주세요." },
    SIGNUP_NICKNAME_LENGTH : { "isSuccess": false,"code": 2003,"message":"닉네임은 2~20자리로 입력해주세요." },
    SIGNUP_GENDER_EMPTY : { "isSuccess": false,"code": 2004,"message":"성별을 선택해주세요." },
    SIGNUP_GENDER_ERROR_TYPE : { "isSuccess": false, "code": 2005, "message":"성별형식을 정확하게 입력해주세요." },
    SIGNUP_PHONE_NUMBER_EMPTY : { "isSuccess": false,"code": 2006,"message":"핸드폰 번호를 선택해주세요." },
    SIGNUP_PHONE_NUMBER_ERROR_TYPE : { "isSuccess": false, "code": 2007, "message":"핸드폰 번호을 정확하게 입력해주세요." },
    SIGNUP_BIRTHDAY_EMPTY : { "isSuccess": false, "code": 2008, "message":"생년월일을 입력해주세요." },
    SIGNUP_BIRTHDAY_ERROR_TYPE : { "isSuccess": false, "code": 2009, "message":"생년월일 형식을 정확하게 입력해주세요." },
    SIGNUP_EMAIL_EMPTY : { "isSuccess": false, "code": 2010, "message":"이메일을 입력해주세요." },
    SIGNUP_EMAIL_ERROR_TYPE : { "isSuccess": false, "code": 2011, "message":"이메일을 형식을 정확하게 입력해주세요." },
    SIGNUP_PASSWORD_EMPTY : { "isSuccess": false, "code": 2012, "message": "비밀번호를 입력 해주세요." },
    SIGNUP_PASSWORD_ERROR_TYPE : { "isSuccess": false, "code": 2013, "message":"비밀번호 형식을 정확하게 입력해주세요." },
    SIGNUP_CONFIRM_PASSWORD_EMPTY : { "isSuccess": false, "code": 2014, "message": "확인 비밀번호를 입력 해주세요." },
    SIGNUP_NOT_MATCH_PASSWORD : { "isSuccess": false, "code": 2015, "message":"비밀번호와 확인 비밀번호가 일치하지 않습니다." },
    EXIST_PHONE_NUMBER : { "isSuccess": false, "code": 2016, "message":"이미 존재하는 핸드폰 번호입니다." },
    EXIST_EMAIL : { "isSuccess": false, "code": 2017, "message":"이미 존재하는 이메일입니다." },
    SIGNUP_ALARM_ERROR_TYPE : { "isSuccess": false, "code": 2018, "message":"푸시알람 입력 형식을 정확하게 입력해주세요." },
    SIGNIN_ACCESS_TOKEN_EMPTY : { "isSuccess": false, "code": 2027, "message":"엑세스 토큰이 없습니다." },
    EXIST_SNS_ID : { "isSuccess": false, "code": 2029, "message":"이미 소셜 아이디가 존재합니다." },
    ENTERPRISE_CATEGORY_EMPTY : { "isSuccess": false, "code": 2031, "message":"업체 조회 카테고리가 없습니다." },
    ENTERPRISE_CATEGORY_ERROR_TYPE : { "isSuccess": false, "code": 2032, "message":"업체 조회 카테고리 번호가 잘못됐습니다." },
    PAGE_EMPTY : { "isSuccess": false, "code": 2033, "message":"페이지 번호가 없습니다." },
    PAGE_ERROR_TYPE : { "isSuccess": false, "code": 2034, "message":"페이지 번호는 1 이상입니다." },
    ENTERPRISE_ID_EMPTY : { "isSuccess": false, "code": 2035, "message":"업체 아이디가 없습니다." },
    NON_EXIST_ENTERPRISE : { "isSuccess": false, "code": 2036, "message":"존재하지 않는 업체입니다." },
    SEARCH_CONTENT_EMPTY : { "isSuccess": false, "code": 2037, "message":"검색 문구가 비었습니다." },
    PROGRAM_ID_EMPTY : { "isSuccess": false, "code": 2038, "message":"프로그램 아이디가 없습니다." },
    NON_EXIST_PROGRAM : { "isSuccess": false, "code": 2039, "message":"존재하지 않는 프로그램입니다." },
    RESERVATION_TOTAL_PERSON_EMPTY : { "isSuccess": false, "code": 2040, "message":"총 인원수가 없습니다." },
    RESERVATION_START_DATE_EMPTY : { "isSuccess": false, "code": 2041, "message":"시작일이 없습니다." },
    RESERVATION_END_DATE_EMPTY : { "isSuccess": false, "code": 2042, "message":"종료일이 없습니다." },
    RESERVATION_PAYMENT_WAY_EMPTY : { "isSuccess": false, "code": 2043, "message":"결제수단이 없습니다." },
    RESERVATION_ID_EMPTY : { "isSuccess": false, "code": 2044, "message":"예약 아이디가 없습니다." },

    // Response error
    SIGNIN_EMAIL_EMPTY : { "isSuccess": false, "code": 2019, "message": "이메일을 입력해주세요." },
    SIGNIN_EMAIL_ERROR_TYPE : { "isSuccess": false, "code": 2020, "message":"이메일을 형식을 정확하게 입력해주세요." },
    SIGNIN_PASSWORD_EMPTY : { "isSuccess": false, "code": 2021, "message": "비밀번호를 입력 해주세요." },
    SIGNIN_PASSWORD_ERROR_TYPE : { "isSuccess": false, "code": 2022, "message":"비밀번호 형식을 정확하게 입력해주세요." },
    SIGNIN_NO_EXIST_EMAIL : { "isSuccess": false, "code": 2023, "message":"존재하지 않는 이메일입니다." },
    SIGNIN_USERINFO_WRONG : { "isSuccess": false, "code": 2024, "message":"비밀번호가 일치하지 않습니다." },
    SIGNIN_SOCIAL_ERROR_TYPE : { "isSuccess": false, "code": 2025, "message":"카카오 액세스 토큰이 올바르지 않습니다." },
    SIGNIN_NO_EXIST_SOCIAL : { "isSuccess": false, "code": 2026, "message":"존재하지 않는 회원입니다." },
    FIND_NO_EXIST_EMAIL : { "isSuccess": false, "code": 2028, "message":"이메일이 존재하지 않습니다." },
    FIND_NO_EXIST_USER : { "isSuccess": false, "code": 2030, "message":"존재하지 않는 회원입니다." },


 

    //Connection, Transaction 등의 서버 오류
    DB_ERROR : { "isSuccess": false, "code": 4000, "message": "데이터 베이스 에러"},
    SERVER_ERROR : { "isSuccess": false, "code": 4001, "message": "서버 에러"},
 
 
}
