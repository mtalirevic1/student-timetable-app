const app = require("../serverSkripta");
const chai = require("chai");
const fs = require("fs");
const chaiHttp = require("chai-http");

const {expect} = chai;
chai.use(chaiHttp);

String.prototype.replaceAt = function (index, replacement) {
    return this.substr(0, index) + replacement + this.substr(index + replacement.length);
}

function csvToJsonTestni(csvString) {
    let rezultat = [];
    let nizSlucajeva = csvString.split('\r\n');
    let toJson = function (slucajString) {
        let brojac = 0;
        for (let i = 0; i < slucajString.length; i++) {
            if (slucajString.charAt(i) === ',') {
                brojac++;
                if (brojac > 3) {
                    slucajString = slucajString.replaceAt(i, '|');
                }
            }
        }
        let slucaj = slucajString.split(',');
        for (let i = 0; i < slucaj.length; i++) {
            slucaj[i] = slucaj[i].replace(/\|/g, ',');
            slucaj[i] = slucaj[i].replace(/\\"/g, '"');
        }
        rezultat.push({metoda: slucaj[0], ruta: slucaj[1], ulaz: slucaj[2], izlaz: slucaj[3]});
    }
    nizSlucajeva.forEach(toJson);
    return rezultat;
}

function izvrsiTest(ts, i) {
    describe("Test " + (i + 1) + ", Method: " + ts.metoda + ", Route: " + ts.ruta + ", Input: " + ts.ulaz, function () {
        it("should give the following output: " + ts.izlaz, function (done) {
            console.log(ts);
            if (ts.metoda === 'GET' && (ts.ruta === '/predmet' || ts.ruta === '/aktivnost')) {
                chai.request(app).get(ts.ruta + "i").end(function (err, res) {
                    expect(JSON.stringify(res.body)).to.equals(ts.izlaz);
                    done();
                });
            } else if (ts.metoda === 'GET' && ts.ruta.includes('predmet') && ts.ruta.includes('aktivnost')) {
                chai.request(app).get(ts.ruta).end(function (err, res) {
                    expect(JSON.stringify(res.body)).to.equals(ts.izlaz);
                    done();
                });
            } else if (ts.metoda === 'POST' && (ts.ruta === '/predmet' || ts.ruta === '/aktivnost')) {
                chai.request(app).post(ts.ruta).send(JSON.parse(ts.ulaz)).end(function (err, res) {
                    expect(JSON.stringify(res.body)).to.equals(ts.izlaz);
                    done();
                });
            } else if (ts.metoda === 'DELETE' && (ts.ruta.includes('/predmet') || ts.ruta.includes('/aktivnost')
                || ts.ruta === '/all')) {
                chai.request(app).delete(ts.ruta).end(function (err, res) {
                    expect(JSON.stringify(res.body)).to.equals(ts.izlaz);
                    done();
                });
            }
            else{
                expect(0).to.equals(2);
                done();
            }
        });
    });
}

let ts = csvToJsonTestni(fs.readFileSync('test/testniPodaci.txt', 'utf8'));
for (let i = 0; i < ts.length; i++) {
    izvrsiTest(ts[i], i);
}