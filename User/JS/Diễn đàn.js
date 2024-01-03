function hienthibaiviet() {
    // Lấy danh sách bình luận từ localStorage
    var danhSachBinhLuan = JSON.parse(localStorage.getItem('LIST_BAIVIET')) || [];
    const LIST_BAIVIET = 'LIST_BAIVIET';

    // Lấy phần hiển thị nội dung bình luận
    var container = document.querySelector('.list_baiviets'); // Thay đổi thành .list_baiviets
    // Xóa nội dung hiện tại
    container.innerHTML = '';
    // Hiển thị từng bình luận
    danhSachBinhLuan.forEach(function (baiviet) { // Thay đổi thành danhSachBinhLuan
        // Tạo phần tử cho bình luận
        var divbaiviet = document.createElement('a');
        divbaiviet.href = '/User/Bài viết.html'; // Sửa thành href
        divbaiviet.classList.add('linkbaiviet');
        // Tạo nội dung bình luận
        var noiDung = '<hr>' + '<img class="avt-baiviet" src="' + baiviet.hinhanh + '" alt="">' +
            ' <div class="tieudes-baiviet">' +
            '<div class="tieudechinh-baiviet">' + baiviet.tieude + '</div>' +
            '<div class="tacgia">' + baiviet.idnguoidung + '</div>' +
            '        <div class="thoigiandang">' + baiviet.thoiGianhientai + '</div>' +
            '</div>' +
            ' <div class="binhluan">' +
            '<div class="view-binhluan">499</div>' +
            ' <h3>Bình luận</h3>' +
            '</div>';

        // Gán nội dung vào phần tử
        divbaiviet.innerHTML = noiDung;

        // Thêm phần tử vào container
        container.appendChild(divbaiviet);
    });
}

document.addEventListener('DOMContentLoaded', function () {
    hienthibaiviet();
});


document.getElementById('btn_taobaiviet').addEventListener('click', function() {
    document.getElementById('overlay').style.display = 'block';
  });
  
  function closeOverlay() {
    document.getElementById('overlay').style.display = 'none';
  }
  

// ---------------------------------------------------------------------------------chức năng thêm bài viết
var btnthem = document.getElementById('btn_dangbaiviet');
var tieude = document.getElementById('dienthongtin_tieude');
var noidung = document.getElementById('dienthongtin_noidung');
var hinhanh = document.getElementById('dienthongtin_hinhanh');
var idbaiviet ;
var id_nguoidung = '3';
var machude = document.getElementById('dienthongtin_chude');
    // Lấy thời gian hiện tại
    var thoiGianHienTai = new Date();
    var ngayThangNam = thoiGianHienTai.toLocaleDateString();
    var gioPhutGiay = thoiGianHienTai.toLocaleTimeString();
    var thoiGianhientai_value = ngayThangNam + ' lúc ' + gioPhutGiay;    

btnthem.addEventListener('click', function () {
    var idnguoidung_Value = id_nguoidung.textContent;;
    var machude_Value = machude.value;
    var tieude_Value = tieude.value;
    var noidung_Value = noidung.value;

    const fr = new FileReader();
    fr.readAsDataURL(hinhanh.files[0]);
    fr.addEventListener('load', () => {
        const originalImage = new Image();
        originalImage.src = fr.result;

        originalImage.onload = function () {
            const canvas = document.createElement('canvas');
            const maxWidth = 800; // Đặt chiều rộng tối đa mong muốn
            const scaleRatio = maxWidth / originalImage.width;
            
            canvas.width = maxWidth;
            canvas.height = originalImage.height * scaleRatio;

            const ctx = canvas.getContext('2d');
            ctx.drawImage(originalImage, 0, 0, canvas.width, canvas.height);

            // Chuyển đổi hình ảnh nén thành base64
            const compressedImage = canvas.toDataURL('image/jpeg', 0.2); // 0.8 là chất lượng nén, có thể điều chỉnh

        const LIST_BAIVIET = 'LIST_BAIVIET';
        let baiviets = JSON.parse(localStorage.getItem(LIST_BAIVIET)) || [];

            // Tìm id bài viết lớn nhất trong danh sách
            const maxId = baiviets.reduce((max, baiviet) => Math.max(max, baiviet.idbaiviet || 0), 0);

            // Tạo id mới bằng cách tăng giá trị lớn nhất hiện tại lên 1
            idbaiviet = maxId + 1;

            // Người dùng không tồn tại, thực hiện thêm mới như trước
            baiviets.push({
                idbaiviet: idbaiviet,
                idnguoidung: idnguoidung_Value,
                machude: machude_Value,
                tieude: tieude_Value,
                noidung: noidung_Value,
                hinhanh: compressedImage ,
                thoiGianhientai: thoiGianhientai_value,
            });

            // Lưu mảng đã cập nhật vào local storage
            localStorage.setItem(LIST_BAIVIET, JSON.stringify(baiviets));

            // Hiển thị dữ liệu trong console
            console.log(baiviets);

            // Refresh dữ liệu trong bảng
            hienThiDuLieu();
        
    }
    });
});
