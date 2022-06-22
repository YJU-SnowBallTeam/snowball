const Sequelize = require('sequelize');

module.exports = class Professor extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
      professorId: { // 교수 아이디
        type: Sequelize.STRING(300),
        primaryKey : true,
        allowNull : false,
        unique : true,
    },
    class: { // 교수 반
        type: Sequelize.STRING(300),
        allowNull: false,
    },
    name: { // 교수 명
        type: Sequelize.STRING(300),
        allowNull: false,
    },
    tell: { // 교수 전화번호
        type: Sequelize.INTEGER,
        unique:true,
        allowNull: false,
      },
    }, {
      sequelize,
      timestamps: false,
      modelName: 'Professor',
      tableName: 'professor',
      paranoid: false,
      charset: 'utf8mb4',
      collate: 'utf8mb4_general_ci',
    });
  }

  static associate(db) {
    // db.Comment.hasMany(db.notice, { foreignKey: 'id', targetKey: 'id' });
    // db.Comment.hasMany(db.professor, { foreignKey: 'id', targetKey: 'id' });

    db.Professor.belongsTo(db.User, { foreignKey: 'professorId', targetKey: 'id' });
  }
};