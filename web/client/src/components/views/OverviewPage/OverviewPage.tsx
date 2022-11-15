import React, { useState } from "react";
import Sidebar from "../SideBar/SideBar";
import "../../css/OverviewPage.css";
import { Chart } from "./Chart";
import { Table } from "react-bootstrap";
import Pagenation from "../Pagenation/Pagenation";
import NoticeAdd from "./NoticeAdd";
import Notice from "./Notice";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import MemberList from "./MemberList";
import TodoList from "./TodoList";
const OverviewPage = () => {
  const dispatch = useDispatch<any>();
  const { id, Id } = useParams();
  const [dashboard] = useState("오버뷰 페이지");
  const [user_name] = useState("기본 이름");

  return (
    <div>
      <nav className="sidebar">
        <Sidebar></Sidebar>
      </nav>

      <div className="overview_header">
        <h2 className="headerText">OVERVIEW</h2>
        <hr></hr>
      </div>

      <div className="overview_frame">
        <header>
          <title>오버뷰 페이지</title>
        </header>

        <div className="overview_alert">
          <Notice id={id} />
        </div>

        <div className="overview_alert2">
          <TodoList id={id} Id={Id}></TodoList>
        </div>

        <div className="overview_alert3">
          <Chart id={id}></Chart>
        </div>

        <div className="overview_alert4">
          <MemberList id={id}></MemberList>
          {/*멤버 역할x, 그냥 멤버 리스트만 출력*/}
        </div>
      </div>
    </div>
  );
};

export default OverviewPage;
