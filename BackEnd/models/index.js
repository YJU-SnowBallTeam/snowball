const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const User = require('./user');
const Comment = require('./comment');
const Community = require('./community')
const db = {};

const sequelize = new Sequelize(config.database, config.username, config.password, config);
db.User = User;
db.Comment = Comment;
db.Community = Community


// 각 모델의 static init을 호출, init이 실행되어야 테이블이 모델로 연결(테이블-모델 연결)
User.init(sequelize);
Comment.init(sequelize);
Community.init(sequelize);

// 다른 테이블과 관계를 연결
User.associate(db);
Comment.associate(db);
Community.associate(db);

db.sequelize = sequelize;

module.exports = db;