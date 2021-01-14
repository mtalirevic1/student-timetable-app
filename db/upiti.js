const db = require('./db.js');

module.exports = {
    //SELECT upiti
    dajPredmetPoNazivu: function(naziv, fn) {
        db.predmet.findOne({where: {naziv: naziv}}).then(function (res) {
            fn(res);
        });
    },
    dajAktivnostPoNazivu: function(naziv, fn) {
        db.aktivnost.findOne({where: {naziv: naziv}}).then(function (res) {
            fn(res);
        });
    },
    dajGrupuPoNazivu: function(naziv, fn) {
        db.grupa.findOne({where: {naziv: naziv}}).then(function (res) {
            fn(res);
        });
    },
    dajDanPoNazivu: function(naziv, fn) {
        db.dan.findOne({where: {naziv: naziv}}).then(function (res) {
            fn(res);
        });
    },
    dajAktivnostPoNazivu: function(naziv, fn) {
        db.aktivnost.findOne({where: {naziv: naziv}}).then(function (res) {
            fn(res);
        });
    }
}
