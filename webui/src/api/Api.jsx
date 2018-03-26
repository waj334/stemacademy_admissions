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

export function SubmitApp(data) {
    var url = Url('/app/submit');

    return fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    })
    .then(checkStatus)
    .then(resp => resp.json());
}

export function Login(email, pwd) {
    var url = Url('/login');
    
    
    return fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username: email,
            password: pwd
        })
    })
    .then(checkStatus)
    .then(resp => resp.json());
}