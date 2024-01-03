function btn_taobaiviet() {
    document.getElementById("overlay").style.display = "block";
  }

  document.addEventListener("DOMContentLoaded", function() {
    
}); 
  
  var app = angular.module("AppDienDan", []);
  app.controller("User_ChuDe", function ($scope, $http) {
    var form_ctr_binhluan = document.querySelector(".taobaiviet");
var _user = JSON.parse(localStorage.getItem("user_doan"));
        if (!_user) {
            form_ctr_binhluan.style.display = "none";
        }
    $scope.closeOverlay = function () {
      document.getElementById("overlay").style.display = "none";
    };

    var key = 'id';
    var id_Topic = window.location.search.substring(window.location.search.indexOf(key) + key.length + 1);
    
    $scope.listTopic_ID;
    
    $scope.LoadTopicsByID = function () {
        let dataChuDe = JSON.parse(localStorage.getItem("LIST_CHUDE")) || [];
    
        // Lọc danh sách chủ đề theo iD_Topic
        $scope.listTopic_ID = dataChuDe.filter(function (chuDe) {
            return chuDe.iD_Topic == id_Topic;
        });
        console.log($scope.listTopic_ID);
    };
    
    $scope.LoadTopicsByID();

    
  let dataBaiViet = JSON.parse(localStorage.getItem("LIST_BAIVIET")) || [];

  $scope.BaiViet = {
    iD_Post: 0,
    iD_User: "",
    iD_Topic: "",
    title: "",
    synopsis: "",
    list_json_posts: [{ image: "", content: "" }],
  };

  $scope.addPost = function () {
    $scope.BaiViet.list_json_posts.push({ image: "", content: "" });
  };

  $scope.handleFileChange = function (input) {
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
  var thoiGianhientai_value = ngayThangNam + " lúc " + gioPhutGiay;

  $scope.page = 1;
  $scope.pageSize = 10;
  $scope.keywords = "";
  $scope.listPosts;

  $scope.LoadBaiViet = function () {
    // Tính chỉ số bắt đầu và kết thúc của dữ liệu cần hiển thị
    let startIndex = 0; // Bắt đầu từ phần tử đầu tiên
    let endIndex = $scope.pageSize;

    // Lọc danh sách bài viết dựa trên từ khóa tìm kiếm và ID_Topic
    let filteredPosts;

    if ($scope.keywords.trim() === "") {
        // Nếu từ khóa trống, hiển thị toàn bộ danh sách bài viết
        filteredPosts = dataBaiViet;
    } else {
        // Áp dụng bộ lọc dựa trên từ khóa
        filteredPosts = dataBaiViet.filter(function (baiviet) {
            return baiviet.title.toLowerCase().includes($scope.keywords.toLowerCase());
        });
    }

    // Lọc danh sách bài viết theo ID_Topic (ví dụ, giả sử ID_Topic cần lọc là 1)
    filteredPosts = filteredPosts.filter(function (baiviet) {
        return baiviet.iD_Topic == id_Topic; 
    });

    // Lấy danh sách bài viết theo pageSize
    $scope.listPosts = filteredPosts.slice(startIndex, endIndex);
};


  $scope.btn_xemthem = function () {
    // Tăng kích thước pageSize
    $scope.pageSize += 5;
    $scope.LoadBaiViet();
  };

  $scope.LoadBaiViet();

  $scope.handleKeyUp = function (event) {
    if (event.keyCode === 13) {
      // Khi nhấn Enter, cập nhật từ khóa và tải lại danh sách bài viết
      $scope.keywords = inp_timkiem_header.value;
      $scope.LoadBaiViet();
    }
  };


  $scope.btn_dangbaiviet = function () {
    $scope.BaiViet.iD_User=_user.iD_User;
    const maxId = dataBaiViet.reduce(
      (max, baiviet) => Math.max(max, baiviet.iD_Post || 0),
      0
    );

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
      createdDate: thoiGianhientai_value,
    });

    // Save the updated data back to localStorage
    localStorage.setItem("LIST_BAIVIET", JSON.stringify(dataBaiViet));
    console.log(dataBaiViet);
    $scope.LoadBaiViet();
    document.getElementById("overlay").style.display = "none";


  };

  $scope.LoadBaiViet();
  $scope.listChuDe;
  $scope.GetChuDe = function () {
    let dataChuDe = JSON.parse(localStorage.getItem("LIST_CHUDE")) || [];
    $scope.listChuDe = dataChuDe;
  };
  $scope.GetChuDe();
  

  
  

  });
  