import {
    LOGIN_USER, REGISTER_USER, AUTHMAIL_USER
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
    
        default:
            return state;
         
    }
}