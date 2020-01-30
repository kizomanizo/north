'use strict';
module.exports = (sequelize, DataTypes) => {
    const Level = sequelize.define('Level', {
        uuid: {
            type: DataTypes.STRING,
            length: 36,
            unique: true,
            defaultValue: DataTypes.UUIDV4
        },
        name: {
            type: DataTypes.ENUM,
            values: ['admin', 'chairman', 'member'],
            defaultValue: 'member'
        },
    });
    Level.associate = function(models) {
        // Associate Level model with User model
        Level.belongsToMany(models.User, {
            through: 'UserLevel',
            foreignKey: 'levelId',
            otherKey: 'userId',
        });
    };

    
    return Level;
};