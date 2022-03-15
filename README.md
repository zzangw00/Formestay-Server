## 포미스테이 서버 외주

### Introduction

소프트스퀘어드 외주 연계로 숙박프로그램 예약 앱 포미스테이의 백엔드 외주를 진행했습니다.

### Directory Structure
```
📂 config                            
│   ├── 📄 AdminBaseResponseStatus.js      
│   ├── 📄 baseResponseStatus.js           
│   ├── 📄 common.js                     
│   ├── 📄 express.js                      
│   ├── 📄 jwtMiddleware.js                
│   ├── 📄 regularExpress.js               
│   ├── 📄 response.js                                          
│   └── 📄 winston.js                      
📂 src                          
├── 📂 app                             
│   ├── 📂 User                        # User 관련 코드
│   │   ├── 📄 userController.js       
│   │   ├── 📄 userDao.js               
│   │   ├── 📄 userProvider.js          
│   │   ├── 📄 userRoute.js             
│   │   └── 📄 userService.js
│   ├── 📂 Enterprise                  # Enterprise 관련 코드
│   │   ├── 📄 enterpriseController.js       
│   │   ├── 📄 enterpriseDao.js               
│   │   ├── 📄 enterpriseProvider.js          
│   │   ├── 📄 enterpriseRoute.js             
│   │   └── 📄 enterpriseService.js
│   ├── 📂 Program                     # Program 관련 코드
│   │   ├── 📄 programController.js       
│   │   ├── 📄 programDao.js               
│   │   ├── 📄 programProvider.js          
│   │   ├── 📄 programRoute.js             
│   │   └── 📄 programService.js
│   ├── 📂 WebAdmin                    # WebAdmin 관련 코드
│   │   ├── 📄 adminController.js       
│   │   ├── 📄 adminDao.js               
│   │   ├── 📄 adminProvider.js          
│   │   ├── 📄 adminRoute.js             
│   │   └── 📄 adminService.js 
├── 📂 swagger                             
│   ├── 📄 enterpriseSwagger.js            
│   ├── 📄 programSwagger.js              
│   └── 📄 userSwagger.js                 
├── 📂 utlis                            
│   └── 📄 security.js                    
├── 📄 .gitignore                        
├── 📄 .gitlab-ci.yml                     
├── 📄 index.js                     	 
├── 📄 package-lock.json              	  
├── 📄 package.json                        
└── 📄 README.md                     
```

### Role

- 서버 구축
- ERD 설계
- API 구현 및 명세서 작성
