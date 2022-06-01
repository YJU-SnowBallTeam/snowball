const Sequelize = require('sequelize');

module.exports = class User extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
      id: {
        type: Sequelize.STRING(30),
        primaryKey : true,
        allowNull : false,
        unique: true,
        comment: "user id",
      },
      passwd: {
        type: Sequelize.STRING(30),
        allowNull: false,
      },
      name: {
        type: Sequelize.STRING(20),
        allowNull: false,
      },
      tel: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique : true,
      },
      grade: {/* 등급 */
        type: Sequelize.STRING(20),
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING(30),
        allowNull: false,
        unique : true,
      },
      yjuclass: {
        type: Sequelize.STRING(20),
        allowNull: false,
      },
      github: {
        type: Sequelize.STRING(30),
        allowNull: true,
        unique : true,
      },
      instagram: {
        type: Sequelize.STRING(30),
        allowNull: true,
        unique : true,
      },
      kakao: {
        type: Sequelize.STRING(30),
        allowNull: true,
        unique : true,
      },
    }, {
      sequelize,
      timestamps: false,
      modelName: 'User',
      tableName: 'user',
      paranoid: false,
      charset: 'utf8mb4',
      collate: 'utf8mb4_general_ci',
    });
  }

  static associate(db) {
    // db.User.hasMany(db.Comment, { foreignKey: 'commenter', sourceKey: 'id' });
    // db.User.hasMany(db.Board, { foreignKey: 'boarder', sourceKey: 'id' });
    // db.User.hasMany(db.Notice, { foreignKey : 'noticer',sourceKey:'id' });
    // db.User.hasMany(db.Professor, { foreignKey: 'professorId', sourceKey : 'id' });
  
    db.User.hasMany(db.Comment, { foreignKey: 'commenter', sourceKey: 'id' });
    db.User.hasMany(db.Board, { foreignKey: 'boarder', sourceKey: 'id' });
    db.User.hasMany(db.Notice, {foreignKey: 'noticer', sourceKey: 'id' });
    db.User.hasOne(db.Professor, { foreignKey: 'professorId', sourceKey: 'id' });

  }
};