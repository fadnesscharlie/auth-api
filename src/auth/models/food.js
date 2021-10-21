'use strict';

module.exports = (sequelize, DataTypes) => sequelize.define('Cakes', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  filling: {
    type: DataTypes.BOOLEAN
  },
  frosting: {
    type: DataTypes.STRING
  }
})
