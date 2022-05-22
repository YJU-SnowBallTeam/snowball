const { User } = require('../models'); // 모델명으로 불러옴
User.create({
  name: '이동현',
  age: 24,
  married: false,
  comment: '자기소개6',
});