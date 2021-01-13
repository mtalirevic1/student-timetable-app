const Sequelize = require("sequelize");

module.exports = function(sequelize,DataTypes){
    return sequelize.define("student", {
        ime: {
            type: Sequelize.STRING,
            allowNull: false
        },
        index: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true
        }
    });
};