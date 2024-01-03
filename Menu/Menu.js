//---------------------------------------------------------------------MENU
document.addEventListener("DOMContentLoaded", function () {

var Menu = document.getElementById("menu"); // Lấy phần tử có id "menu"
 // Lấy phần tử có id "menu"
var mobileM = document.querySelector(".menu-mobile-btn"); // Lấy phần tử có lớp "menu-mobile-btn"
var Menu2 = document.querySelector(".menu2"); // Lấy phần tử có lớp "menu2"
var logo = document.querySelector(".logo"); // Lấy phần tử có lớp "logo"
var timkiem = document.querySelector(".timkiem-mobile-btn"); // Lấy phần tử có lớp "timkiem-mobile-btn"
var tkTaiKhoan = document.querySelector(".timkiem-taikhoan"); // Lấy phần tử có lớp "timkiem-taikhoan"
var menuHeight = Menu.clientHeight; // Lấy chiều cao hiện tại của menu




function toggleMenu() {
  var isClose = Menu.clientHeight === menuHeight; // Kiểm tra xem menu có đóng hay không
  if (isClose) {
    // Nếu menu đóng, mở menu và thay đổi các thuộc tính
    Menu.style.display="inline-block";
    Menu.style.height = "auto";
    Menu2.style.display = "block";
    mobileM.style.height = "45px";
    logo.style.display="none";
    timkiem.style.display="none";
    mobileM.style.width = "100%";

  } else {
    // Nếu menu mở, đóng menu và khôi phục các thuộc tính ban đầu
    Menu.style.display="flex";
    Menu.style.height = "60px";
    mobileM.style.height = "100%";
    Menu2.style.display = "none";
    logo.style.display="block";
    timkiem.style.display="flex";
    mobileM.style.width ="20%";

  }

  function handleMenuClick() {
    // Xử lý sự kiện click vào menu
    Menu.style.display = "flex";
    Menu.style.height = "60px";
    mobileM.style.height = "100%";
    Menu2.style.display = "none";
    logo.style.display = "block";
    timkiem.style.display = "flex";
    mobileM.style.width ="20%";
  }
  
  var menuIcons = document.querySelectorAll('#menu > ul > li > a[href="#"]');
  // Lấy tất cả các phần tử <a> trong menu
  for (var i = 0; i < menuIcons.length; i++) {
    var menuIcon = menuIcons[i];
    menuIcon.onclick = handleMenuClick; // Gán sự kiện click vào các phần tử <a> để xử lý menu
  }
  
  var menusub = document.querySelectorAll('#menu > ul > li > ul > li > a[href="#"]');
  // Lấy tất cả các phần tử <a> trong menu con
  console.log("menusub", menusub);
  for (var i = 0; i < menusub.length; i++) {
    var menuIcon = menusub[i];
    menuIcon.onclick = handleMenuClick; // Gán sự kiện click vào các phần tử <a> trong menu con để xử lý menu
  }
  
}

var menuClicked = false; // Biến để lưu trạng thái click
function toggleMenuTable() {
  if (!menuClicked) {
    // Nếu menu chưa được click, mở menu và thay đổi các thuộc tính
    logo.style.display="none";
    menuClicked = true;
    tkTaiKhoan.style.display="none";
    Menu2.style.display = "flex";

  } else {
    // Nếu menu đã được click, đóng menu và khôi phục các thuộc tính ban đầu
    logo.style.display="flex";
    menuClicked = false;
    tkTaiKhoan.style.display="flex";
    Menu2.style.display = "none";

  }

  function handleMenuClick() {
    // Xử lý sự kiện click vào menu
    logo.style.display="flex";
    menuClicked = false;
    tkTaiKhoan.style.display="flex";
    Menu2.style.display = "none";

  }
  
  var menuIcons = document.querySelectorAll('#menu > ul > li > a[href="#"]');
  // Lấy tất cả các phần tử <a> trong menu
  for (var i = 0; i < menuIcons.length; i++) {
    var menuIcon = menuIcons[i];
    menuIcon.onclick = handleMenuClick; // Gán sự kiện click vào các phần tử <a> để xử lý menu
  }
  
  var menusub = document.querySelectorAll('#menu > ul > li > ul > li > a[href="#"]');
  // Lấy tất cả các phần tử <a> trong menu con
  console.log("menusub", menusub);
  for (var i = 0; i < menusub.length; i++) {
    var menuIcon = menusub[i];
    menuIcon.onclick = handleMenuClick; // Gán sự kiện click vào các phần tử <a> trong menu con để xử lý menu
  }
}

mobileM.onclick = function () {
  if (window.innerWidth > 740 && window.innerWidth < 1024) {
    toggleMenuTable(); // Mở/đóng menu trên các thiết bị có màn hình từ 740px đến 1024px
  };
  if (window.innerWidth < 740 ) {
    toggleMenu(); // Mở/đóng menu trên các thiết bị có màn hình nhỏ hơn 740px
  };
  
};
});



