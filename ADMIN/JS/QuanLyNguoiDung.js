var iD_User = "";
var anh = "";
var _user = JSON.parse(localStorage.getItem("user_doan"));
if (!_user || _user.role == "USER") {
  window.location.href =
    "http://127.0.0.1:5501/ADMIN/%C4%90%C4%83ng%20nh%E1%BA%ADp.html";
}

var app = angular.module("AppDienDan", []);
app.controller("NguoiDungCtr", function ($scope, $http) {
  var tentk = document.getElementById("edt_tendangnhap");
  var mk = document.getElementById("edt_matkhau");
  var hoten = document.getElementById("edt_hoten");
  var ngaysinh = document.getElementById("edt_ngaysinh");
  var diachi = document.getElementById("edt_diachi");
  var sdt = document.getElementById("edt_sdt");
  var quyen = document.getElementById("edt_quyen");
  var gioitinh = document.getElementById("edt_gioitinh");
  var email = document.getElementById("edt_email");
  var ip_hinhanh = document.getElementById("input_hinhanh_nguoidung");

  let dataNGuoiDung = JSON.parse(localStorage.getItem("LIST_NGUOIDUNG")) || [];

  $scope.page = 1;
  $scope.pageSize = 10;
  $scope.listUser = [];
  $scope.keywords = "";

  $scope.LoadNguoiDung = function () {
    // Tính chỉ số bắt đầu và kết thúc của dữ liệu cần hiển thị trên trang hiện tại
    let startIndex = ($scope.page - 1) * $scope.pageSize;
    let endIndex = startIndex + $scope.pageSize;

    // Lọc danh sách người dùng dựa trên từ khóa tìm kiếm
    let filteredUsers;

    if ($scope.keywords.trim() === "") {
      // If keywords are empty, load the entire list without applying any filter
      filteredUsers = dataNGuoiDung;
    } else {
      // Apply the filter based on the keywords
      filteredUsers = dataNGuoiDung.filter(function (user) {
        return user.accountName
          .toLowerCase()
          .includes($scope.keywords.toLowerCase());
      });
    }

    // Lấy danh sách người dùng cho trang hiện tại
    $scope.listUser = filteredUsers.slice(startIndex, endIndex);
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

    // Gọi hàm LoadNguoiDung để tải danh sách người dùng mới
    $scope.LoadNguoiDung();
  };

  $scope.handleKeyUp = function (event) {
    if (event.keyCode === 13) {
      // Khi nhấn Enter, cập nhật từ khóa và tải lại danh sách người dùng
      $scope.keywords = inp_timkiem_header.value;
      $scope.LoadNguoiDung();
    }
  };

  // Gọi LoadNguoiDung khi trang được load lần đầu
  $scope.LoadNguoiDung();

  $scope.refresh = function () {
    iD_User = "";
    tentk.value = "";
    mk.value = "";
    email.value = "";
    gioitinh.value = "";
    hoten.value = "";
    ip_hinhanh.value = "";
    ngaysinh.value = "";
    sdt.value = "";
    diachi.value = "";
    quyen.value = "";
  };

  $scope.luu = function () {
    // Kiểm tra xem iD_User có tồn tại hay không
    if (iD_User === "") {
      // Nếu iD_User không tồn tại, kiểm tra tài khoản có tồn tại hay không
      if (kiemTraTaiKhoanTonTai(tentk.value)) {
        // Nếu tài khoản đã tồn tại, thông báo lỗi hoặc thực hiện các hành động phù hợp
        alert("Tài khoản đã tồn tại, vui lòng chọn tài khoản khác.");
        return;
      }

      // Nếu tài khoản chưa tồn tại, thực hiện thêm mới
      const maxId = dataNGuoiDung.reduce(
        (max, nguoidung) => Math.max(max, nguoidung.iD_User || 0),
        0
      );
      iD_User_Value = maxId + 1;

      var newImagePath ="../Hình ảnh/Hình ảnh sử dụng/" + ip_hinhanh.value.split("\\").pop();

      dataNGuoiDung.push({
        iD_User: iD_User_Value,
        accountName: tentk.value,
        password: mk.value,
        fullName: hoten.value,
        address: diachi.value,
        sex: gioitinh.value,
        dateOfBirth: ngaysinh.value,
        phoneNumber: sdt.value,
        avatar: newImagePath,
        email: email.value,
        role: quyen.value,
      });

      localStorage.setItem("LIST_NGUOIDUNG", JSON.stringify(dataNGuoiDung));
      console.log(dataNGuoiDung);
      $scope.LoadNguoiDung();
    } else {
      // Nếu iD_User tồn tại, thực hiện chức năng sửa thông tin
      var xacNhan = confirm(
        "Bạn có chắc chắn muốn sửa thông tin người dùng không?"
      );

      if (xacNhan) {
        // Tìm vị trí của người dùng trong mảng
        var index = dataNGuoiDung.findIndex(function (nguoidung) {
          return nguoidung.iD_User == iD_User;
        });

        // Kiểm tra xem người dùng đã tồn tại hay chưa
        if (index !== -1) {
          // Định nghĩa biến avatar
          var avatar = dataNGuoiDung[index].avatar;
          var accountName = dataNGuoiDung[index].accountName;

          // Kiểm tra tài khoản có tồn tại hay không khi sửa thông tin
          if (kiemTraTaiKhoanTonTai(accountName, iD_User)) {
            // Nếu tài khoản đã tồn tại, thông báo lỗi hoặc thực hiện các hành động phù hợp
            alert("Tài khoản đã tồn tại, vui lòng chọn tài khoản khác.");
            return;
          }

          // Cập nhật thông tin của người dùng
          dataNGuoiDung[index] = {
            iD_User: iD_User,
            accountName: accountName,
            password: mk.value,
            fullName: hoten.value,
            address: diachi.value,
            sex: gioitinh.value,
            dateOfBirth: ngaysinh.value,
            phoneNumber: sdt.value,
            // Kiểm tra và cập nhật hình ảnh nếu có
            avatar: ip_hinhanh.value
              ? "../Hình ảnh/Hình ảnh sử dụng/" +
                ip_hinhanh.value.split("\\").pop()
              : avatar,
            email: email.value,
            role: quyen.value,
          };

          localStorage.setItem("LIST_NGUOIDUNG", JSON.stringify(dataNGuoiDung));
          console.log(dataNGuoiDung);
          $scope.LoadNguoiDung();
        }
      }
    }
  };

  // Hàm kiểm tra tài khoản có tồn tại hay không
  function kiemTraTaiKhoanTonTai(accountName, currentUserId) {
    return dataNGuoiDung.some(function (nguoidung) {
      return (
        nguoidung.accountName === accountName &&
        nguoidung.iD_User !== currentUserId
      );
    });
  }

  $scope.btn_XoaNguoiDung = function (id) {
    // Hiển thị hộp thoại xác nhận xóa
    var xacNhan = confirm("Bạn có chắc chắn muốn xóa người dùng không?");

    if (xacNhan) {
      // Tìm vị trí của người dùng trong mảng
      var index = dataNGuoiDung.findIndex(function (nguoidung) {
        return nguoidung.iD_User === id;
      });

      // Kiểm tra xem người dùng đã tồn tại hay chưa
      if (index !== -1) {
        // Xóa người dùng khỏi mảng
        dataNGuoiDung.splice(index, 1);

        // Lưu mảng đã cập nhật vào local storage
        localStorage.setItem("LIST_NGUOIDUNG", JSON.stringify(dataNGuoiDung));

        // Hiển thị dữ liệu trong console
        console.log(dataNGuoiDung);

        // Refresh dữ liệu trong bảng
        $scope.LoadNguoiDung();
      }
    }
  };

  $scope.LoadNguoiDung();
});
function SuaNguoiDung(icon) {
  var row = icon.parentNode.parentNode;
  var cells = row.getElementsByTagName("td");

  var ID_User = cells[0].textContent;
  var TenTK = cells[1].textContent;
  var Mk = cells[2].textContent;
  var Hoten = cells[3].textContent;
  var Diachi = cells[4].textContent;
  var Gioitinh = cells[5].textContent;
  var Ngaysinh = cells[6].textContent;
  var SDT = cells[7].textContent;
  var Email = cells[8].textContent;

  // Lấy chỉ định của ảnh từ chuỗi "src"
  var AnhCell = cells[9];
  var AnhSrc = AnhCell.innerHTML.match(/src="([^"]+)"/);
  var Anh = AnhSrc ? AnhSrc[1] : "";

  // Loại bỏ đường dẫn ban đầu
  var tenAnh = Anh.substring(Anh.lastIndexOf("/") + 1);

  var Quyen = cells[10].textContent;

  iD_User = ID_User;
  document.getElementById("edt_tendangnhap").value = TenTK;
  document.getElementById("edt_matkhau").value = Mk;
  document.getElementById("edt_email").value = Email;
  document.getElementById("edt_diachi").value = Diachi;
  document.getElementById("edt_gioitinh").value = Gioitinh;
  document.getElementById("edt_hoten").value = Hoten;
  var parts = Ngaysinh.split("-");
  if (parts.length === 3) {
    var ngaysinhFormatted = parts[2] + "-" + parts[1] + "-" + parts[0];
    document.getElementById("edt_ngaysinh").value = ngaysinhFormatted;
  }
  document.getElementById("edt_sdt").value = SDT;
  anh = tenAnh;

  document.getElementById("edt_quyen").value = Quyen;
}
