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
document.getElementById('btnThem').onclick = function () {
    if (i < 10) {
        i++;
    }
    document.getElementById('btnThemNV').onclick = function () {
        //input: string: 
        //output: dữ liệu từ form input đưa vào table
        //Thay đổi dữ liệu hàng đầu tiên: row[0]
        var col = table.rows[i].cells;
        //progress
        //cột thứ 0: tài khoản
        col[0].innerHTML = document.getElementById('tknv').value;
        //cột thứ 1: họ và tên
        col[1].innerHTML = document.getElementById('name').value;
        //cột thứ 2: email
        col[2].innerHTML = document.getElementById('email').value;
        //cột thứ 3: ngày làm
        col[3].innerHTML = document.getElementById('datepicker').value;
        //cột thứ 4: chức vụ
        col[4].innerHTML = document.getElementById('chucvu').value;
        //cột thứ 5: tổng lương
        // col[5].innerHTML = Number(document.getElementById('luongCB').value) * 1;
        //cột thứ 6: xếp loại  
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

document.getElementById('btnThemNV').onclick = function validateForm() {
    var x = document.forms["myForm"]["tk"].value;
    if (x == "") {
        alert("Tài khoản không được để trống");
        return false;
    }
}


