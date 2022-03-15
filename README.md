## 프로젝트 명
* 포미스테이

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
