var mangNhanVien = [];

//sự kiện cho nút THÊM NHÂN VIÊN
document.getElementById('btnThem').onclick = function () {
    //reset lại ô nhập liệu của form để xóa thông tin cũ
    document.getElementById('tknv').value = '';
    document.getElementById('name').value = '';
    document.getElementById('email').value = '';
    document.getElementById('password').value = '';
    document.getElementById('datepicker').value = '';
    document.getElementById('luongCB').value = '';
    document.getElementById('chucvu').value = 'Chọn chức vụ';

    //reset lại phần error của form để xóa cảnh báo
    document.querySelectorAll(".form-validation").value = '';

    //format cho số tiền lương CB người dùng nhập
    var inpt = document.querySelector('#luongCB');
    // Add an event listener to the input element
    inpt.addEventListener(`keyup`, function (event) {
        // Current string value of the input
        const value = this.value;

        // Split the value string into an array on each decimal and 
        // count the number of elements in the array
        const decimalCount = value.split(`.`).length - 1;

        // Don't do anything if a first decimal is entered
        if (event.key === `.` && decimalCount === 1) return

        // Remove any commas from the string and convert to a float
        // This will remove any non digit characters and second decimals
        const numericVal = parseFloat(value.replace(/,/g, ''));

        //NumberFormat options
        const options = {
            style: `decimal`,
            maximumFractionDigits: 20,
        };

        // Assign the formatted number to the input box
        this.value = new Intl.NumberFormat(`en-US`, options).format(numericVal);
    })
    //sự kiện cho nút THÊM NGƯỜI DÙNG
    document.getElementById('btnThemNV').onclick = function () {
        //input: thông tin nhân viên
        //tạo đối tượng
        var nhanVien = new NhanVien();
        var valid = true; //mặc định form là hợp lệ
        // console.log(nhanVien);
        //lấy thông tin từ người dùng

        {//VALIDATE taiKhoan: không rỗng,chứa ký từ, từ 4 - 6 ký số
            nhanVien.taiKhoan = document.querySelector('#tknv').value;
            valid = kiemTraRong(nhanVien.taiKhoan, '#error_required_taiKhoan', 'Your account');
            valid = kiemTraDoDai(nhanVien.taiKhoan, '#error_taiKhoanDoDai', 'Your account', 4, 6);
        }


        {//VALIDATE hoTen: không để trống, là chữ
            //nếu tên có dấu thì không xét được
            nhanVien.hoTen = document.querySelector('#name').value.toUpperCase();
            valid = kiemTraRong(nhanVien.hoTen, '#error_required_hoTen', 'Your name');
            valid = kiemTraKyTu(nhanVien.hoTen, '#error_hoTen', 'Your name');

        }

        {//VALIDATE email: không dể trống, đúng định dạng
            // https://www.w3resource.com/javascript/form/example-javascript-form-validation-email-REC-2822.html?text1=the&submit=Submit#
            nhanVien.email = document.querySelector('#email').value;
            valid = kiemTraRong(nhanVien.email, '#error_required_email', 'Your email');
            valid = kiemTraEmail(nhanVien.email, '#error_email', 'Your email');
        }

        {//VALIDATE matKhau:  không dể trống, 6-10 ký tự (chứa ít nhất 1 ký tự số, 1 ký tự in hoa, 1 ký tự đặc biệt)


            // https://w3resource.com/javascript/form/password-validation.php
            // 6 to 20 characters, least one numeric digit, one uppercase and one lowercase letter
            // var passw = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;

            // 7 to 15 characters,least one numeric digit and a special character
            // var paswd=  /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/

            // 8 to 15 characters, least one lowercase letter, one uppercase letter, one numeric digit, and one special character
            // var decimal=  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;
            nhanVien.matKhau = document.querySelector('#password').value;
            valid = kiemTraRong(nhanVien.matKhau, '#error_required_matKhau', 'Your password')
            valid = kiemTraMatKhau(nhanVien.matKhau, '#error_matKhau', 'Your pasword');
        }

        {//VALIDATE ngayLam: không để trống, định dạng mm/dd/yy
            //Xử lý ngày làm
            //https://www.w3resource.com/javascript/form/javascript-date-validation.php
            nhanVien.ngayLam = document.querySelector('#datepicker').value;
            // nhanVien.ngayLam = moment(new Date(ngayLam),).format('DD' + '/MM' + '/YYYY');
            valid = kiemTraRong(nhanVien.ngayLam, '#error_required_ngayLam', 'Your date');
            valid = kiemTraNgay(nhanVien.ngayLam, '#error_ngayLam', 'Your date');
        }

        {//VALIDATE luongCoBan: không để trống, từ 1tr  - 20tr
            var luongcc = document.querySelector('#luongCB').value;

            valid = kiemTraSoRong(luongcc, '#error_required_luongCB', 'Your basic salary');
            nhanVien.luongCoBan = Number(luongcc.replaceAll(',', ''));
            // nhanVien.luongCoBan = Number(luongcc.replace(/,/g, ""));
            // Add Thousands Separator to Numeric Input(chưa định dạng được)
            // https://stackoverflow.com/questions/71028035/add-thousand-separator-with-javascript-when-add-input-dynamically
            // valid &= kiemTraSoRong(nhanVien.luongCoBan, '#error_required_luongCB', 'Your basic salary')
            valid = kiemTraGiaTri(nhanVien.luongCoBan, '#error_luongCB', 'Your basic salary', 1e+6, 20e+6);
        }

        {//VALIDATE chucVu: chọn
            nhanVien.chucVu = document.querySelector('#chucvu').value;
            valid = kiemTraOption(nhanVien.chucVu, '#error_chucVu', 'Your choice');
        }

        {//VALIDATE gioLam: không để trống, từ 80 - 200
            nhanVien.gioLam = document.querySelector('#gioLam').value;
            valid = kiemTraSoRong(nhanVien.gioLam, '#error_required_gioLam', 'Your working time');
            var gio = Number(nhanVien.gioLam);
            valid = kiemTraGio(gio, '#error_gioLam', 'Your working hour', 80, 200);
        }

        {//Tổng lương:valuechucvu, valueluongCB
            if (nhanVien.chucVu == 'Sếp') {
                nhanVien.tongLuong = Number(nhanVien.luongCoBan * 3).toLocaleString("jp-JP", { style: "currency", currency: "JPY" });
            }
            else if (nhanVien.chucVu == 'Trưởng phòng') {
                nhanVien.tongLuong = Number(nhanVien.luongCoBan * 2).toLocaleString("jp-JP", { style: "currency", currency: "JPY" });
            }
            else if (nhanVien.chucVu == 'Nhân viên') {
                nhanVien.tongLuong = Number(nhanVien.luongCoBan * 1).toLocaleString("jp-JP", { style: "currency", currency: "JPY" });
            }
            else {
                nhanVien.luongCoBan = 0;
            }
        }

        {//Xếp loại
            if (Number(nhanVien.gioLam) >= 192) {
                nhanVien.xepLoai = 'Nhân viên xuất sắc';
            }
            else if (Number(nhanVien.gioLam) < 192 && Number(nhanVien.gioLam) >= 176) {
                nhanVien.xepLoai = 'Nhân viên giỏi';
            }
            else if (Number(nhanVien.gioLam) < 176 && Number(nhanVien.gioLam) >= 160) {
                nhanVien.xepLoai = 'Nhân viên khá';
            }
            else {
                nhanVien.xepLoai = 'Nhân viên trung bình';
            }
        }

        if (valid != true) {//khác true khi đã đã dính vào ít nhất 1 if ở trên}
            return;
        }
        mangNhanVien.push(nhanVien);
        console.log('mảng nhân viên', mangNhanVien);

        //tạo ra TABLE theo hướng đối tượng
        luulocalStorage();
        renderTableNhanVien(mangNhanVien);
    }

}

