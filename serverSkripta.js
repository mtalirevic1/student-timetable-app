const validacija = require('./public/resources/js/validacija');
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
const upiti = require('./db/upiti.js');
app.use(express.static('public'));
app.use(bodyParser.json());

function csvToJsonAktivnosti(string) {
    let rezultat = [];
    if (string === null || string === undefined) {
        return rezultat;
    }
    let nizAktivnosti = string.split('\r\n');
    let duzina = nizAktivnosti.length - 1;
    for (let i = 0; i < duzina; i++) {
        let aktivnost = nizAktivnosti[i].split(',');
        if (aktivnost.length !== 5) {
            throw "Nevalidan format datoteke!";
        }
        rezultat.push({
            naziv: aktivnost[0], tip: aktivnost[1], pocetak: parseFloat(aktivnost[2]),
            kraj: parseFloat(aktivnost[3]), dan: aktivnost[4]
        });
    }
    return rezultat;
}

function csvToJsonPredmeti(string) {
    let rezultat = [];
    if (string === null || string === undefined) {
        return rezultat;
    }
    let nizPredemta = string.split('\r\n');
    let duzina = nizPredemta.length - 1;
    for (let i = 0; i < duzina; i++) {
        rezultat.push({naziv: nizPredemta[i]});
    }
    return rezultat;
}

function jsonToCsvAktivnosti(jsonNiz) {
    let rezultat = "";
    if (jsonNiz === null || jsonNiz === undefined) {
        return rezultat;
    }
    for (let i = 0; i < jsonNiz.length; i++) {
        let a = jsonNiz[i];
        rezultat += a.naziv + "," + a.tip + "," + a.pocetak + "," + a.kraj + "," + a.dan + "\r\n";
    }
    return rezultat;
}

function jsonToCsvPredmeti(jsonNiz) {
    let rezultat = "";
    if (jsonNiz === null || jsonNiz === undefined) {
        return rezultat;
    }
    for (let i = 0; i < jsonNiz.length; i++) {
        rezultat += jsonNiz[i].naziv + "\r\n";
    }
    return rezultat;
}

//V1

app.get('/predmeti', function (req, res) {
    fs.readFile('predmeti.txt', function (err, data) {
        if (err) throw err;
        res.json(csvToJsonPredmeti(data.toString()));
    });
});

app.get('/aktivnosti', function (req, res) {
    fs.readFile('aktivnosti.txt', function (err, data) {
        if (err) throw err;
        res.json(csvToJsonAktivnosti(data.toString()));
    });
});

app.get('/predmet/:naziv/aktivnost/', function (req, res) {
    fs.readFile('aktivnosti.txt', function (err, data) {
        if (err) throw err;
        let rezultat = csvToJsonAktivnosti(data.toString());
        let filtrirajPoNazivu = function (aktivnost) {
            return aktivnost.naziv === req.params.naziv;
        };
        res.json(rezultat.filter(filtrirajPoNazivu));
    });
});

app.post('/v1/predmet', function (req, res) {
    fs.readFile('predmeti.txt', function (err, data) {
        if (err) throw err;
        let predmeti = csvToJsonPredmeti(data.toString());
        if (validacija.postojiPredmet(predmeti, req.body)) {
            res.json({message: "Naziv predmeta postoji!"});
        } else {
            fs.appendFile('predmeti.txt', req.body.naziv + "\r\n", function (err) {
                if (err) throw err;
                res.json({message: "Uspješno dodan predmet!"});
            });
        }
    });
});

app.post('/v1/aktivnost', function (req, res) {
    fs.readFile('aktivnosti.txt', function (err, data) {
        if (err) throw err;
        let aktivnosti = csvToJsonAktivnosti(data.toString());
        if (!validacija.validnaAktivnost(aktivnosti, req.body)) {
            res.json({message: "Aktivnost nije validna!"});
        } else {
            let a = req.body;
            fs.appendFile('aktivnosti.txt', a.naziv + "," + a.tip + "," + a.pocetak + "," + a.kraj + "," + a.dan + "\r\n",
                function (err) {
                    if (err) throw err;
                    res.json({message: "Uspješno dodana aktivnost!"});
                });
        }
    });
});

