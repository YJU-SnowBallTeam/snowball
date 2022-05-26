const Sequelize = require('sequelize');

const User = require('./user');
const Comment = require('./comment');
const Notice = require('./notice')
const Board = require('./board')
const Professor = require('./professor')


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

User.init(sequelize);
Comment.init(sequelize);
Notice.init(sequelize);
Board.init(sequelize);
Professor.init(sequelize);

// User.associate(db);
// Comment.associate(db);

module.exports = db;