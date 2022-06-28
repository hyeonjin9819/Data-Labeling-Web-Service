import { Axios } from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../../../_actions/user_action";
import { useNavigate } from "react-router-dom";
import "../../css/Login.css";

function LoginPage() {
  const dispatch = useDispatch<any>();
  const Navigate = useNavigate();
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");

  const onEmailHandler = (e: {
    currentTarget: { value: React.SetStateAction<string> };
  }) => {
    setEmail(e.currentTarget.value);
  };
  const onPasswordHandler = (e: {
    currentTarget: { value: React.SetStateAction<string> };
  }) => {
    setPassword(e.currentTarget.value);
  };

  const onSubmitHandler = (e: { preventDefault: () => void }) => {
    e.preventDefault();

    console.log("Email", Email);
    console.log("Password", Password);

    let body = {
      email: Email,
      password: Password,
    };

    dispatch(loginUser(body)).then(
      (response: { payload: { loginSuccess: any } }) => {
        if (response.payload.loginSuccess) {
          Navigate("/ProjectPage");
        } else {
          alert("Error");
        }
      }
    );
  };

  return (
    <div className="form-container sign-in-container">
      <form className="form" onSubmit={onSubmitHandler}>
        <h1 className="form-title">로그인</h1>

        <input
          type="email"
          placeholder="이메일"
          value={Email}
          onChange={onEmailHandler}
        />
        <input
          type="password"
          placeholder="패스워드"
          value={Password}
          onChange={onPasswordHandler}
        />

        <button type="submit" className="form-button">
          sign in
        </button>
      </form>
    </div>

    /*
    <div style={{
      display: 'flex', justifyContent: 'center', alignItems: 'center'
      , width: '100%', height: '100vh'
  }}>
      <form style={{ display: 'flex', flexDirection: 'column' }}
onSubmit = {onSubmitHandler}

      >
          <label>Email</label>
          <input type="email" value = {Email} onChange = {onEmailHandler}/>
          <label>Password</label>
          <input type="password" value = {Password} onChange = {onPasswordHandler} />
          <br />
          <button type="submit">
              Login
          </button>
      </form>
  </div>
  */
  );
}

export default LoginPage;
