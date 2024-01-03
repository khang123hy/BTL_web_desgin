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



