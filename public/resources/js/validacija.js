function polaIliCijeli(sat) {
    return Number.isInteger(sat) || Number.isInteger(sat + 0.5);
}

function validanSat(sat) {
    return Number.isInteger(sat) && sat >= 8 && sat <= 20 && polaIliCijeli(sat);
}

//{naziv:string,tip:string,pocetak:integer,kraj:integer,dan:string}
function dajNizDostupnostiTermina(nizAktivnosti) {
    let nizTermina = []
    for (let i = 0; i <= 24; i += 0.5) {
        nizTermina[i] = true;
    }
    nizAktivnosti.forEach(function (aktivnost) {
        for (let i = aktivnost.pocetak; i <= aktivnost.kraj; i += 0.5) {
            nizTermina[i] = false;
        }
    });
    return nizTermina;
}

module.exports = {
    postojiPredmet: function (nizPredmeta, predmet) {
        return nizPredmeta.includes(predmet);
    },
    validnaAktivnost: function (nizPredmeta, nizAktivnosti, aktivnost) {
        if (!postojiPredmet(nizPredmeta, aktivnost.naziv) || !validanSat(aktivnost.pocetak) || !validanSat(aktivnost.kraj) ||
            aktivnost.pocetak >= aktivnost.kraj) {
            return false;
        }
        let termini = dajNizDostupnostiTermina(nizAktivnosti);
        for (let i = aktivnost.pocetak; i <= aktivnost.kraj; i += 0.5) {
            if (termini[i] === false) {
                return false;
            }
        }
        return true;
    }
};