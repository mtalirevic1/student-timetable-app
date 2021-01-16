async function posalji(url, data) {
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json;charset=UTF-8"
        },
        body: JSON.stringify(data)
    });
    return response.json();
}

async function ucitaj(url) {
    const response = await fetch(url, {
        method: 'GET'
    });
    return response.json();
}

function dodajAktivnost() {
    let predmet = {
        naziv: document.getElementById('naziv').value
    }
    let tipSelect = document.getElementById('tip');
    let aktivnost = {
        naziv: document.getElementById('naziv').value + " " + tipSelect.options[tipSelect.selectedIndex].text,
        tipId: Number.parseInt(tipSelect.value),
        pocetak: Number.parseFloat(document.getElementById('v_pocetka').value),
        kraj: Number.parseFloat(document.getElementById('v_kraja').value),
        danId: Number.parseInt(document.getElementById('dan').value),
        grupaId: null
    };
    ucitaj('/v2/predmet/naziv/'+predmet.naziv).then(resPred => {
        if (resPred !== null) {
            aktivnost.predmetId = resPred.id;
            posalji('/v2/aktivnost', aktivnost).then(resAkt => {
                document.getElementById('aktivnosti').innerHTML = "";
                ucitajAktivnosti();
                alert("Uspješno dodana aktivnost!");
            }).catch(errAkt => {
                console.log(errAkt);
            });
        }
        else{
            posalji('/v2/predmet',predmet).then(noviPred => {
                aktivnost.predmetId = noviPred.id;
                posalji('/v2/aktivnost', aktivnost).then(resAkt => {
                    document.getElementById('aktivnosti').innerHTML = "";
                    ucitajAktivnosti();
                    document.getElementById('predmeti').innerHTML = "";
                    ucitajPredmete();
                    alert("Uspješno dodana aktivnost!");
                }).catch(errAkt => {
                    obrisiPredmet(noviPred.id);
                    console.log(errAkt);
                });
            }).catch( err => {
                console.log(err);
            });
        }
    }).catch(errPred => {
        console.log(errPred);
    });

    return false;
}


function obrisiPredmet(id) {
    let delXmlHttp = new XMLHttpRequest();
    delXmlHttp.open("DELETE", "/v2/predmet/" + id, true);
    delXmlHttp.send();
}

function dodajAktivnostUListu(a) {
    let liAkt = document.createElement('li');
    liAkt.classList.add('listEl');
    liAkt.innerText = a.naziv + ", " + a.tip.naziv + ", " + a.pocetak + "-" + a.kraj + ", " + a.dan.naziv;
    let ulAkt = document.getElementById('aktivnosti');
    ulAkt.appendChild(liAkt);
}

function dodajPredmetUListu(p) {
    let liPred = document.createElement('li');
    liPred.classList.add('listEl');
    liPred.innerText = p.naziv;
    let ulPred = document.getElementById('predmeti');
    ulPred.appendChild(liPred);
}

function dodajDanUListu(dan) {
    let selectDan = document.getElementById('dan');
    let option = document.createElement('option');
    option.value = dan.id;
    option.innerHTML = dan.naziv;
    selectDan.appendChild(option);
}

function dodajTipUListu(tip) {
    let selectTip = document.getElementById('tip');
    let option = document.createElement('option');
    option.value = tip.id;
    option.innerHTML = tip.naziv;
    selectTip.appendChild(option);
}

function ucitajPredmete() {
    let xmlHttpPred = new XMLHttpRequest();
    xmlHttpPred.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            let predmeti = JSON.parse(this.response);
            predmeti.forEach(dodajPredmetUListu);
        }
    }
    xmlHttpPred.open("GET", "/v2/predmeti", true);
    xmlHttpPred.send();
}

function ucitajAktivnosti() {
    let xmlHttpAkt = new XMLHttpRequest();
    xmlHttpAkt.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            let aktivnosti = JSON.parse(this.response);
            aktivnosti.forEach(dodajAktivnostUListu);
        }
    }
    xmlHttpAkt.open("GET", "/v2/aktivnosti", true);
    xmlHttpAkt.send();
}

function ucitajOpcije() {
    ucitaj('/v2/dani').then(function (dani) {
        dani.forEach(dodajDanUListu);
    }).catch(function (err) {
        console.log(err);
    });
    ucitaj('/v2/tipovi').then(function (tipovi) {
        tipovi.forEach(dodajTipUListu);
    }).catch(function (err) {
        console.log(err);
    });
}

ucitajPredmete();
ucitajAktivnosti();
ucitajOpcije();