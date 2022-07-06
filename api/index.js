const express = require('express');
const router = express.Router();
const request = require('request');

router.use(express.json());

router.get('/yna', (req, res) => {
  // 파일 전달
  res.sendFile(__dirname + '/data.json', (err) => {
    if (err) {
      res.sendStatus(400);
    } else {
      console.log('sending completed!')
    }
  })
});

router.get('/images/:page', (req, res) => {
  const options = {
    url: `https://picsum.photos/v2/list?page=${req.params.page}&limit=18`,
    method: 'GET',
    encoding: null
  };

  request(options, (err, response, body) => {
    // 받아온 응답의 content-type을 그대로 사용
    res.set('Content-Type', response.headers['content-type']);
    res.send(body);
  })
})

// POST 요청 예시
// http://localhost:3000/api/bar?name=pee&address=poo&age=27
router.route('/bar')
  .get((req, res) => {
    // 받은 데이터 그대로 json 변환 및 반환
    res.json(req.query);
  })
  .post((req, res) => {
    // 필수항목 체크
    const nameAry = ['id', 'name', 'address'];
      failed = nameAry.some(v => !req.body[v]);
    
    if (failed) {
      res.sendStatus(400);
    } else {
      res.sendStatus(200);
    }
  });

  module.exports = router;