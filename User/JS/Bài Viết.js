var mobileM = document.querySelector(".menu-mobile-btn"); // Lấy phần tử có lớp "menu-mobile-btn"
function autoExpand(textarea) {
  textarea.style.height = "auto"; // Đặt lại chiều cao về auto
  textarea.style.height = textarea.scrollHeight + "px"; // Đặt chiều cao dựa trên nội dung
}

document.addEventListener("DOMContentLoaded", function () {
  var form_ctr_binhluan = document.querySelector(".user-binhluan");
  var _user = JSON.parse(localStorage.getItem("user_doan"));
  if (!_user) {
    form_ctr_binhluan.style.display = "none";
  }
});

var app = angular.module("AppDienDan", []);
app.controller("User", function ($scope, $http, $location) {
  var _user = JSON.parse(localStorage.getItem("user_doan"));
  if (_user) {
    $scope.ID_User = _user.iD_User;
  }
  $scope._user = _user;
  var key = "id";
  var id_post = window.location.search.substring(window.location.search.indexOf(key) + key.length + 1);

  let dataBaiViet = JSON.parse(localStorage.getItem("LIST_BAIVIET")) || [];

  $scope.CT_Posts_ID=[];
  $scope.LoadPostsByID = function () {
    let dataBaiViet = JSON.parse(localStorage.getItem("LIST_BAIVIET")) || [];

    // Lọc danh sách chủ đề theo iD_Topic
    $scope.CT_Posts_ID = dataBaiViet.filter(function (baiviet) {
        return baiviet.iD_Post == id_post;
    });
    console.log($scope.CT_Posts_ID);
  };
  $scope.LoadPostsByID();






  $scope.btn_like_posts = function (id) {
    if (document.getElementById('icon_dathichbaiviet').style.display =='none') {
      document.getElementById('icon_dathichbaiviet').style.display='block';
      document.getElementById('icon_chuathichbaiviet').style.display='none';
      document.getElementById('btn_like').style.color='#2c70e5';
  
    } else {
        document.getElementById('icon_dathichbaiviet').style.display='none';
        document.getElementById('icon_chuathichbaiviet').style.display='block';
        document.getElementById('btn_like').style.color='#2d2d2d';
    }
  };


  let dataBinhLuan = JSON.parse(localStorage.getItem("LIST_BINHLUAN")) || [];
  $scope.listComments;

  $scope.LoadComment = function () {
    $scope.listComments = dataBinhLuan.filter(function (binhluan) {
      return binhluan.iD_Post == id_post;
  });
  };
  $scope.LoadComment();

  // Lấy thời gian hiện tại
  var thoiGianHienTai = new Date();
  var ngayThangNam = thoiGianHienTai.toLocaleDateString();
  var gioPhutGiay = thoiGianHienTai.toLocaleTimeString();
  var thoiGianhientai_value = ngayThangNam + " lúc " + gioPhutGiay;

  $scope.btn_binhluanbaiviet = function () {
    var inp_binhluan = document.getElementById('edt_binhluanbaiviet');

    if (inp_binhluan.value === '') {
      alert('Vui lòng nhập bình luận');
      return;
  }
    const maxId = dataBinhLuan.reduce(
      (max, binhluan) => Math.max(max, binhluan.iD_Comment || 0),
      0
    );

    var iD_Comment = maxId + 1;
    dataBinhLuan.push({
      iD_Comment : iD_Comment,
      iD_Post : $scope.CT_Posts_ID[0].iD_Post,
      iD_User : _user.iD_User,
      fullName : _user.fullName,
      avatar : _user.avatar,
      content : inp_binhluan.value,
      createDate : thoiGianhientai_value,
    });


    localStorage.setItem("LIST_BINHLUAN", JSON.stringify(dataBinhLuan));
    console.log(dataBinhLuan);
    $scope.LoadComment();
    inp_binhluan.value = "";



  };


  $scope.showForm = [];

  $scope.btn_chucnang_dabinhluan = function (index) {
    $scope.showForm[index] = !$scope.showForm[index];
  };

  $scope.btn_xoa_binhluan = function (id, index) {
     // Hiển thị hộp thoại xác nhận xóa
     var xacNhan = confirm("Bạn có chắc chắn muốn xóa bình luận không?");

     if (xacNhan) {
       var index = dataBinhLuan.findIndex(function (chude) {
         return chude.iD_Comment === id;
       });
 
       // Kiểm tra xem người dùng đã tồn tại hay chưa
       if (index !== -1) {
         // Xóa người dùng khỏi mảng
         dataBinhLuan.splice(index, 1);
 
         // Lưu mảng đã cập nhật vào local storage
         localStorage.setItem("LIST_BINHLUAN", JSON.stringify(dataBinhLuan));
 
         // Hiển thị dữ liệu trong console
         console.log(dataBinhLuan);
 
         $scope.listComments = dataBinhLuan;
 
         $scope.showForm[index] = false;
         $scope.LoadComment();
        }
     }
  };

  $scope.closeOverlay = function () {
    document.getElementById("overlay").style.display = "none";
  };
  $scope.btn_hienthiluonglike = function () {
    document.getElementById("overlay").style.display = "block";
  };
});
