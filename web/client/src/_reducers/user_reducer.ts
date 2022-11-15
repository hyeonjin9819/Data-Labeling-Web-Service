import { TODO_DELETE } from './../_actions/types';
import {
    LOGIN_USER, REGISTER_USER, AUTHMAIL_USER, PROJECT_CREATE, FIND_EMAIL, MYINFO, NAMECHANGE, PROFILECHANGE, TEAM_CREATE, PROJECT_IMG, PROJECT_DATA, IMAGE_LIST, DATA_TXT, DATA_DRAW, TEAMMAIL_USER, TEAM_DATA, TEAM_NUMBER, CODE_CHK, TEAM_MEMBERS, PROJECT_INSERT, PYTHON, SHOW_MESSAGE, COMMIT_MESSAGE, DATA_DELETE, PROJECT_MEMBER, DATA_CHART, PROJECT_OWNER, PROJECT_NOTICE, PROJECT_TODO, TODO_VIEW

} from '../_actions/types'    


export default function(state={}, action: any) {
    switch (action.type) {
        case LOGIN_USER:
            return {...state, loginSuccess: action.payload}
            break;

        case REGISTER_USER:
            return {...state, register : action.payload}
            break;

        case AUTHMAIL_USER:
            return {...state, authmail : action.payload}
            break;

        case PROJECT_CREATE:
            return {...state, project : action.payload}
            break;

        case FIND_EMAIL:
            return {...state, findemail : action.payload}
            break;

        case MYINFO:
            return {...state, myinfo : action.payload}
            break;
        
        case NAMECHANGE:
            return {...state, namechange : action.payload}
            break;
        
        case PROFILECHANGE:
            return {...state, profilechange : action.payload}
            break;

        case TEAM_CREATE:
            return {...state, teamcreate : action.payload}
            break;
        
        case PROJECT_IMG:
            return {...state, projectimg : action.payload}
            break;
        
        case PROJECT_DATA:
            return {...state, projectdata : action.payload}
            break;
        
        case IMAGE_LIST:
            return {...state, imagelist : action.payload}
            break;
        
        case DATA_TXT:
            return {...state, datatxt : action.payload}
            break;
        
        case DATA_DRAW:
            return {...state, datadraw : action.payload}
            break;

        case TEAMMAIL_USER:
            return {...state, team_mail : action.payload}
            break;

        case TEAM_DATA:
            return {...state, team_data : action.payload}
            break;

        case TEAM_NUMBER:
            return {...state, team_number : action.payload}
            break;

        case CODE_CHK:
            return {...state, code_chk : action.payload}
            break;

        case TEAM_MEMBERS:
            return {...state, team_members : action.payload}
            break;

        case PROJECT_INSERT:
            return {...state, project_insert : action.payload}
            break;

        case PYTHON:
            return {...state, python : action.payload}
            break;

        case COMMIT_MESSAGE:
            return {...state, commit_message: action.payload}
            break;
    
        case SHOW_MESSAGE:
            return {...state, show_message: action.payload}
            break;

        case DATA_DELETE:
            return {...state, data_delete: action.payload}
            break;

        case PROJECT_MEMBER:
            return {...state, project_member: action.payload}
            break;
    
        case DATA_CHART:
            return {...state, data_chart: action.payload}
            break;
        case PROJECT_OWNER:
            return {...state, project_owner: action.payload}
            break;

        case PROJECT_NOTICE:
            return {...state, project_notice: action.payload}
            break;

        case PROJECT_TODO:
            return {...state, project_todo: action.payload}
            break;

        case TODO_VIEW:
            return {...state, todo_view: action.payload}
            break;

        case TODO_DELETE:
            return {...state, todo_delete : action.payload }
            break;
        default:
            
            return state;
         
    }
}