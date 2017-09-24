import {apiKey, endpoint} from './apiKey.jsx'

export function apiPostStudentApp(data) {
    var url = endpoint + '/app/student'

    fetch({
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'APIKey': apiKey.key
        },
        data: data
    })
}