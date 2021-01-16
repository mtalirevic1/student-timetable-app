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
        let imaLiDan = function (danAkt){
            return danAkt.dan===nizAktivnosti[i].dan;
        }
        if (!daniAktivnosti.some(imaLiDan)) {
            let dan = {dan: nizAktivnosti[i].dan, termini: []};
            daniAktivnosti.push(dan);
        }
    }
    for (let k = 0; k < daniAktivnosti.length; k++) {
        for (let i = 8; i <= 20; i += 0.5) {
            daniAktivnosti[k].termini[i] = true;
        }
    }
    nizAktivnosti.forEach(function (aktivnost) {
        for (let k = 0; k < daniAktivnosti.length; k++) {
            if (aktivnost.dan === daniAktivnosti[k].dan) {
                for (let i = aktivnost.pocetak+0.5; i < aktivnost.kraj; i += 0.5) {
                    daniAktivnosti[k].termini[i] = false;
                }
            }
        }
    });
    return daniAktivnosti;
}

module.exports = {
    postojiPredmet: function (nizPredmeta, predmet) {
        for(let i=0; i<nizPredmeta.length; i++){
            if(nizPredmeta[i].naziv===predmet.naziv){
                return true;
            }
        }
        return false;
    },
    validnaAktivnost: function (nizAktivnosti, aktivnost) {
        if (!validanSat(aktivnost.pocetak) || !validanSat(aktivnost.kraj) || aktivnost.pocetak >= aktivnost.kraj) {
            return false;
        }

        let daniAktivnosti = dajNizDostupnostiTermina(nizAktivnosti);
        let termini = [];
        for (let i = 0; i < daniAktivnosti.length; i++) {
            if (daniAktivnosti[i].dan === aktivnost.dan) {
                termini = daniAktivnosti[i].termini;
                break;
            }
        }
        if (termini.length === 0) {
            return true;
        }
        for (let i = aktivnost.pocetak; i <= aktivnost.kraj; i += 0.5) {
            if (termini[i] === false) {
                return false;
            }
        }
        return true;
    },
    istaImena: function (s1, s2){
        return s1.ime===s2.ime;
    },
    istiIndexi: function (s1, s2){
        return s1.index===s2.index;
    }
};