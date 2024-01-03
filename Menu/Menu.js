//---------------------------------------------------------------------MENU

var Menu = document.getElementById("menu"); // Lấy phần tử có id "menu"
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

//END------------------------------------------------------------------MENU
