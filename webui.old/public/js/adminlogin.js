(function () {
'use strict'

function prepareLogin(){
    var data = {
        'username': $('input[name=username]').val(),
        'password': $('input[name=password]').val()
    };

    return data;
}

$(document).ready(function() {
    //API Functions
    var api = {
        "login": '/admin/session/login'
    };

    $.fn.api.settings.api = api;

    //Setup login button
    $('#login').api({
        action: 'login',
        method: 'POST',
        beforeSend: function(settings) {
            settings.data = JSON.stringify(prepareLogin());
            return settings;
        },
        beforeXHR: function(xhr) {
            xhr.setRequestHeader('content-type', 'application/json');
            return xhr;
        },
        'debug': true,
        'verbose': true
    });
});

}());