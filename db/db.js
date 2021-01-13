const Sequelize = require("sequelize");
const sequelize = new Sequelize("WT2017749", "root", "root", {host: "127.0.0.1", dialect: "mysql", logging: false});
const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.aktivnost = sequelize.import(__dirname + '/db/model/aktivnost.js');
db.dan = sequelize.import(__dirname + '/db/model/dan.js');
db.grupa = sequelize.import(__dirname + '/db/model/grupa.js');
db.predmet = sequelize.import(__dirname + '/db/model/predmet.js');
db.student = sequelize.import(__dirname + '/db/model/student.js');
db.tip = sequelize.import(__dirname + '/db/model/tip.js');

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

const StudentiGrupa = sequelize.define('studenti_grupa', {
    studentId: {
        type: sequelize.INTEGER,
        references: {
            model: db.student,
            key: 'id'
        }
    },
    grupaId: {
        type: sequelize.INTEGER,
        references: {
            model: db.grupa,
            key: 'id'
        }
    }
});

db.student.belongsToMany(db.grupa, {through: StudentiGrupa});
db.grupa.belongsToMany(db.student, {through: StudentiGrupa});

module.exports=db;