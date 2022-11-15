import ExportTypography from "antd/lib/typography/Typography";
import axios from "axios";
import { response } from "express";
import {LOGIN_USER, REGISTER_USER, AUTHMAIL_USER, PROJECT_CREATE, FIND_EMAIL, MYINFO, NAMECHANGE, PROFILECHANGE, TEAM_CREATE, PROJECT_IMG, PROJECT_DATA, IMAGE_LIST, DATA_TXT, DATA_DRAW, TEAMMAIL_USER, TEAM_DATA, TEAM_NUMBER, CODE_CHK, TEAM_MEMBERS, PROJECT_INSERT, PYTHON, COMMIT_MESSAGE, SHOW_MESSAGE, SEND_COMMITMS, FIND_PJUSER, ING, SHOW_ING, UPDATE_ING, DATA_DELETE, PROJECT_MEMBER, DATA_CHART, PROJECT_OWNER, PROJECT_NOTICE, PROJECT_TODO, TODO_VIEW, TODO_DELETE} from './types';

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

export function projectData(dataTosubmit: any) {
    const request = axios.post('/api/projects/data', dataTosubmit)
      .then(response =>  response.data )
      console.log('request',request)
    return {
        type: PROJECT_DATA,
        payload : request
    }
}

export function imageList(dataTosubmit: any) {
    const request = axios.post('/api/projects/imagelist', dataTosubmit)
      .then(response =>  response.data )
      console.log('request',request)
    return {
        type: IMAGE_LIST,
        payload : request
    }
}

export function dataTxt(dataTosubmit: any) {
    const request = axios.post('/api/datatxt', dataTosubmit)
      .then(response =>  response.data )
      console.log('request',request)
    return {
        type: DATA_TXT,
        payload : request
    }
}

export function datadraw(dataTosubmit: any) {
    const request = axios.post('/api/data/draw', dataTosubmit)
      .then(response =>  response.data )
      console.log('request',request)
    return {
        type: DATA_DRAW,
        payload : request
    }
}

// 팀원 추가 연결 파트
export function teamMailUser(dataTosubmit: any){
    
    const request = axios.post('/api/users/teamMail', dataTosubmit)
        .then(response => response.data)

    return{
        type: TEAMMAIL_USER,
        payload: request
    }
}

export function teamData(dataTosubmit: any){
    
    const request = axios.post('/api/team/data', dataTosubmit)
        .then(response => response.data)

    return{
        type: TEAM_DATA,
        payload: request
    }
}

export function teamNumber(dataTosubmit: any){
    
    const request = axios.post('/api/team/number', dataTosubmit)
        .then(response => response.data)

    return{
        type: TEAM_NUMBER,
        payload: request
    }
}

export function codeChk(dataTosubmit: any){
    
    const request = axios.post('/api/team/code_chk', dataTosubmit)
        .then(response => response.data)

    return{
        type: CODE_CHK,
        payload: request
    }
}

export function teammemberList(dataTosubmit: any){
    
    const request = axios.post('/api/team/memberlist', dataTosubmit)
        .then(response => response.data)

    return{
        type: TEAM_MEMBERS,
        payload: request
    }
}

export function projectInsert(dataTosubmit: any){
    
    const request = axios.post('/api/projects/insertmember', dataTosubmit)
        .then(response => response.data)

    return{
        type: PROJECT_INSERT,
        payload: request
    }
}

export function python(dataTosubmit: any){
    
    const request = axios.post('/api/python', dataTosubmit)
        .then(response => response.data)

    return{
        type: PYTHON,
        payload: request
    }
}

// 커밋 메시지 연결 파트
export function commit_message(dataTosubmit: any){

    const request = axios.post('/api/projects/createMs', dataTosubmit)
        .then(response => response.data)

    console.log("메시지 확인")
    console.log('request', request)
    return{
        type: COMMIT_MESSAGE,
        payload: request
    }
}

// 메시지 빼주는 파트
export function show_message(dataTosubmit: any){
    const request = axios.post('/api/projects/showMs', dataTosubmit)
        .then(response => response.data)
    
    console.log('request', request)

    return{
        type: SHOW_MESSAGE,
        payload: request
    }
}

// 커밋 완료 저장 누를 시 팀원에게 이메일 보내기
export function send_commitMs(dataTosubmit : any){
    const request = axios.post('/api/users/submitMail', dataTosubmit)
        .then(response => response.data)

    console.log('request', request)

    return{
        type: SEND_COMMITMS,
        payload: request
    }
}

// 프로젝트 user 찾기
export function find_pjUser(dataTosubmit: any){
    const request = axios.post('/api/users/pjUser', dataTosubmit)
        .then(response => response.data)

    console.log('request', request)

    return{
        type: FIND_PJUSER,
        payload: request
    }
}

export function ing(dataTosubmit: any){
    const request = axios.post('/api/projects/ing', dataTosubmit)
        .then(response => response.data)

    console.log('request', request)

    return{
        type:ING,
        payload: request
    }
}

export function show_Ing(dataTosubmit: any){
    const request = axios.post('/api/projects/showIng', dataTosubmit)
        .then(response => response.data)

    console.log('request', request)

    return{
        type: SHOW_ING,
        payload: request,
    }
}

export function update_Ing(dataTosubmit: any) {
    const request = axios.post('/api/datas/ingUpdate', dataTosubmit)
        .then(response => response.data)

    console.log('request', request)

    return{
        type: UPDATE_ING,
        payload: request,
    }
}

export function data_delete(dataTosubmit : any) {
    const request = axios.post('/api/data/delete', dataTosubmit)
        .then(response => response.data)

        return{
            type: DATA_DELETE,
            payload: request,
        }

}

export function project_member(dataTosubmit : any) {
    const request = axios.post('/api/project/member', dataTosubmit)
        .then(response => response.data)

        return{
            type: PROJECT_MEMBER,
            payload: request,
        }
}

export function data_chart(dataTosubmit : any) {
    const request = axios.post('/api/project/chart', dataTosubmit)
        .then(response => response.data)

        return{
            type: DATA_CHART,
            payload: request,
        }

}

export function project_owner(dataTosubmit : any) {
    const request = axios.post('/api/project/owner', dataTosubmit)
        .then(response => response.data)

        return{
            type: PROJECT_OWNER,
            payload: request,
        }
}

export function project_notice(dataTosubmit : any) {
    const request = axios.post('/api/project/notice', dataTosubmit)
        .then(response => response.data)

        return{
            type: PROJECT_NOTICE,
            payload: request,
        }

}

export function project_todo(dataTosubmit : any) {
    const request = axios.post('/api/overview/todolist', dataTosubmit)
        .then(response => response.data)

        return{
            type: PROJECT_TODO,
            payload: request,
        }

}

export function todo_view(dataTosubmit : any) {
    const request = axios.post('/api/overview/todoview', dataTosubmit)
        .then(response => response.data)

        return{
            type: TODO_VIEW,
            payload: request,
        }

}

export function todo_deletes(dataTosubmit : any) {
    const request = axios.post('/api/overview/todo_delete', dataTosubmit)
        .then(response => response.data)

        return{
            type: TODO_DELETE,
            payload: request,
        }

}

