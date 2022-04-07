import React,{useState} from 'react'
import Overlay from './Overlay';
import LoginPage from './LoginPage';
import RegisterPage from '../RegisterPage/RegisterPage';
import '../../../App.css'

function Total() {
    const [rightPanelActive, setrightPanelActive] = useState<boolean>();

    const handleClickSignUpButton = () => {
        setrightPanelActive(true)
    }
  
    const handleClickSignInButton = () => {
        setrightPanelActive(false)
    }
  
  return (
    <div  className={`container ${rightPanelActive ? `right-panel-active` : ``}`}id="container">
     <RegisterPage/>
    <LoginPage/>
    <Overlay
        handleClickSignInButton={handleClickSignInButton}
        handleClickSignUpButton={handleClickSignUpButton}
     />
</div>
  )
}

export default Total