const Sequelize = require('sequelize');

module.exports = class register extends Sequelize.Model { // User 모델을 만들고 모듈로 exports함(User 모델은 Sequelize.Model을 확장한 클래스)
    static init(sequelize){ // 테이블에 대한 설정 <-> static associate: 다른 모델과의 관계
        return super.init({ // super.init의 첫 번째 인수: 테이블에 대한 컬럼 설정
            Id: {
                type: Sequelize.STRING(20), // STRING: MySQL의 VARCHAR 
                allowNull: false, // allowNull: MySQL의 NOT NULL
                 // unique: MySQL의 UNIQUE
                primaryKey: true
            },
            Pw: {
                type: Sequelize.INTEGER.UNSIGNED, // INTEGER: MySQL의 INT
                                // UNSIGNED 양의 정수만 가능
                allowNull: false,
            },
            Name: {
                type: Sequelize.STRING(20), // BOOLEAN: MySQL의 TINYINT
                allowNull: false,
            },
            Tel: {
                type: Sequelize.STRING(20),
                allowNull: false,
            },
            EMail: {
                type: Sequelize.STRING(100), // DATE: MySQL의 DATETIME
                allowNull: false,
                 // defaultValue: MySQL의 default, Sequelize.NOW: MySQL의 now()
            },
            Class: {
                type: Sequelize.STRING(10), // DATE: MySQL의 DATETIME
                allowNull: false,
                defaultValue: "WD-J", // defaultValue: MySQL의 default, Sequelize.NOW: MySQL의 now()
            }
            
        }, {  // super.init의 두 번째 인수: 테이블 자체에 대한 설정(테이블 옵션)
            sequelize, // static init 메서드의 매개변수와 연결되는 옵션, db.sequelize 객체를 넣어야 함 -> 추후에 models/index.js에서 연결
            timestamps: false, // true: Sequelize가 자동으로 createdAt과 updatedAt 컬럼을 추가
            underscored: false, // true: create_at같이(스네이크 케이스), false: createdAt같이(캐멀 케이스) 
            modelName: 'Register', // 모델 이름
            tableName: 'register', // 테이블 이름
            paranoid: false, // 컬럼을 지워도 완전히 지워지지 않고 deletedAt이라는 컬럼이 생김(지운 시각이 기록됨)
            charset: 'utf8', // 한글 입력, 이모티콘까지 입력: utf8mb4
            collate: 'utf8_general_ci', // 한글 입력, 이모티콘까지 입력: utf8mb4_general_ci
        });
    
    }
    
//     static associate(db){ // 다른 모델과의 관계 <-> static init: 테이블에 대한 설정
//         db.User.hasMany(db.Comment, { foreignKey: 'commenter', sourceKey: 'id'});
// }
    static associate(db){
        
    }
}