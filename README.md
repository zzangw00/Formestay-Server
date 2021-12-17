## 프로젝트 명
* 포미스테이

## 사용언어
	* Node.js

## 내용

	* 템플릿 구조
	* 폴더 구조
	* 실행 명령어


## 템플릿 구조

	* 각 도메인별로 Route / Controller / Service / Provider / Dao 파일이
	* 존재하며 파일명 규칙은 '도메인명 + Route / Controller / Service /
	* Provider / Dao' 입니다.
	* Ex. User 도메인(폴더)안에는 userRoute / userController / userService /
	* userProvider / userDao 파일이 존재합니다.


	1. Route 
	   * 외부에서 요청이 들어오면 해당 요청을 받아서 그에 맞게 적절한 로직을
	   * 가진, 해당 URI와 매핑된 컨트롤러로 요청을 연결해주는 역할을 합니다.


	   2. Controller
	      * Route로부터 받은 요청속의 데이터(path-variable, query-string,
				  * body 등)를 받은 뒤, Service / Provider에게 해당 데이터를
		  * 넘겨주고 비즈니스 로직을 수행하도록 합니다.
		     * 형식적 유효성 검사를 진행합니다(빈 값(또는 null)이
					 * 입력되었는지 등등...).


			 3. Service / Provider
			    * 실제 어플리케이션의 핵심적인 비즈니스로직이 수행되는
				* 영역이다. 그리고 여기서는 트랜잭션, 논리적 유효성 검사를
				* 진행합니다. (Service: 생성, 수정, 삭제, Provider:조회)


	4. Dao
	   * 각각 데이터베이스의 테이블과 1 대 1로 매칭되며, 해당 테이블에 관한
	   * 쿼리가 작성되어 있고, 해당 쿼리들을 실행하는 역할을 합니다. 즉,
	   * 데이터베이스와 실질적으로 연결되어 있는 객체입니다.


## 폴더 구조

	   ```
	   .
	   ├── config                              # 설정 파일들이 들어가 있는
	   폴더
	   │   ├── AdminBaseResponseStatus.js      # 관리자 페이지 기본 결과 응답값
	   │   ├── baseResponseStatus.js           # 앱 기본 결과 응답값
	   │   ├── common.js                       # 공통적으로 쓰이는 함수 파일
	   │   ├── database.js                     # 데이터베이스 관련 설정
	   │   ├── express.js                      # 서버 실행을 위한 미들웨어 설정 파일 
	   │   ├── jwtMiddleware.js                # JWT 검증
	   │   ├── regularExpress.js               # 앱에서 사용되는 정규식들을 정리한 파일
	   │   ├── response.js                     # 응답값 구조
	   │   ├── secret.js                       # 시크릿 키
	   │   ├── winston.js                      # 로거 라이브러리 설정
	   ├── log                                 # 생성된 로그 파일 
	   ├── node_modules                    	   # 노드 모듈  
	   ├── src                                 # 
	   │   ├── app                             # 앱에 대한 코드 작성
	   │   │   ├── User                        # User 관련 코드
	   │   │   │   ├── userController.js       
	   │   │   │   ├── userDao.js               
	   │   │   │   ├── userProvider.js          
	   │   │   │   ├── userRoute.js             
	   │   │   │   ├── userService.js
	   │   │   ├── Enterprise                  # Enterprise 관련 코드
	   │   │   │   ├── enterpriseController.js       
	   │   │   │   ├── enterpriseDao.js               
	   │   │   │   ├── enterpriseProvider.js          
	   │   │   │   ├── enterpriseRoute.js             
	   │   │   │   ├── enterpriseService.js
	   │   │   ├── Program                     # Program 관련 코드
	   │   │   │   ├── programController.js       
	   │   │   │   ├── programDao.js               
	   │   │   │   ├── programProvider.js          
	   │   │   │   ├── programRoute.js             
	   │   │   │   ├── programService.js
	   │   │   ├── WebAdmin                    # WebAdmin 관련 코드
	   │   │   │   ├── adminController.js       
	   │   │   │   ├── adminDao.js               
	   │   │   │   ├── adminProvider.js          
	   │   │   │   ├── adminRoute.js             
	   │   │   │   ├── adminService.js 
	   ├── swagger                             # Swagger 관련 코드
	   │   ├── enterpriseSwagger.js            # Enterprise 관련 스웨거
	   │   ├── programSwagger.js               # Program 관련 스웨거  
	   │   ├── userSwagger.js                  # User 관련 스웨거 
	   ├── utlis                               # utility 함수들을 담은 폴더
	   │   ├── security.js                     # 비밀번호 암호화 관련 함수 파일
       ├── .gitignore                          # git 에 포함되지 않아야 하는
       ├── .gitlab-ci.yml                      # 서버 자동화 배포 CI/CD 설정 파일
       ├── .prettierrc                         # vscode에서 사용하는 플러그인 설정 파일
       ├── index.js                     	   # 서버 시작 파일
       ├── package-lock.json              	   # package.json 이 수정되고 생성될 때 당시 의존성에 대한 정확하고 구체적인 정보를 담은 파일
	   ├── package.json                        # 프로그램 이름, 버전, 필요한 모듈 등 노드 프로그램의 정보를 기술
       └── README.md                           # 사용법 파일
	```

## 실행 명령어

	```
	Nodemon (로컬 작업)
	시작 명령어: nodemon index.js


	PM2 (개발 서버, 실 서버)
	시작 명령어: pm2 start app.js --name "formestay"
	재시작 명령어: pm2 restart "formestay"
	종료 명령어: pm2 stop "formestay"

    CI/CD
    깃작업을 완료한 뒤, main branch에서 push하면 자동 서버 배포 완료
	```