app.delete('/v1/aktivnost/:naziv', function (req, res) {
    fs.readFile('aktivnosti.txt', function (err, data) {
        if (err) {
            res.json({message: "Greška - aktivnost nije obrisana!"});
        } else {
            let aktivnosti = csvToJsonAktivnosti(data.toString());
            let filtrirajPoNazivu = function (aktivnost) {
                return aktivnost.naziv !== req.params.naziv;
            };
            let noveAktivnosti = aktivnosti.filter(filtrirajPoNazivu);
            if (noveAktivnosti.length === aktivnosti.length) {
                res.json({message: "Greška - aktivnost nije obrisana!"});
                return;
            }
            let csvString = jsonToCsvAktivnosti(noveAktivnosti);
            fs.writeFile('aktivnosti.txt', csvString, function (err) {
                if (err) {
                    res.json({message: "Greška - aktivnost nije obrisana!"});
                } else {
                    res.json({message: "Uspješno obrisana aktivnost!"});
                }
            });
        }
    });
});

app.delete('/v1/predmet/:naziv', function (req, res) {
    fs.readFile('predmeti.txt', function (err, data) {
        if (err) {
            res.json({message: "Greška - predmet nije obrisan!"});
        } else {
            let predmeti = csvToJsonPredmeti(data.toString());
            let filtrirajPoNazivu = function (naziv) {
                return naziv.naziv !== req.params.naziv;
            };
            let noviPredmeti = predmeti.filter(filtrirajPoNazivu);
            if (noviPredmeti.length === predmeti.length) {
                res.json({message: "Greška - predmet nije obrisan!"});
                return;
            }
            let csvString = jsonToCsvPredmeti(noviPredmeti);
            fs.writeFile('predmeti.txt', csvString, function (err) {
                if (err) {
                    res.json({message: "Greška - predmet nije obrisan!"});
                } else {
                    res.json({message: "Uspješno obrisan predmet!"});
                }
            });
        }
    });
});

app.delete('/v1/all', function (req, res) {
    fs.writeFile('aktivnosti.txt', "", function (err) {
        if (err) {
            res.json({message: "Greška - sadržaj datoteka nije moguće obrisati!"});
        } else {
            fs.writeFile('predmeti.txt', "", function (err) {
                if (err) {
                    res.json({message: "Greška - sadržaj datoteka nije moguće obrisati!"});
                } else {
                    res.json({message: "Uspješno obrisan sadržaj datoteka!"});
                }
            });
        }
    });
});

//V2

//GET metode
app.get('/v2/predmet/:id', function (req, res) {
    upiti.dajPredmetPoId(req.params.id, function (resultSet) {
        res.json(resultSet);
    });
});

app.get('/v2/aktivnost/:id', function (req, res) {
    upiti.dajAktivnostPoId(req.params.id, function (resultSet) {
        res.json(resultSet);
    });
});

app.get('/v2/grupa/:id', function (req, res) {
    upiti.dajGrupuPoId(req.params.id, function (resultSet) {
        res.json(resultSet);
    });
});

app.get('/v2/dan/:id', function (req, res) {
    upiti.dajDanPoId(req.params.id, function (resultSet) {
        res.json(resultSet);
    });
});

app.get('/v2/tip/:id', function (req, res) {
    upiti.dajTipPoId(req.params.id, function (resultSet) {
        res.json(resultSet);
    });
});

app.get('/v2/student/:id', function (req, res) {
    upiti.dajStudentaPoId(req.params.id, function (resultSet) {
        res.json(resultSet);
    });
});

app.get('/v2/predmeti', function (req, res) {
    upiti.dajPredmete(function (resultSet) {
        res.json(resultSet);
    });
});

app.get('/v2/studenti', function (req, res) {
    upiti.dajStudente(function (resultSet) {
        res.json(resultSet);
    });
});

app.get('/v2/aktivnosti', function (req, res) {
    upiti.dajAktivnosti(function (resultSet) {
        res.json(resultSet);
    });
});

