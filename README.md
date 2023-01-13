# Project

![header](https://user-images.githubusercontent.com/110670796/212264466-7763fe0e-a676-4a4e-bc0c-3f56117e0676.png)

- Wecode 41기 1st Project

- 솔로라이프를 즐기는 미니멀리즘 30대 남성 고객을 위한 한국 가구 브랜드 IWEA
- [IWEA 시연영상]('https://www.youtube.com/watch?v=F22Yeo5D7hM')

# 개발 인원 및 기간

- 개발기간 : 2022/12/30 ~ 2023/01/13
- 개발인원 : Front-End 4명, Back-End 2명
- Front-End:
  [김성재(ProductManger)](https://github.com/jakesungjaekim),
  [김철호](https://github.com/CheolhoKim-1105),
  [임가림](https://github.com/galimii),
  [김우성](https://github.com/raincastle1211)

- Back-End :
  [김가은(ProjectManager)](https://github.com/gaeung),
  [심예윤](https://github.com/yeyunny)

# 담당 티켓

## Front-End

### 김성재

`HomePage Page`, `ProductsPage`, `Pagination`

### 김철호

`LogInPage`, `SignUpPage`, `CartsPage`, `Header`

### 임가림

`ProductDetailPage`, `PaymentPage`, `SideModal`

### 김우성

`Footer 레이아웃`, `CartPage 레이아웃`

## Back-End

### 김가은

`signup`, `signin`, `products`, `carts`, `orders`, `pagination`, `error handling`

### 심예윤

`DB작업`, `CSV작업`, `userInfo`, `products`, `orders`

# 적용기술

- Front-End : <img src="https://img.shields.io/badge/Javscript-F7DF1E?style=flat&logo=javascript&logoColor=white"/> <img src="https://img.shields.io/badge/React.js-61DAFB?style=flat&logo=React&logoColor=white"/> <img src="https://img.shields.io/badge/sass-CC6699?style=flat&logo=sass&logoColor=white"/> <img src="https://img.shields.io/badge/React Router-CA4245?style=flat&logo=ReactRouter&logoColor=white"/>
- Back-End : <img src="https://img.shields.io/badge/Node.js-339933?style=flat&logo=Node.js&logoColor=white"/> <img src="https://img.shields.io/badge/Express-000000?style=flat&logo=Express&logoColor=white"/> <img src="https://img.shields.io/badge/MySQL-4479A1?style=flat&logo=MySQL&logoColor=white"/><img src="https://img.shields.io/badge/JWT-CC6699?style=flat&logo=JSON&logoColor=white"/> <img src="https://img.shields.io/badge/Bcrypt-CA424?style=flat&logo=Bcrypt&logoColor=white"/>

- common : <img src="https://img.shields.io/badge/Git-F05032?style=flat&logo=Git&logoColor=white"/> <img src="https://img.shields.io/badge/GitHub-181717?style=flat&logo=GitHub&logoColor=white"/> <img src="https://img.shields.io/badge/AWS-232F3E?style=flat&logo=AmazonAWS&logoColor=white"/> <img src="https://img.shields.io/badge/ESLint-4B32C3?style=flat&logo=eslint&logoColor=white"/> <img src="https://img.shields.io/badge/Prettier-F7B93E?style=flat&logo=prettier&logoColor=white"/> <img src="https://img.shields.io/badge/RestfulAPI-F7533E?style=flat&logo=RestfulAPII&logoColor=white"/>

- 협업툴 : <img src="https://img.shields.io/badge/Notion-000000?style=flat&logo=Notion&logoColor=white"/> <img src="https://img.shields.io/badge/Slack-4A154B?style=flat&logo=Slack&logoColor=white"/> <img src="https://img.shields.io/badge/Trello-0052CC?style=flat&logo=Trello&logoColor=white"/>

# DB 모델링

![DB](https://user-images.githubusercontent.com/110670796/212265313-727612b2-3427-457b-ba9e-6040701d63da.png)

<br >

# API Documentation

![POSTMAN](https://user-images.githubusercontent.com/110670796/212265342-e3c0d053-5297-4c95-a01f-014c9be1ef44.png)

<br >

- POSTMAN : https://documenter.getpostman.com/view/24997837/2s8ZDR869T

<br >

# 구현 기능

## Front-End

### Home Page

- Home Layout (Flexbox, Grid 사용)
- Prouct Page / Login Page / SignUp Page로 이동할 수 있게 useNavigate사용

### Nav

- 장바구니 관련 내용 넣기

### Footer

상수데이터를 활용한 레이아웃 구현

### Login, SignUp

- 유효성 검사, 유효성 여부에 의한 레이아웃 변화

### Products

- 상품 데이터 불러오기

- 캐러셀 기능을 담은 카테고리 , 그림을 눌렀을 때 정렬상품 재 렌더링

- 필터조건에따라서 버튼을 눌렀을 때 정렬상품 재 렌더링

- 페이지네이션 버튼을 눌렀을 때 12장씩 더 불러오기

- 장바구니 버튼 눌렀을 때 Carts DB에 전송하기

### ProductDetail

- 특정 상품 데이터 불러오기

- 캐러셀형태로 상품 추천 섹션 불러오기

- 장바구니로 데이터 전송하기

### Cart

- 상품 수량 변경, 삭제 기능

- 품목 별 가격을 모두 더한 총 가격 표시

- 결제하기 버튼 누르면 모달창으로 포인트차감

### Payment

- 구매한 내역 데이터로 불러서 렌더링하기

## Back-End

### `users`

- **회원가입**: 정규표현식을 사용하여 비밀번호의 보안성을 높임. Bcypt를 사용하여 비밀번호를 암호화하여 DB에 저장
- **로그인**: 암호화되어 저장된 비밀번호를 복호화하여 유저가 입력한 비밀번호와 DB 내 저장된 비밀번호를 비교하고, 로그인 성공 시 JWT를 발급
- **유저 정보 불러오기**: JWT 토큰을 사용하여 해당 유저의 이름과 보유하고 있는 포인트를 조회

### `products`

- **전체 상품 불러오기**: OFFSET, LIMIT을 사용하여 Pagination을 구현하였고, 한 메소드 내에서 Filtering과 Ordering이 동시에 구현.
- **상세 페이지**(한 상품 불러오기): 한 상품의 세부 정보들을 볼 수 있도록 함

### `carts`

모든 API에서 JWT 사용하여 유저 확인

- **장바구니 목록**: 해당 유저의 장바구니 목록을 조회.
- **장바구니 넣기**: UPSERT 구문을 사용하여 한 쿼리 내에서 INSERT와 UPDATE가 동시에 이루어지도록 한 메소드 내에서 구현.
- **수량 변경**: 장바구니 내 상품의 수량이 변경되는 것이 DB에 바로 UPDATE 될 수 있도록 구현.
- **장바구니 빼기**: 한 개 혹은 한 개 이상의 상품을 장바구니에서 삭제하는 것을 한 메소드에서 구현.

### `orders`

모든 API에서 JWT 사용하여 유저 확인

- **결제 완료**: 주문이 이루어진 후의 쿼리들을 트랜잭션을 사용하여 DB 내 데이터의 CRUD가 부분적으로 실행되거나 중단되지 않도록 안정성을 보장.
- **결제 취소**: 결제 취소 후 환불까지의 쿼리를 트랜잭션을 사용하여 DB 데이터의 안정성을 보장.
- **주문 목록**: 해당 유저의 모든 주문 목록을 조회함.

# 관련 링크

- [Front-End GitHub Repo](https://github.com/wecode-bootcamp-korea/41-1st-IWEA-frontend)

- [Back-End GitHub Repo](https://github.com/wecode-bootcamp-korea/41-1st-IWEA-backend)
