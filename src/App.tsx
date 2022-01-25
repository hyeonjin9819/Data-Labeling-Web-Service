/*컴포넌트들을 모아서 실행시켜주는 메인 app파일*/

import React, { Component } from 'react';
import './App.css';
import Header from './components/overlay/Header';
import Body from './components/overlay/Body';
import Sidebar from './components/overlay/Sidebar';
import Pr_menu from './components/overlay/Pr_menu';
import Page_list from './components/overlay/Page_list';
import SignUp from './SignUp';
import SignIn from './SignIn';
import Overlay from './Overlay';
import './bootstrap.min.css';

interface State {
  rightPanelActive: boolean,
}

/*class App extends Component<{}, State> {
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
*/
class App extends Component {
    render(){/*이 함수가 있어야 컴포넌트들이 웹페이지로 실행이 된다.*/
            return(
                    <div>
                    <Sidebar>
                        </Sidebar>
                            <Header>
                            </Header>
                                <Body>
                                </Body>
                            <Pr_menu>
                        </Pr_menu>
                    <Page_list>
                </Page_list>     
            </div>
        );
    }
}

export default App;
