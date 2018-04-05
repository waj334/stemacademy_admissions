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

export function SubmitApp(data, type) {
    var url = Url('/app/submit');
    var date = new Date();
    var payload = JSON.stringify(
        {
            type: type,
            ...data
        });

    return fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: payload
    })
    .then(checkStatus)
    .then(resp => resp.json());
}

export function Signup(data) {
    var url = Url('/signup');
    var payload = JSON.stringify(data);

    return fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: payload
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

export function GetUsers(type) {
    var url = Url('/users/get');

    return fetch(url, {
        methos: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            type: type
        })
    })
    .then(checkStatus)
    .then(resp => resp.json());
}