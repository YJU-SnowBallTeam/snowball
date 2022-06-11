const Sequelize = require('sequelize');

module.exports = class Faq extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
      post_id: { // 기본키, FAQ 글번호
        type: Sequelize.INTEGER.UNSIGNED,
        // 음수를 포함하지 않음
        primaryKey : true,
        allowNull : false,
        unique : true,
        autoIncrement: true,
      },
      question: { // FAQ 글제목
      type: Sequelize.STRING(5000),
        allowNull: false,
      },
      answer: { // FAQ 질문
        type: Sequelize.STRING(5000),
        allowNull: false,
      },
      date: { // FAQ 글 작성일
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
      boarder: { // FAQ 글작성자, user랑 외래키
        type: Sequelize.STRING(300),
        allowNull: false,
      },
    }, {
      sequelize,
      timestamps: false,
      modelName: 'Faq',
      tableName: 'faq',
      paranoid: false,
      charset: 'utf8mb4',
      collate: 'utf8mb4_general_ci',
    });
  }

  static associate(db) {
    db.Faq.belongsTo(db.User, {foreignKey: 'boarder', targetKey: 'id'});
  }
};