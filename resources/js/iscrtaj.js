function validanSat(sat) {
    return Number.isInteger(sat) && sat >= 0 && sat <= 24;
}

function trebaIspisati(sat) {
    return sat === 0 || sat === 2 || sat === 4 || sat === 6 || sat === 8 || sat === 10 || sat === 12 || sat === 15
        || sat === 17 || sat === 19 || sat === 21 || sat === 23;
}

function polaIliCijeli(sat){
    return Number.isInteger(sat) || Number.isInteger(sat+0.5);
}

function validanTermin(pocetak, kraj){
    return polaIliCijeli(pocetak) && polaIliCijeli(kraj) && pocetak>=pocetniSat && kraj<=krajnjiSat && pocetak<kraj;
}

let pocetniSat = undefined;
let krajnjiSat = undefined;
let nizDana = undefined;

export function iscrtajRaspored(div, dani, satPocetak, satKraj) {
    if(div == null){
        return;
    }
    if (!validanSat(satPocetak) || !validanSat(satKraj) || satPocetak >= satKraj) {
        div.innerHTML = "Greška";
        return;
    }
    if(dani == null || dani.length === 0){
        div.innerHTML = "Greška";
        return;
    }
    //postavljanje globalnih parametara rasporeda
    nizDana=dani;
    pocetniSat = satPocetak;
    krajnjiSat = satKraj;
    //generisanje tabele
    let rasporedTable = document.createElement('table');
    rasporedTable.classList.add('table');
    let colGroup = document.createElement('colgroup');
    let col = document.createElement('col');
    col.classList.add('wide');
    colGroup.appendChild(col);
    rasporedTable.appendChild(colGroup);
    let brojKolona = satKraj - satPocetak;
    const brojRedova = dani.length;
    let trenutniSat = satPocetak;
    let redVremena = document.createElement('tr');
    redVremena.appendChild(document.createElement('th'));
    for (let i = 0; i < brojKolona; i++) {
        let celijaVremena = document.createElement('th');
        celijaVremena.setAttribute('colspan', '2');
        celijaVremena.classList.add('vrijeme');
        if (trebaIspisati(trenutniSat)) {
            if (trenutniSat < 10) {
                celijaVremena.innerHTML = "0" + trenutniSat + ":00";
            } else {
                celijaVremena.innerHTML = trenutniSat + ":00";
            }
        }
        redVremena.appendChild(celijaVremena);
        trenutniSat++;
    }
    rasporedTable.appendChild(redVremena);
    brojKolona *= 2;
    for (let i = 0; i < brojRedova; i++) {
        let redAktivnosti = document.createElement('tr');
        for (let j = 0; j <= brojKolona; j++) {
            if (j === 0) {
                let celijaDana = document.createElement('th');
                celijaDana.classList.add('dan');
                celijaDana.innerHTML = dani[i];
                redAktivnosti.appendChild(celijaDana);
                let praznaCelija = document.createElement('th');
                praznaCelija.classList.add('nevidljivi');
                redAktivnosti.appendChild(praznaCelija);
            } else {
                let celijaAktivnosti = document.createElement('td');
                celijaAktivnosti.classList.add('prazni');
                if (j % 2 === 0) {
                    celijaAktivnosti.classList.add('solidno');
                } else {
                    celijaAktivnosti.classList.add('isprekidano');
                }
                redAktivnosti.appendChild(celijaAktivnosti);
            }
        }
        rasporedTable.appendChild(redAktivnosti);
    }
    div.appendChild(rasporedTable);
}

export function dodajAktivnost(raspored, naziv, tip, vrijemePocetak, vrijemeKraj, dan) {
    if(raspored == null || !raspored.hasChildNodes()){
        return 'Greška - raspored nije kreiran';
    }
    if(nizDana === undefined || nizDana.length === 0){
        return 'Greška - dani rasporeda nisu definisani';
    }
    if(!nizDana.includes(dan) || !validanTermin(vrijemePocetak,vrijemeKraj)){
        return 'Greška - u rasporedu ne postoji dan ili vrijeme u kojem pokušavate dodati termin';
    }
    let trazeniRed=raspored.getElementsByTagName('table').item(0)
        .getElementsByTagName('tr').item(nizDana.indexOf(dan)+1); //korekcija za 1 zbog reda sati
    let indeksPocetka=2*(vrijemePocetak-pocetniSat);
    let indeksKraja=2*(vrijemeKraj-pocetniSat);
    let trenutnaCelija;
    for(let i=indeksPocetka; i<indeksKraja; i++) {
        trenutnaCelija=trazeniRed.getElementsByTagName('td').item(i);
        if(trenutnaCelija.classList.contains('popunjeni') || trenutnaCelija.classList.contains('skriveni')){
            return 'Greška - već postoji termin u rasporedu u zadanom vremenu';
        }
    }
    //popunjavanje celije aktivnosti
    trenutnaCelija=trazeniRed.getElementsByTagName('td').item(indeksPocetka);
    trenutnaCelija.classList.remove('prazni');
    trenutnaCelija.classList.add('popunjeni');
    let nazivPredmeta = document.createElement('p');
    nazivPredmeta.classList.add('predmet');
    nazivPredmeta.innerHTML=naziv;
    let tipAktivnosti = document.createElement('p');
    tipAktivnosti.classList.add('aktivnost');
    tipAktivnosti.innerHTML=tip;
    trenutnaCelija.appendChild(nazivPredmeta);
    trenutnaCelija.appendChild(tipAktivnosti);
    trenutnaCelija.setAttribute('colspan', (indeksKraja-indeksPocetka)+"");
    indeksPocetka++;
    //sakrivanje viska celija
    for(let i=indeksPocetka; i<indeksKraja; i++){
        trenutnaCelija=trazeniRed.getElementsByTagName('td').item(i);
        trenutnaCelija.classList.add('skriveni');
    }
    return '';
}
