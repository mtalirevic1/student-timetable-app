import {iscrtajRaspored, dodajAktivnost} from './iscrtaj.js'

let okvir=document.getElementById("testOkvir1");
iscrtajRaspored(okvir,["Ponedjeljak","Utorak","Srijeda","Četvrtak","Petak"],8,21);
dodajAktivnost(okvir,"WT","predavanje",17,20,"Srijeda");
dodajAktivnost(okvir,"WT","vježbe",12,13.5,"Ponedjeljak");
dodajAktivnost(okvir,"RMA","predavanje",14,17,"Ponedjeljak");
dodajAktivnost(okvir,"RMA","vježbe",12.5,14,"Utorak");
dodajAktivnost(okvir,"DM","tutorijal",14,16,"Utorak");
dodajAktivnost(okvir,"DM","predavanje",16,19,"Utorak");
dodajAktivnost(okvir,"OI","predavanje",9.5,11.5,"Srijeda");
dodajAktivnost(okvir,"RG","predavanje",8,11,"Četvrtak");
dodajAktivnost(okvir,"RG","vježbe",19,21,"Petak");
dodajAktivnost(okvir,"RG","tutorijal",15.5,18,"Petak");

let okvir2=document.getElementById("testOkvir2");
let unosi = [
    ["OIS", "predavanje", 9, 12, "Ponedjeljak"],
    ["OIS", "vježbe", 12, 13.5, "Subota"], //nevalidno zbog dana
    ["RMA", "predavanje", 14, 17, "Ponedjeljak"],
    ["RMA", "vježbe", 12.5, 14, "Utorak"],
    ["DM", "tutorijal", 11, 16, "Utorak"], //nevalidno zbog prethodnog
    ["DM", "predavanje", 16, 19, "Utorak"],
    ["PJP", "predavanje", 12, 15, "Srijeda"],
    ["PJP", "vježbe", 12.5, 14, "Četvrtak"],
    ["OI", "tutorijal", 11, 16, "Petak"],
    ["OI", "predavanje", 16, 25, "Utorak"] //nevalidno zbog vremena
];
iscrtajRaspored(okvir2,["Ponedjeljak","Utorak","Srijeda","Četvrtak","Petak"],8,21);
for(let i=0; i<unosi.length; i++) {
    let returnString = dodajAktivnost(okvir2, unosi[i][0], unosi[i][1], unosi[i][2], unosi[i][3], unosi[i][4]);
    console.log(returnString);
    if (returnString !== '') {
        alert(returnString);
    }
}
