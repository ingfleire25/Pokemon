const {DataTypes} = require('sequelize')

module.exports = (sequelize) =>{
    sequelize.define(
        'Type',
        {
            ID:{
                type: DataTypes.INTEGER,
                primaryKey: true,
            },
            Nombre:{
                type: DataTypes.STRING,
                allowNull: false,
            },

        },
        {
            timestamps: false,
        }
    );
}