var iconmenu = document.querySelector(".menu-bar");
var Navigation = document.getElementById("Navigation-bar");
var menuclick = false;

function hienthimenu(){
    if (menuclick == false){
       

   
        Navigation.style.width="100%";
     
        menuclick = true;
    }
    else {
        menuclick = false;
        Navigation.style.width="0%";
    }
}

iconmenu.onclick = function (){
    hienthimenu();
}






function opgettime(){
    var gettime = new Date();
    var getgio = gettime.getHours();
    var getphut = gettime.getMinutes();
    var getgiay = gettime.getSeconds();
    var getngay = gettime.getDay();
    var getthang = gettime.getMonth();
    var getnam = gettime.getFullYear();
    
    getgio = (getgio < 10 ? "0" : "") + getgio;
    getphut = (getphut<10?"0":"")+getphut;
    getgiay = (getgiay<10?"0":"")+getgiay;
    getngay=(getngay<10?"0":"")+getngay;
    getthang=(getthang<10?"0":"")+getthang;

    document.querySelector(".gettime").innerHTML= getgio+":"+getphut+":"+getgiay;
    document.querySelector(".getday").innerHTML =getngay+"/"+getthang+"/"+getnam;

}
setInterval(opgettime, 1000);



