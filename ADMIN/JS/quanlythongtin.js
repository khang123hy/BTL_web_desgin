var iconmenu = document.querySelector(".menu-bar");

iconmenu.onclick = function (){
    hienthimenu();
}

function opgettime(){
    var gettime = new Date();
    var getgio = gettime.getHours();
    var getphut = gettime.getMinutes();
    var getgiay = gettime.getSeconds();
    getgio = (getgio < 10 ? "0" : "") + getgio;
    getphut = (getphut<10?"0":"")+getphut;
    getgiay = (getgiay<10?"0":"")+getgiay;
 

    document.querySelector(".gettime").innerHTML= getgio+":"+getphut+":"+getgiay;
   

}
setInterval(opgettime, 1000);
