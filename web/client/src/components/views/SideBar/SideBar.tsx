import React, { useEffect, useState } from 'react'
import {Link} from 'react-router-dom';
import  '../../css/Sidebar.css';
import folder from '../../images/folder.png';
import data from '../../images/data.png';
import setting from '../../images/setting.png';
import user from '../../images/user.png';
import home from '../../images/home.png';

function SideBar(props : any) {
    const [pr_name, setpr_name] = useState("프로젝트 1");
    const [Visible, setVisible] = useState(false);
    const [Visible2, setVisible2] = useState(false);

    const toggleNav = () => {
        setVisible(Visible=>!Visible);
    }

    const toggleNav2 = () => {
        setVisible2(Visible2=>!Visible2);
    }
    
    return (
    <div className="sidebar" >
    <ul className="menu">
    <li className="list" style = {{ marginTop : '20px' }}>
    <Link to = "/TeamMainView">
    <button onClick={toggleNav2} className="btn"><img className="icon" src = {user}></img>팀</button>
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
            <Link to = "/ProjectPage">
            <button onClick={toggleNav} className="btn" style = {{ marginTop : '20px' }}> <img className="icon" src = {folder}></img>프로젝트</button>
            </Link>
            <ul className={Visible ? "show - menu" : "hide-menu"}>
                <button className="sub_list">
                    { pr_name }
                </button>
            </ul>
        </li>
        <li className="list">
        <button className="btn"><img className="icon" src = {data}></img>데이터</button>
        </li>
       
        <li className="list">
        <Link to = "/MyProfile">
        <button className="btn"><img className="icon" src = {setting}></img>내 정보</button>
        </Link>
        </li>
    </ul>
    </div>
  )
}

export default SideBar