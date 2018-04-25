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

function AuthHeader() {
    return 'Bearer ' + localStorage.getItem('token')
}

export function SubmitApp(data, type) {
    var url = Url('/user/app/submit');
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
            'Authorization': AuthHeader()
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
    var url = Url('/admin/user/get/type');

    return fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': AuthHeader()
        },
        body: JSON.stringify({
            type: type
        })
    })
    .then(checkStatus)
    .then(resp => resp.json());
}

export function GetApplicationList() {
    var url = Url('/admin/app/list');

    return fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': AuthHeader()
        }
    })
    .then(checkStatus)
    .then(resp => resp.json());
}

export function UpdateApplicationStatus(list) {
    var url = Url('/admin/app/status/update');

    var payload = JSON.stringify({
        list: list
    })

    return fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': AuthHeader()
        },
        body: payload
    })
    .then(checkStatus);
}

export function GetApplicationData(id) {
    var url = Url('/admin/app/get');

    var payload = JSON.stringify({
        id: id.toString()
    })

    return fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': AuthHeader()
        },
        body: payload
    })
    .then(checkStatus)
    .then(resp => resp.json());
}

export function GetRoster() {
    var url = Url('/admin/roster/list');

    return fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': AuthHeader()
        }
    })
    .then(checkStatus)
    .then(resp => resp.json());
}

export function postAssignments(list) {
    var url = Url('/admin/app/assign');
    var payload = JSON.stringify(list)

    return fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': AuthHeader()
        },
        body: payload
    })
    .then(checkStatus)
}

export function DeleteUser(email) {
    var url = Url('/admin/user/delete');
    var payload = JSON.stringify({
        email: email
    })

    return fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': AuthHeader()
        },
        body: payload
    })
    .then(checkStatus)
}

export function ResetPassword(email) {
    var url = Url('/admin/user/reset');
    var payload = JSON.stringify({
        email: email
    })

    return fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': AuthHeader()
        },
        body: payload
    })
    .then(checkStatus)
}