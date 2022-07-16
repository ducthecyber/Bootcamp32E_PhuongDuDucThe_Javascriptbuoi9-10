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
function kiemTraSoRong(value, selectorError, name) {

    //.trim(): loại bỏ khoảng trống đầu và cuối của chuỗi
    //     abc     =>abc
    if (value !== '') {
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
    // console.log(regexLetter.test(value.trim()));
    else if (value.trim() !== '') {
        document.querySelector(selectorError).innerHTML = name + ' is not a valid letter';
        return false;
    }
    else { return false };
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
    else if (value.trim() !== '') {
        document.querySelector(selectorError).innerHTML = name + ' is not a valid email';
        return false;
    }
    else { return false };
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
            return false;
        }
        var dd = parseInt(pdate[0]);
        var mm = parseInt(pdate[1]);
        var yy = parseInt(pdate[2]);
        // Create list of days of a month [assume there is no leap year by default]
        var ListofDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        if (mm == 1 || mm > 2) {
            if (dd > ListofDays[mm - 1]) {

                return false;
            }
        }
        if (mm == 2) {
            var lyear = false;
            if ((!(yy % 4) && yy % 100) || !(yy % 400)) {
                lyear = true;
            }
            if ((lyear == false) && (dd >= 29)) {

                return false;
            }
            if ((lyear == true) && (dd > 29)) {

                return false;
            }
        }
    }
    else if (value.trim() !== '') {
        return false;
    }
    else { return false };
}

function kiemTraDoDai(value, selectorError, name, minLength, maxLength) {
    var lengthValue = value.length;
    if (value.trim() == '') {
        document.querySelector(selectorError).innerHTML = '';
        return false;
    }
    else if (lengthValue > maxLength || lengthValue < minLength
    ) {
        document.querySelector(selectorError).innerHTML = name + ' is from ' + minLength + ' to ' + maxLength + ' characters';
        return false;
    }
    else if (lengthValue <= maxLength || lengthValue >= minLength) {
        document.querySelector(selectorError).innerHTML = '';
        return true;
    }
    else { return false };
}

function kiemTraGiaTri(value, selectorError, name, minValue, maxValue) {
    // value = Number(value);
    if (Number(value) <= maxValue && Number(value) >= minValue) {
        document.querySelector(selectorError).innerHTML = '';
        return true;
    }
    //khi để trống sẽ là '' (rỗng) nhưng ép kiểu Number => '' sẽ biến thành 0. Nếu không nhập vào thì cần tạo điều kiện: vừa khác '' && vừa khác 0
    else if (value !== '' && value !== 0) {
        document.querySelector(selectorError).innerHTML = name + ' is from '
            + minValue.toLocaleString("jp-JP", { style: "currency", currency: "JPY" })
            + ' to ' +
            maxValue.toLocaleString("jp-JP", { style: "currency", currency: "JPY" });
        return false;
    }
    else { return false };
}
function kiemTraGio(value, selectorError, name, minValue, maxValue) {
    // value = Number(value);
    if (Number(value) <= maxValue && Number(value) >= minValue) {
        document.querySelector(selectorError).innerHTML = '';
        return true;
    }
    //khi để trống sẽ là '' (rỗng) nhưng ép kiểu Number => '' sẽ biến thành 0. Nếu không nhập vào thì cần tạo điều kiện: vừa khác '' && vừa khác 0
    else if (value !== '' && value !== 0) {
        document.querySelector(selectorError).innerHTML = name + ' is from ' + minValue + 'h' + ' to ' + maxValue + 'h';
        return false
    }
    else if (value == '' || Number(value) == 0) {
        document.querySelector(selectorError).innerHTML = name + ' is from ' + minValue + 'h' + ' to ' + maxValue + 'h';
        return false;
    }

    else { return false };
}

function kiemTraOption(value, selectorError, name) {
    if (value != "Chọn chức vụ") {
        return true;
    }
    document.querySelector(selectorError).innerHTML = name + ' is not a valid position';
    return false;
}

function kiemTraMatKhau(value, selectorError, name) {
    // var decimal = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{6,10}$/;
    var decimal = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{6,10}$/
    if (decimal.test(value)) {
        document.querySelector(selectorError).value = '';
        console.log('mat khau hop le');
        return true;
    }

    document.querySelector(selectorError).innerHTML = name + ' is not a valid password';
    console.log('mat khau sai');
    return false;

}
