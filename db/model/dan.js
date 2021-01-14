const Sequelize = require("sequelize");

module.exports = function(sequelize,DataTypes){
    return sequelize.define("dan", {
        naziv: {
            type: Sequelize.STRING,
            allowNull: false
        }
    },{freezeTableName: true});
};