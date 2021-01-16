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

function csvToJsonStudenti(string) {
    let rezultat = [];
    if (string === null || string === undefined) {
        return rezultat;
    }
    let nizStudenata = string.split('\n');
    let duzina = nizStudenata.length;
    for (let i = 0; i < duzina; i++) {
        let student = nizStudenata[i].split(',');
        if (student.length !== 2) {
            alert("Neispravan format unosa studenta! Ispravni unosi bit će dodani");
            continue;
        }
        rezultat.push({ime: student[0], index: student[1]});
    }
    return rezultat;
}

function dodajGrupuUListu(grupa) {
    let selectGrupa = document.getElementById('grupa');
    let option = document.createElement('option');
    option.value = grupa.id;
    option.innerHTML = grupa.naziv;
    selectGrupa.appendChild(option);
}

function ucitajOpcije() {
    ucitaj('/v2/grupe').then(function (grupe) {
        grupe.forEach(dodajGrupuUListu);
    }).catch(function (err) {
        console.log(err);
    });
}

function dodajStudente() {
    let studenti = csvToJsonStudenti(document.getElementById('studenti').value);
    let grupaId = document.getElementById('grupa').value;
    posalji('/v2/studenti/grupa/' + grupaId, {studenti: studenti, grupaId: grupaId}).then(res => {
        let resString="";
        for(let message of res){
            resString+=message+"\n";
        }
        document.getElementById('studenti').value=resString;
    }).catch(err => {
        console.log(err);
    });
}

ucitajOpcije();