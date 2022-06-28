import React from 'react'
import { IEmail } from './Interfaces';
import 'bootstrap/dist/css/bootstrap.css';
import '../../css/TeamMemberAdd.css';

interface Props{
    email: IEmail;
    deleteEmail(emailNameToDelete: string) : void;
}
const TeamEmail = ({email, deleteEmail}: Props) =>{
    //return <div>{email.emailName}</div>;
    return(
        <div className = "email">
            <div className ="content">
                <span>{email.emailName}</span>    
            <button className = "emailDeleteBtn" onClick={() => {deleteEmail(email.emailName)}}>x</button>
            </div>
            </div>
    )
}

export default TeamEmail