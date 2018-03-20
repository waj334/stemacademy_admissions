import {ApiKey, Endpoint} from './ApiKey.jsx'

function checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
        return response;
    } else {
        let error = new Error(response.statusText);
        error.response = response;
        throw error;
    }
}

function Url(path) {
    return Endpoint+path;
}

export function ApiPostStudentApp(data) {
    var url = Url('/app/student/submit');

    return fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'APIKey': ApiKey.key
        },
        body: data
    })
    .then(checkStatus)
    .then(resp => resp.json());
}

export function ApiLogin(email, pwd) {
    var url = Url('/admin/session/login');
    
    
    return fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email: email,
            password: pwd
        })
    })
    .then(checkStatus)
    .then(resp => resp.json());
}