import {
    LOGIN_USER, REGISTER_USER, AUTHMAIL_USER, PROJECT_CREATE, FIND_EMAIL, MYINFO, NAMECHANGE, PROFILECHANGE, TEAM_CREATE, PROJECT_IMG, PROJECT_DATA, IMAGE_LIST, DATA_TXT, DATA_DRAW

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
            return {...state, datatxt : action.payload}
            break;


        default:
            
            return state;
         
    }
}