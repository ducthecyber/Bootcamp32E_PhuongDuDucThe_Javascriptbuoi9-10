//TASK 1: In ra table danh sách nhân viên


//In table ra 
// console.log(table);

//TASK2: Thêm nhân viên mới

var form = [];
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
    document.getElementById('btnThemNV').onclick = function () {
        //input: thông tin nhân viên
        //tạo đối tượng
        var nhanVien = new NhanVien();
        // console.log(nhanVien);
        //lấy thông tin từ người dùng


        {//VALIDATE taiKhoan
            nhanVien.taiKhoan = document.querySelector('#tknv').value;
            var account = document.forms['myForm']['tk'].value;
            if (account == '' || account.length > 6 || account.length < 4) {
                document.getElementById('tknv').value = '';
                alert('Name must be filled out and 6 characters at maximum');
                return false;
            }
        }

        {//VALIDATE hoTen
            //nếu tên có dấu thì không xét được
            nhanVien.hoTen = document.querySelector('#name').value;
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
            nhanVien.luongCoBan = Number(document.querySelector('#luongCB').value);
            // Add Thousands Separator to Numeric Input(chưa định dạng được)
            // https://stackoverflow.com/questions/71028035/add-thousand-separator-with-javascript-when-add-input-dynamically
            // const inpt = document.querySelector('#luongCB').value;
            // // Add an event listener to the input element
            // inpt.addEventListener(`keyup`, function (event) {
            //     // Current string value of the input
            //     const value = this.value;

            //     // Split the value string into an array on each decimal and 
            //     // count the number of elements in the array
            //     const decimalCount = value.split(`.`).length - 1;

            //     // Don't do anything if a first decimal is entered
            //     if (event.key === `.` && decimalCount === 1) return

            //     // Remove any commas from the string and convert to a float
            //     // This will remove any non digit characters and second decimals
            //     const numericVal = parseFloat(value.replace(/,/g, ''));

            //     //NumberFormat options
            //     const options = {
            //         style: `decimal`,
            //         maximumFractionDigits: 20,
            //     };

            //     // Assign the formatted number to the input box
            //     this.value = new Intl.NumberFormat(`en-US`, options).format(numericVal);
            // })
            // document.querySelector('#luongCB').innerHTML.append(inpt);

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
        //tạo ra TABLE theo hướng đối tượng
        mangNhanVien.push(nhanVien);
        console.log('mangNhanVien', mangNhanVien);
        renderTableSinhVien(mangNhanVien);
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
function renderTableSinhVien(arrNhanVien) {
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
    </tr>
`
    }
    document.querySelector('#tableDanhSach').innerHTML = html;
    return html;
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
        //lấy mangSinhVien gán = chuỗi được lấy từ localstorage ra (phải dùng JSON.parse để chuyển về mảng lại)
        mangNhanVien = JSON.parse(sMangNhanVien);
        //tạo ra table sinh viên từ mảng
        renderTableSinhVien(mangNhanVien);
    }
}

//Gọi hàm lấy localstorage khi trang vừa load
window.onload = function () {
    //Browser load lại trang thì sẽ code ở đây
    layLocalStorage();
}

