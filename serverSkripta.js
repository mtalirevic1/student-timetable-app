const validacija = require('./public/resources/js/validacija');
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
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
app.post('/predmet', function (req, res) {
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
//{naziv:string,tip:string,pocetak:integer,kraj:integer,dan:string}
app.post('/aktivnost', function (req, res) {
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
app.delete('/aktivnost/:naziv', function (req, res) {
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
app.delete('/predmet/:naziv', function (req, res) {
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
app.delete('/all', function (req, res) {
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
module.exports = app.listen(3000);