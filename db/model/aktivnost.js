const Sequelize = require("sequelize");

module.exports = function (sequelize, DataTypes) {
    return sequelize.define("aktivnost", {
        naziv: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true
        },
        pocetak: {
            type: Sequelize.FLOAT,
            allowNull: false,
            isValidanSat(value) {
                if (!((Number.isInteger(value) || Number.isInteger(value + 0.5)) && value >= 8 && value <= 20)) {
                    throw new Error("Nevalidan sat!");
                }
            }
        },
        kraj: {
            type: Sequelize.FLOAT,
            allowNull: false,
            isValidanSat(value) {
                if (!((Number.isInteger(value) || Number.isInteger(value + 0.5)) && value >= 8 && value <= 20)) {
                    throw new Error("Nevalidan sat!");
                }
            }
        }
    });
};