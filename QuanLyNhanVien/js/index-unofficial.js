//Task1: In ra table có 10 hàng, 8 cột
var table = document.getElementById('tableDanhSach');
for (var i = 0; i < 10; i++) {
    var row = table.insertRow(i);
    for (var j = 0; j < 8; j++) {
        var cell = row.insertCell(j);
    }
}

//Task2: Thêm nhân viên mới
//Tạo biến i là số dòng, ban đầu là -1, khi nhấn vô button 'Thêm Nhân Viên' thì i++ = 0
//lúc này sẽ nhảy vào dòng i = 0 (dòng đầu tiên của bảng)
var i = -1;
//Truy xuất đến nút 'Thêm Nhân Viên'
document.getElementById('btnThem').onclick = function ThemNhanVien() {
    if (i < 10) {
        i++;
    }
    //reset lại ô nhập liệu của form để không còn thông tin cũ
    document.getElementById('tknv').value = '';
    document.getElementById('name').value = '';
    document.getElementById('email').value = '';
    document.getElementById('datepicker').value = '';
    document.getElementById('chucvu').value = '';

    //Truy xuất đến nút 'Thêm Người Dùng' 
    document.getElementById('btnThemNV').onclick = function () {
        //output: dữ liệu từ form input đưa vào table
        //Thay đổi dữ liệu hàng đầu tiên: row[0]
        var col = table.rows[i].cells;
        //input: string: 
        //TASK 4
        //input tài khoản
        var account = document.forms["myForm"]["tk"].value;
        if (account == '' || account.length > 6) {
            alert('Your valid account should be filled and 6 characters in maximum!');
            return false;
        }
        else {
            //cột thứ 0: tài khoản
            col[0].innerHTML = document.getElementById('tknv').value;
        }

        //input tên nhân viên
        var name = document.forms["myForm"]["name"].value;
        var regEx = /^[A-Za-z]+$/;
        if (name.match(regEx) && name.length >= 1) {
            //cột thứ 1: họ và tên
            col[1].innerHTML = document.getElementById('name').value;
        }
        else {
            alert("Please enter letters only");
            return false;
        }

        //input email
        var email = document.forms["myForm"]["email"].value;
        var mailFormat = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
        if (!mailFormat.test(email.value)) {
            alert('Please provide a valid email address');
            email.focus;
            return false;
        }

        //cột thứ 2: email
        col[2].innerHTML = document.getElementById('email').value;
        //cột thứ 3: ngày làm
        col[3].innerHTML = document.getElementById('datepicker').value;
        //cột thứ 4: chức vụ
        col[4].innerHTML = document.getElementById('chucvu').value;
        //cột thứ 5: tổng lương
        // col[5].innerHTML = Number(document.getElementById('luongCB').value) * 1;
        //cột thứ 6: xếp loại  

        // function lettersOnlyCheck(name) {
        //     var regEx = /^[A-Za-z]+$/;
        //     if (name.value.match(regEx)) {
        //         return true;
        //     }
        //     else {
        //         alert("Please enter letters only.");
        //         return false;
        //     }
        // }

    }
}

//Task3: Tạo đối tượng nhân viên từ thông tin người dùng nhập vào
var nhanVien = {
    taiKhoan: 0,
    hoTen: '',
    email: '',
    matKhau: '',
    ngayLam: '',
    luongCoBan: 0,
    chucVu: '',
    gioLam: 0,
    tongLuong: 0,
    xepLoai: '',
    heSo: 0,
}

nhanVien.taiKhoan = document.querySelector('#tknv');
nhanVien.hoTen = document.querySelector('#name');
nhanVien.email = document.querySelector('#email');
nhanVien.matKhau = document.querySelector('#password');
nhanVien.ngayLam = document.querySelector('#datepicker');
nhanVien.luongCoBan = document.querySelector('#luongCB');
nhanVien.chucVu = document.querySelector('#chucvu');
nhanVien.gioLam = document.querySelector('#gioLam');

//Task4: Validation - Xây dựng tính hợp lệ cho dữ liệu nhập vào
//Xem ở DÒNG 47: do không thể tạo tạo sự kiện với hàm mới bằng button có id tương tự như những chỗ khác được
//nên phải lồng vào trong sự kiện task 2
//Truy xuất đến nút 'Thêm Người Dùng
//document.getElementById('btnThemNV').onclick = function () 












