//TASK 1: In ra table danh sách nhân viên


//In table ra 
// console.log(table);

//TASK2: Thêm nhân viên mới

var mangNhanVien = [];

document.getElementById('btnThem').onclick = function () {
    //reset lại ô nhập liệu của form để xóa thông tin cũ

    document.getElementById('tknv').value = '';
    document.getElementById('name').value = '';
    document.getElementById('email').value = '';
    document.getElementById('password').value = '';
    document.getElementById('datepicker').value = '';
    document.getElementById('luongCB').value = '';
    document.getElementById('chucvu').value = 'Chọn chức vụ';

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
    document.getElementById('btnThemNV').onclick = function () {
        //input: thông tin nhân viên
        //tạo đối tượng
        var nhanVien = new NhanVien();

        //Số tiền lương CB: hiển thị dạng số có phân cách bằng phẩy, nhưng giá trị vẫn trả về dạng Number để tính toán
        var luongcc = document.querySelector('#luongCB').value;
        // console.log(Number(luongcc.replace(/,/g, "")) + 1);
        
        console.log(luongcc.replaceAll(',', '')); //thay thế "phẩy" = "rỗng", rồi ép thành Number
        // console.log(nhanVien)
        //lấy thông tin từ người dùng


        {//VALIDATE taiKhoan: không rỗng, từ 4 - 6 ký số
            nhanVien.taiKhoan = document.querySelector('#tknv').value;
            var account = document.forms['myForm']['tk'].value;
            if (account == '' || account.length > 6 || account.length < 4) {
                document.getElementById('tknv').value = '';
                alert('Name must be filled out and 6 characters at maximum');                                return false;
            }
        }

        {//VALIDATE hoTen
            //nếu tên có dấu thì không xét được
            nhanVien.hoTen = document.querySelector('#name').value.toUpperCase();
            var name = document.forms["myForm"]["name"].value;
            var regEx = /^[A-Za-z .]+$/;
            // var regEx = /^[A-Za-z .]+$/;
            //khoảng cách + . => tên nhập vào có thể trên 2 chữ.vd: tran van thanh
            // var regEx = /^[A-Za-z]+$/;
            //ghi vầy thì tên chỉ 1 chữ. vd:ngoc
            if (name.match(regEx) && name.length >= 1) {
            }
            else {
                document.getElementById('name').value = '';
                alert("Please enter letters only");
                return false;
            }
        }

        {//VALIDATE email
            // https://www.w3resource.com/javascript/form/example-javascript-form-validation-email-REC-2822.html?text1=the&submit=Submit#
            nhanVien.email = document.querySelector('#email').value;
            var mailformat = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
            if (nhanVien.email.match(mailformat)) {
                document.forms["myForm"]["email"].focus();
            }
            else {
                alert("You have entered an invalid email address!");
                document.forms["myForm"]["email"].focus();
                document.getElementById('email').value = '';
                return false;
            }
        }

        {//VALIDATE matKhau
            // https://w3resource.com/javascript/form/password-validation.php
            // 6 to 20 characters, least one numeric digit, one uppercase and one lowercase letter
            // var passw = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;

            // 7 to 15 characters,least one numeric digit and a special character
            // var paswd=  /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/

            // 8 to 15 characters, least one lowercase letter, one uppercase letter, one numeric digit, and one special character
            // var decimal=  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;
            nhanVien.matKhau = document.querySelector('#password').value;
            var decimal = /^(?=.*\d)(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{6,10}$/;
            if (nhanVien.matKhau.match(decimal)) {
            }
            else {
                alert('Wrong! Valid password conntains 6-10 characters including </br>At least one number</br>At least one uppercase letter</br>One special character');
                document.querySelector('#password').value = '';
                return false;
            }
        }

        {//VALIDATE ngayLam
            //Xử lý ngày làm
            //https://www.w3resource.com/javascript/form/javascript-date-validation.php
            var ngayLam = document.querySelector('#datepicker').value;
            nhanVien.ngayLam = moment(new Date(ngayLam),).format('DD' + '/MM' + '/YYYY');

            var dateformat = /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/;
            // Match the date format through regular expression
            if (nhanVien.ngayLam.match(dateformat)) {
                document.forms["myForm"]["ngaylam"].focus();
                //Test which seperator is used '/' or '-'
                var opera1 = nhanVien.ngayLam.split('/');
                var lopera1 = 0;
                // var opera2 = inputText.value.split('-');
                lopera1 = opera1.length;
                // lopera2 = opera2.length;
                // Extract the string into month, date and year
                if (lopera1 > 2) {
                    var pdate = nhanVien.ngayLam.split('/');
                }
                // else if (lopera2 > 1) {
                //     var pdate = inputText.value.split('-');
                // }
                else {
                    alert('Date must be filled out!');
                    return false;
                }
                var dd = parseInt(pdate[0]);
                var mm = parseInt(pdate[1]);
                var yy = parseInt(pdate[2]);
                // Create list of days of a month [assume there is no leap year by default]
                var ListofDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
                if (mm == 1 || mm > 2) {
                    if (dd > ListofDays[mm - 1]) {
                        alert('Invalid date format!');
                        return false;
                    }
                }
                if (mm == 2) {
                    var lyear = false;
                    if ((!(yy % 4) && yy % 100) || !(yy % 400)) {
                        lyear = true;
                    }
                    if ((lyear == false) && (dd >= 29)) {
                        alert('Invalid date format!');
                        return false;
                    }
                    if ((lyear == true) && (dd > 29)) {
                        alert('Invalid date format!');
                        return false;
                    }
                }
            }
            else {
                alert("Invalid date format!");
                document.forms["myForm"]["ngaylam"].focus();
                return false;
            }
        }

        {//VALIDATE luongCoBan
            var luongcc = document.querySelector('#luongCB').value;
            console.log(Number(luongcc.replace(/,/g, "")) + 1);

            nhanVien.luongCoBan = Number(luongcc.replace(/,/g, ""));
            // Add Thousands Separator to Numeric Input(chưa định dạng được)
            // https://stackoverflow.com/questions/71028035/add-thousand-separator-with-javascript-when-add-input-dynamically


            // Add an event listener to the input element

            if (Number(nhanVien.luongCoBan) >= 1e+6 && Number(nhanVien.luongCoBan) <= 20e+6) {
            }
            else if (Number(nhanVien.luongCoBan) < 1e+6 || Number(nhanVien.luongCoBan) > 20e+6) {
                alert('Salary must range between 1,000,000 vnd and 20,000,000 vnd');
                document.querySelector('#luongCB').value = '';
                return false;
            }
            else {
                alert('Numbers only, please!');
                document.querySelector('#luongCB').value = '';
                return false;
            }

        }

        {//VALIDATE chucVu
            nhanVien.chucVu = document.querySelector('#chucvu').value;
            if (nhanVien.chucVu == 'Sếp' || nhanVien.chucVu == 'Trưởng phòng' || nhanVien.chucVu == 'Nhân viên') {
            }
            else {
                alert('Choose other options!');
                return false;
            }
        }

        {//VALIDATE gioLam
            nhanVien.gioLam = document.querySelector('#gioLam').value;
            var gio = Number(nhanVien.gioLam);
            if (nhanVien.gioLam.length >= 2 && gio >= 80 && gio <= 200) {
            }
            else if (nhanVien.gioLam == "") {
                alert('Working hours must be filled out!');
                return false;
            }
            else {
                alert('Working hours must range between 80 and 200!');
                document.querySelector('#gioLam').value = '';
                return false;
            }
        }

        {//Tổng lương

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


        //tạo ra TABLE theo hướng đối tượng
        mangNhanVien.push(nhanVien);
        luulocalStorage();
        console.log('mangNhanVien', mangNhanVien);
        renderTableNhanVien(mangNhanVien);
    }

}


// {// var trNhanVien = document.createElement('tr');

// // //tạo ra thẻ td bằng js
// // var trNhanVien = document.createElement('tr');
// // var tdTaiKhoan = document.createElement('td');
// // var tdHoTen = document.createElement('td');
// // var tdEmail = document.createElement('td');
// // var tdNgayLam = document.createElement('td');
// // var tdChucVu = document.createElement('td');
// // var tdTongLuong = document.createElement('td');
// // var tdXepLoai = document.createElement('td');
// // var tdCaiDat = document.createElement('td');

// // //Gán thông tin nhập vào đến table
// // tdTaiKhoan.innerHTML = nhanVien.taiKhoan;
// // tdHoTen.innerHTML = nhanVien.hoTen;
// // tdEmail.innerHTML = nhanVien.email;
// // tdNgayLam.innerHTML = nhanVien.ngayLam;
// // tdChucVu.innerHTML = nhanVien.chucVu;
// // tdTongLuong.innerHTML = nhanVien.luongCoBan;
// // tdXepLoai.innerHTML = nhanVien.xepLoai;

// // //nhúng thẻ td vào tr
// // trNhanVien.appendChild(tdTaiKhoan);
// // trNhanVien.appendChild(tdHoTen);
// // trNhanVien.appendChild(tdEmail);
// // trNhanVien.appendChild(tdNgayLam);
// // trNhanVien.appendChild(tdChucVu);
// // trNhanVien.appendChild(tdTongLuong);
// // trNhanVien.appendChild(tdXepLoai);
// // trNhanVien.appendChild(tdCaiDat);

// // //dom đến 1 thẻ có sẵn trên giao diện
// // document.querySelector('#tableDanhSach').appendChild(trNhanVien);


// // var thongTin = document.querySelectorAll('input');
// // for (var index = 0; index < thongTin.length; index++) {
// //     //mỗi lần duyệt lấy ra 1 thẻ
// //     var td = thongTin[index].value;
// //     //lấy ra nội dung giữa 2 thẻ (không cần)
// //     //thêm nội dung đó vào mảng
// //     form.push(td);
// // }
// // console.log(form);}
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

    {//VALIDATE taiKhoan
        nvMoi.taiKhoan = document.querySelector('#tknv').value;
        if (nvMoi.taiKhoan == '' || nvMoi.taiKhoan.length > 6 || nvMoi.taiKhoan.length < 4) {
            document.getElementById('tknv').value = '';
            alert('Name must be filled out and 6 characters at maximum');
            return false;
        }
    }

    {//VALIDATE hoTen
        //nếu tên có dấu thì không xét được
        nvMoi.hoTen = document.querySelector('#name').value.toUpperCase();
        var regEx = /^[A-Za-z .]+$/;
        // var regEx = /^[A-Za-z .]+$/;
        //khoảng cách + . => tên nhập vào có thể trên 2 chữ.vd: tran van thanh
        // var regEx = /^[A-Za-z]+$/;
        //ghi vầy thì tên chỉ 1 chữ. vd:ngoc
        if (regEx.test(nvMoi.hoTen)) {
        }
        else {
            document.getElementById('name').value = '';
            alert("Please enter letters only");
            return false;
        }
    }

    {//VALIDATE email
        // https://www.w3resource.com/javascript/form/example-javascript-form-validation-email-REC-2822.html?text1=the&submit=Submit#
        nvMoi.email = document.querySelector('#email').value;
        var mailformat = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
        if (nvMoi.email.match(mailformat)) {
            document.forms["myForm"]["email"].focus();
        }
        else {
            alert("You have entered an invalid email address!");
            document.forms["myForm"]["email"].focus();
            document.getElementById('email').value = '';
            return false;
        }
    }
    {//VALIDATE matKhau
        nvMoi.matKhau = document.querySelector('#password').value;
        var decimal = /^(?=.*\d)(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{6,10}$/;
        if (nvMoi.matKhau.match(decimal)) {
        }
        else {
            alert('Wrong! Valid password conntains 6-10 characters including </br>At least one number</br>At least one uppercase letter</br>One special character');
            document.querySelector('#password').value = '';
            return false;
        }
    }

    {//VALIDATE ngayLam
        var ngayLam = document.querySelector('#datepicker').value;
        nvMoi.ngayLam = moment(new Date(ngayLam),).format('DD' + '/MM' + '/YYYY');

        var dateformat = /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/;
        // Match the date format through regular expression
        if (nvMoi.ngayLam.match(dateformat)) {
            document.forms["myForm"]["ngaylam"].focus();
            //Test which seperator is used '/' or '-'
            var opera1 = nvMoi.ngayLam.split('/');
            var lopera1 = 0;
            // var opera2 = inputText.value.split('-');
            lopera1 = opera1.length;
            // lopera2 = opera2.length;
            // Extract the string into month, date and year
            if (lopera1 > 2) {
                var pdate = nvMoi.ngayLam.split('/');
            }
            // else if (lopera2 > 1) {
            //     var pdate = inputText.value.split('-');
            // }
            else {
                alert('Date must be filled out!');
                return false;
            }
            var dd = parseInt(pdate[0]);
            var mm = parseInt(pdate[1]);
            var yy = parseInt(pdate[2]);
            // Create list of days of a month [assume there is no leap year by default]
            var ListofDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
            if (mm == 1 || mm > 2) {
                if (dd > ListofDays[mm - 1]) {
                    alert('Invalid date format!');
                    return false;
                }
            }
            if (mm == 2) {
                var lyear = false;
                if ((!(yy % 4) && yy % 100) || !(yy % 400)) {
                    lyear = true;
                }
                if ((lyear == false) && (dd >= 29)) {
                    alert('Invalid date format!');
                    return false;
                }
                if ((lyear == true) && (dd > 29)) {
                    alert('Invalid date format!');
                    return false;
                }
            }
        }
        else {
            alert("Invalid date format!");
            document.forms["myForm"]["ngaylam"].focus();
            return false;
        }
    }

    {//VALIDATE luongCB
        var luongcc = document.querySelector('#luongCB').value;
        nvMoi.luongCoBan = Number(luongcc.replace(/,/g, ""));
        if (Number(nvMoi.luongCoBan) >= 1e+6 && Number(nvMoi.luongCoBan) <= 20e+6) {
        }
        else if (Number(nvMoi.luongCoBan) < 1e+6 || Number(nvMoi.luongCoBan) > 20e+6) {
            alert('Salary must range between 1,000,000 vnd and 20,000,000 vnd');
            document.querySelector('#luongCB').value = '';
            return false;
        }
        else {
            alert('Numbers only, please!');
            document.querySelector('#luongCB').value = '';
            return false;
        }
    }

    {//VALIDATE chucVu
        nvMoi.chucVu = document.querySelector('#chucvu').value;
        if (nvMoi.chucVu == 'Sếp' || nvMoi.chucVu == 'Trưởng phòng' || nvMoi.chucVu == 'Nhân viên') {
        }
        else {
            alert('Choose other options!');
            return false;
        }
    }


    {//VALIDATE gioLam
        nvMoi.gioLam = document.querySelector('#gioLam').value;
        var gio = Number(nvMoi.gioLam);
        if (nvMoi.gioLam.length >= 2 && gio >= 80 && gio <= 200) {
        }
        else if (nvMoi.gioLam == "") {
            alert('Working hours must be filled out!');
            return false;
        }
        else {
            alert('Working hours must range between 80 and 200!');
            document.querySelector('#gioLam').value = '';
            return false;
        }
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
    {//tổng lương
        if (nvMoi.chucVu == 'Sếp') {
            mangNhanVien[indexEdit].tongLuong = Number(nvMoi.luongCoBan * 3).toLocaleString("jp-JP", { style: "currency", currency: "JPY" });
        }
        else if (nvMoi.chucVu == 'Trưởng phòng') {
            mangNhanVien[indexEdit].tongLuong = Number(nvMoi.luongCoBan * 2).toLocaleString("jp-JP", { style: "currency", currency: "JPY" });
        }
        else if (nvMoi.chucVu == 'Nhân viên') {
            mangNhanVien[indexEdit].tongLuong = Number(nvMoi.luongCoBan * 1).toLocaleString("jp-JP", { style: "currency", currency: "JPY" });
        }
        else {
            mangNhanVien[indexEdit].luongCoBan = 0;
        }
    }

    {//xếp loại
        if (Number(nvMoi.gioLam) >= 192) {
            mangNhanVien[indexEdit].xepLoai = 'Nhân viên xuất sắc';
        }
        else if (Number(nvMoi.gioLam) < 192 && Number(nvMoi.gioLam) >= 176) {
            mangNhanVien[indexEdit].xepLoai = 'Nhân viên giỏi';
        }
        else if (Number(nvMoi.gioLam) < 176 && Number(nvMoi.gioLam) >= 160) {
            mangNhanVien[indexEdit].xepLoai = 'Nhân viên khá';
        }
        else {
            mangNhanVien[indexEdit].xepLoai = 'Nhân viên trung bình';
        }
    }
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


