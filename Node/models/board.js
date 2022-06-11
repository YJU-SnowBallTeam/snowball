const Sequelize = require("sequelize");

module.exports = class Board extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        post_id: { // 커뮤니티 글번호
          type: Sequelize.INTEGER.UNSIGNED,
          // 음수를 포함하지 않음
          primaryKey: true,
          allowNull: false,
          unique: true,
          autoIncrement: true,
        },
        title: { // 커뮤니티 글제목
          type: Sequelize.STRING(3000),
          allowNull: false,
        },
        content: { // 커뮤니티 글내용
          type: Sequelize.STRING(3000),
          allowNull: false,
        },
        date: { // 커뮤니티 글작성일
          type: Sequelize.DATE,
          allowNull: true,
          defaultValue: Sequelize.NOW,
        },
        boarder: { // 커뮤니티 글작성자
          type: Sequelize.STRING(300),
          // foreignKey: 'id', 관계 표시에 표시함
          allowNull: false,
        },
        // view_count: { // 커뮤니티 글조회수
        //   type: Sequelize.INTEGER.UNSIGNED,
        //   allowNull: true,
        //   // defaultValue: Sequelize.NOW,
        // },
      },
      {
        sequelize,
        timestamps: false,
        modelName: "Board",
        tableName: "board",
        paranoid: false,
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci",
      }
    );
  }

  static associate(db) {
    // db.Comment.hasMany(db.notice, { foreignKey: 'id', targetKey: 'id' });
    // db.Comment.hasMany(db.professor, { foreignKey: 'id', targetKey: 'id' });
    db.Board.belongsTo(db.User, { foreignKey: "boarder", targetKey: "id" });
    db.Board.hasMany(db.Comment, { foreignKey: "post_id", sourceKey: "post_id" });
  }
};
