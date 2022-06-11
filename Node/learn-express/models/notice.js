const Sequelize = require('sequelize');

module.exports = class Notice extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
      post_id: { // 공지 글번호
        type: Sequelize.INTEGER.UNSIGNED,
        // 음수를 포함하지 않음
        primaryKey : true,
        allowNull : false,
        unique : true,
        autoIncrement: true,
    },
    title: { // 공지 제목
        type: Sequelize.STRING(5000),
        allowNull: false,
    },
    content: { // 공지 내용
      type: Sequelize.STRING(5000),
        allowNull: false,
    },
    noticer: { // 공지 작성자
      type: Sequelize.STRING(300),
        // foreignKey: 'id', 관계 표시에 표시함
        allowNull: false,
      },
    date: { // 공지 작성일
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