/**
 * 
 * @param {*} arrNhanVien là mảng Nhân Viên có dạng [{},{},{}...]
* @returns : trả về kết quả là html <tr>..</tr> <tr>..</tr> <tr>..</tr>
 */
function renderTableNhanVien(arrNhanVien) {
    var html = '';
    for (var index = 0; index < arrNhanVien.length; index++) {
        //mỗi lần duyệt lấy ra 1 nhân viên
        var nv = arrNhanVien[index];
        //tạo ra 1 chuỗi html và đưa vào output
        html += `
    <tr>
        <td>${nv.taiKhoan}</td>
        <td>${nv.hoTen}</td>
        <td>${nv.email}</td>
        <td>${nv.ngayLam}</td>
        <td>${nv.chucVu}</td>
        <td>${nv.tongLuong}</td>
        <td>${nv.xepLoai}</td>
        <td>
            <button class="btn btn-danger" onclick ="xoaNhanVien('${nv.taiKhoan}')">Xóa</button>
            <button class="btn btn-success mt-1" id="btnThem" data-toggle="modal" data-target="#myModal" onclick ="chinhSua('${nv.taiKhoan}')" >Chỉnh sửa</button>

        </td>
    </tr>
`
        // <button class="btn btn-primary" id="btnThem" data-toggle="modal"
        // 				data-target="#myModal">Thêm nhân viên</button>
    }
    document.querySelector('#tableDanhSach').innerHTML = html;
    return html;
}

