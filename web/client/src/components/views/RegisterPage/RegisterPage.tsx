import { Axios } from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { registerUser, authmailUser } from "../../../_actions/user_action";
import { useNavigate } from "react-router-dom";
import "../../css/Login.css";

function RegisterPage() {
  const dispatch = useDispatch<any>();
  const Navigate = useNavigate();
  const [Email, setEmail] = useState("");
  const [Name, setName] = useState("");
  const [Password, setPassword] = useState("");
  const [Auth, setAuth] = useState("");
  const [ConfirmPassword, setConfirmPassword] = useState("");
  const [number, setnumber] = useState("");

  const onEmailHandler = (e: {
    currentTarget: { value: React.SetStateAction<string> };
  }) => {
    setEmail(e.currentTarget.value);
  };

  const onNameHandler = (event: {
    currentTarget: { value: React.SetStateAction<string> };
  }) => {
    setName(event.currentTarget.value);
  };

  const onPasswordHandler = (e: {
    currentTarget: { value: React.SetStateAction<string> };
  }) => {
    setPassword(e.currentTarget.value);
  };

  const onConfirmPasswordHandler = (event: {
    currentTarget: { value: React.SetStateAction<string> };
  }) => {
    setConfirmPassword(event.currentTarget.value);
  };

  const onAuthHandler = (event: {
    currentTarget: { value: React.SetStateAction<string> };
  }) => {
    setAuth(event.currentTarget.value);
  };

  const sendEmail = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    console.log("email", Email);
    const auth = document.getElementsByClassName(
      "auth_alert"
    ) as HTMLCollectionOf<HTMLElement>;
    auth[0].style.display = "block";
    let body = {
      email: Email,
    };

    dispatch(authmailUser(body)).then(
      (response: { payload: { success: any; number: any } }) => {
        if (response.payload.success) {
          setnumber(response.payload.number);
          alert("인증 번호를 보냈습니다.");
        } else {
          alert("인증번호 보내기 실패");
        }
      }
    );
  };

  const onSubmitHandler = (e: { preventDefault: () => void }) => {
    e.preventDefault();

    console.log("Email", Email);
    console.log("Password", Password);

    if (Password !== ConfirmPassword) {
      return alert("비밀번호와 비밀번호 확인은 같아야 합니다.");
    }

    if (Auth === "" || Auth !== number) {
      console.log(Auth);
      console.log(number);
      return alert("이메일 인증을 완료해주세요");
    }

    let body = {
      id: "",
      email: Email,
      password: Password,
      name: Name,
      profile: "",
    };

    dispatch(registerUser(body)).then(
      (response: { payload: { success: any } }) => {
        if (response.payload.success) {
          const auth = document.getElementsByClassName(
            "auth_alert"
          ) as HTMLCollectionOf<HTMLElement>;
          auth[0].style.display = "none";
          alert("회원가입 성공! 로그인 탭으로 돌아가 로그인을 완료해주세요");
          Navigate("/");
        } else {
          alert("Failed to sign up");
        }
      }
    );
  };
  return (
    <div
      className="form-container sign-up-container"
      style={{ display: "inline" }}
    >
      <form className="form" onSubmit={onSubmitHandler}>
        <h4 className="form-title">회원가입</h4>
        <input
          type="text"
          placeholder="이름"
          value={Name}
          onChange={onNameHandler}
        />
        <input
          type="email"
          placeholder="이메일"
          value={Email}
          onChange={onEmailHandler}
        />
        <div>
          <button className="auth_email" onClick={sendEmail}>
            {" "}
            전송{" "}
          </button>
          <p className="auth_alert"> 이메일 인증을 해주세요 </p>
        </div>
        <input
          type="text"
          placeholder="인증번호를 입력해주세요"
          value={Auth}
          onChange={onAuthHandler}
        />
        <input
          type="password"
          placeholder="패스워드"
          value={Password}
          onChange={onPasswordHandler}
        />
        <input
          type="password"
          placeholder="패스워드 확인"
          value={ConfirmPassword}
          onChange={onConfirmPasswordHandler}
        />
        <button className="form-button">sign up</button>
      </form>
    </div>
  );
}

export default RegisterPage;