//END------------------------------------------------------------------MENU
function Form_DangNhap(){
  localStorage.setItem('user_doan', null);
  window.location.href = "http://127.0.0.1:5501/User/%C4%90%C4%83ng%20nh%E1%BA%ADp_User.html";

}

function Form_DienDan(){
  window.location.href = "http://127.0.0.1:5501/User/Di%E1%BB%85n%20%C4%91%C3%A0n.html";

}

function Form_DangKy(){
  window.location.href = "http://127.0.0.1:5501/User/%C4%90%C4%83ng%20k%C3%BD.html";

}
function Form_TrangChu(){
  window.location.href = "http://127.0.0.1:5501/User/index.html";

}

function Form_BaiViet(){
  window.location.href = "http://127.0.0.1:5501/User/B%C3%A0i%20vi%E1%BA%BFt.html";

}

var app = angular.module("AppDienDan");
app.controller("User_menu", function ($scope, $http) {
  
  var ctrl_dn_dk = document.getElementById("ctl_dangnhap_dangky_user"); // Lấy phần tử có id "menu"
  var ctl_thongtintaikhoan = document.getElementById("ctl_thongtintaikhoan");
  var _user = JSON.parse(localStorage.getItem("user_doan"));
  if (_user) {
    $scope.Keywords = _user.iD_User;
    ctrl_dn_dk.style.display= "none";
    ctl_thongtintaikhoan.style.display= "block";
    document.getElementById('avt_user_menu').src=_user.avatar;
    document.getElementById('name_user_menu').innerHTML=_user.fullName;
  }
  else{
    document.getElementById("btn_nofication").style.display='none';
    ctrl_dn_dk.style.display= "block";
    ctl_thongtintaikhoan.style.display= "none";
    $scope.Keywords = null;
  }

  $scope.Keywords
  
  $scope.listChuDe_menu;
  $scope.GetChuDe_Menu = function () {

    let dataChuDe = JSON.parse(localStorage.getItem("LIST_CHUDE")) || [];
    $scope.listChuDe_menu = dataChuDe;
  };
  $scope.GetChuDe_Menu();


  $scope.listNotification_menu;


  $scope.GetNotification_Menu = function () {
    
  };

  
  var formmenu = document.getElementById('form_menu_user');
  var formtimkiem = document.getElementById('khung_inp_timkiem');

  $scope.btn_timkiem_user = function(){
    
    if(formmenu.style.display =='block'){
      formmenu.style.display ='none'
      formtimkiem.style.display ='flex'
    }
    else{
      formmenu.style.display ='block'
      formtimkiem.style.display ='none'


    }
  }
});

function hienthichucnanguser(){
  var khung = document.getElementById('khung_ctl_user_header');
  if (khung.style.display === 'none'){
        khung.style.display = 'flex';
      document.getElementById('user-control_header').style.backgroundColor = '#E1E0E0';

  }
  else {
      khung.style.display = 'none';
      document.getElementById('user-control_header').style.backgroundColor = '#FFFFFF';
  }
}
function Form_ThongBao(){
  var formNotifications = document.getElementById('form_notifications');
  if (formNotifications.style.display === 'none') {
    formNotifications.style.display = 'block';
    
  } else {
    formNotifications.style.display = 'none';
  }
}

document.addEventListener('click', function (event) {
  var khung_ctl_user_header = document.getElementById('khung_ctl_user_header');
  var user_control_header = document.getElementById('user-control_header');

  if (!khung_ctl_user_header.contains(event.target) && !user_control_header.contains(event.target)) {
      chucnang_user = false;
      khung_ctl_user_header.style.display = 'none';
      user_control_header.style.backgroundColor = '#FFFFFF';
  }

  var formNotifications = document.getElementById('form_notifications');
  var btn = document.getElementById('btn_nofication');
  if (!btn.contains(event.target)) {
    formNotifications.style.display = 'none';
  }

});
