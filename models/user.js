'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    // firstname: DataTypes.STRING,
    // lastname: DataTypes.STRING,
    // username: DataTypes.STRING,
    // password: DataTypes.STRING,
    // salt: DataTypes.STRING,
    uuid: {
      type: DataTypes.STRING,
      length: 36,
      unique: true,
      defaultValue: DataTypes.UUIDV4
      },
    username: {
        type: DataTypes.STRING,
        length: 60,
        unique: true,
      },
    password: {
        type: DataTypes.STRING,
      },
    salt: {
        type: DataTypes.STRING
      },
    email: {
        type: DataTypes.STRING,
        validate: {
            isEmail:true,
        }
      },
    lastlogin: {
        type: DataTypes.DATE
      },
    status: {
        type: DataTypes.ENUM,
        values: ['active', 'inactive'],
        defaultValue: 'active'
      },
    created_by: {
        type: DataTypes.INTEGER
      },
  }, {});
  User.associate = function(models) {
    // associations can be defined here
  };
  return User;
};