const {DataTypes, UUIDV4} = require('sequelize')

module.exports = (sequelize) => {
    // defino el modelo
    sequelize.define(
      "Type",
      {
        id: {
          type: DataTypes.UUID,
          defaultValue: UUIDV4,
          primaryKey: true,
          autoincrement: true,
          unique: true,
        },
        type: {
          type: DataTypes.STRING,
          allowNull: false,
        },
      },
      {
        timestamps: false,
      }
    );
  };
  