
import { isValidNumber } from 'libphonenumber-js'

var regexName = '^[a-zA-Z]+[`|\']?[a-zA-Z]?$';
var regexEmail = '^[a-zA-Z0-9_+&*-]+(?:\.[a-zA-Z0-9_+&*-]+)*@(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,7}$';
var regexPhone = '^\D?(\d{3})\D?\D?(\d{3})\D?(\d{4})$';
var regexState = '^(AE|AL|AK|AP|AS|AZ|AR|CA|CO|CT|DE|DC|FM|FL|GA|GU|HI|ID|IL|IN|IA|KS|KY|LA|ME|MH|'
    + 'MD|MA|MI|MN|MS|MO|MP|MT|NE|NV|NH|NJ|NM|NY|NC|ND|OH|OK|OR|PW|PA|PR|RI|SC|SD|TN|TX|UT|VT|VI|VA|'
    + 'WA|WV|WI|WY)$';

export function checkInput(str, type) {
    var regex;

    switch (type) {
        case 'name':
            regex = regexName;
            break;
        case 'email':
            regex = regexEmail;
            break;
        case 'state':
            regex = regexState;
            break;
        default:
            return false;
    }

    var v = new RegExp(regex);
    var t = v.test(str);

    console.log(str, type, regex, v, t);

    return t;
}

export function checkPhoneNo(pno) {
    return isValidNumber(pno, 'US');
}