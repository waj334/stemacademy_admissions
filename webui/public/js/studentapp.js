(function () {
'use strict';

function actionNext() {
    var currentStep = $('a.active');
    var nextStep = $('a[data-tab="'+currentStep.attr('next-tab')+'"]');

    var currentTab = $('div.tab.active');
    var nextTab = $('div[data-tab="'+currentStep.attr('next-tab')+'"]');
    
    /*Validate form if applicable
    var form = currentTab.find('form')
    if (form) {
        //form.form('validate form');
        if (!form.form('is valid'))
            return;
    }*/

    //Activate specific button for confirm and submission pages
    if (nextTab.attr('data-tab') == 'sconfirm') {
        $('#next').css('display', 'none');
        $('#submit').css('display', 'inline-block');
        $('#exit').css('display', 'none');

        //Load confirmation content
        var data = prepareJSON();
        var emConf = $('div[data-tab=sconfirm]');
        nextTab.load('/app/student/confirm', 
        {json: JSON.stringify(data)},
        function(){
            emConf.find('option[value={0}]'.replace('{0}', data.student_info.gender))[0].selected = true
            emConf.find('option[value={0}]'.replace('{0}', data.student_info.eth_race))[0].selected = true
            emConf.find('option[value={0}]'.replace('{0}', data.student_info.citizenship))[0].selected = true
        });

    } else if (nextTab.attr('data-tab') == 'ssubmitted') {
        $('#next').css('display', 'none');
        $('#submit').css('display', 'none');
        $('#close').css('display', 'inline-block');
    } else {
        $('#next_button').css('display', 'inline-block');
        $('#submit_button').css('display', 'none');
        $('#close_button').css('display', 'none');
    }

    currentStep.toggleClass('active');
    nextStep.toggleClass('active');
    nextStep.removeClass('disabled');
    
    currentTab.toggleClass('active');
    nextTab.toggleClass('active');
}

function prepareJSON() {
    var data = {
        "student_info": {
            "firstname": $('input[name=s_firstname]').val(),
            "lastname": $('input[name=s_lastname]').val(),
            "age": $('input[name=s_age]').val(),
            "gender": $('select[name=s_gender]').val(),
            "eth_race": $('select[name=s_race_eth]').val(),
            "citizenship": $('select[name=s_citizenship]').val(),
            "email": $('input[name=s_email]').val(),
            "phone_no": $('input[name=s_phone_no]').val(),
            "address": $('input[name=s_address]').val(),
            "city": $('input[name=s_city]').val(),
            "state": $('input[name=s_state]').val(),
            "zip": $('input[name=s_zip]').val()
        },
        "guardian_info": {
            "firstname": $('input[name=pg_firstname]').val(),
            "lastname": $('input[name=pg_lastname]').val(),
            "phone_no": $('input[name=pg_phone_no]').val(),
            "email": $('input[name=pg_email]').val()
        },
        "hs_info": {
            "name": $('input[name=hs_name]').val(),
            "county": $('input[name=hs_county]').val(),
            "address": $('input[name=hs_address]').val(),
            "city": $('input[name=hs_city]').val(),
            "state": $('input[name=hs_state]').val(),
            "zip": $('input[name=hs_zip]').val()
        }
    }

    return data;
}

function actionSubmit() {
    //Get form data
    var data = prepareJSON();

    // construct an HTTP request
    var xhr = new XMLHttpRequest();
    xhr.open('POST', '/app/student/submit', true);
    xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');

    // send the collected data as JSON
    xhr.send(JSON.stringify(data));

    xhr.onloadend = function () {
    // done
    };
}

$(document).ready(function(){
    //Setup buttons
    $('#next').css('display', 'inline-block');
    $('#submit').css('display', 'none');
    $('#exit').css('display', 'none');
    
    //Setup tabs
    $('#steps > a.step.item').each(function(i, obj){
        $(obj).tab({
            "onVisible": 
                function(){    
                    var t = $(this).attr('data-tab');
                    if (t === 'sconfirm') {
                        $('#next').css('display', 'none');
                        $('#submit').css('display', 'inline-block');
                        $('#close').css('display', 'none');
                    } else {
                        $('#next').css('display', 'inline-block');
                        $('#submit').css('display', 'none');
                        $('#close').css('display', 'none');
                    }
                }
        });
    });

    //Button actions
    $('#next').click(function(){
        actionNext();
    });

    $('#submit').click(function(){
        actionSubmit();
    });

    $('#exit').click(function(){
        //Goto main page
    })
})


}());