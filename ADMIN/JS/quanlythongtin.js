var iconmenu = document.querySelector(".menu-bar");
var _user = JSON.parse(localStorage.getItem("user_doan"));
if (!_user) {
    window.location.href = "http://127.0.0.1:5501/ADMIN/%C4%90%C4%83ng%20nh%E1%BA%ADp.html";
}
iconmenu.onclick = function (){
    hienthimenu();
}

function opgettime(){
    var gettime = new Date();
    var getgio = gettime.getHours();
    var getphut = gettime.getMinutes();
    var getgiay = gettime.getSeconds();
    getgio = (getgio < 10 ? "0" : "") + getgio;
    getphut = (getphut<10?"0":"")+getphut;
    getgiay = (getgiay<10?"0":"")+getgiay;
 
    document.querySelector(".gettime").innerHTML= getgio+":"+getphut+":"+getgiay;


}
setInterval(opgettime, 1000);




var app = angular.module('AppDienDan', []);
app.controller("Index_Admin", function ($scope, $http) {
    var _user = JSON.parse(localStorage.getItem("user_doan"));

    $scope.LoadTop5Like = function () {
        var data = {
            labels: ["Bài viết 1", "Bài viết 2", "Bài viết 3", "Bài viết 4", "Bài viết 5"],
            datasets: [{
                label: "Lượt Thích",
                data: [150, 120, 90, 80, 70], // Số lượt thích cho từng bài viết
                backgroundColor: [
                    'rgba(255, 99, 132, 0.7)',
                    'rgba(255, 159, 64, 0.7)',
                    'rgba(255, 205, 86, 0.7)',
                    'rgba(75, 192, 192, 0.7)',
                    'rgba(54, 162, 235, 0.7)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(255, 159, 64, 1)',
                    'rgba(255, 205, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(54, 162, 235, 1)'
                ],
                borderWidth: 1
            }]
        };
    
        // Cấu hình biểu đồ
        var options = {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        };
    
        // Lấy đối tượng canvas và vẽ biểu đồ
        var ctx = document.getElementById('myChart').getContext('2d');
        var myChart = new Chart(ctx, {
            type: 'bar',
            data: data,
            options: options
        });
    };
    
    $scope.LoadTop5Like();

    $scope.LoadNam = function () {
        var selectElement = document.getElementById('inp_nam_tk_hai');
        var selectElement2 = document.getElementById('inp_nam_tk1');
    
        // Lấy năm hiện tại
        var currentYear = new Date().getFullYear();
    
        // Tạo danh sách năm từ năm hiện tại đến 10 năm trước
        for (var year = currentYear; year >= currentYear - 10; year--) {
            // Tạo một phần tử option cho selectElement
            var optionElement = document.createElement('option');
            optionElement.value = year;
            optionElement.textContent = year;
    
            // Thêm option vào selectElement
            selectElement.appendChild(optionElement);
    
            // Tạo một phần tử option mới cho selectElement2
            var optionElement2 = document.createElement('option');
            optionElement2.value = year;
            optionElement2.textContent = year;
    
            // Thêm option vào selectElement2
            selectElement2.appendChild(optionElement2);
        }
    }
    $scope.LoadNam();
    
});