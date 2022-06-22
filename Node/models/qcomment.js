const Sequelize = require("sequelize");

module.exports = class Qcomment extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        post_id: { // Q&A 글번호 외래키
          type: Sequelize.INTEGER.UNSIGNED,
          // 음수를 포함하지 않음
          // primaryKey: true,
          allowNull: false,
          unique: false,
          // autoIncrement: true,
        },
        comment_id: { // 기본키, Q&A 댓글번호
          type: Sequelize.INTEGER.UNSIGNED,
          // 음수를 포함하지 않음
          primaryKey: true,
          allowNull: false,
          unique: true,
          autoIncrement: true,
        },
        content: { // Q&A 댓글내용
          type: Sequelize.STRING(300),
          allowNull: false,
        },
        date: { // Q&A 날짜
          type: Sequelize.DATE,
          defaultValue: Sequelize.NOW,
          allowNull: true,
        },
        commenter: { // Q&A 댓글 작성자, user랑 외래키
          type: Sequelize.STRING(300),
          // foreignKey: 'id', 관계 표시에 표시함
          allowNull: false,
        },
      },
      {
        sequelize,
        timestamps: false,
        modelName: "Qcomment",
        tableName: "qcomment",
        paranoid: false,
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci",
      }
    );
  }

  static associate(db) {
    // User테이블의 id와 연결
    db.Qcomment.belongsTo(db.User, { foreignKey: "commenter", targetKey: "id" });
    db.Qcomment.belongsTo(db.Qboard,{ foreignKey: "post_id", targetKey: "post_id" });
  }
};
