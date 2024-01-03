var app = angular.module("AppDienDan", []);
app.controller("DangKy_User", function ($scope, $http) {


      var taikhoan= document.getElementById('taikhoan');
      var matkhau= document.getElementById('dky_matkhau');
      var matkhau2= document.getElementById('dky_nhaplaimatkhau');
      var hovaten= document.getElementById('dky_fullname');
      var email = document.getElementById('dky_email');

      $scope.DangKy = function(){
          // Kiểm tra giá trị của taikhoan
          if (taikhoan.value === '') {
              alert('Vui lòng nhập tài khoản');
              return; // Ngừng thực hiện các công việc sau đây nếu giá trị không hợp lệ
          }
          // Kiểm tra giá trị của matkhau và matkhau2
          if (matkhau.value === '') {
              alert('Vui lòng nhập mật khẩu');
              return;
          }
          if (hovaten.value === '') {
            alert('Vui lòng nhập họ và tên');
            return;
        }
          if (matkhau2.value === '') {
              alert('Vui lòng nhập lại mật khẩu');
              return;
          }
          if (matkhau.value !== matkhau2.value) {
              alert('Mật khẩu không khớp');
              return;
          }
              // Kiểm tra giá trị của email
         // Kiểm tra định dạng email
          var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(email.value)) {
              alert('Email không đúng định dạng');
              return;
          }

          let dataNguoiDung = JSON.parse(localStorage.getItem("LIST_NGUOIDUNG")) || [];

          const existingUser = dataNguoiDung.find(user => user.accountName === taikhoan.value);
    
          if (existingUser) {
              alert('Tài khoản đã tồn tại. Vui lòng chọn một tài khoản khác.');
              return;
          }
          const maxId = dataNguoiDung.reduce(
            (max, nguoidung) => Math.max(max, nguoidung.iD_User || 0),
            0
          );
          var id = maxId + 1;

           dataNguoiDung.push(
            {
                iD_User:id ,
                accountName:taikhoan.value,
                password:matkhau2.value,
                role:"USER",
                email:email.value,
                fullName:hovaten.value,
                avatar:"../Hình ảnh/user.png",
                dateOfBirth:"Chưa điền",
                address:"Chưa điền",
                phoneNumber:"Chưa điền",
                sex:"Chưa điền",
              });

              localStorage.setItem("LIST_NGUOIDUNG", JSON.stringify(dataNguoiDung));
              alert('Đăng ký tài khoản thành công.');

      };

})

function validate(inputElement) {
  var value = inputElement.value;
  if (/[^a-zA-Z0-9!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]+/.test(value)) {
    inputElement.value = value.replace(/[^a-zA-Z0-9!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]+/g, ''); // Xóa bỏ tất cả các ký tự không phải là chữ cái tiếng Anh, số, và ký tự đặc biệt
}
}

