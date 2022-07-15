function kiemTraRong(value, selectorError, name) {

    //.trim(): loại bỏ khoảng trống đầu và cuối của chuỗi
    //     abc     =>abc
    if (value.trim() !== '') {
        document.querySelector(selectorError).innerHTML = '';
        return true;
    }
    document.querySelector(selectorError).innerHTML = name + ' must be filled out!';
    return false;
}

function kiemTraKyTu(value, selectorError, name) {
    var regexLetter = /^[A-Z a-z]+$/;//có khoảng trống giữa A-Z vs a-z: cho phép khoảng trống
    if (regexLetter.test(value.trim())) {
        document.querySelector(selectorError).innerHTML = '';
        return true;
    }
    document.querySelector(selectorError).innerHTML = name + ' is not a valid letter';
    return false;
}

function kiemTraSo(value, selectorError, name) {
    var regexNumber = /^[0-9]+$/;
    if (regexNumber.test(value.trim())) {
        document.querySelector(selectorError).innerHTML = '';
        return true;
    }
    document.querySelector(selectorError).innerHTML = name + ' is not a valid number';
    return false;
}

function kiemTraEmail(value, selectorError, name) {
    var regexEmail = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
    if (regexEmail.test(value)) {
        document.querySelector(selectorError).innerHTML = '';
        return true;
    }
    document.querySelector(selectorError).innerHTML = name + ' is not a valid email';
}

function kiemTraNgay(value, selectorError, name) {
    var regexDate = /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/;
    // if (regexDate.test(value.trim())) {
    //     document.querySelector(selectorError).innerHTML = '';

    // }
    if (regexDate.test(value.trim())) {
        document.querySelector(selectorError).innerHTML = '';

        //Test which seperator is used '/' or '-'
        var opera1 = value.split('/');
        var lopera1 = 0;
        // var opera2 = inputText.value.split('-');
        lopera1 = opera1.length;
        // lopera2 = opera2.length;
        // Extract the string into month, date and year
        if (lopera1 > 2) {
            var pdate = value.split('/');
        }
        // else if (lopera2 > 1) {
        //     var pdate = inputText.value.split('-');
        // }
        else {
            document.querySelector(selectorError).innerHTML = name + ' is not a valid date';
            return false;
        }
        var dd = parseInt(pdate[0]);
        var mm = parseInt(pdate[1]);
        var yy = parseInt(pdate[2]);
        // Create list of days of a month [assume there is no leap year by default]
        var ListofDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        if (mm == 1 || mm > 2) {
            if (dd > ListofDays[mm - 1]) {
                document.querySelector(selectorError).innerHTML = name + ' is not a valid date';
                return false;
            }
        }
        if (mm == 2) {
            var lyear = false;
            if ((!(yy % 4) && yy % 100) || !(yy % 400)) {
                lyear = true;
            }
            if ((lyear == false) && (dd >= 29)) {
                document.querySelector(selectorError).innerHTML = name + ' is not a valid date';
                return false;
            }
            if ((lyear == true) && (dd > 29)) {
                document.querySelector(selectorError).innerHTML = name + ' is not a valid date';
                return false;
            }
        }
    }
    document.querySelector(selectorError).innerHTML = name + ' is not a valid date';
    return false;
}

function kiemTraDoDai(value, selectorError, name, minLength, maxLength) {
    var lengthValue = value.length;
    if (lengthValue > maxLength || lengthValue < minLength) {
        document.querySelector(selectorError).innerHTML = name + ' is from ' + minLength + ' to ' + maxLength + ' characters';
        return false;
    }
    document.querySelector(selectorError).innerHTML = '';
}

function kiemTraGiaTri(value, selectorError, name, minValue, maxValue) {
    value = Number(value);
    if (value > maxValue || value < minValue) {
        document.querySelector(selectorError).innerHTML = name + ' is from' + minValue + ' to ' + maxValue;
        return false;
    }
    document.querySelector(selectorError).innerHTML = '';
    return true;
}

function kiemTraOption(value, selectorError, name) {
    if (value == 'Sếp' || value == 'Trưởng phòng' || value == 'Nhân viên') {
    }
    document.querySelector(selectorError).innerHTML = 'Please choose other options';
}

function tinhTongLuong(valueChucVu, valueLuongCB, valueTong) {
    if (valueChucVu == 'Sếp') {
        valueTong = Number(valueLuongCB * 3).toLocaleString("jp-JP", { style: "currency", currency: "JPY" });
    }
    else if (valueChucVu == 'Trưởng phòng') {
        valueTong = Number(valueLuongCB * 2).toLocaleString("jp-JP", { style: "currency", currency: "JPY" });
    }
    else if (valueChucVu == 'Nhân viên') {
        valueTong = Number(valueLuongCB * 1).toLocaleString("jp-JP", { style: "currency", currency: "JPY" });
    }
    else {
        valueLuongCB = 0;
    }
}

function xepLoai(valueGioLam, valueXepLoai, E, G, M) {
    if (Number(valueGioLam) >= E) {
        valueXepLoai = 'Nhân viên xuất sắc';
    }
    else if (Number(valueGioLam) < E && Number(valueGioLam) >= G) {
        valueXepLoai = 'Nhân viên giỏi';
    }
    else if (Number(valueGioLam) < G && Number(valueGioLam) >= M) {
        valueXepLoai = 'Nhân viên khá';
    }
    else {
        valueXepLoai = 'Nhân viên trung bình';
    }
}