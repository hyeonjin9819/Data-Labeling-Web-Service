import axios from "axios";
import {LOGIN_USER, REGISTER_USER, AUTHMAIL_USER, PROJECT_CREATE, FIND_EMAIL, MYINFO, NAMECHANGE, PROFILECHANGE, TEAM_CREATE, PROJECT_IMG} from './types';

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
  
    return {
        type: AUTHMAIL_USER,
        payload : request
    }
}

export function projectCreate(dataTosubmit: any) {

    const request = axios.post('/api/projects/create',dataTosubmit)
      .then(response =>  response.data )

    return {
        type: PROJECT_CREATE,
        payload : request
    }
}

export function teamCreate(dataTosubmit: any) {

    const request = axios.post('/api/team/create',dataTosubmit)
      .then(response =>  response.data )

    return {
        type: TEAM_CREATE,
        payload : request
    }
}

export function findEmail(dataTosubmit: any) {

    const request = axios.post('/api/users/findemail',dataTosubmit)
      .then(response =>  response.data )
      console.log('request',request)
    return {
        type: FIND_EMAIL,
        payload : request
    }
}

export function myInfo(dataTosubmit: any) {

    const request = axios.post('/api/users/myinfo',dataTosubmit)
      .then(response =>  response.data )
      console.log('request',request)
    return {
        type: MYINFO,
        payload : request
    }
}


export function nameChange(dataTosubmit: any) {

    const request = axios.post('/api/users/namechange',dataTosubmit)
      .then(response =>  response.data )
      console.log('request',request)
    return {
        type: NAMECHANGE,
        payload : request
    }
}

export function profileChange(dataTosubmit: any) {
    const request = axios.post('/api/users/profilechange',dataTosubmit)
      .then(response =>  response.data )
      console.log('request',request)
    return {
        type: PROFILECHANGE,
        payload : request
    }
}

export function projectImg(dataTosubmit: any) {
    const request = axios.post('/api/projects/image',dataTosubmit)
      .then(response =>  response.data )
      console.log('request',request)
    return {
        type: PROJECT_IMG,
        payload : request
    }
}