import dotenv from "dotenv";
import React, { useState, useRef } from "react";
import { PasswordChange } from "./PasswordChange";
import { ProfileChange } from "./ProfileChange";
import "../../css/MyProfile.css";
import { useDispatch } from "react-redux";
import { myInfo, nameChange } from "../../../_actions/user_action";
import { useEffect } from "react";
import Sidebar from "../SideBar/SideBar";

function MyProfile() {
  const dispatch = useDispatch<any>();
  const [Image, setImage] = useState<any>(
    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
  );

  const fileInput = useRef(null);
  const [ImgModalon, setImgModalon] = useState(false);
  const [PassModalon, setPassModalon] = useState(false);
  const [firstName, setfirstName] = useState("Lee");
  const [lastName, setlastName] = useState("jiyoon");
  const [Name, setName] = useState<any>();
  const [Email, setEmail] = useState<any>();
  var token_name = "x_auth";
  token_name = token_name + "=";
  var cookieData = document.cookie;
  var start = cookieData.indexOf(token_name);
  let token = "";

  useEffect(() => {
    if (start != -1) {
      start += token_name.length;
      var end = cookieData.indexOf(";", start);
      if (end == -1) end = cookieData.length;
      token = cookieData.substring(start, end);
    }
    console.log("tototo", token);
    let body = {
      token: token,
    };

    dispatch(myInfo(body)).then(
      (response: {
        payload: { Success: any; email: String; name: String; profile: String };
      }) => {
        if (response.payload.Success) {
          setEmail(response.payload.email);
          setName(response.payload.name);
          if (response.payload.profile === "") {
            setImage(
              "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
            );
          } else {
            setImage(
              "https://weblabeling.s3.ap-northeast-2.amazonaws.com/profile/" +
                response.payload.profile
            );
          }
        } else {
          alert("실패");
        }
      }
    );
  }, []);

  const getData = (Image: string) => {
    setImage(Image);
  };
  const onfirstname = (e: any) => {
    setName(e.target.value);
  };

  const Trim = () => {
    let body = {
      name: Name,
      email: Email,
    };

    if (firstName.length < 1) {
      alert("이름을 입력해주세요");
    } else {
      dispatch(nameChange(body)).then(
        (response: { payload: { Success: any } }) => {
          if (response.payload.Success) {
            alert("저장되었습니다.");
          } else {
            alert("실패");
          }
        }
      );
    }
  };
  return (
    <>
      <nav className="sidebar">
        <Sidebar></Sidebar>
      </nav>
      <ProfileChange
        show={ImgModalon}
        onHide={() => setImgModalon(false)}
        Image={Image}
        getData={getData}
      />
      <PasswordChange show={PassModalon} onHide={() => setPassModalon(false)} />
      <div className="header">
        <h4 className="profile_subject">My Profile</h4>
      </div>
      <div className="profile_view">
        <div>
          <img
            className="profile_img"
            src={Image}
            onClick={() => setImgModalon(true)}
          />
        </div>

        <div className="user_info">
          <h4>Name</h4>
          <hr />
          <h5>{Name}</h5>
          <hr />
          <h4>Email</h4>
          <h5>{Email}</h5>
        </div>

        <div className="wrapper">
          <h4>Name Change</h4>
          <input
            type="text"
            className="firstName"
            value={Name}
            onChange={onfirstname}
          ></input>
          <button className="save_button" onClick={Trim}>
            {" "}
            Save
          </button>
        </div>

        <div className="Password">
          {
            // <h4>Password</h4>
            // <p>You can set a new Password</p>
            // <button className='pass_btn' onClick={()=>setPassModalon(true)}>Change Password</button>
          }
        </div>
      </div>
    </>
  );
}

export default MyProfile;