//Xây dựng hàm cho nút xóa nhân viên
//[{maNhanVien1},{maNhanVien2},{maNhanVien3},...]
function xoaNhanVien(taiKhoanClick) {
    var indexDel = mangNhanVien.findIndex(nv => nv.taiKhoan === taiKhoanClick)
    if (indexDel !== -1) {
        mangNhanVien.splice(indexDel, 1);
    }

    //gọi hàm tạo lại table sau khi xóa
    renderTableNhanVien(mangNhanVien);
    //lưu vào localstorage
    luulocalStorage();
}

//Xây dựng hàm cho nút chỉnh sửa nhân viên
function chinhSua(taiKhoanClick) {
    //tìm ra vị trí của nhân viên được click
    var indexEdit = mangNhanVien.findIndex(nv => nv.taiKhoan === taiKhoanClick)
    //lấy ra thông tin nhân viên tại vị trí đó
    var nvEdit = mangNhanVien[indexEdit];

    //từ vị trí trả lại thông tin trên ô nhập liệu
    document.querySelector('#tknv').value = nvEdit.taiKhoan;
    document.querySelector('#name').value = nvEdit.hoTen;
    document.querySelector('#email').value = nvEdit.email;
    document.querySelector('#password').value = nvEdit.matKhau;
    //xử lý ngày làm
    document.querySelector('#datepicker').value = nvEdit.ngayLam;
    // moment(new Date(ngayLam),).format('DD' + '/MM' + '/YYYY') = nhanVien.ngayLam;
    document.querySelector('#luongCB').value = nvEdit.luongCoBan;
    document.querySelector('#chucvu').value = nvEdit.chucVu;
    document.querySelector('#gioLam').value = nvEdit.gioLam;


    console.log('nvEdit', nvEdit);
    // console.log('ngày làm', ngayLam);
    //gọi hàm tạo lại table sau khi xóa
    renderTableNhanVien(mangNhanVien);
    //lưu vào localstorage
    luulocalStorage();
    return nvEdit;
}

