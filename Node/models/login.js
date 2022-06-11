const Sequelize = require('sequelize');

module.exports = class Login extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            id: {
                type: Sequelize.STRING(300),
                primaryKey : true,
                allowNull : false,
                unique : true,
              },
            passwd: {
                type: Sequelize.STRING(300),
                allowNull: false,
            },
            
        }, {
            sequelize,
            timestamps: false,
            modelName: 'Login',
            tableName: 'login',
            paranoid: false,
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci',
        });
    }

    static associate(db) {
        // db.Comment.hasMany(db.notice, { foreignKey: 'id', targetKey: 'id' });
        // db.Comment.hasMany(db.professor, { foreignKey: 'id', targetKey: 'id' });
    }
};