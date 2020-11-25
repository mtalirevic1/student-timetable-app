function validanSat(sat) {
    return Number.isInteger(sat) && sat >= 0 && sat <= 24;
}

function trebaIspisati(sat) {
    return sat === 0 || sat === 2 || sat === 4 || sat === 6 || sat === 8 || sat === 10 || sat === 12 || sat === 15 || sat === 17
        || sat === 19 || sat === 21 || sat === 23;
}

export default function iscrtajRaspored(div, dani, satPocetak, satKraj) {
    if (!validanSat(satPocetak) || !validanSat(satKraj) || satPocetak >= satKraj) {
        div.innerHTML = "Greška";
        return;
    }

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
            console.log("Trenutni sat: " + trenutniSat);
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
    console.log(div);
}
