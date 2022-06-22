const Sequelize = require("sequelize");

module.exports = class User extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        id: {
          // user id
          type: Sequelize.STRING(300),
          primaryKey: true,
          allowNull: false,
          unique: true,
          comment: "user id",
        },
        passwd: {
          // user password
          type: Sequelize.STRING(300),
          allowNull: false,
        },
        name: {
          // user name
          type: Sequelize.STRING(200),
          allowNull: false,
        },
        tel: {
          // user tel
          type: Sequelize.INTEGER,
          allowNull: false,
          unique: true,
        },
        grade: {
          // user grade (등급)
          type: Sequelize.STRING(200),
          allowNull: false,
          defaultValue: 1,
        },
        email: {
          // user email
          type: Sequelize.STRING(300),
          allowNull: false,
          unique: true,
        },
        yjuclass: {
          // user yju class(반)
          type: Sequelize.STRING(200),
          allowNull: false,
        },
        github: {
          // user github주소
          type: Sequelize.STRING(300),
          allowNull: true,
          unique: true,
        },
        instagram: {
          // user instagram주소
          type: Sequelize.STRING(300),
          allowNull: true,
          unique: true,
        },
        kakao: {
          // user kakao주소
          type: Sequelize.STRING(300),
          allowNull: true,
          unique: true,
        },
      },
      {
        sequelize,
        timestamps: false,
        modelName: "User",
        tableName: "user",
        paranoid: false,
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci",
      }
    );
  }

  static associate(db) {
    // db.User.hasMany(db.Comment, { foreignKey: 'commenter', sourceKey: 'id' });
    // db.User.hasMany(db.Board, { foreignKey: 'boarder', sourceKey: 'id' });
    // db.User.hasMany(db.Notice, { foreignKey : 'noticer',sourceKey:'id' });
    // db.User.hasMany(db.Professor, { foreignKey: 'professorId', sourceKey : 'id' });

    // 커뮤니티댓글 테이블(Commenter)의 commenter와 연결 n : 1
    db.User.hasMany(db.Comment, { foreignKey: "commenter", sourceKey: "id" });
    // 커뮤니티글 테이블(Board)의 boarder와 연결 n : 1
    db.User.hasMany(db.Board, { foreignKey: "boarder", sourceKey: "id" });
    // 공지글 테이블(Notice)의 noticer와 연결  n : 1
    db.User.hasMany(db.Notice, { foreignKey: "noticer", sourceKey: "id" });
    // 교수 테이블(Professor)의 professorId와 연결 1 : 1
    db.User.hasOne(db.Professor, {
      foreignKey: "professorId",
      sourceKey: "id",
    });
    // Q&A글 테이블(Qboard)의 boarder와 연결 n : 1
    db.User.hasMany(db.Qboard, { foreignKey: "boarder", sourceKey: "id" });
    // Q&A댓글 테이블(Qcomment)의 commenter와 연결 n : 1
    db.User.hasMany(db.Qcomment, { foreignKey: "commenter", sourceKey: "id" });
    // FAQ글 테이블(Faq)의 boarder와 연결 n : 1
    db.User.hasMany(db.Faq, { foreignKey: "boarder", sourceKey: "id" });
  }
};
