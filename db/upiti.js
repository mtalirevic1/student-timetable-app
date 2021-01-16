const db = require('./db.js');

module.exports = {
    //SELECT upiti
    dajPredmetPoNazivu: function (naziv, fn, e) {
        db.predmet.findOne({where: {naziv: naziv}}).then(function (res) {
            fn(res);
        }).catch(function (err){e(err)});
    },
    dajAktivnostPoNazivu: function (naziv, fn, e) {
        db.aktivnost.findOne({where: {naziv: naziv}, include: [db.predmet, db.grupa, db.dan, db.tip]})
            .then(function (res) {
                fn(res);
            }).catch(function (err){e(err)});
    },

    dajGrupuPoNazivu: function (naziv, fn, e) {
        db.grupa.findOne({where: {naziv: naziv}, include: [db.predmet]}).then(function (res) {
            fn(res);
        }).catch(function (err){e(err)});
    },
    dajDanPoNazivu: function (naziv, fn, e) {
        db.dan.findOne({where: {naziv: naziv}}).then(function (res) {
            fn(res);
        }).catch(function (err){e(err)});
    },
    dajTipPoNazivu: function (naziv, fn, e) {
        db.tip.findOne({where: {naziv: naziv}}).then(function (res) {
            fn(res);
        }).catch(function (err){e(err)});
    },
    dajStudentaPoImenu: function (ime, fn, e) {
        db.student.findOne({where: {ime: ime}}).then(function (res) {
            fn(res);
        }).catch(function (err){e(err)});
    },
    dajStudentaPoIndexu: function (index, fn, e) {
        db.student.findOne({where: {index: index}}).then(function (res) {
            fn(res);
        }).catch(function (err){e(err)});
    },
    dajPredmetPoId: function (id, fn, e) {
        db.predmet.findOne({where: {id: id}}).then(function (res) {
            fn(res);
        }).catch(function (err){e(err)});
    },
    dajAktivnostPoId: function (id, fn, e) {
        db.aktivnost.findOne({where: {id: id}, include: [db.predmet, db.grupa, db.dan, db.tip]})
            .then(function (res) {
                fn(res);
            }).catch(function (err){e(err)});
    },
    dajGrupuPoId: function (id, fn, e) {
        db.grupa.findOne({where: {id: id}, include: [db.predmet]}).then(function (res) {
            fn(res);
        }).catch(function (err){e(err)});
    },
    dajDanPoId: function (id, fn, e) {
        db.dan.findOne({where: {id: id}}).then(function (res) {
            fn(res);
        }).catch(function (err){e(err)});
    },
    dajTipPoId: function (id, fn, e) {
        db.tip.findOne({where: {id: id}}).then(function (res) {
            fn(res);
        }).catch(function (err){e(err)});
    },
    dajStudentaPoId: function (id, fn, e) {
        db.student.findOne({where: {id: id}}).then(function (res) {
            fn(res);
        }).catch(function (err){e(err)});
    },
    dajPredmete: function (fn, e) {
        db.predmet.findAll().then(function (res) {
            fn(res);
        }).catch(function (err){e(err)});
    },
    dajAktivnosti: function (fn, e) {
        db.aktivnost.findAll({include: [db.predmet, db.grupa, db.dan, db.tip]}).then(function (res) {
            fn(res);
        }).catch(function (err){e(err)});
    },
    dajAktivnostiPoGrupi: function (grupaId, fn, e) {
        db.aktivnost.findAll({
            where: {grupaId: grupaId},
            include: [db.predmet, db.grupa, db.dan, db.tip]
        }).then(function (res) {
            fn(res);
        }).catch(function (err){e(err)});
    },
    dajAktivnostiPoPredmetu: function (predmetId, fn, e) {
        db.aktivnost.findAll({
            where: {predmetId: predmetId},
            include: [db.predmet, db.grupa, db.dan, db.tip]
        }).then(function (res) {
            fn(res);
        }).catch(function (err){e(err)});
    },
    dajAktivnostiPoDanu: function (danId, fn, e) {
        db.aktivnost.findAll({
            where: {danId: danId},
            include: [db.predmet, db.grupa, db.dan, db.tip]
        }).then(function (res) {
            fn(res);
        }).catch(function (err){e(err)});
    },
    dajAktivnostiPoTipu: function (tipId, fn, e) {
        db.aktivnost.findAll({
            where: {tipId: tipId},
            include: [db.predmet, db.grupa, db.dan, db.tip]
        }).then(function (res) {
            fn(res);
        }).catch(function (err){e(err)});
    },
    dajGrupe: function (fn, e) {
        db.grupa.findAll({include: [db.predmet]}).then(function (res) {
            fn(res);
        }).catch(function (err){e(err)});
    },
    dajTipove: function (fn, e) {
        db.tip.findAll().then(function (res) {
            fn(res);
        }).catch(function (err){e(err)});
    },
    dajDane: function (fn, e) {
        db.dan.findAll().then(function (res) {
            fn(res);
        }).catch(function (err){e(err)});
    },
    dajStudente: function (fn, e) {
        db.student.findAll().then(function (res) {
            fn(res);
        }).catch(function (err){e(err)});
    },
    dajStudentePoGrupama: function (fn, e) {
        db.studentiGrupa.findAll().then(function (res) {
            fn(res);
        }).catch(function (err){e(err)});
    },
    //INSERT upiti
    kreirajPredmet: function (object, fn, e) {
        db.predmet.create({naziv: object.naziv}).then(function (res) {
            fn(res);
        }).catch(function (err){e(err)});
    },
    kreirajAktivnost: function (object, fn, e) {
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
        }).catch(function (err){e(err)});
    },
    kreirajGrupu: function (object, fn, e) {
        db.grupa.create({naziv: object.naziv, predmetId: object.predmetId}).then(function (res) {
            fn(res);
        }).catch(function (err){e(err)});
    },
    kreirajDan: function (object, fn, e) {
        db.dan.create({naziv: object.naziv}).then(function (res) {
            fn(res);
        }).catch(function (err){e(err)});
    },
    kreirajTip: function (object, fn, e) {
        db.tip.create({naziv: object.naziv}).then(function (res) {
            fn(res);
        }).catch(function (err){console.log(err)});
    },
    kreirajStudenta: function (object, fn, e) {
        db.student.create({ime: object.ime, index: object.index}).then(function (res) {
            fn(res);
        }).catch(function (err){e(err)});
    },
    dodajStudentaUGrupu: function(studentId, grupaId, fn, e){
        db.studentiGrupa.create({studentId: studentId, grupaId: grupaId}).then(function (res){
            fn(res);
        }).catch(function (err){e(err)});
    },
    //UPDATE upiti
    azurirajPredmet: function (id, object, fn, e) {
        db.predmet.update({naziv: object.naziv}, {where: {id: id}}).then(function (res) {
            fn(res);
        }).catch(function (err){e(err)});
    },
    azurirajAktivnost: function (id, object, fn, e) {
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
        }).catch(function (err){e(err)});
    },
    azurirajGrupu: function (id, object, fn, e) {
        db.grupa.update({naziv: object.naziv, predmetId: object.predmetId}, {where: {id: id}}).then(function (res) {
            fn(res);
        }).catch(function (err){e(err)});
    },
    azurirajDan: function (id, object, fn, e) {
        db.dan.update({naziv: object.naziv}, {where: {id: id}}).then(function (res) {
            fn(res);
        }).catch(function (err){e(err)});
    },
    azurirajTip: function (id, object, fn, e) {
        db.tip.update({naziv: object.naziv}, {where: {id: id}}).then(function (res) {
            fn(res);
        }).catch(function (err){e(err)});
    },
    azurirajStudenta: function (id, object, fn, e) {
        db.student.update({ime: object.ime, index: object.index}, {where: {id: id}}).then(function (res) {
            fn(res);
        }).catch(function (err){e(err)});
    },

    //DELETE upiti
    obrisiPredmet: function (id, fn, e) {
        db.predmet.destroy({where: {id: id}}).then(function (res) {
            fn(res);
        }).catch(function (err){e(err)});
    },
    obrisiAktivnost: function (id, fn, e) {
        db.aktivnost.destroy({where: {id: id}}).then(function (res) {
            fn(res);
        }).catch(function (err){e(err)});
    },
    obrisiGrupu: function (id, fn, e) {
        db.grupa.destroy({where: {id: id}}).then(function (res) {
            fn(res);
        }).catch(function (err){e(err)});
    },
    obrisiDan: function (id, fn, e) {
        db.dan.destroy({where: {id: id}}).then(function (res) {
            fn(res);
        }).catch(function (err){e(err)});
    },
    obrisiTip: function (id, fn, e) {
        db.tip.destroy({where: {id: id}}).then(function (res) {
            fn(res);
        }).catch(function (err){e(err)});
    },
    obrisiStudenta: function (id, fn, e) {
        db.student.destroy({where: {id: id}}).then(function (res) {
            fn(res);
        }).catch(function (err){e(err)});
    },
    izbaciStudentaIzGrupe: function(studentId, grupaId, fn, e){
        db.studentiGrupa.destroy({where: {studentId: studentId, grupaId: grupaId}}).then(function (res){
            fn(res);
        }).catch(function (err){e(err)});
    },
    obrisiPredmete: function (fn, e) {
        db.predmet.destroy({truncate: true}).then(function (res) {
            fn(res);
        }).catch(function (err){e(err)});
    },
    obrisiAktivnosti: function (fn, e) {
        db.aktivnost.destroy({truncate: true}).then(function (res) {
            fn(res);
        }).catch(function (err){e(err)});
    },
    obrisiGrupe: function (fn, e) {
        db.grupa.destroy({truncate: true}).then(function (res) {
            fn(res);
        }).catch(function (err){e(err)});
    },
    obrisiDane: function (fn, e) {
        db.dan.destroy({truncate: true}).then(function (res) {
            fn(res);
        }).catch(function (err){e(err)});
    },
    obrisiTipove: function (fn, e) {
        db.tip.destroy({truncate: true}).then(function (res) {
            fn(res);
        }).catch(function (err){e(err)});
    },
    obrisiStudente: function (fn, e) {
        db.student.destroy({truncate: true}).then(function (res) {
            fn(res);
        }).catch(function (err){e(err)});
    },
    izbaciSveStudenteIzGrupa: function(fn, e){
        db.studentiGrupa.destroy({truncate: true}).then(function (res){
            fn(res);
        }).catch(function (err){e(err)});
    }
}
