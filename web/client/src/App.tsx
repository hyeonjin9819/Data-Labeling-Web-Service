import React from 'react';
import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Routes,Route,Link} from "react-router-dom";
import MainViewPage from './components/views/MainViewPage/MainView';
import LoginPage from './components/views/LoginPage/LoginPage';
import Overlay from './components/views/LoginPage/Overlay';
import Total from './components/views/LoginPage/Total';
import RegisterPage from './components/views/RegisterPage/RegisterPage';
import ProjectPage from './components/views/ProjectPage/ProjectPage';
import TeamMainView from './components/views/TeamMainView/TeamMainView';
import MyProfile from './components/views/MyProfile/MyProfile';
import TeamView from './components/views/TeamView/TeamView';
import DataPage from './components/views/DataPage/DataPage';
import Labeling_tool from './components/views/labeltool/Labeling_tool';



function App(){
  return (
    <Router>
     <div>
       <Routes>
        <Route path = "/" element = {<Total/>}/>
        <Route path="/ProjectPage" element = {<ProjectPage/>}/>
        <Route path="/TeamMainView" element = {<TeamMainView/>}/>
        <Route path="/MyProfile" element = {<MyProfile/>}/>
        {/* 프로젝트 리스트 동적 라우팅 */}
        <Route path = "ProjectPage/:projectId" element={<DataPage/>}/>
        {/* 팀 리스트 동적 라우팅 */}
        <Route path = "TeamMainView/:teamId" element={<TeamView/>}/>
        <Route path = "DataPage/:imageId" element={<Labeling_tool/>}/>
       </Routes>
     </div>
   </Router>

  );
}

export default App;