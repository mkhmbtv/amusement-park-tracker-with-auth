'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    emailAddress: {
      allowNull: false,
      type: DataTypes.STRING(255),
      unique: true
    },
    firstName: {
      allowNull: false,
      type: DataTypes.STRING(50)
    },
    lastName: {
      allowNull: false,
      type: DataTypes.STRING(50)
    },
    hashedPassword: {
      allowNull: false,
      type: DataTypes.STRING.BINARY
    },
  }, {});
  User.associate = function(models) {
    User.hasMany(models.AttractionVisit, {
      as: 'visits',
      foreignKey: 'userId',
    });
  };
  return User;
};