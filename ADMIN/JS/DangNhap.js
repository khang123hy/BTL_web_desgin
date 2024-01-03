function handleInputChange(event, regex) {
    let inputText = event.target.value;
  
    if (!regex.test(inputText)) {
      event.target.value = inputText.replace(/[^a-zA-Z0-9!@#$%^&*]/g, '');
    }
  };
  var _user = JSON.parse(localStorage.getItem("user_doan"));
  if (_user ||(_user.role === 'ADMIN')){
  window.location.href = "http://127.0.0.1:5501/ADMIN/Qu%E1%BA%A3n%20l%C3%BD%20th%C3%B4ng%20tin.html";
  }

  
  document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('taikhoan').addEventListener('input', function(event) {
      let regex = /^[a-zA-Z0-9!@#$%^&*]+$/;
      handleInputChange(event, regex);
    });
    document.getElementById('matkhau').addEventListener('input', function(event) {
      let regex = /^[a-zA-Z0-9!@#$%^&*]+$/;
      handleInputChange(event, regex);
    });
  });

  
  function Login() {		
    var taikhoan = document.getElementById('taikhoan');
    var matkhau = document.getElementById('matkhau');
  
    var taikhoan_value = taikhoan.value;
    var matkhau_value = matkhau.value;
    const LIST_NGUOIDUNG = 'LIST_NGUOIDUNG';
    let nguoidungs = JSON.parse(localStorage.getItem(LIST_NGUOIDUNG)) || [];

    var index = nguoidungs.findIndex(function (nguoidung) {
        return nguoidung.accountName === taikhoan_value && nguoidung.password === matkhau_value;
    });
    if (index !== -1) {
        localStorage.setItem("user_doan", JSON.stringify(nguoidungs[index]));
        alert('Đăng nhập thành công');
        window.location.href = 'http://127.0.0.1:5501/ADMIN/Qu%E1%BA%A3n%20l%C3%BD%20th%C3%B4ng%20tin.html';
    } else {
        alert('Tài khoản mật khẩu không đúng');
    }
};

