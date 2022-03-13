import axios from "axios";
import {LOGIN_USER, REGISTER_USER, AUTHMAIL_USER} from './types';

export function loginUser(dataTosubmit: any) {
    const request = axios.post('/api/users/login',dataTosubmit)
    .then(response =>  response.data )
    return {
        type: LOGIN_USER,
        payload : request
    }
}

export function registerUser(dataTosubmit: any) {

    const request = axios.post('/api/users/register',dataTosubmit)
      .then(response =>  response.data )

    return {
        type: REGISTER_USER,
        payload : request
    }
}

export function authmailUser(dataTosubmit: any) {

    const request = axios.post('/api/users/mail',dataTosubmit)
      .then(response =>  response.data )
    console.log('request',request)
    return {
        type: AUTHMAIL_USER,
        payload : request
    }
}


