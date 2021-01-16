const db = require('./db.js')
db.sequelize.sync({force: true}).then(function () {
    inicializacija().then(function () {
        console.log("Gotovo kreiranje tabela i ubacivanje pocetnih podataka!");
        process.exit();
    });
});

function inicializacija() {

    return new Promise(function (resolve, reject) {
        Promise.all([
            db.predmet.create({naziv: 'PJP'}),
            db.predmet.create({naziv: 'WT'}),
            db.dan.create({naziv: 'Ponedjeljak'}),
            db.dan.create({naziv: 'Utorak'}),
            db.dan.create({naziv: 'Srijeda'}),
            db.dan.create({naziv: 'Četvrtak'}),
            db.dan.create({naziv: 'Petak'}),
            db.tip.create({naziv: 'predavanje'}),
            db.tip.create({naziv: 'vježbe'}),
            db.student.create({ime: 'Matej Talirević', index: '17749'}),
            db.student.create({ime: 'Mujo Mujić', index: '18423'}),
            db.student.create({ime: 'Suljo Suljić', index: '16256'}),
            db.student.create({ime: 'Fata Fatić', index: '17364'}),
            db.student.create({ime: 'Huso Husić', index: '17482'}),
            db.student.create({ime: 'Maja Majić', index: '18672'}),
            db.student.create({ime: 'Dado Dadić', index: '18235'}),
            db.student.create({ime: 'Selma Selmić', index: '17252'})
        ]).then(res => {
            Promise.all([
                db.grupa.create({naziv: 'PJP - Grupa 1', predmetId: 1}),
                db.grupa.create({naziv: 'PJP - Grupa 2', predmetId: 1}),
                db.grupa.create({naziv: 'WT - Grupa 1', predmetId: 2}),
                db.grupa.create({naziv: 'WT - Grupa 2', predmetId: 2})
            ]).then(res => {
                Promise.all([
                    db.studentiGrupa.create({studentId: 1, grupaId: 1}),
                    db.studentiGrupa.create({studentId: 2, grupaId: 1}),
                    db.studentiGrupa.create({studentId: 3, grupaId: 2}),
                    db.studentiGrupa.create({studentId: 4, grupaId: 2}),
                    db.studentiGrupa.create({studentId: 1, grupaId: 3}),
                    db.studentiGrupa.create({studentId: 5, grupaId: 3}),
                    db.studentiGrupa.create({studentId: 6, grupaId: 4}),
                    db.studentiGrupa.create({studentId: 7, grupaId: 4})
                ]).then(res => {
                    Promise.all([
                        db.aktivnost.create({
                            naziv: 'WT predavanje',
                            pocetak: 9,
                            kraj: 12,
                            predmetId: 2,
                            grupaId: 3,
                            danId: 3,
                            tipId: 1
                        }),
                        db.aktivnost.create({
                            naziv: 'WT vježbe',
                            pocetak: 15.5,
                            kraj: 17,
                            predmetId: 2,
                            grupaId: 4,
                            danId: 3,
                            tipId: 2
                        }),
                        db.aktivnost.create({
                            naziv: 'PJP predavanje',
                            pocetak: 9,
                            kraj: 12,
                            predmetId: 1,
                            grupaId: 1,
                            danId: 5,
                            tipId: 1
                        }),
                        db.aktivnost.create({naziv: 'PJP vježbe', pocetak: 12, kraj: 13, predmetId: 1, grupaId: 2, danId: 1, tipId: 2})
                    ]).then(res => {}).catch(err => {console.log(err)});
                }).catch(err => {console.log(err)})
            }).catch(err => {console.log(err)});
        }).catch(err => {console.log(err)});
    });
}