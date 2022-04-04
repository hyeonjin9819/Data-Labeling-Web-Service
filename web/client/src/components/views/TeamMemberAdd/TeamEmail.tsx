import React from 'react'
import { IEmail } from './Interfaces';

interface Props{
    email: IEmail;
    deleteEmail(emailNameToDelete: string) : void;
}
const TeamEmail = ({email, deleteEmail}: Props) =>{
    return(
        <div className = "email">
            <div className ="content">
                <span>{email.emailName}</span>    
            </div>
            <button onClick={() => {deleteEmail(email.emailName)}}>X</button>
            </div>
    )
}

export default TeamEmail