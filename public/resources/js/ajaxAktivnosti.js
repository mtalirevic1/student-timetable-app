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

function dodajAktivnost() {
    let predmet = {
        naziv: document.getElementById('naziv').value
    }
    let aktivnost = {
        naziv: document.getElementById('naziv').value,
        tip: document.getElementById('tip').value,
        pocetak: Number.parseFloat(document.getElementById('v_pocetka').value),
        kraj: Number.parseFloat(document.getElementById('v_kraja').value),
        dan: document.getElementById('dan').value
    };
    posalji('/predmet', predmet).then(function (resPred) {
        posalji('/aktivnost', aktivnost).then(function (resAkt) {
            if (resAkt.message === "Uspješno dodana aktivnost!") {
                if (resPred.message === "Uspješno dodan predmet!") {
                    dodajPredmetUListu(predmet);
                }
                dodajAktivnostUListu(aktivnost);
                alert("Uspješno dodavanje aktivnosti!");
            } else if(resPred.message === "Uspješno dodan predmet!") {
                let delXmlHttp = new XMLHttpRequest();
                delXmlHttp.open("DELETE", "/predmet/" + predmet.naziv, true);
                delXmlHttp.send();
            }
        });
    });

    return false;
}

function dodajAktivnostUListu(a) {
    let liAkt = document.createElement('li');
    liAkt.classList.add('listEl');
    liAkt.innerText = a.naziv + ", " + a.tip + ", " + a.pocetak + "-" + a.kraj + ", " + a.dan;
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

function ucitajListe() {
    let xmlHttpPred = new XMLHttpRequest();
    xmlHttpPred.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            let predmeti = JSON.parse(this.response);
            predmeti.forEach(dodajPredmetUListu);
        }
    }
    xmlHttpPred.open("GET", "/predmeti", true);
    xmlHttpPred.send();

    let xmlHttpAkt = new XMLHttpRequest();
    xmlHttpAkt.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            let aktivnosti = JSON.parse(this.response);
            aktivnosti.forEach(dodajAktivnostUListu);
        }
    }
    xmlHttpAkt.open("GET", "/aktivnosti", true);
    xmlHttpAkt.send();
}

ucitajListe();
