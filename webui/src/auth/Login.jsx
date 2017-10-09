import {ApiLogin} from '../api/Api.jsx';

export default function Login(uname, pwd) {
    try {
        token = ApiLogin(uname, pwd);

        //Store JWT
        localStorage.setItem('token', token);

        //Goto Admin Front
        browserHistory.push('/admin/main')
    } catch (e) {
        //TODO Notify user
        console.log(e);
    }
}