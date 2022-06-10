const Sequelize = require("sequelize");

module.exports = class Comment extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        post_id: {
          type: Sequelize.INTEGER.UNSIGNED,
          // 음수를 포함하지 않음
          // primaryKey: true,
          allowNull: false,
          unique: false,
          // autoIncrement: true,
        },
        comment_id: {
          type: Sequelize.INTEGER.UNSIGNED,
          // 음수를 포함하지 않음
          primaryKey: true,
          allowNull: false,
          unique: true,
          autoIncrement: true,
        },
        content: {
          type: Sequelize.STRING(300),
          allowNull: false,
        },
        date: {
          type: Sequelize.DATE,
          defaultValue: Sequelize.NOW,
          allowNull: true,
        },
        commenter: {
          type: Sequelize.STRING(30),
          // foreignKey: 'id', 관계 표시에 표시함
          allowNull: false,
        },
        like_count: {
          type: Sequelize.INTEGER.UNSIGNED,
          defaultValue: 0,
          allowNull: true,
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
    // db.Comment.hasMany(db.notice, { foreignKey: 'id', targetKey: 'id' });
    // db.Comment.hasMany(db.professor, { foreignKey: 'id', targetKey: 'id' });

    db.Comment.belongsTo(db.User, { foreignKey: "commenter", targetKey: "id" });
    db.Comment.belongsTo(db.Board, {
      foreignKey: "post_id",
      targetKey: "post_id",
    });
  }
};