app.get('/v2/tipovi', function (req, res) {
    upiti.dajTipove(function (resultSet) {
        res.json(resultSet);
    });
});

app.get('/v2/dani', function (req, res) {
    upiti.dajDane(function (resultSet) {
        res.json(resultSet);
    });
});

app.get('/v2/grupe', function (req, res) {
    upiti.dajGrupe(function (resultSet) {
        res.json(resultSet);
    });
});

app.get('/v2/studentiGrupe', function (req, res) {
    upiti.dajStudentePoGrupama(function (resultSet) {
        res.json(resultSet);
    });
});
//POST metode
app.post('/v2/predmet', function (req, res) {
    upiti.kreirajPredmet(req.body, function (resultSet) {
        res.json(resultSet);
    });
});

app.post('/v2/aktivnost', function (req, res) {
    upiti.kreirajAktivnost(req.body, function (resultSet) {
        res.json(resultSet);
    });
});

app.post('/v2/grupa', function (req, res) {
    upiti.kreirajGrupu(req.body, function (resultSet) {
        res.json(resultSet);
    });
});

app.post('/v2/dan', function (req, res) {
    upiti.kreirajDan(req.body, function (resultSet) {
        res.json(resultSet);
    });
});

app.post('/v2/tip', function (req, res) {
    upiti.kreirajTip(req.body, function (resultSet) {
        res.json(resultSet);
    });
});

app.post('/v2/student', function (req, res) {
    upiti.kreirajStudenta(req.body, function (resultSet) {
        res.json(resultSet);
    });
});

app.post('/v2/student/:sid/grupa/:gid', function (req, res) {
    upiti.dodajStudentaUGrupu(req.params.sid, req.params.gid, function (resultSet) {
        res.json(resultSet);
    });
});

//PUT metode
app.put('/v2/predmet/:id', function (req, res) {
    upiti.azurirajPredmet(req.params.id, req.body, function (resultSet) {
        res.json(resultSet);
    });
});

app.put('/v2/aktivnost/:id', function (req, res) {
    upiti.azurirajAktivnost(req.params.id, req.body, function (resultSet) {
        res.json(resultSet);
    });
});

app.put('/v2/grupa/:id', function (req, res) {
    upiti.azurirajGrupu(req.params.id, req.body, function (resultSet) {
        res.json(resultSet);
    });
});

app.put('/v2/dan/:id', function (req, res) {
    upiti.azurirajDan(req.params.id, req.body, function (resultSet) {
        res.json(resultSet);
    });
});

app.put('/v2/tip/:id', function (req, res) {
    upiti.azurirajTip(req.params.id, req.body, function (resultSet) {
        res.json(resultSet);
    });
});

app.put('/v2/student/:id', function (req, res) {
    upiti.azurirajStudenta(req.params.id, req.body, function (resultSet) {
        res.json(resultSet);
    });
});

//DELETE metode
app.delete('/v2/predmet/:id', function (req, res) {
    upiti.obrisiPredmet(req.params.id, function (resultSet) {
        res.json(resultSet);
    });
});

app.delete('/v2/aktivnost/:id', function (req, res) {
    upiti.obrisiAktivnost(req.params.id, function (resultSet) {
        res.json(resultSet);
    });
});

app.delete('/v2/grupa/:id', function (req, res) {
    upiti.obrisiGrupu(req.params.id, function (resultSet) {
        res.json(resultSet);
    });
});

app.delete('/v2/dan/:id', function (req, res) {
    upiti.obrisiDan(req.params.id, function (resultSet) {
        res.json(resultSet);
    });
});

app.delete('/v2/tip/:id', function (req, res) {
    upiti.obrisiTip(req.params.id, function (resultSet) {
        res.json(resultSet);
    });
});

app.delete('/v2/student/:id', function (req, res) {
    upiti.obrisiStudenta(req.params.id, function (resultSet) {
        res.json(resultSet);
    });
});

app.delete('/v2/student/:sid/grupa/:gid', function (req, res) {
    upiti.izbaciStudentaIzGrupe(req.params.sid, req.params.gid, function (resultSet) {
        res.json(resultSet);
    });
});

module.exports = app.listen(3000);