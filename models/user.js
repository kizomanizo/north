'use strict';
var bcrypt = require('bcryptjs');
module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        uuid: {
            type: DataTypes.STRING,
            length: 36,
            unique: true,
            defaultValue: DataTypes.UUIDV4
        },
        email: {
            type: DataTypes.STRING,
            validate: {
                isEmail:true,
            }
        },
        password: {
            type: DataTypes.STRING,
        },
        salt: {
            type: DataTypes.STRING
        },
        lastlogin: {
            type: DataTypes.DATE
        },
        status: {
            type: DataTypes.ENUM,
            values: ['active', 'inactive'],
            defaultValue: 'inactive'
        },
        created_by: {
            type: DataTypes.INTEGER
        },
    },  
    {
    hooks: {
        // This hook hashes the password before saving it, it also saves the salt
        beforeCreate: async function(user) {
            const salt = await bcrypt.genSalt(10); //whatever number you want
            user.salt = salt;
            user.password = await bcrypt.hash(user.password, salt);
        }
    }
});
    // Working password hash authenticator
    User.prototype.validPassword = async function(password) {
        return await bcrypt.compare(password, this.password);
    };

    User.associate = function(models) {
        // Associate User model with Level model
        User.belongsToMany(models.Level, {
            through: 'UserLevel',
            foreignKey: 'userId',
            otherKey: 'levelId',
        });
    };

    return User;
};