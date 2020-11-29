import {iscrtajRaspored, dodajAktivnost} from './iscrtaj.js'

let okvir=document.getElementById("okvirTabele");
let unosi = [
    ["WT", "predavanje", 9, 12, "Ponedjeljak"],
    ["WT", "vježbe", 12, 13.5, "Ponedjeljak"],
    ["RMA", "predavanje", 14, 17, "Ponedjeljak"],
    ["RMA", "vježbe", 12.5, 14, "Utorak"],
    ["DM", "tutorijal", 14, 16, "Utorak"],
    ["DM", "predavanje", 16, 19, "Utorak"],
    ["OI", "predavanje", 12, 15, "Srijeda"]
            ];
iscrtajRaspored(okvir,["Ponedjeljak","Utorak","Srijeda","Četvrtak","Petak"],8,21);
for(let i=0; i<unosi.length; i++){
    let returnString=dodajAktivnost(okvir, unosi[i][0], unosi[i][1], unosi[i][2], unosi[i][3], unosi[i][4]);
    console.log(returnString);
    if(returnString!==''){
        alert(returnString);
    }
}