//tạo object mới rồi gán giá trị input thay đổi cho nó
document.querySelector('#btnCapNhat').onclick = function () {
    var nvMoi = new NhanVien();
    var valid = true;
    //format cho số tiền lương CB người dùng nhập
    var inpt = document.querySelector('#luongCB');
    // Add an event listener to the input element
    inpt.addEventListener(`keyup`, function (event) {
        // Current string value of the input
        const value = this.value;

        // Split the value string into an array on each decimal and 
        // count the number of elements in the array
        const decimalCount = value.split(`.`).length - 1;

        // Don't do anything if a first decimal is entered
        if (event.key === `.` && decimalCount === 1) return

        // Remove any commas from the string and convert to a float
        // This will remove any non digit characters and second decimals
        const numericVal = parseFloat(value.replace(/,/g, ''));

        //NumberFormat options
        const options = {
            style: `decimal`,
            maximumFractionDigits: 20,
        };

        // Assign the formatted number to the input box
        this.value = new Intl.NumberFormat(`en-US`, options).format(numericVal);
    })

    {//VALIDATE taiKhoan: không rỗng,chứa ký từ, từ 4 - 6 ký số
        nvMoi.taiKhoan = document.querySelector('#tknv').value;
        valid = kiemTraRong(nvMoi.taiKhoan, '#error_required_taiKhoan', 'Your account');
        valid = kiemTraDoDai(nvMoi.taiKhoan, '#error_taiKhoanDoDai', 'Your account', 4, 6);
    }

    {//VALIDATE hoTen: không để trống, là chữ
        //nếu tên có dấu thì không xét được
        nvMoi.hoTen = document.querySelector('#name').value.toUpperCase();
        valid = kiemTraRong(nvMoi.hoTen, '#error_required_hoTen', 'Your name');
        valid = kiemTraKyTu(nvMoi.hoTen, '#error_hoTen', 'Your name');

    }

    {//VALIDATE email: không dể trống, đúng định dạng
        // https://www.w3resource.com/javascript/form/example-javascript-form-validation-email-REC-2822.html?text1=the&submit=Submit#
        nvMoi.email = document.querySelector('#email').value;
        valid = kiemTraRong(nvMoi.email, '#error_required_email', 'Your email');
        valid = kiemTraEmail(nvMoi.email, '#error_email', 'Your email');
    }

    {//VALIDATE matKhau:  không dể trống, 6-10 ký tự (chứa ít nhất 1 ký tự số, 1 ký tự in hoa, 1 ký tự đặc biệt)


        // https://w3resource.com/javascript/form/password-validation.php
        // 6 to 20 characters, least one numeric digit, one uppercase and one lowercase letter
        // var passw = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;

        // 7 to 15 characters,least one numeric digit and a special character
        // var paswd=  /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/

        // 8 to 15 characters, least one lowercase letter, one uppercase letter, one numeric digit, and one special character
        // var decimal=  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;
        nvMoi.matKhau = document.querySelector('#password').value;
        valid = kiemTraRong(nvMoi.matKhau, '#error_required_matKhau', 'Your password');
        valid = kiemTraMatKhau(nvMoi.matKhau, '#error_matKhau', 'Your pasword');
    }

    {//VALIDATE ngayLam: không để trống, định dạng mm/dd/yy
        //Xử lý ngày làm
        //https://www.w3resource.com/javascript/form/javascript-date-validation.php
        nvMoi.ngayLam = document.querySelector('#datepicker').value;
        // nvMoi.ngayLam = moment(new Date(ngayLam),).format('DD' + '/MM' + '/YYYY');
        valid = kiemTraRong(nvMoi.ngayLam, '#error_required_ngayLam', 'Your date');
        valid = kiemTraNgay(nvMoi.ngayLam, '#error_ngayLam', 'Your date');

    }

    {//VALIDATE luongCoBan: không để trống, từ 1tr  - 20tr
        var luongcc = document.querySelector('#luongCB').value;

        valid = kiemTraSoRong(luongcc, '#error_required_luongCB', 'Your basic salary');
        nvMoi.luongCoBan = Number(luongcc.replaceAll(',', ''));
        // nvMoi.luongCoBan = Number(luongcc.replace(/,/g, ""));
        // Add Thousands Separator to Numeric Input(chưa định dạng được)
        // https://stackoverflow.com/questions/71028035/add-thousand-separator-with-javascript-when-add-input-dynamically
        // valid &= kiemTraSoRong(nvMoi.luongCoBan, '#error_required_luongCB', 'Your basic salary')
        valid = kiemTraGiaTri(nvMoi.luongCoBan, '#error_luongCB', 'Your basic salary', 1e+6, 20e+6);
    }

    {//VALIDATE chucVu: chọn
        nvMoi.chucVu = document.querySelector('#chucvu').value;
        valid = kiemTraOption(nvMoi.chucVu, '#error_chucVu', 'Your choice');
    }

    {//VALIDATE gioLam: không để trống, từ 80 - 200
        nvMoi.gioLam = document.querySelector('#gioLam').value;
        valid = kiemTraSoRong(nvMoi.gioLam, '#error_required_gioLam', 'Your working time');
        var gio = Number(nvMoi.gioLam);
        valid = kiemTraGio(gio, '#error_gioLam', 'Your working hour', 80, 200);
    }

    {//tổng lương
        if (nvMoi.chucVu == 'Sếp') {
            nvMoi.tongLuong = Number(nvMoi.luongCoBan * 3).toLocaleString("jp-JP", { style: "currency", currency: "JPY" });
        }
        else if (nvMoi.chucVu == 'Trưởng phòng') {
            nvMoi.tongLuong = Number(nvMoi.luongCoBan * 2).toLocaleString("jp-JP", { style: "currency", currency: "JPY" });
        }
        else if (nvMoi.chucVu == 'Nhân viên') {
            nvMoi.tongLuong = Number(nvMoi.luongCoBan * 1).toLocaleString("jp-JP", { style: "currency", currency: "JPY" });
        }
        else {
            nvMoi.luongCoBan = 0;
        }
    }
    {//xếp loại
        if (Number(nvMoi.gioLam) >= 192) {
            nvMoi.xepLoai = 'Nhân viên xuất sắc';
        }
        else if (Number(nvMoi.gioLam) < 192 && Number(nvMoi.gioLam) >= 176) {
            nvMoi.xepLoai = 'Nhân viên giỏi';
        }
        else if (Number(nvMoi.gioLam) < 176 && Number(nvMoi.gioLam) >= 160) {
            nvMoi.xepLoai = 'Nhân viên khá';
        }
        else {
            nvMoi.xepLoai = 'Nhân viên trung bình';
        }
    }

    //Nếu return trả về KHÁC TRUE thì ngừng thêm dữ liệu vào table
    if (valid != true) {//khác true khi đã đã dính vào ít nhất 1 if ở trên}
        return;
    }
    console.log(nvMoi, 'nvMOI');

    //tìm ra thằng trong mảng cần chỉnh sửa
    var indexEdit = mangNhanVien.findIndex(nv => nv.taiKhoan === nvMoi.taiKhoan);

    console.log(indexEdit);
    //lấy nhân viên trong mảng thay đổi thành thông tin trên giao diện người dùng edit
    mangNhanVien[indexEdit].taiKhoan = nvMoi.taiKhoan;
    mangNhanVien[indexEdit].hoTen = nvMoi.hoTen;
    mangNhanVien[indexEdit].email = nvMoi.email;
    mangNhanVien[indexEdit].matKhau = nvMoi.matKhau;
    mangNhanVien[indexEdit].ngayLam = nvMoi.ngayLam;
    mangNhanVien[indexEdit].luongCoBan = nvMoi.luongCoBan;
    mangNhanVien[indexEdit].chucVu = nvMoi.chucVu;
    mangNhanVien[indexEdit].gioLam = nvMoi.gioLam;
    mangNhanVien[indexEdit].xepLoai = nvMoi.xepLoai;
    mangNhanVien[indexEdit].chucVu = nvMoi.chucVu;
    mangNhanVien[indexEdit].tongLuong = nvMoi.tongLuong;

    //tạo lại bảng sinh viên sau khi thay đổi
    renderTableNhanVien(mangNhanVien);
    //mở lại nút mã sinh viên
    document.querySelector('#tknv').disabled = false;
    //lưu localstorage sau khi sửa
    luulocalStorage();
}

