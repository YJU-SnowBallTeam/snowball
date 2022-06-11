const Sequelize = require('sequelize');

module.exports = class Qboard extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
      post_id: { // 기본키, Q&A board post_id 글번호
        type: Sequelize.INTEGER.UNSIGNED,
        // 음수를 포함하지 않음
        primaryKey : true,
        allowNull : false,
        unique : true,
        autoIncrement: true,
      },
      comment: { // Q&A 글내용
        type: Sequelize.STRING(1000),
        allowNull: false,
      },
      date: { // Q&A 글작성 날짜
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
      boarder: { // Q&A 글작성자, user랑 외래키
        type: Sequelize.STRING(300),
        allowNull: false,
      },
      title: { // Q&A 글제목
        type: Sequelize.STRING(3000),
        allowNull: false,
      },
    }, {
      sequelize,
      timestamps: false,
      modelName: 'Qboard',
      tableName: 'qboard',
      paranoid: false,
      charset: 'utf8mb4',
      collate: 'utf8mb4_general_ci',
    });
  }

  static associate(db) {
    // User 테이블의 id와 연결 
    db.Qboard.belongsTo(db.User, { foreignKey: "boarder", targetKey: "id" });
    db.Qboard.hasMany(db.Qcomment, { foreignKey: "post_id", sourceKey: "post_id" });
  }
};