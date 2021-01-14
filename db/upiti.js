const db = require('./db.js');

module.exports = {
    //SELECT upiti
    dajPredmetPoNazivu: function (naziv, fn) {
        db.predmet.findOne({where: {naziv: naziv}}).then(function (res) {
            fn(res);
        }).catch(function (err){console.log(err)});
    },
    dajAktivnostPoNazivu: function (naziv, fn) {
        db.aktivnost.findOne({where: {naziv: naziv}, include: [db.predmet, db.grupa, db.dan, db.tip]})
            .then(function (res) {
                fn(res);
            }).catch(function (err){console.log(err)});
    },

    dajGrupuPoNazivu: function (naziv, fn) {
        db.grupa.findOne({where: {naziv: naziv}, include: [db.predmet]}).then(function (res) {
            fn(res);
        }).catch(function (err){console.log(err)});
    },
    dajDanPoNazivu: function (naziv, fn) {
        db.dan.findOne({where: {naziv: naziv}}).then(function (res) {
            fn(res);
        }).catch(function (err){console.log(err)});
    },
    dajTipPoNazivu: function (naziv, fn) {
        db.tip.findOne({where: {naziv: naziv}}).then(function (res) {
            fn(res);
        }).catch(function (err){console.log(err)});
    },
    dajStudentaPoImenu: function (ime, fn) {
        db.student.findOne({where: {ime: ime}}).then(function (res) {
            fn(res);
        }).catch(function (err){console.log(err)});
    },
    dajStudentaPoIndexu: function (index, fn) {
        db.student.findOne({where: {index: index}}).then(function (res) {
            fn(res);
        }).catch(function (err){console.log(err)});
    },
    dajPredmetPoId: function (id, fn) {
        db.predmet.findOne({where: {id: id}}).then(function (res) {
            fn(res);
        }).catch(function (err){console.log(err)});
    },
    dajAktivnostPoId: function (id, fn) {
        db.aktivnost.findOne({where: {id: id}, include: [db.predmet, db.grupa, db.dan, db.tip]})
            .then(function (res) {
                fn(res);
            }).catch(function (err){console.log(err)});
    },
    dajGrupuPoId: function (id, fn) {
        db.grupa.findOne({where: {id: id}, include: [db.predmet]}).then(function (res) {
            fn(res);
        }).catch(function (err){console.log(err)});
    },
    dajDanPoId: function (id, fn) {
        db.dan.findOne({where: {id: id}}).then(function (res) {
            fn(res);
        }).catch(function (err){console.log(err)});
    },
    dajTipPoId: function (id, fn) {
        db.tip.findOne({where: {id: id}}).then(function (res) {
            fn(res);
        }).catch(function (err){console.log(err)});
    },
    dajStudentaPoId: function (id, fn) {
        db.student.findOne({where: {id: id}}).then(function (res) {
            fn(res);
        }).catch(function (err){console.log(err)});
    },
    dajPredmete: function (fn) {
        db.predmet.findAll().then(function (res) {
            fn(res);
        }).catch(function (err){console.log(err)});
    },
    dajAktivnosti: function (fn) {
        db.aktivnost.findAll({include: [db.predmet, db.grupa, db.dan, db.tip]}).then(function (res) {
            fn(res);
        }).catch(function (err){console.log(err)});
    },
    dajAktivnostiPoGrupi: function (grupaId, fn) {
        db.aktivnost.findAll({
            where: {grupaId: grupaId},
            include: [db.predmet, db.grupa, db.dan, db.tip]
        }).then(function (res) {
            fn(res);
        }).catch(function (err){console.log(err)});
    },
    dajAktivnostiPoPredmetu: function (predmetId, fn) {
        db.aktivnost.findAll({
            where: {predmetId: predmetId},
            include: [db.predmet, db.grupa, db.dan, db.tip]
        }).then(function (res) {
            fn(res);
        }).catch(function (err){console.log(err)});
    },
    dajAktivnostiPoDanu: function (danId, fn) {
        db.aktivnost.findAll({
            where: {danId: danId},
            include: [db.predmet, db.grupa, db.dan, db.tip]
        }).then(function (res) {
            fn(res);
        }).catch(function (err){console.log(err)});
    },
    dajAktivnostiPoTipu: function (tipId, fn) {
        db.aktivnost.findAll({
            where: {tipId: tipId},
            include: [db.predmet, db.grupa, db.dan, db.tip]
        }).then(function (res) {
            fn(res);
        }).catch(function (err){console.log(err)});
    },
    dajGrupe: function (fn) {
        db.grupa.findAll({include: [db.predmet]}).then(function (res) {
            fn(res);
        }).catch(function (err){console.log(err)});
    },
    dajTipove: function (fn) {
        db.tip.findAll().then(function (res) {
            fn(res);
        }).catch(function (err){console.log(err)});
    },
    dajDane: function (fn) {
        db.dan.findAll().then(function (res) {
            fn(res);
        }).catch(function (err){console.log(err)});
    },
    dajStudente: function (fn) {
        db.student.findAll().then(function (res) {
            fn(res);
        }).catch(function (err){console.log(err)});
    },
    dajStudentePoGrupama: function (fn) {
        db.studentiGrupa.findAll().then(function (res) {
            fn(res);
        }).catch(function (err){console.log(err)});
    },
    //INSERT upiti
    kreirajPredmet: function (object, fn) {
        db.predmet.create({naziv: object.naziv}).then(function (res) {
            fn(res);
        }).catch(function (err){console.log(err)});
    },
    kreirajAktivnost: function (object, fn) {
        db.aktivnost.create({
            naziv: object.naziv,
            pocetak: object.pocetak,
            kraj: object.kraj,
            grupaId: object.grupaId,
            tipId: object.tipId,
            danId: object.danId,
            predmetId: object.predmetId
        }).then(function (res) {
            fn(res);
        }).catch(function (err){console.log(err)});
    },
    kreirajGrupu: function (object, fn) {
        db.grupa.create({naziv: object.naziv, predmetId: object.predmetId}).then(function (res) {
            fn(res);
        }).catch(function (err){console.log(err)});
    },
    kreirajDan: function (object, fn) {
        db.dan.create({naziv: object.naziv}).then(function (res) {
            fn(res);
        }).catch(function (err){console.log(err)});
    },
    kreirajTip: function (object, fn) {
        db.tip.create({naziv: object.naziv}).then(function (res) {
            fn(res);
        }).catch(function (err){console.log(err)});
    },
    kreirajStudenta: function (object, fn) {
        db.student.create({ime: object.ime, index: object.index}).then(function (res) {
            fn(res);
        }).catch(function (err){console.log(err)});
    },
    dodajStudentaUGrupu: function(studentId, grupaId, fn){
        db.studentiGrupa.create({studentId: studentId, grupaId: grupaId}).then(function (res){
            fn(res);
        }).catch(function (err){console.log(err)});
    },
    //UPDATE upiti
    azurirajPredmet: function (id, object, fn) {
        db.predmet.update({naziv: object.naziv}, {where: {id: id}}).then(function (res) {
            fn(res);
        }).catch(function (err){console.log(err)});
    },
    azurirajAktivnost: function (id, object, fn) {
        db.aktivnost.update({
            naziv: object.naziv,
            pocetak: object.pocetak,
            kraj: object.kraj,
            grupaId: object.grupaId,
            tipId: object.tipId,
            danId: object.danId,
            predmetId: object.predmetId
        }, {where: {id: id}}).then(function (res) {
            fn(res);
        }).catch(function (err){console.log(err)});
    },
    azurirajGrupu: function (id, object, fn) {
        db.grupa.update({naziv: object.naziv, predmetId: object.predmetId}, {where: {id: id}}).then(function (res) {
            fn(res);
        }).catch(function (err){console.log(err)});
    },
    azurirajDan: function (id, object, fn) {
        db.dan.update({naziv: object.naziv}, {where: {id: id}}).then(function (res) {
            fn(res);
        }).catch(function (err){console.log(err)});
    },
    azurirajTip: function (id, object, fn) {
        db.tip.update({naziv: object.naziv}, {where: {id: id}}).then(function (res) {
            fn(res);
        }).catch(function (err){console.log(err)});
    },
    azurirajStudenta: function (id, object, fn) {
        db.student.update({ime: object.ime, index: object.index}, {where: {id: id}}).then(function (res) {
            fn(res);
        }).catch(function (err){console.log(err)});
    },

    //DELETE upiti
    obrisiPredmet: function (id, fn) {
        db.predmet.destroy({where: {id: id}}).then(function (res) {
            fn(res);
        }).catch(function (err){console.log(err)});
    },
    obrisiAktivnost: function (id, fn) {
        db.aktivnost.destroy({where: {id: id}}).then(function (res) {
            fn(res);
        }).catch(function (err){console.log(err)});
    },
    obrisiGrupu: function (id, fn) {
        db.grupa.destroy({where: {id: id}}).then(function (res) {
            fn(res);
        }).catch(function (err){console.log(err)});
    },
    obrisiDan: function (id, fn) {
        db.dan.destroy({where: {id: id}}).then(function (res) {
            fn(res);
        }).catch(function (err){console.log(err)});
    },
    obrisiTip: function (id, fn) {
        db.tip.destroy({where: {id: id}}).then(function (res) {
            fn(res);
        }).catch(function (err){console.log(err)});
    },
    obrisiStudenta: function (id, fn) {
        db.student.destroy({where: {id: id}}).then(function (res) {
            fn(res);
        }).catch(function (err){console.log(err)});
    },
    izbaciStudentaIzGrupe: function(studentId, grupaId, fn){
        db.studentiGrupa.destroy({where: {studentId: studentId, grupaId: grupaId}}).then(function (res){
            fn(res);
        }).catch(function (err){console.log(err)});
    },
    obrisiPredmete: function (fn) {
        db.predmet.destroy({truncate: true}).then(function (res) {
            fn(res);
        }).catch(function (err){console.log(err)});
    },
    obrisiAktivnosti: function (fn) {
        db.aktivnost.destroy({truncate: true}).then(function (res) {
            fn(res);
        }).catch(function (err){console.log(err)});
    },
    obrisiGrupe: function (fn) {
        db.grupa.destroy({truncate: true}).then(function (res) {
            fn(res);
        }).catch(function (err){console.log(err)});
    },
    obrisiDane: function (fn) {
        db.dan.destroy({truncate: true}).then(function (res) {
            fn(res);
        }).catch(function (err){console.log(err)});
    },
    obrisiTipove: function (fn) {
        db.tip.destroy({truncate: true}).then(function (res) {
            fn(res);
        }).catch(function (err){console.log(err)});
    },
    obrisiStudente: function (fn) {
        db.student.destroy({truncate: true}).then(function (res) {
            fn(res);
        }).catch(function (err){console.log(err)});
    },
    ispisiSveStudenteIzGrupa: function(fn){
        db.studentiGrupa.destroy({truncate: true}).then(function (res){
            fn(res);
        }).catch(function (err){console.log(err)});
    }
}
