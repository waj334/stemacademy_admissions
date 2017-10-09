import {ApiKey, Endpoint} from './ApiKey.jsx'

function checkStatus(resp) {
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
    var url = Url('/app/student');

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'APIKey': ApiKey.key
        },
        body: data
    })
}

export function ApiLogin(uname, pwd) {
    var url = Url('/admin/session/login');
    
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            
        },
        body: {
            username: uname,
            password: pwd
        }
    })
    .then(checkStatus)
    .then(resp => resp.json())
    .then(data => {
        return data;
    })
}