import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import MainViewPage from "./components/views/MainViewPage/MainView";
import LoginPage from "./components/views/LoginPage/LoginPage";
import Overlay from "./components/views/LoginPage/Overlay";
import Total from "./components/views/LoginPage/Total";
import RegisterPage from "./components/views/RegisterPage/RegisterPage";
import ProjectPage from "./components/views/ProjectPage/ProjectPage";
import TeamMainView from "./components/views/TeamMainView/TeamMainView";
import MyProfile from "./components/views/MyProfile/MyProfile";
import TeamView from "./components/views/TeamView/TeamView";
import DataPage from "./components/views/DataPage/DataPage";
import Labeling_tool from "./components/views/labeltool/Labeling_tool";
import LearnPage from "./components/views/LearnPage/LearnPage";
import CustomPage from "./components/views/LearnPage/CustomPage";
import OverviewPage from "./components/views/OverviewPage/OverviewPage";

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Total />} />
          <Route path="/ProjectPage" element={<ProjectPage />} />
          <Route path="/TeamMainView" element={<TeamMainView />} />
          <Route path="/MyProfile" element={<MyProfile />} />
          <Route path="/LearnPage" element={<LearnPage />} />
          <Route path="/OverviewPage/:id/:Id" element={<OverviewPage />} />
          <Route path="/CustomPage" element={<CustomPage />}></Route>

          {/* 프로젝트 리스트 동적 라우팅 */}
          <Route
            path="ProjectPage/:projectId/:dataId/:label"
            element={<DataPage />}
          />

          {/* 팀 리스트 동적 라우팅 */}
          <Route path="TeamMainView/:teamId/:idx" element={<TeamView />} />

          <Route
            path="DataPage/:imageId/:idx/:projectId/:label"
            element={<Labeling_tool />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
