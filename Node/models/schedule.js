const Sequelize = require("sequelize");

module.exports = class Schedule extends Sequelize.Model {
    static init(sequelize) {
        return super.init(
            {
                id: {
                    type: Sequelize.INTEGER.UNSIGNED,
                    // 음수를 포함하지 않음
                    primaryKey: true,
                    allowNull: false,
                    unique: true,
                    autoIncrement: true,
                },
                content: {
                    type: Sequelize.STRING(50),
                    allowNull: false,
                },
                /* date는 몇년도 몇월 몇일 */
                date: {
                    primaryKey: true,
                    type: Sequelize.INTEGER.UNSIGNED,
                    allowNull: false,
                },
                /* time은 시간 */
                start_time: {
                    type: Sequelize.INTEGER.UNSIGNED,
                    allowNull: false,
                    // defaultValue: Sequelize.NOW,
                },
                end_time: {
                    type: Sequelize.INTEGER.UNSIGNED,
                    allowNull: false,
                    // defaultValue: Sequelize.NOW,
                },
            },
            {
                sequelize,
                timestamps: false,
                modelName: "Schedule",
                tableName: "schedule",
                paranoid: false,
                charset: "utf8mb4",
                collate: "utf8mb4_general_ci",
            }
        );
    }

    static associate(db) {
        // db.Comment.hasMany(db.notice, { foreignKey: 'id', targetKey: 'id' });
        // db.Comment.hasMany(db.professor, { foreignKey: 'id', targetKey: 'id' });
        db.Board.belongsTo(db.User, { foreignKey: "scheduler", targetKey: "id" });

    }
};