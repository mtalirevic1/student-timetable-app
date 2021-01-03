const app = require("../serverSkripta");
const chai = require("chai");
const fs = require("fs");
const chaiHttp = require("chai-http");

const {expect} = chai;
chai.use(chaiHttp);

function csvToJsonTestni(csvString) {
    let rezultat = [];
    let nizSlucajeva = csvString.split('\r\n');
    let toJson = function (slucajString) {
        let slucaj = slucajString.split(',');
        rezultat.push({metoda: slucaj[0], ruta: slucaj[1], ulaz: JSON.parse(slucaj[2]), izlaz: JSON.parse(slucaj[3])});
    }
    nizSlucajeva.forEach(toJson);
    return rezultat;
}

fs.readFile('test/testniPodaci.txt', function (err, data) {
    if (err) throw err;
    let ts = csvToJsonTestni(data.toString());
    describe("Server", function (){
        console.log("dodjeDovde2")
        it("should return an empty array", done => {
            console.log("dodjeDovde")
            chai.request(app).get(ts[0].ruta).end(function (err, res){
                console.log("res.body: ",res.body);
                console.log("ts[0].izlaz: ",ts[0].izlaz);
                expect(res.body).to.equals(ts[0].izlaz);
                done();
            });
        });
    });
});