//TÌM VÀ XUẤT LOẠI NHÂN VIÊN
var arrXepLoai = [];
document.querySelector('#btnTimNV').onclick = function () {
    var loaiNhanVien = document.querySelector('#searchName').value;
    //lấy ra thông tin nhân viên tại vị trí đó
    // var indexSort = mangNhanVien.findIndex(nv => nv.xepLoai === loaiNhanVien);
    //xóa cái tồn tại trước đó
    for (var index = 0; index < mangNhanVien.length; index++) {
        if (arrXepLoai[index] != '') {
            arrXepLoai.splice(index, arrXepLoai.length);
        }
    }
    //tạo cái mới đưa vào bảng
    for (var index = 0; index < mangNhanVien.length; index++) {
        var nvSort = mangNhanVien[index];
        if (nvSort.xepLoai === loaiNhanVien) {
            arrXepLoai.push(nvSort);
        }
    }

    console.log('arrXepLoai', arrXepLoai);
    //gọi hàm tạo lại table sau khi xóa
    renderTableNhanVien(arrXepLoai);
    //lưu vào localstorage
    luulocalStorage();
}



//LƯU DỮ LIỆU HIỂN THỊ TRÊN TRÌNH DUYỆT ĐÃ CÓ REFRESH PAGE
function luulocalStorage() {
    //biến đổi mảng thành  => html
    var sMangNhanVien = JSON.stringify(mangNhanVien);
    //LƯU VÀO LOCALSTORAGE
    localStorage.setItem('mangNhanVien', sMangNhanVien);
}

// luulocalStorage();
function layLocalStorage() {
    //check xem storage có dữ liệu đó hay không
    if (localStorage.getItem('mangNhanVien')) {
        //lấy ra
        var sMangNhanVien = localStorage.getItem('mangNhanVien');
        //lấy mangNhanVien gán = chuỗi được lấy từ localstorage ra (phải dùng JSON.parse để chuyển về mảng lại)
        mangNhanVien = JSON.parse(sMangNhanVien);
        //tạo ra table nhân viên từ mảng
        renderTableNhanVien(mangNhanVien);
    }
}

//Gọi hàm lấy localstorage khi trang vừa load
window.onload = function () {
    //Browser load lại trang thì sẽ code ở đây
    layLocalStorage();
}


