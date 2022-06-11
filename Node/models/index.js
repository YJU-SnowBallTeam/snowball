const Sequelize = require('sequelize');

const User = require('./user');
const Comment = require('./comment');
const Notice = require('./notice');
const Board = require('./board');
const Professor = require('./professor');
const Qboard = require('./qboard');
const Qcomment = require('./qcomment');
const Schedule = require('./schedule');
const Faq = require('./faq');

const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];
const db = {};

const sequelize = new Sequelize(config.database, config.username, config.password, config);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.User = User;
db.Comment = Comment;
db.Notice = Notice;
db.Board = Board;
db.Professor = Professor;
db.Qboard = Qboard;
db.Qcomment = Qcomment;
db.Faq = Faq;
db.Schedule = Schedule;


User.init(sequelize);
Comment.init(sequelize);
Notice.init(sequelize);
Board.init(sequelize);
Professor.init(sequelize);
Qboard.init(sequelize);
Qcomment.init(sequelize);
Faq.init(sequelize);
Schedule.init(sequelize);

User.associate(db);
Comment.associate(db);
Notice.associate(db);
Board.associate(db);
Professor.associate(db);
Qboard.associate(db);
Qcomment.associate(db);
Faq.associate(db);
Schedule.associate(db);

module.exports = db;