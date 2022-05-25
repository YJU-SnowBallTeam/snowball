const express = require('express');

const router = express.Router();

// GET / 라우터
router.get('/', (req, res) => {
  res.render('NavBar-New-main/nav.html', { title: 'Express' });
});
// router.get('/nav.css', (req, res) => {
//   res.render('/nav.css', { title: 'Express' });
// });

module.exports = router;
