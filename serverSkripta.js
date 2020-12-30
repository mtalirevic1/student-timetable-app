const validacija = require('./public/resources/js/validacija');
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
app.use(express.static('public'));
app.use(bodyParser.json());

//{naziv:string,tip:string,pocetak:integer,kraj:integer,dan:string}
function csvToJsonAktivnosti(string) {
    let rezultat = [];
    let nizAktivnosti = string.split('\r\n');
    let duzina = nizAktivnosti.length-1;
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
    let nizPredemta = string.split('\r\n');
    let duzina = nizPredemta.length-1;
    for (let i = 0; i < duzina; i++) {
        rezultat.push(nizPredemta[i]);
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
        let rezultat=csvToJsonAktivnosti(data.toString());
        let filtrirajPoNazivu = function (naziv){ return naziv===req.params.naziv; };
        res.json(rezultat.filter(filtrirajPoNazivu));
    });
});
app.post('/predmet', function (req, res) {
    fs.readFile('predmeti.txt', function (err, data) {
        if (err) throw err;
        let predmeti=csvToJsonPredmeti(data.toString());
        if(validacija.postojiPredmet(predmeti,req.body.naziv)){
            res.json({message: "Naziv predmeta postoji!"});
        } else {
            fs.appendFile('predmeti.txt',req.body.naziv+"\r\n",function (err){
                if(err) throw err;
                res.json({message: "Uspješno dodan predmet!"});
            });
        }
    });
});
app.post('/aktivnost', function (req, res) {

});
app.delete('/aktivnost/:naziv', function (req, res) {

});
app.delete('/predmet/:naziv', function (req, res) {

});
app.delete('/all', function (req, res) {

});
app.listen(3000);