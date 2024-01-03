var Navigation = document.getElementById("Navigation-bar");
var menuclick = false;
var chucnang_user =false;


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

function hienthichucnanguser(){
    if (chucnang_user == false){
        document.getElementById('khung_ctl_user_header').style.display = 'flex';
        document.getElementById('user-control_header').style.backgroundColor = '#E1E0E0';
  
        chucnang_user = true;
    }
    else {
        chucnang_user = false;
        document.getElementById('khung_ctl_user_header').style.display = 'none';
        document.getElementById('user-control_header').style.backgroundColor = '#FFFFFF';
    }
  }

document.addEventListener('DOMContentLoaded', function() {
    var btn_timkiem = document.getElementById('btn_tiemkiem_header');
    var btn_thoat = document.getElementById('btn_thoat_timkiem_header');
    var inp_timkiem = document.getElementById('inp_timkiem_header');
    var id_title = document.getElementById('id_title_header'); 
    var khung = document.getElementById('khung_inp_timkiem'); 
    var btn_avt_user = document.getElementById('user-control_header'); 
    
    btn_timkiem.addEventListener('click', function() {
        id_title.style.display = "none";
            btn_timkiem.style.display = "none";
            btn_thoat.style.display = 'block';
            khung.style.display = 'flex';
            inp_timkiem.style.display = 'block';
        });
    
        btn_thoat.addEventListener('click', function() {
            id_title.style.display = 'block';
            btn_timkiem.style.display = 'block';
            btn_thoat.style.display = 'none';
            khung.style.display = 'none';

            inp_timkiem.style.display = 'none';
        });

        var _user = JSON.parse(localStorage.getItem("user_doan"));
        if (_user) {
          document.getElementById('avt_user_menu').src=_user.avatar;
        }
});



