import React, {Component, useState} from 'react';
import '../../css/Login.css';
import SignUp from './SignUp';
import SignIn from './SignIn';
import Overlay from './Overlay';
import styled from "styled-components";
import backimg from '../../images/phone.jpg';

interface State {
    rightPanelActive: boolean,
}

// 배경 사진 넣으려고 만든 부분
const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url(${backimg});
  filter:brightness(100%);
  background-size: cover;
`;

const Login = ({setLoginUser}: {setLoginUser:any}) =>{
    const [rightPanelActive, setRightPanelActive] = useState(false);
 

    const handleClickSignUpButton = () => {
        setRightPanelActive(true);
    };

    const handleClickSignInButton = () =>{
        setRightPanelActive(false);
    };

        return (
            <>
            <Container></Container>
            <div className="Login">
                <div
                    className={`container ${rightPanelActive ? `right-panel-active` : ``}`}
                    id="container"
                >
                    <SignUp />
                    <SignIn setLoginUser={setLoginUser} />
                    <Overlay
                        handleClickSignInButton={handleClickSignInButton}
                        handleClickSignUpButton={handleClickSignUpButton}
                    />
                </div>
            </div>

            </>
        );
    }


export default Login;