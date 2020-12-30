function polaIliCijeli(sat) {
    return Number.isInteger(sat) || Number.isInteger(sat + 0.5);
}

function validanSat(sat) {
    return Number.isInteger(sat) && sat >= 8 && sat <= 20 && polaIliCijeli(sat);
}

//{naziv:string,tip:string,pocetak:integer,kraj:integer,dan:string}
function dajNizDostupnostiTermina(nizAktivnosti) {
    let daniAktivnosti = [];
    for (let i = 0; i < nizAktivnosti.length; i++) {
        if (!daniAktivnosti.includes(nizAktivnosti[i].dan)) {
            let dan = {dan: nizAktivnosti[i].dan};
            dan.termini = [];
            daniAktivnosti.push(dan);
        }
    }
    for (let k = 0; k < daniAktivnosti.length; k++) {
        for (let i = 0; i <= 24; i += 0.5) {
            daniAktivnosti[k].termini[i] = true;
        }
    }
    nizAktivnosti.forEach(function (aktivnost) {
        for (let k = 0; k < daniAktivnosti.length; k++) {
            if(aktivnost.dan===daniAktivnosti[k].dan) {
                for (let i = aktivnost.pocetak; i <= aktivnost.kraj; i += 0.5) {
                    daniAktivnosti[k].termini[i] = false;
                }
            }
        }
    });
    return daniAktivnosti;
}

module.exports = {
    postojiPredmet: function (nizPredmeta, predmet) {
        return nizPredmeta.includes(predmet);
    },
    validnaAktivnost: function (nizAktivnosti, aktivnost) {
        if (!validanSat(aktivnost.pocetak) || !validanSat(aktivnost.kraj) || aktivnost.pocetak >= aktivnost.kraj) {
            return false;
        }

        let daniAktivnosti = dajNizDostupnostiTermina(nizAktivnosti);
        let termini = []
        for(let i=0; i<daniAktivnosti.length;i++){
            if(daniAktivnosti[i].dan===aktivnost.dan){
                termini = daniAktivnosti[i].termini;
                break;
            }
        }
        for (let i = aktivnost.pocetak; i <= aktivnost.kraj; i += 0.5) {
            if (termini[i] === false) {
                return false;
            }
        }
        return true;
    }
};