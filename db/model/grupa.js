const Sequelize = require("sequelize");

module.exports = function(sequelize,DataTypes){
    return sequelize.define("grupa", {
        naziv: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true
        }
    },{freezeTableName: true});
};