/*컴포넌트들을 모아서 실행시켜주는 메인 app파일*/

import React, { Component, ReactNode } from 'react';
import {BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './App.css';
import Pr_add from './components/pages/mainview/Pr_add';
import SignUp from './components/pages/signs/SignUp';
import SignIn from './components/pages/signs/SignIn';
import Overlay from './components/pages/signs/Overlay';
import Pr_main from './components/pages/mainview/Pr_main';
import Mainview from './components/pages/mainview/Mainview';
import './bootstrap.min.css';
import Teamview from './components/pages/mainview/Teamview';

interface State {
  rightPanelActive: boolean,
}

/*로그인 페이지 컴포넌트 및 앱파일*/
/*
class App extends Component<{}, State> {
  constructor() {
      // @ts-ignore
      super();
      this.state = {
          rightPanelActive: false,
      }
  }

  handleClickSignUpButton = () => this.setState({
      rightPanelActive: true,
  });

  handleClickSignInButton = () => this.setState({
      rightPanelActive: false,
  });

  render() {
      const { handleClickSignUpButton, handleClickSignInButton } = this;
      const { rightPanelActive } = this.state;
      
      return (
          <>
          <div className="App">
              <div  className={`container ${rightPanelActive ? `right-panel-active` : ``}`}id="container">
                    <SignUp/>
                  <SignIn/>
                  <Overlay
                      handleClickSignInButton={handleClickSignInButton}
                      handleClickSignUpButton={handleClickSignUpButton}
                  />
              </div>
            </div>

          </>
      );
  }
}
export default App;
*/
/*
class App extends Component {
    render(){
            return(
            <div>
                  <Sidebar>
                        </Sidebar>
                        <Pr_main>
                        </Pr_main>         
            </div>
        );
    }
}

export default App;
*/

/*
<BrowserRouter>
<Routes>
<Route path='/main' element={<Pr_main/>} />
</Routes>
</BrowserRouter>
*/


class App extends Component {
    render(){
            return(
            <div>
              <Router>
                  <Routes>
                      <Route path ="/" element = {<Mainview/>}/>
                      <Route path="/Pr_main" element = {<Pr_main/>}/>
                      <Route path="/Teamview" element={<Teamview/>}></Route>
                  </Routes>
              </Router>        
            </div>
        );
    }
}

export default App;
