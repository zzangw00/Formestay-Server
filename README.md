## 포미스테이 서버 외주

### Introduction

### Directory Structure
```
📂 config                            
│   ├── AdminBaseResponseStatus.js      
│   ├── baseResponseStatus.js           
│   ├── common.js                       
│   ├── database.js                     
│   ├── express.js                      
│   ├── jwtMiddleware.js                
│   ├── regularExpress.js               
│   ├── response.js                     
│   ├── secret.js                       
│   └── winston.js                      
📂 src                          
└── 📂 app                             # 앱에 대한 코드 작성
│   ├── 📂 User                        # User 관련 코드
│   │   ├── userController.js       
│   │   ├── userDao.js               
│   │   ├── userProvider.js          
│   │   ├── userRoute.js             
│   │   └── userService.js
│   ├── 📂 Enterprise                  # Enterprise 관련 코드
│   │   ├── enterpriseController.js       
│   │   ├── enterpriseDao.js               
│   │   ├── enterpriseProvider.js          
│   │   ├── enterpriseRoute.js             
│   │   └── enterpriseService.js
│   ├── 📂 Program                     # Program 관련 코드
│   │   ├── programController.js       
│   │   ├── programDao.js               
│   │   ├── programProvider.js          
│   │   ├── programRoute.js             
│   │   └── programService.js
│   ├── 📂 WebAdmin                    # WebAdmin 관련 코드
│   │   ├── adminController.js       
│   │   ├── adminDao.js               
│   │   ├── adminProvider.js          
│   │   ├── adminRoute.js             
│   │   └── adminService.js 
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
