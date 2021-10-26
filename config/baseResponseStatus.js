module.exports = {
    // Success
    SUCCESS : { "isSuccess": true, "code": 1000, "message":"성공" },

    // Common
    TOKEN_EMPTY : { "isSuccess": false, "code": 2000, "message":"JWT 토큰이 입력되지 않았습니다." },
    TOKEN_VERIFICATION_FAILURE : { "isSuccess": false, "code": 3000, "message":"JWT 토큰 검증 실패" },
    TOKEN_VERIFICATION_SUCCESS : { "isSuccess": true, "code": 1001, "message":"JWT 토큰 검증 성공" },

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

    // Response error
    SIGNIN_EMAIL_EMPTY : { "isSuccess": false, "code": 2019, "message": "이메일을 입력해주세요." },
    SIGNIN_EMAIL_ERROR_TYPE : { "isSuccess": false, "code": 2020, "message":"이메일을 형식을 정확하게 입력해주세요." },
    SIGNIN_PASSWORD_EMPTY : { "isSuccess": false, "code": 2021, "message": "비밀번호를 입력 해주세요." },
    SIGNIN_PASSWORD_ERROR_TYPE : { "isSuccess": false, "code": 2022, "message":"비밀번호 형식을 정확하게 입력해주세요." },
    SIGNIN_NO_EXIST_EMAIL : { "isSuccess": false, "code": 2023, "message":"존재하지 않는 이메일입니다." },
    SIGNIN_USERINFO_WRONG : { "isSuccess": false, "code": 2024, "message":"비밀번호가 일치하지 않습니다." },
    SIGNIN_SOCIAL_ERROR_TYPE : { "isSuccess": false, "code": 2025, "message":"카카오 액세스 토큰이 올바르지 않습니다." },
    SIGNIN_NO_EXIST_SOCIAL : { "isSuccess": false, "code": 2026, "message":"존재하지 않는 회원입니다." },

 

    //Connection, Transaction 등의 서버 오류
    DB_ERROR : { "isSuccess": false, "code": 4000, "message": "데이터 베이스 에러"},
    SERVER_ERROR : { "isSuccess": false, "code": 4001, "message": "서버 에러"},
 
 
}
