var tentk = document.getElementById('edt_tendangnhap');
var mk = document.getElementById('edt_matkhau');
var email = document.getElementById('edt_email');
var hoten = document.getElementById('edt_hoten');
var nickname = document.getElementById('edt_nickname');
var gioitinh = document.getElementById('edt_gioitinh');
var ip_hinhanh = document.getElementById('input_hinhanh_nguoidung');
var luu = document.getElementById('btn_them');
var xoa = document.getElementById('btn_xoa');
var tbody = document.getElementById('tbody_nguoidung');
var refresh = document.getElementById('id_load_nguoidung');
var hinhanhtam="a";

refresh.addEventListener('click',function(){
    tentk.value = "";
    mk.value = "";
    email.value = "";
    nickname.value = "";
    gioitinh.value = "";
    hoten.value = "";
    ip_hinhanh.value = "";

} );
// Hàm để hiển thị dữ liệu trong bảng
function hienThiDuLieu() {

    let nguoidungs = JSON.parse(localStorage.getItem('LIST_NGUOIDUNG')) || [];

    // Xóa các dòng hiện tại trong tbody
    tbody.innerHTML = '';
    
    // Lặp qua mảng nguoidungs và hiển thị dữ liệu trong bảng
    nguoidungs.forEach(function (nguoidung, index) {
      var dongMoi = document.createElement('tr');
      dongMoi.innerHTML = `
        <td>${index + 1}</td>
        <td>${nguoidung.tentk}</td>
        <td>${nguoidung.mk}</td>
        <td>${nguoidung.email}</td>
        <td>${nguoidung.hoten}</td>
        <td>${nguoidung.nickname}</td>
        <td>${nguoidung.gioitinh}</td>
        <td><img   width="50px" height="50px" src="${nguoidung.hinhanh}" alt="Hình ảnh"></td>
      `;

      // Thêm button Sửa vào mỗi dòng
      var tdSua = document.createElement('td');
      var btnSua = document.createElement('button');
      btnSua.innerHTML = `
      <svg width="30px" height="30px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
      <path d="M24 6C22.807559 6 21.664511 6.1635449 20.582031 6.4355469 A 1.50015 1.50015 0 0 0 19.466797 7.6484375L19.236328 9.0546875C19.151818 9.5709093 18.841961 10.019613 18.388672 10.28125C17.934652 10.543309 17.392892 10.587247 16.904297 10.402344 A 1.50015 1.50015 0 0 0 16.902344 10.402344L15.564453 9.8964844 A 1.50015 1.50015 0 0 0 13.958984 10.255859C12.368407 11.894602 11.181435 13.920591 10.541016 16.177734 A 1.50015 1.50015 0 0 0 11.033203 17.748047L12.138672 18.652344C12.544167 18.984505 12.777344 19.47656 12.777344 20C12.777344 20.52344 12.544468 21.017386 12.140625 21.347656L11.033203 22.251953 A 1.50015 1.50015 0 0 0 10.541016 23.822266C11.181561 26.079851 12.369901 28.105783 13.958984 29.744141 A 1.50015 1.50015 0 0 0 15.566406 30.103516L16.902344 29.597656C17.390599 29.412882 17.934797 29.455639 18.386719 29.716797C18.839645 29.978536 19.15198 30.430093 19.236328 30.945312L19.464844 32.349609 A 1.50015 1.50015 0 0 0 20.580078 33.5625C21.66412 33.835723 22.807559 34 24 34C25.192441 34 26.335489 33.836455 27.417969 33.564453 A 1.50015 1.50015 0 0 0 28.533203 32.351562L28.763672 30.945312C28.848182 30.429091 29.158039 29.980387 29.611328 29.71875C30.065348 29.456691 30.607108 29.412753 31.095703 29.597656L32.433594 30.103516 A 1.50015 1.50015 0 0 0 34.041016 29.746094C35.631593 28.107351 36.818565 26.081362 37.458984 23.824219 A 1.50015 1.50015 0 0 0 36.964844 22.253906L35.859375 21.347656C35.45388 21.015495 35.220703 20.525393 35.220703 20.001953C35.220703 19.478513 35.455532 18.984567 35.859375 18.654297L36.966797 17.748047 A 1.50015 1.50015 0 0 0 37.458984 16.177734C36.817491 13.916807 35.621502 11.893639 34.037109 10.257812 A 1.50015 1.50015 0 0 0 32.429688 9.8984375L31.097656 10.402344C30.609401 10.587118 30.065203 10.544361 29.613281 10.283203 A 1.50015 1.50015 0 0 0 29.611328 10.28125C29.158528 10.019895 28.848577 9.5721598 28.763672 9.0566406L28.763672 9.0546875L28.533203 7.6367188 A 1.50015 1.50015 0 0 0 27.419922 6.4238281C26.32463 6.1472053 25.178356 6 24 6 z M 24 9C24.604451 9 25.173326 9.1223523 25.75 9.2167969L25.802734 9.5390625 A 1.50015 1.50015 0 0 0 25.802734 9.5410156C26.032223 10.942794 26.880617 12.170497 28.111328 12.880859L28.111328 12.878906C29.341407 13.589748 30.828458 13.71221 32.158203 13.208984L32.453125 13.097656C33.194187 14.004968 33.781763 15.019251 34.205078 16.130859L33.958984 16.332031C32.858827 17.231761 32.220703 18.581393 32.220703 20.001953C32.220703 21.422513 32.86048 22.770083 33.958984 23.669922L34.205078 23.871094C33.782393 24.984601 33.19511 26.000027 32.455078 26.90625L32.158203 26.792969C30.828799 26.289872 29.341308 26.411153 28.111328 27.121094C26.880617 27.831457 26.032223 29.059158 25.802734 30.460938L25.751953 30.775391C25.172346 30.873589 24.598115 31 24 31C23.401885 31 22.827635 30.873742 22.248047 30.775391L22.197266 30.458984C21.967613 29.056204 21.117745 27.831355 19.888672 27.121094C18.658593 26.410252 17.171542 26.28779 15.841797 26.791016L15.542969 26.904297C14.803146 25.997801 14.21758 24.982513 13.794922 23.869141L14.039062 23.667969C15.138473 22.76824 15.777344 21.420035 15.777344 20C15.777344 18.57944 15.13952 17.23187 14.041016 16.332031 A 1.50015 1.50015 0 0 0 14.039062 16.332031L13.794922 16.130859C14.21746 15.017378 14.803109 14.001955 15.542969 13.095703L15.841797 13.207031C17.171201 13.710128 18.658692 13.588847 19.888672 12.878906C21.119383 12.168543 21.967777 10.940841 22.197266 9.5390625L22.248047 9.2246094C22.827704 9.1264608 23.401885 9 24 9 z M 23.976562 13.978516 A 1.50015 1.50015 0 0 0 22.5 15.5L22.5 20.878906L21.060547 19.439453 A 1.50015 1.50015 0 1 0 18.939453 21.560547L22.939453 25.560547 A 1.50015 1.50015 0 0 0 25.060547 25.560547L29.060547 21.560547 A 1.50015 1.50015 0 1 0 26.939453 19.439453L25.5 20.878906L25.5 15.5 A 1.50015 1.50015 0 0 0 23.976562 13.978516 z M 7.4765625 31.978516 A 1.50015 1.50015 0 0 0 6 33.5L6 36.5C6 39.519774 8.4802259 42 11.5 42L36.5 42C39.519774 42 42 39.519774 42 36.5L42 33.5 A 1.50015 1.50015 0 1 0 39 33.5L39 36.5C39 37.898226 37.898226 39 36.5 39L11.5 39C10.101774 39 9 37.898226 9 36.5L9 33.5 A 1.50015 1.50015 0 0 0 7.4765625 31.978516 z" fill="#31406F" />
    </svg>
      `;
      btnSua.style.width = '100%';
      btnSua.style.border = '0';
      btnSua.style.backgroundColor = '#FFFFFF';
      btnSua.style.height = '100%';

      var tdxoa = document.createElement('td');
      var btnxoa = document.createElement('button');
      btnxoa.innerHTML = `
      <svg width="25px" height="25px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
      <path d="M10.806641 2C10.289641 2 9.7956875 2.2043125 9.4296875 2.5703125L9 3L4 3 A 1.0001 1.0001 0 1 0 4 5L20 5 A 1.0001 1.0001 0 1 0 20 3L15 3L14.570312 2.5703125C14.205312 2.2043125 13.710359 2 13.193359 2L10.806641 2 z M 4.3652344 7L5.8925781 20.263672C6.0245781 21.253672 6.877 22 7.875 22L16.123047 22C17.121047 22 17.974422 21.254859 18.107422 20.255859L19.634766 7L4.3652344 7 z" fill="#31406F" />
    </svg>
      `;
      btnxoa.style.width = '100%';
      btnxoa.style.border = '0';
      btnxoa.style.backgroundColor = '#FFFFFF';
      btnxoa.style.height = '100%';


      // Thêm sự kiện click cho button Sửa
      btnSua.addEventListener('click', function (event) {
        // Xử lý sự kiện khi button Sửa được click
        event.stopPropagation();
        // Đổ dữ liệu vào các ô input khi button Sửa được click
        tentk.value = nguoidung.tentk;
        mk.value = nguoidung.mk;
        email.value = nguoidung.email;
        hoten.value = nguoidung.hoten;
        nickname.value = nguoidung.nickname;
        gioitinh.value = nguoidung.gioitinh;
        hinhanhtam = nguoidung.hinhanh;
      });
   

 // Thêm sự kiện click cho button Xóa
 btnxoa.addEventListener('click', function (event) {
    // Ngăn chặn sự kiện click lan ra các phần tử cha
    event.stopPropagation();
    
    // Lấy tên đăng nhập của người dùng từ dòng tương ứng
    var tentkToDelete = nguoidung.tentk;

    // Gọi hàm xóa người dùng
    xoaNguoiDung(tentkToDelete);
});
      tdSua.appendChild(btnSua);
      dongMoi.appendChild(tdSua);

      tdxoa.appendChild(btnxoa);
      dongMoi.appendChild(tdxoa);
      // Thêm sự kiện click cho mỗi dòng
      dongMoi.addEventListener('click', function () {
      });

      tbody.appendChild(dongMoi);
    });
  }
