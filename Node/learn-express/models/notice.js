const Sequelize = require('sequelize');

module.exports = class Notice extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
      post_id: {
        type: Sequelize.INTEGER.UNSIGNED,
        // 음수를 포함하지 않음
        primaryKey : true,
        allowNull : false,
        unique : true,
        autoIncrement: true,
    },
    title: {
        type: Sequelize.STRING(45),
        allowNull: false,
    },
    comment: {
      type: Sequelize.STRING(1000),
        allowNull: false,
    },
    noticer: {
      type: Sequelize.STRING(30),
        // foreignKey: 'id', 관계 표시에 표시함
        allowNull: false,
      },
    date: {
      type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
      
    }, {
      sequelize,
      timestamps: false,
      modelName: 'Notice',
      tableName: 'notice',
      paranoid: false,
      charset: 'utf8mb4',
      collate: 'utf8mb4_general_ci',
    });
  }

  static associate(db) {
    // db.Comment.hasMany(db.notice, { foreignKey: 'id', targetKey: 'id' });
    // db.Comment.hasMany(db.professor, { foreignKey: 'id', targetKey: 'id' });
    db.Notice.belongsTo(db.User, { foreignKey: 'noticer', targetKey: 'id' });
  }
};