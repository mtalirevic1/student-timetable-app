function validanSat(sat){
    return Number.isInteger(sat) && sat>=0 && sat<=24;
}

function trebaIspisati(sat){
    return sat===0 || sat===2 || sat===4 || sat===6 || sat===8 || sat===10 || sat===12 || sat===15 || sat===17
        || sat===19 || sat===21 || sat===23;
}

function iscrtajRaspored(div, dani, satPocetak, satKraj){
    if(!validanSat(satPocetak) || !validanSat(satKraj) || satPocetak>=satKraj){
        div.innerHTML="Greška";
        return;
    }
    let rasporedTable=document.createElement('table');
    let brojKolona=satKraj-satPocetak;
    const brojRedova=dani.size;
    let trenutniSat=satPocetak;
    let redVremena= document.createElement('tr');
    for(let i=0;i<brojKolona;i++){
        let celijaVremena=document.createElement('th');
        celijaVremena.classList.add('vrijeme');
        if(i%2===0 && trebaIspisati(trenutniSat)){
            if(trenutniSat<10){
                celijaVremena.innerHTML="0"+trenutniSat+":00";
            }
            else{
                celijaVremena.innerHTML=trenutniSat+":00";
            }
        }
        redVremena.append(celijaVremena);
        trenutniSat++;
    }

    brojKolona*=2;
    for(let i=0; i<brojRedova; i++){
        for(let j=0; j<brojKolona; j++){

        }
    }
    div.appendChild(rasporedTable);
}
