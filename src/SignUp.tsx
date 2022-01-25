import React, { Component } from 'react';
import robot from './images/robot.png';
class SignUp extends Component {
    render() {
        return (
            <div className="form-container sign-up-container">
                <form className="form" action="#">
                    <h1 className="form-title">Hello, Friend!</h1>

                    <input type="text" placeholder="이름" />
                    <input type="email" placeholder="이메일" />
                    <input type="password" placeholder="패스워드" />
                    <button className="form-button">sign up</button>
                </form>
            </div>
        );
    }
}

export default SignUp;
