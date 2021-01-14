const Sequelize = require("sequelize");
const path = require("path");
const sequelize = new Sequelize("WT2017749", "root", "root", {host: "127.0.0.1", dialect: "mysql", logging: false});
const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.aktivnost = require(path.join(__dirname,'/model/aktivnost.js'))(sequelize, Sequelize.DataTypes);
db.dan = require(path.join(__dirname,'/model/dan.js'))(sequelize, Sequelize.DataTypes);
db.grupa = require(path.join(__dirname,'/model/grupa.js'))(sequelize, Sequelize.DataTypes);
db.predmet = require(path.join(__dirname,'/model/predmet.js'))(sequelize, Sequelize.DataTypes);
db.student = require(path.join(__dirname,'/model/student.js'))(sequelize, Sequelize.DataTypes);
db.tip = require(path.join(__dirname,'/model/tip.js'))(sequelize, Sequelize.DataTypes);

db.predmet.hasMany(db.grupa, {foreignKey:{allowNull: false}});
db.grupa.belongsTo(db.predmet);

db.predmet.hasMany(db.aktivnost, {foreignKey: {allowNull: false}});
db.aktivnost.belongsTo(db.predmet);

db.grupa.hasMany(db.aktivnost);
db.aktivnost.belongsTo(db.grupa);

db.dan.hasMany(db.aktivnost, {foreignKey: {allowNull: false}});
db.aktivnost.belongsTo(db.dan);

db.tip.hasMany(db.aktivnost, {foreignKey: {allowNull: false}});
db.aktivnost.belongsTo(db.tip);

db.studentiGrupa = sequelize.define('studenti_grupa', {
    studentId: {
        type: Sequelize.INTEGER,
        references: {
            model: db.student,
            key: 'id'
        }
    },
    grupaId: {
        type: Sequelize.INTEGER,
        references: {
            model: db.grupa,
            key: 'id'
        }
    }
},{freezeTableName: true});

db.student.belongsToMany(db.grupa, {through: db.studentiGrupa});
db.grupa.belongsToMany(db.student, {through: db.studentiGrupa});

module.exports=db;