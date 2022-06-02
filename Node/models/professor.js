const Sequelize = require('sequelize');

module.exports = class Professor extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
      professorId: {
        type: Sequelize.STRING(30),
        primaryKey : true,
        allowNull : false,
        unique : true,
    },
    class: {
        type: Sequelize.STRING(30),
        allowNull: false,
    },
    name: {
        type: Sequelize.STRING(30),
        allowNull: false,
    },
    tell: {
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