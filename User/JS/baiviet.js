function autoExpand(textarea) {
    textarea.style.height = 'auto'; // Đặt lại chiều cao về auto
    textarea.style.height = (textarea.scrollHeight) + 'px'; // Đặt chiều cao dựa trên nội dung
}

function luuBinhLuan() {
    // Lấy nội dung từ textarea
    var noiDungBinhLuan = document.getElementById('edt_binhluanbaiviet').value;
    // Kiểm tra xem nội dung có tồn tại không
    if (noiDungBinhLuan.trim() === '') {
      alert('Vui lòng nhập nội dung bình luận');
      return;
    }

    var thoiGianHienTai = new Date();
    var ngayThangNam = thoiGianHienTai.toLocaleDateString();
    var gioPhutGiay = thoiGianHienTai.toLocaleTimeString();
    var thoiGianDangBai = ngayThangNam + ' lúc ' + gioPhutGiay;

    var binhLuan = {
      avatar: '../Hình ảnh/congnghe-phu3.jpg',
      tenNguoiDung: 'HIHI',
      quyenVaDiem: 'Thành viên',
      thoiGianDangBai: thoiGianDangBai,
      noiDung: noiDungBinhLuan
    };

    // Lấy danh sách bình luận từ localStorage (nếu có)
    var danhSachBinhLuan = JSON.parse(localStorage.getItem('danhSachBinhLuan')) || [];

    // Thêm bình luận mới vào danh sách
    danhSachBinhLuan.push(binhLuan);

    // Lưu danh sách bình luận vào localStorage
    localStorage.setItem('danhSachBinhLuan', JSON.stringify(danhSachBinhLuan));

    // Hiển thị nội dung bình luận
    hienThiBinhLuan();

    // Xóa nội dung trong textarea
    document.getElementById('edt_binhluanbaiviet').value = '';
  }

  function hienThiBinhLuan() {
    // Lấy danh sách bình luận từ localStorage
    var danhSachBinhLuan = JSON.parse(localStorage.getItem('danhSachBinhLuan')) || [];

    // Lấy phần hiển thị nội dung bình luận
    var container = document.getElementById('user-dabinhluans');

    // Xóa nội dung hiện tại
    container.innerHTML = '';

    // Hiển thị từng bình luận
    danhSachBinhLuan.forEach(function (binhLuan) {
      // Tạo phần tử cho bình luận
      var divBinhLuan = document.createElement('div');
      divBinhLuan.classList.add('user-dabinhluan');

      // Tạo nội dung bình luận
      var noiDung = '<div class="user-thongtin">' +
        '<a href="#" class="user-avt"><img src="' + binhLuan.avatar + '" alt="Lỗi r"></a>' +
        '<a href="#" class="user-name">' + binhLuan.tenNguoiDung + '</a>' +
        '<div class="user-quyenvadiem">' + binhLuan.quyenVaDiem + '</div>' +
        '<div id="timedangbai">' + binhLuan.thoiGianDangBai + '</div>' +
        '</div>' +
        '<p id="noidungbinhluan">' + binhLuan.noiDung + '</p>';

      // Gán nội dung vào phần tử
      divBinhLuan.innerHTML = noiDung;

      // Thêm phần tử vào container
      container.appendChild(divBinhLuan);
    });
  }

  var btn_binhluan = document.getElementById('btn-binhluanbaiviet');
  // Gọi hàm hiển thị bình luận khi trang được tải
  btn_binhluan.addEventListener('click', function(){
    luuBinhLuan();
    hienThiBinhLuan();
  });

  