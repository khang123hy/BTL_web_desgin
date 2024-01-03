var iD_Post = "";
var iD_User = "";
var app = angular.module("AppDienDan", []);
var _user = JSON.parse(localStorage.getItem("user_doan"));
if (!_user || _user.Role == "USER") {
  window.location.href =
    "http://127.0.0.1:5501/ADMIN/%C4%90%C4%83ng%20nh%E1%BA%ADp.html";
}

app.controller("BaiVietCtr", function ($scope, $http) {


  $scope.stt;
  $scope.listPosts;
  $scope.page = 1;
  $scope.pageSize = 10;
  $scope.keywords="";

  $scope.refresh = function () {
    $scope.BaiViet = {
      iD_Post: 0,
      iD_User: _user.iD_User,
      iD_Topic: "",
      title: "",
      synopsis: "",
      list_json_posts: [{ image: "", content: "" }]
    };
    document.getElementById("inp_chude_baiviet").value ="";
    $scope.LoadBaiViet();
};


  let dataBaiViet = JSON.parse(localStorage.getItem("LIST_BAIVIET")) || [];



$scope.BaiViet = {
  iD_Post: 0,
  iD_User: _user.iD_User,
  iD_Topic: "",
  title: "",
  synopsis: "",
  list_json_posts: [{ image: "", content: "" }]
};

$scope.addPost = function() {
  $scope.BaiViet.list_json_posts.push({ image: "", content: "" });
};

$scope.handleFileChange = function(input) {
  var fileInput = input;
  var index = fileInput.id.split("_")[1];
  var file = fileInput.files[0];
  var fileName = file.name;

  // Tạo đường dẫn đầy đủ
  var newImagePath = "../Hình ảnh/Hình ảnh sử dụng/" + fileName;

  console.log("Đường dẫn đầy đủ:", newImagePath);

  // Gán đường dẫn đầy đủ vào thuộc tính image của list_json_posts
  $scope.BaiViet.list_json_posts[index].image = newImagePath;
};

      // Lấy thời gian hiện tại
      var thoiGianHienTai = new Date();
      var ngayThangNam = thoiGianHienTai.toLocaleDateString();
      var gioPhutGiay = thoiGianHienTai.toLocaleTimeString();
      var thoiGianhientai_value = ngayThangNam + ' lúc ' + gioPhutGiay;    
  




      $scope.listPosts;
  $scope.LoadBaiViet = function () {
        // Tính chỉ số bắt đầu và kết thúc của dữ liệu cần hiển thị trên trang hiện tại
        let startIndex = ($scope.page - 1) * $scope.pageSize;
        let endIndex = startIndex + $scope.pageSize;
    
        // Lọc danh sách người dùng dựa trên từ khóa tìm kiếm
        let filteredUsers;
    
        if ($scope.keywords.trim() === "") {
          // If keywords are empty, load the entire list without applying any filter
          filteredUsers = dataBaiViet;
        } else {
          // Apply the filter based on the keywords
          filteredUsers = dataBaiViet.filter(function (baiviet) {
            return baiviet.title
              .toLowerCase()
              .includes($scope.keywords.toLowerCase());
          });
        }
    
        // Lấy danh sách người dùng cho trang hiện tại
        $scope.listPosts = filteredUsers.slice(startIndex, endIndex);
      };
      $scope.LoadBaiViet();
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
        $scope.LoadBaiViet();
      };
    
      $scope.handleKeyUp = function (event) {
        if (event.keyCode === 13) {
          // Khi nhấn Enter, cập nhật từ khóa và tải lại danh sách người dùng
          $scope.keywords = inp_timkiem_header.value;
          $scope.LoadBaiViet();
        }
      };

  //Load lại ctr
  $scope.listChuDe;
  $scope.GetChuDe = function () {
    let dataChuDe = JSON.parse(localStorage.getItem("LIST_CHUDE")) || [];

          $scope.listChuDe = dataChuDe;
  };
  $scope.GetChuDe();




  // Các hàm và mã khác ở đây

  $scope.luu = function() {
  
    if($scope.BaiViet.iD_Post === 0){
      // Find the maximum ID in the existing data
      const maxId = dataBaiViet.reduce((max, baiviet) => Math.max(max, baiviet.iD_Post || 0), 0);
      
      // Set the new ID for the current post
      $scope.BaiViet.iD_Post = maxId + 1;

      // Add the new post to the existing data
      dataBaiViet.push({
        iD_Post: $scope.BaiViet.iD_Post,
        iD_User: $scope.BaiViet.iD_User,
        iD_Topic: $scope.BaiViet.iD_Topic,
        title: $scope.BaiViet.title,
        synopsis: $scope.BaiViet.synopsis,
        list_json_posts: $scope.BaiViet.list_json_posts,
        createdDate: thoiGianhientai_value
      });

      // Save the updated data back to localStorage
      localStorage.setItem("LIST_BAIVIET", JSON.stringify(dataBaiViet));
      console.log(dataBaiViet);
      $scope.LoadBaiViet();
    }
    else{
      var xacNhan = confirm(
        "Bạn có chắc chắn muốn sửa thông tin người dùng không?"
      );

      if (xacNhan) {
         // Tìm vị trí của người dùng trong mảng
         var index = dataBaiViet.findIndex(function (baiviet) {
          return baiviet.iD_Post == $scope.BaiViet.iD_Post;
        });

        // Kiểm tra xem người dùng đã tồn tại hay chưa
        if (index !== -1) {

          dataBaiViet[index] = {
            iD_Post: $scope.BaiViet.iD_Post,
            iD_User: $scope.BaiViet.iD_User,
            iD_Topic: $scope.BaiViet.iD_Topic,
            title: $scope.BaiViet.title,
            synopsis: $scope.BaiViet.synopsis,
            list_json_posts: $scope.BaiViet.list_json_posts,
            createdDate: thoiGianhientai_value
          };
              // Save the updated data back to localStorage

          localStorage.setItem("LIST_BAIVIET", JSON.stringify(dataBaiViet));
          console.log(dataBaiViet);
          $scope.LoadBaiViet();
        }
      }
    }
  };
  

  //Xoá 1 
  $scope.btn_Xoa = function (id) {
    // Hiển thị hộp thoại xác nhận xóa
    var xacNhan = confirm("Bạn có chắc chắn muốn xóa người dùng không?");

    if (xacNhan) {
      // Tìm vị trí của người dùng trong mảng
      var index = dataBaiViet.findIndex(function (baiviet) {
        return baiviet.iD_Post === id;
      });

      // Kiểm tra xem người dùng đã tồn tại hay chưa
      if (index !== -1) {
        // Xóa người dùng khỏi mảng
        dataBaiViet.splice(index, 1);

        // Lưu mảng đã cập nhật vào local storage
        localStorage.setItem("LIST_BAIVIET", JSON.stringify(dataBaiViet));

        // Hiển thị dữ liệu trong console
        console.log(dataBaiViet);

        // Refresh dữ liệu trong bảng
        $scope.LoadBaiViet();
      }
    }
  };


  $scope.GetChuDe();
  $scope.LoadBaiViet();

  $scope.isDetailVisible = false;

  $scope.btn_hienthichitiet = function(post) {
    // Đóng tất cả các dòng chi tiết khác
    angular.forEach($scope.listPosts, function(otherPost) {
      if (otherPost !== post && otherPost.isDetailVisible) {
        otherPost.isDetailVisible = false;
      }
      angular.forEach(otherPost.list_json_posts, function(item) {
        item.isDetailVisible = false;
      });
    });
  
    // Mở hoặc đóng dòng chi tiết cho post được click
    post.isDetailVisible = !post.isDetailVisible;
    angular.forEach(post.list_json_posts, function(item) {
      item.isDetailVisible = post.isDetailVisible;
    });
  };

  $scope.editPost = function(post) {
    $scope.BaiViet.iD_Post = post.iD_Post;
    $scope.BaiViet.iD_User = post.iD_User;
    $scope.BaiViet.iD_Topic = post.iD_Topic;
    $scope.BaiViet.title = post.title;
    $scope.BaiViet.synopsis = post.synopsis;
      $scope.BaiViet.list_json_posts = angular.copy(post.list_json_posts);
      console.log($scope.BaiViet);
  };
  

});

function autoExpand(textarea) {
  textarea.style.height = 'auto'; // Đặt lại chiều cao về auto
  textarea.style.height = (textarea.scrollHeight) + 'px'; // Đặt chiều cao dựa trên nội dung
}

