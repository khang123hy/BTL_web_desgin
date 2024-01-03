var taikhoan = document.getElementById('taikhoan');
var matkhau = document.getElementById('matkhau');
var btn_dangnhap = document.getElementById('dangnhap');

btn_dangnhap.addEventListener('click', function () {

    var taikhoan_value = taikhoan.value;
    var matkhau_value = matkhau.value;
    const LIST_NGUOIDUNG = 'LIST_NGUOIDUNG';
    let nguoidungs = JSON.parse(localStorage.getItem(LIST_NGUOIDUNG)) || [];

    var index = nguoidungs.findIndex(function (nguoidung) {
        return nguoidung.tentk === taikhoan_value && nguoidung.mk === matkhau_value;
    });
    if (index !== -1) {

        alert('Đăng nhập thành công');
        window.location.href = 'http://127.0.0.1:5501/User/index.html';
    }
    else{
        alert('Tài khoản mật khẩu không đúng');
    }


});


