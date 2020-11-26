import Raspored from './iscrtajModul.js'

let okvir=document.getElementById("testOkvir1");
Raspored.iscrtajRaspored(okvir,["Ponedjeljak","Utorak","Srijeda","Četvrtak","Petak"],8,21);
Raspored.dodajAktivnost(okvir,"WT","predavanje",9,12,"Ponedjeljak");
Raspored.dodajAktivnost(okvir,"WT","vježbe",12,13.5,"Ponedjeljak");
Raspored.dodajAktivnost(okvir,"RMA","predavanje",14,17,"Ponedjeljak");
Raspored.dodajAktivnost(okvir,"RMA","vježbe",12.5,14,"Utorak");
Raspored.dodajAktivnost(okvir,"DM","tutorijal",14,16,"Utorak");
Raspored.dodajAktivnost(okvir,"DM","predavanje",16,19,"Utorak");
Raspored.dodajAktivnost(okvir,"OI","predavanje",12,15,"Srijeda");
