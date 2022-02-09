import React, {useState} from 'react';
import './App.css';
import Mainview from './pages/mainview/Pr_main';
import{BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Login from './pages/signs/Login';


function App() {
        const [user, setLoginUser] = useState({
            name :"",
            email:"",
            password:"",
            _id: ""
        });

        return (
    
            <div className="App">
                <Router>
                    <Routes>
                        <Route path ='/'
                         element = {user && user._id ? <Mainview setLoginUser={setLoginUser}/> : <Login setLoginUser = {setLoginUser}/>}/>
                    </Routes>
                </Router>

            </div>
        );
    }

export default App;
