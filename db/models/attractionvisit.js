'use strict';
module.exports = (sequelize, DataTypes) => {
  const AttractionVisit = sequelize.define('AttractionVisit', {
    visitedOn: {
      allowNull: false,
      type: DataTypes.DATEONLY
    },
    rating: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    comments: {
      type: DataTypes.TEXT
    }
  }, {});
  AttractionVisit.associate = function(models) {
    AttractionVisit.belongsTo(models.Attraction, {
      as: 'attraction',
      foreignKey: 'attractionId',
    });
    AttractionVisit.belongsTo(models.User, {
      as: 'user',
      foreignKey: 'userId',
    });
  };
  return AttractionVisit;
};