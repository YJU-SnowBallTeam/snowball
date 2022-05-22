const Sequelize = require('sequelize');

module.exports = class Comment extends Sequelize.Model {
    static init(sequelize){
        return super.init({
            comment: {
                type: Sequelize.STRING(100),
                allowNull: false,
            },
            created_at: {
                type: Sequelize.DATE,
                allowNull: true,
                defaultVlue: Sequelize.NOW,
            },
            word: {
                type: Sequelize.STRING(1000),
                allowNull: false
            }
        }, {
            sequelize,
            timestamps: false,
            modelName: 'Community',
            tableName: 'community',
            paranoid: false,
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci',
        });
    }
    static associate(db){}
};