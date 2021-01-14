const Sequelize = require("sequelize");

module.exports = function(sequelize,DataTypes){
    return sequelize.define("predmet", {
        naziv: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true
        }
    },{freezeTableName: true});
};