const Sequelize = require('sequelize');

module.exports = class User extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
      id: {
        type: Sequelize.STRING(30),
        primaryKey : true,
        allowNull : false,
        unique : true,
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
      grade: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING(30),
        allowNull: false,
        unique : true,
      },
      class: {
        type: Sequelize.STRING(10),
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
    // db.Comment.hasMany(db.notice, { foreignKey: 'id', targetKey: 'id' });
    // db.Comment.hasMany(db.professor, { foreignKey: 'id', targetKey: 'id' });
  }
};