// 위에서부터 실행하므로 404코드는 맨 아래로 보내야함에 유의.
// 자신보다 아래에 정의된 페이지를 포함한 모든 미정의 페이지에 에러를 유발한다.

// TEST CASE 1
// express module 미사용시
// const http = require('http');
// const server = http.createServer((req, res) => {
//   res.writeHead(200, { 'Content-type': 'text/plain' });
//   res.end('Hello World!');
// });
// server.listen(3000, () => {
//   console.log('server started! port 3000')
// });

// TEST CASE 2
// ***************************공용****************************
const express = require('express');
const app = express();
// pass지정
const path = require('path');

app.listen(3000, () => {
  console.log('Server Started! Port 3000')
});

app.all('/*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});
// *************************공용끝*****************************

// localhost:PORT_NUMBER로 접속하면 나올 곳 설정.
// static: 정적파일이 모여있는 루트 경로 전달
// __dirname : app.js 루트 반환
// 즉 여기선 전체 경로 ROOT/public의 index.html 반환. 파일명이 반드시 "index.html"이어야 한다.
app.use(express.static(path.join(__dirname, 'public')));


// *****
// JSON Parser 미들웨어
app.use(express.json())

// GET요청 받기
app.get('/pen', (req, res, next) => {
  res.json({ maessage: 'this is a pen' });
})

// GET에서 송신한 URL 매개변수 수신
// /search?color=red&size=small
app.get('/search', (req, res, next) => {
  console.log(req.query.color); // red
  console.log(req.query.size); // small
})
// *****


// 동일경로 유형별 전송
// app.route('/ADDRESS')
//   .get((req, res) => {
//     // GET
//   })
//   .post((req, res) => {
//     // POST
//   })
//   .put((req, res) => {
//     // PUT
//   })
//   .delete((req, res) => {
//     // DELETE
//   });


// *****
// 미들웨어 사용
// 파일명 index.js에 주의
// 기본주소 localhost:PORT_NUMBER/api/REQUEST_ADDRESS
const api = require('./api/');
console.log(api);
app.use('/api', api);
// 기타 리퀘스트 에러
// 순서상 맨 아래에 와야함. 맨위에 위치해있으면 모든 페이지에 error 발생시킴.
// 위에서부터 읽어들이기 때문.
app.use((req, res) => {
  console.log('error!')
  res.sendStatus(404);
})
// *****