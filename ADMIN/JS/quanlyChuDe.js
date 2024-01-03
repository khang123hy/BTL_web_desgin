var iD_Topic = "";

var _user = JSON.parse(localStorage.getItem("user_doan"));

if (!_user || _user.Role == "USER") {
  window.location.href =
    "http://127.0.0.1:5501/ADMIN/%C4%90%C4%83ng%20nh%E1%BA%ADp.html";
}
var app = angular.module("AppDienDan", []);
app.controller("ChuDeCtr", function ($scope, $http) {
  var tieude = document.getElementById("edt_tieude");
  var noidung = document.getElementById("inp_mieuta");
  var anh = document.getElementById("input_hinhanh_chude");
  let dataChuDe = JSON.parse(localStorage.getItem("LIST_CHUDE")) || [];

      // Lấy thời gian hiện tại
      var thoiGianHienTai = new Date();
      var ngayThangNam = thoiGianHienTai.toLocaleDateString();
      var gioPhutGiay = thoiGianHienTai.toLocaleTimeString();
      var thoiGianhientai_value = ngayThangNam + ' lúc ' + gioPhutGiay;    
  
  $scope.listTopics;
  $scope.stt;
  $scope.page = 1;
  $scope.pageSize = 10;
  $scope.keywords="";

  $scope.LoadChuDe = function () {
    // Tính chỉ số bắt đầu và kết thúc của dữ liệu cần hiển thị trên trang hiện tại
    let startIndex = ($scope.page - 1) * $scope.pageSize;
    let endIndex = startIndex + $scope.pageSize;

    // Lọc danh sách người dùng dựa trên từ khóa tìm kiếm
    let filteredUsers;

    if ($scope.keywords.trim() === "") {
      // If keywords are empty, load the entire list without applying any filter
      filteredUsers = dataChuDe;
    } else {
      // Apply the filter based on the keywords
      filteredUsers = dataChuDe.filter(function (user) {
        return user.title
          .toLowerCase()
          .includes($scope.keywords.toLowerCase());
      });
    }

    // Lấy danh sách người dùng cho trang hiện tại
    $scope.listTopics = filteredUsers.slice(startIndex, endIndex);
  };

  $scope.changePage = function (value) {
    if (Number.isInteger(value) && value > 0) {
      $scope.page = value;
    } else if (value === "prev" && $scope.page > 1) {
      $scope.page -= 1;
    } else if (value === "next") {
      $scope.page += 1;
    }

    // Cập nhật trang hiện tại
    $scope.currentPage = $scope.page;

    // Gọi hàm LoadChuDe để tải danh sách người dùng mới
    $scope.LoadChuDe();
  };

  $scope.handleKeyUp = function (event) {
    if (event.keyCode === 13) {
      // Khi nhấn Enter, cập nhật từ khóa và tải lại danh sách người dùng
      $scope.keywords = inp_timkiem_header.value;
      $scope.LoadChuDe();
    }
  };

  // Gọi LoadChuDe khi trang được load lần đầu
  $scope.LoadChuDe();

  $scope.refresh = function () {
    iD_Topic = "";
    tieude.value = "";
    noidung.value = "";
    anh.value = "";
  };

  $scope.luu = function () {
    // Kiểm tra xem iD_Topic có tồn tại hay không
    if (iD_Topic === "") {
      // Nếu iD_Topic không tồn tại, kiểm tra tài khoản có tồn tại hay không
      if (kiemTraTitle(tieude.value)) {
        alert("Tiêu đề đã tồn tại, vui lòng chọn tiêu đề khác.");
        return;
      }
      if (tieude.value == "") {
        alert("Vui lòng nhập tiêu đề.");
        return;
      }
      // Nếu tài khoản chưa tồn tại, thực hiện thêm mới
      const maxId = dataChuDe.reduce(
        (max, chude) => Math.max(max, chude.iD_Topic || 0),
        0
      );
      iD_Topic_Value = maxId + 1;

      var newImagePath = "../Hình ảnh/Hình ảnh sử dụng/" + anh.value.split("\\").pop();
    
      dataChuDe.push({
        iD_Topic: iD_Topic_Value,
        title: tieude.value,
        description: noidung.value,
        image: newImagePath,
        createdDate: thoiGianhientai_value,
      });

      localStorage.setItem("LIST_CHUDE", JSON.stringify(dataChuDe));
      console.log(dataChuDe);
      $scope.listTopics = dataChuDe;

    // Load lại dữ liệu
    $scope.LoadChuDe();
    } else {
      // Nếu iD_Topic tồn tại, thực hiện chức năng sửa thông tin
      var xacNhan = confirm(
        "Bạn có chắc chắn muốn sửa thông tin người dùng không?"
      );

      if (xacNhan) {
        // Tìm vị trí của người dùng trong mảng
        var index = dataChuDe.findIndex(function (nguoidung) {
          return nguoidung.iD_Topic == iD_Topic;
        });

        // Kiểm tra xem người dùng đã tồn tại hay chưa
        if (index !== -1) {
          // Định nghĩa biến avatar
          var image = dataChuDe[index].image;

          // Cập nhật thông tin của người dùng
          dataChuDe[index] = {
            iD_Topic: iD_Topic,
            title: tieude.value,
            description: noidung.value,
            createdDate: thoiGianhientai_value,

            // Kiểm tra và cập nhật hình ảnh nếu có
            image: anh.value ? "../Hình ảnh/Hình ảnh sử dụng/" + anh.value.split("\\").pop() : image,
          };

          localStorage.setItem("LIST_CHUDE", JSON.stringify(dataChuDe));
          console.log(dataChuDe);
          $scope.listTopics = dataChuDe;

          // Load lại dữ liệu
          $scope.LoadChuDe();
        }
      }
    }
  };

  // Hàm kiểm tra tài khoản có tồn tại hay không
  function kiemTraTitle(title, currentUserId) {
    return dataChuDe.some(function (chude) {
      return (
        chude.title === title &&
        chude.iD_Topic !== currentUserId
      );
    });
  }

  $scope.btn_Xoa = function (id) {
    // Hiển thị hộp thoại xác nhận xóa
    var xacNhan = confirm("Bạn có chắc chắn muốn xóa người dùng không?");

    if (xacNhan) {
      // Tìm vị trí của người dùng trong mảng
      var index = dataChuDe.findIndex(function (chude) {
        return chude.iD_Topic === id;
      });

      // Kiểm tra xem người dùng đã tồn tại hay chưa
      if (index !== -1) {
        // Xóa người dùng khỏi mảng
        dataChuDe.splice(index, 1);

        // Lưu mảng đã cập nhật vào local storage
        localStorage.setItem("LIST_CHUDE", JSON.stringify(dataChuDe));

        // Hiển thị dữ liệu trong console
        console.log(dataChuDe);

        $scope.listTopics = dataChuDe;

        // Load lại dữ liệu
        $scope.LoadChuDe();
      }
    }
  };

  $scope.LoadChuDe();
});
function Sua(icon) {
  var row = icon.parentNode.parentNode;
  var cells = row.getElementsByTagName("td");

  var ID_Topic = cells[1].textContent;
  var title = cells[2].textContent;
  var noidung = cells[3].textContent;


  iD_Topic = ID_Topic;
    document.getElementById("edt_tieude").value = title;
  document.getElementById("inp_mieuta").value = noidung;

}