// Gọi hàm hiển thị dữ liệu khi trang được load
document.addEventListener('DOMContentLoaded', function () {
    hienThiDuLieu();
});


luu.addEventListener('click', function () {
    var tentk_Value = tentk.value;
    var mk_Value = mk.value;
    var email_Value = email.value;
    var hoten_Value = hoten.value;
    var nickname_Value = nickname.value;
    var gioitinh_Value = gioitinh.value;

    const fr = new FileReader();

    if (ip_hinhanh.files.length > 0) {
        fr.readAsDataURL(ip_hinhanh.files[0]);

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

                // Gán hình ảnh nén vào thuộc tính hinhanh của đối tượng người dùng
                updateUserInfo(compressedImage);
            };
        });
    } else {
        // Nếu không có hình ảnh được chọn, gán giá trị hinhanhtam
        updateUserInfo(hinhanhtam);
    }

    function updateUserInfo(hinhAnh) {
        const LIST_NGUOIDUNG = 'LIST_NGUOIDUNG';
        let nguoidungs = JSON.parse(localStorage.getItem(LIST_NGUOIDUNG)) || [];

        var index = nguoidungs.findIndex(function (nguoidung) {
            return nguoidung.tentk === tentk_Value;
        });
        // Kiểm tra xem người dùng đã tồn tại hay chưa
        if (index !== -1) {
            // Hiển thị hộp thoại xác nhận
            var xacNhan = confirm('Bạn có chắc chắn muốn sửa thông tin người dùng không?');
            if (xacNhan) {
                // Cập nhật thông tin của người dùng
                nguoidungs[index] = {
                    tentk: tentk_Value,
                    mk: mk_Value,
                    email: email_Value,
                    hoten: hoten_Value,
                    nickname: nickname_Value,
                    gioitinh: gioitinh_Value,
                    hinhanh: hinhAnh,
                };

                // Lưu mảng đã cập nhật vào local storage
                localStorage.setItem(LIST_NGUOIDUNG, JSON.stringify(nguoidungs));

                // Hiển thị dữ liệu trong console
                console.log(nguoidungs);

                // Refresh dữ liệu trong bảng
                hienThiDuLieu();
            }
        } else {

            // Người dùng không tồn tại, thực hiện thêm mới như trước
            nguoidungs.push({
                tentk: tentk_Value,
                mk: mk_Value,
                email: email_Value,
                hoten: hoten_Value,
                nickname: nickname_Value,
                gioitinh: gioitinh_Value,
                hinhanh: hinhAnh,
            });

            // Lưu mảng mới vào Local Storage
            localStorage.setItem(LIST_NGUOIDUNG, JSON.stringify(nguoidungs));

            // Hiển thị dữ liệu trong console
            console.log(nguoidungs);

            // Refresh dữ liệu trong bảng
            hienThiDuLieu();
        }
    }
});


function xoaNguoiDung(tentk) {
    // Hiển thị hộp thoại xác nhận
    var xacNhan2 = confirm('Bạn có chắc chắn muốn xóa người dùng không?');

    if (xacNhan2) {
        const LIST_NGUOIDUNG = 'LIST_NGUOIDUNG';
        let nguoidungs = JSON.parse(localStorage.getItem(LIST_NGUOIDUNG)) || [];

        // Tìm vị trí của người dùng có tên đăng nhập cụ thể
        var index = nguoidungs.findIndex(function (nguoidung) {
            return nguoidung.tentk === tentk;
        });

        if (index !== -1) {
            // Xoá người dùng từ mảng
            nguoidungs.splice(index, 1);
            // Lưu mảng đã cập nhật vào local storage
            localStorage.setItem(LIST_NGUOIDUNG, JSON.stringify(nguoidungs));
            // Refresh dữ liệu trong bảng
            hienThiDuLieu();
        } else {
            alert('Tên đăng nhập không tồn tại.');
        }
    }
}
