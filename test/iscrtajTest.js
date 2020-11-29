let assert = chai.assert;

describe('Raspored', function () {
    describe('iscrtajRaspored()', function () {
        let okvir = document.getElementById('ispis');
        it('should write an error message in the div', function () {
            let dani = ["Ponedjeljak", "Utorak", "Srijeda", "Četvrtak", "Petak"];
            Raspored.iscrtajRaspored(okvir, dani, 2, 35);
            assert.equal(okvir.innerHTML, 'Greška', "Krajnji sat ne smije biti 35, greška");
        });
        it('should write an error message in the div', function () {
            let dani = ["Ponedjeljak", "Utorak", "Srijeda", "Četvrtak", "Petak"];
            Raspored.iscrtajRaspored(okvir, dani, -5, 22);
            assert.equal(okvir.innerHTML, 'Greška', "Početni sat ne smije biti -5, greška");
        });
        it('should write an error message in the div', function () {
            let dani = ["Ponedjeljak", "Utorak", "Srijeda", "Četvrtak", "Petak"];
            Raspored.iscrtajRaspored(okvir, dani, 10, 10);
            assert.equal(okvir.innerHTML, 'Greška', "Početni sat ne smije biti veći ili jednak krajnjem, greška");
        });
        it('should write an error message in the div', function () {
            let dani = [];
            Raspored.iscrtajRaspored(okvir, dani, 10, 19);
            assert.equal(okvir.innerHTML, 'Greška', "Broj dana u rasporedu ne smije biti 0, greška");
        });
        it('should write an error message in the div', function () {
            let dani = ["Ponedjeljak", "Utorak", "Srijeda", "Četvrtak", "Petak"];
            Raspored.iscrtajRaspored(okvir, dani, 14.6, 16.8);
            assert.equal(okvir.innerHTML, 'Greška', "Početni i krajnji sat moraju biti cijeli brojevi, greška");
        });
        it('should draw 26 td columns in row 1 when hour parameters are 8 and 21', function () {
            let dani = ["Ponedjeljak", "Utorak", "Srijeda", "Četvrtak", "Petak"];
            Raspored.iscrtajRaspored(okvir, dani, 8, 21);
            let tabele = document.getElementsByTagName('table');
            let tabela = tabele[tabele.length-1];
            let redovi = tabela.getElementsByTagName('tr');
            let kolone = redovi[1].getElementsByTagName('td');
            assert.equal(kolone.length, 26, "Broj kolona treba biti 26");
        });
        it('should draw 48 td columns in row 3 when hour parameters are 0 and 24', function () {
            let dani = ["Ponedjeljak", "Utorak", "Srijeda", "Četvrtak", "Petak"];
            Raspored.iscrtajRaspored(okvir, dani, 0, 24);
            let tabele = document.getElementsByTagName('table');
            let tabela = tabele[tabele.length-1];
            let redovi = tabela.getElementsByTagName('tr');
            let kolone = redovi[3].getElementsByTagName('td');
            assert.equal(kolone.length, 48, "Broj kolona treba biti 48");
        });
        it('should draw 2 td columns in row 4 when hour parameters are 19 and 20', function () {
            let dani = ["Ponedjeljak", "Utorak", "Srijeda", "Četvrtak", "Petak"];
            Raspored.iscrtajRaspored(okvir, dani, 19, 20);
            let tabele = document.getElementsByTagName('table');
            let tabela = tabele[tabele.length-1];
            let redovi = tabela.getElementsByTagName('tr');
            let kolone = redovi[4].getElementsByTagName('td');
            assert.equal(kolone.length, 2, "Broj kolona treba biti 2");
        });
        it('should draw 3 tr rows in total when there are 2 days', function () {
            let dani = ["Subota", "Nedjelja"];
            Raspored.iscrtajRaspored(okvir, dani, 15, 17);
            let tabele = document.getElementsByTagName('table');
            let tabela = tabele[tabele.length-1];
            let redovi = tabela.getElementsByTagName('tr');
            assert.equal(redovi.length, 3, "Broj redova treba biti 3");
        });
        it('should write \"15:00\" in th column 3 of row 0 when hour parameters are 13 and 18', function () {
            let dani = ["Subota", "Nedjelja"];
            Raspored.iscrtajRaspored(okvir, dani, 13, 18);
            let tabele = document.getElementsByTagName('table');
            let tabela = tabele[tabele.length-1];
            let redovi = tabela.getElementsByTagName('tr');
            let kolone = redovi[0].getElementsByTagName('th');
            assert.equal(kolone[3].innerHTML, "15:00", "Vrijeme mora biti 15:00");
        });
        it('should write \"Petak\" in th column 0 of row 1', function () {
            let dani = ["Petak" ,"Subota", "Nedjelja"];
            Raspored.iscrtajRaspored(okvir, dani, 15, 17);
            let tabele = document.getElementsByTagName('table');
            let tabela = tabele[tabele.length-1];
            let redovi = tabela.getElementsByTagName('tr');
            let kolone = redovi[1].getElementsByTagName('th');
            assert.equal(kolone[0].innerHTML, "Petak", "Prvi dan mora biti Petak");
        });
    });
});
