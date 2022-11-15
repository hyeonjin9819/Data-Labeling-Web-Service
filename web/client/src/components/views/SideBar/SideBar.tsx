import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../css/Sidebar.css";
import folder from "../../images/folder.png";
import data from "../../images/data.png";
import setting from "../../images/setting.png";
import user from "../../images/user.png";
import home from "../../images/home.png";
import circle_right from "../../images/circle-right.png";
import logout from "../../images/logout.png";
import axios from "axios";

function SideBar(props: any) {
  const [pr_name, setpr_name] = useState("프로젝트 1");
  const [Visible, setVisible] = useState(false);
  const [Visible2, setVisible2] = useState(false);

  const toggleNav = () => {
    setVisible((Visible) => !Visible);
  };

  const navigate = useNavigate();
  const onClickHandler = () => {
    axios.get("/api/users/logout").then((response) => {
      if (response.data.success) {
        console.log("logout");
        navigate("/");
      } else {
        alert("Logout Failed");
      }
    });
  };

  const toggleNav2 = () => {
    setVisible2((Visible2) => !Visible2);
  };

  const showMenu = () => {
    const auth = document.getElementsByClassName(
      "sidebar"
    ) as HTMLCollectionOf<HTMLElement>;
    // auth[0].style.display = "none";
    auth[0].style.width = "50px";
  };

  return (
    <div className="sidebar">
      <ul className="menu">
        <li className="list">
          <Link to="/TeamMainView">
            <button onClick={toggleNav2} className="btn">
              <img className="icon" src={user}></img>
              <p className="menu_name">팀</p>
            </button>
          </Link>
          <div className="sub_menu">
            <ul className={Visible2 ? "show - menu" : "hide-menu"}>
              {/* <Link to = "/TeamView">
        // <button className="sub_list">팀 1</button>
        // </Link>*/}
            </ul>
          </div>
        </li>
        <li className="list">
          <Link to="/ProjectPage">
            <button onClick={toggleNav} className="btn">
              {" "}
              <img className="icon" src={folder}></img>
              <p className="menu_name">프로젝트</p>
            </button>
          </Link>
        </li>

        <li className="list">
          <Link to="/MyProfile">
            <button className="btn">
              <img className="icon" src={setting}></img>
              <p className="menu_name">내 정보</p>
            </button>
          </Link>{" "}
          {/*작업용 임시 변경*/} {/* -> 다시 profile로 바꿈 (현진) */}
        </li>
      </ul>
      {/* 
      <li>
        <button className="btn" style = {{ marginTop : '20px' }} onClick = {onClickHandler}><img className="icon" src={logout}></img>로그아웃</button>
        </li> */}

      <button
        className="logout"
        style={{ marginTop: "20px" }}
        onClick={onClickHandler}
      >
        <img className="logout_img" src={logout}></img>
        <p className="logout_name">로그아웃</p>
      </button>

      {/* <img className="logout" src={logout}></img> */}
      {/* <button onClick={showMenu} className="fold_button">
        메뉴 버튼
      </button> */}
    </div>
  );
}

export default SideBar;
