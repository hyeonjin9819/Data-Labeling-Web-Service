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
import TeamView from './components/views/TeamView/TeamView';
import MyProfile from './components/views/MyProfile/MyProfile';
function App(){
  return (
    <Router>
     <div>
       <Routes>
        <Route path = "/" element = {<Total/>}/>
        <Route path="/ProjectPage" element = {<ProjectPage/>}/>
        <Route path="/TeamView" element = {<TeamView/>}/>
        <Route path="/MyProfile" element = {<MyProfile/>}/>
       </Routes>
     </div>
   </Router>
  );
}

export default App;
