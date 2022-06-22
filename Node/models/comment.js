const Sequelize = require("sequelize");

module.exports = class Comment extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        post_id: { // 커뮤니티 글 번호 외래키
          type: Sequelize.INTEGER.UNSIGNED,
          allowNull: false,
          unique: false,
    
        },
        comment_id: { // 커뮤니티 댓글 글번호
          type: Sequelize.INTEGER.UNSIGNED,
          primaryKey: true,
          allowNull: false,
          unique: true,
          autoIncrement: true,
        },
        content: { // 커뮤니티 댓글 내용
          type: Sequelize.STRING(300),
          allowNull: false,
        },
        date: { // 커뮤니티 댓글 작성일
          type: Sequelize.DATE,
          defaultValue: Sequelize.NOW,
          allowNull: true,
        },
        commenter: { // 커뮤니티 댓글 작성자
          type: Sequelize.STRING(300),
          allowNull: false,
        },
      },
      {
        sequelize,
        timestamps: false,
        modelName: "Comment",
        tableName: "comment",
        paranoid: false,
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci",
      }
    );
  }

  static associate(db) {
    db.Comment.belongsTo(db.User, { foreignKey: "commenter", targetKey: "id" });
    db.Comment.belongsTo(db.Board, { foreignKey: "post_id", targetKey: "post_id" });
  }
};
