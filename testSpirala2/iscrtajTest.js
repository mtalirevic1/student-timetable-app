
let assert = chai.assert;

describe('Raspored', function () {
    let okvir = document.getElementById('ispis');
    describe('iscrtajRaspored()', function () {
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

    describe('dodajAktivnost()', function () {
        let dani = ["Ponedjeljak", "Utorak", "Srijeda", "Četvrtak", "Petak"];
        it('should return an error message', function (){
            let noviOkvir=document.createElement('div'); //kreiranje diva i crtanje rasporeda za testiranje
            noviOkvir.setAttribute("id","noviOkvir")
            okvir.appendChild(noviOkvir);
            Raspored.iscrtajRaspored(noviOkvir, dani, 9, 19);
            let errorMessage=Raspored.dodajAktivnost(null, "DM","predavanje",11,13,"Ponedjeljak");
            assert.equal(errorMessage, "Greška - raspored nije kreiran","Raspored ne smije biti null");
        });
        it('should return an error message', function (){
            let div=document.createElement('div');
            let errorMessage=Raspored.dodajAktivnost(div, "DM","predavanje",11,13,"Ponedjeljak");
            assert.equal(errorMessage, "Greška - raspored nije kreiran","Raspored mora biti kreiran u divu");
        });
        it('should return an error message', function (){
            let noviOkvir=document.getElementById("noviOkvir");
            let errorMessage=Raspored.dodajAktivnost(noviOkvir, "DM","predavanje",11,13,"Subota");
            assert.equal(errorMessage, "Greška - u rasporedu ne postoji dan ili vrijeme u kojem pokušavate dodati termin", "Dan mora biti definisan u rasporedu");
        });
        it('should return an error message', function (){
            let noviOkvir=document.getElementById("noviOkvir");
            let errorMessage=Raspored.dodajAktivnost(noviOkvir, "PJP","predavanje",8,13,"Petak");
            assert.equal(errorMessage, "Greška - u rasporedu ne postoji dan ili vrijeme u kojem pokušavate dodati termin", "Vrijeme početka mora biti unutar rasporeda");
        });
        it('should return an error message', function (){
            let noviOkvir=document.getElementById("noviOkvir");
            let errorMessage=Raspored.dodajAktivnost(noviOkvir, "PJP","predavanje",10,20,"Petak");
            assert.equal(errorMessage, "Greška - u rasporedu ne postoji dan ili vrijeme u kojem pokušavate dodati termin", "Vrijeme kraja mora biti unutar rasporeda");
        });
        it('should return an error message', function (){
            let noviOkvir=document.getElementById("noviOkvir");
            let errorMessage=Raspored.dodajAktivnost(noviOkvir, "PJP","predavanje",9.67,15.32,"Petak");
            assert.equal(errorMessage, "Greška - u rasporedu ne postoji dan ili vrijeme u kojem pokušavate dodati termin", "Vrijeme smije biti samo u formi cijelog ili pola sata");
        });
        it('should draw activity of name \"DM\", type \"predavanje\" from hours 11 to 13 in row 1', function (){
            let noviOkvir=document.getElementById("noviOkvir");
            let errorMessage=Raspored.dodajAktivnost(noviOkvir, "DM","predavanje",11,13,"Ponedjeljak");
            let tabele = document.getElementsByTagName('table');
            let tabela = tabele[tabele.length-1];
            let redovi = tabela.getElementsByTagName('tr');
            let kolone = redovi[1].getElementsByTagName('td');
            let paragrafi = kolone[4].getElementsByTagName('p');
            assert.equal(paragrafi[0].innerHTML, "DM", "Aktivnost mora biti validna");
        });
        it('should draw activity of name \"WT\", type \"vježbe\" from hours 9 to 19 in row 2', function (){
            let noviOkvir=document.getElementById("noviOkvir");
            let errorMessage=Raspored.dodajAktivnost(noviOkvir, "WT","vježbe",9,19,"Utorak");
            let tabele = document.getElementsByTagName('table');
            let tabela = tabele[tabele.length-1];
            let redovi = tabela.getElementsByTagName('tr');
            let kolone = redovi[2].getElementsByTagName('td');
            let stil = window.getComputedStyle(kolone[19]);
            assert.equal(stil.display, "none", "Kolona 19 reda 2 bi trebala biti skrivena");
        });
        it('should return an error message', function (){
            let noviOkvir=document.getElementById("noviOkvir");
            let errorMessage=Raspored.dodajAktivnost(noviOkvir, "PJP","predavanje",13,16,"Utorak");
            assert.equal(errorMessage, "Greška - već postoji termin u rasporedu u zadanom vremenu", "Aktivnost mora biti u slobodnom terminu");
        });
        it('should draw activity of name \"RMA\", type \"predavanje\" from hours 13.5 to 16.5 in row 3', function (){
            let noviOkvir=document.getElementById("noviOkvir");
            let errorMessage=Raspored.dodajAktivnost(noviOkvir, "RMA","predavanje",13.5,16.5,"Srijeda");
            let tabele = document.getElementsByTagName('table');
            let tabela = tabele[tabele.length-1];
            let redovi = tabela.getElementsByTagName('tr');
            let kolone = redovi[3].getElementsByTagName('td');
            let paragrafi = kolone[9].getElementsByTagName('p');
            assert.equal(paragrafi[0].innerHTML, "RMA", "Aktivnost mora biti validna i na pola sata");
        });
        it('should draw activity of name \"RMA\", type \"vježbe\" from hours 16.5 to 19 in row 3', function (){
            let noviOkvir=document.getElementById("noviOkvir");
            let errorMessage=Raspored.dodajAktivnost(noviOkvir, "RMA","vježbe",16.5,19,"Srijeda");
            let tabele = document.getElementsByTagName('table');
            let tabela = tabele[tabele.length-1];
            let redovi = tabela.getElementsByTagName('tr');
            let kolone = redovi[3].getElementsByTagName('td');
            let paragrafi = kolone[15].getElementsByTagName('p');
            assert.equal(paragrafi[1].innerHTML, "vježbe", "Aktivnost mora biti validna i na pola sata");
        });
        it('should draw activity of name \"OI\", type \"tutorijal\" from hours 9 to 10 in row 4', function (){
            let noviOkvir=document.getElementById("noviOkvir");
            let errorMessage=Raspored.dodajAktivnost(noviOkvir, "OI","tutorijal",9,10,"Četvrtak");
            let tabele = document.getElementsByTagName('table');
            let tabela = tabele[tabele.length-1];
            let redovi = tabela.getElementsByTagName('tr');
            let kolone = redovi[4].getElementsByTagName('td');
            let paragrafi = kolone[0].getElementsByTagName('p');
            assert.equal(paragrafi[1].innerHTML, "tutorijal", "Aktivnost mora biti validna");
        });
        it('should draw activity of name \"OIS\", type \"tutorijal\" from hours 10 to 10.5 in row 4', function (){
            let noviOkvir=document.getElementById("noviOkvir");
            let errorMessage=Raspored.dodajAktivnost(noviOkvir, "OIS","tutorijal",10,10.5,"Četvrtak");
            let tabele = document.getElementsByTagName('table');
            let tabela = tabele[tabele.length-1];
            let redovi = tabela.getElementsByTagName('tr');
            let kolone = redovi[4].getElementsByTagName('td');
            let paragrafi = kolone[2].getElementsByTagName('p');
            assert.equal(paragrafi[0].innerHTML, "OIS", "Aktivnost mora biti validna i na pola sata");
        });
        it('should return an error message', function (){
            let noviOkvir=document.getElementById("noviOkvir");
            let errorMessage=Raspored.dodajAktivnost(noviOkvir, "PJP","predavanje",10,16,"Četvrtak");
            assert.equal(errorMessage, "Greška - već postoji termin u rasporedu u zadanom vremenu", "Aktivnost mora biti u slobodnom terminu");
        });
    });
});
