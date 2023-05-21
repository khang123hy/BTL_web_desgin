//---------------------------------------------------------------------MENU
// script.js

// Lấy phần tử có id là 'menu'
var Menu = document.getElementById("menu");
var mobileM = document.querySelector(".menu-mobile-btn");
var Menu2 = document.querySelector(".menu2");
var logo = document.querySelector(".logo");
var timkiem = document.querySelector(".timkiem-mobile-btn");
var tkTaiKhoan = document.querySelector(".timkiem-taikhoan");



var menuHeight = Menu.clientHeight;

function toggleMenu() {
  var isClose = Menu.clientHeight === menuHeight;
  if (isClose) {
    Menu.style.display="inline-block";
    Menu.style.height = "auto";
    Menu2.style.display = "block";
    mobileM.style.height = "45px";
    logo.style.display="none";
    timkiem.style.display="none";
    mobileM.style.width = "100%";

  } else {
    Menu.style.display="flex";
    Menu.style.height = "60px";
    mobileM.style.height = "100%";
    Menu2.style.display = "none";
    logo.style.display="block";
    timkiem.style.display="flex";
    mobileM.style.width ="20%";
   

  }

  function handleMenuClick() {
    Menu.style.display = "flex";
    Menu.style.height = "60px";
    mobileM.style.height = "100%";
    Menu2.style.display = "none";
    logo.style.display = "block";
    timkiem.style.display = "flex";
    mobileM.style.width ="20%";
  }
  
  var menuIcons = document.querySelectorAll('#menu > ul > li > a[href="#"]');
  for (var i = 0; i < menuIcons.length; i++) {
    var menuIcon = menuIcons[i];
    menuIcon.onclick = handleMenuClick;
  }
  
  var menusub = document.querySelectorAll('#menu > ul > li > ul > li > a[href="#"]');
  console.log("menusub", menusub);
  for (var i = 0; i < menusub.length; i++) {
    var menuIcon = menusub[i];
    menuIcon.onclick = handleMenuClick;
  }
  
  
}



var menuClicked = false; // Biến để lưu trạng thái click
function toggleMenuTable() {

  if (!menuClicked) {
    logo.style.display="none";
    menuClicked = true;
    tkTaiKhoan.style.display="none";
    Menu2.style.display = "flex";

  } else {
    logo.style.display="flex";
    menuClicked = false;
    tkTaiKhoan.style.display="flex";
    Menu2.style.display = "none";

  }

  function handleMenuClick() {
    logo.style.display="flex";
    menuClicked = false;
    tkTaiKhoan.style.display="flex";
    Menu2.style.display = "none";

  }
  
  var menuIcons = document.querySelectorAll('#menu > ul > li > a[href="#"]');
  for (var i = 0; i < menuIcons.length; i++) {
    var menuIcon = menuIcons[i];
    menuIcon.onclick = handleMenuClick;
  }
  
  var menusub = document.querySelectorAll('#menu > ul > li > ul > li > a[href="#"]');
  console.log("menusub", menusub);
  for (var i = 0; i < menusub.length; i++) {
    var menuIcon = menusub[i];
    menuIcon.onclick = handleMenuClick;
  }
  
};
mobileM.onclick = function () {
  if (window.innerWidth > 740 && window.innerWidth < 1024) {
    toggleMenuTable();
  };
  if (window.innerWidth < 740 ) {
    toggleMenu();
  };
  
};

//END------------------------------------------------------------------MENU
