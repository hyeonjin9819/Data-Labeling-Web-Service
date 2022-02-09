import React, { Component} from 'react';
import '../../css/Pr_main.css';
import Body from './Body';
import Sidebar from '../../navs/Sidebar';
import profile from '../../images/profile.png';
import bell from '../../images/bell.png';
import square from '../../images/square.png';
import { Table } from 'react-bootstrap';

class Pr_main extends Component {
    render() {
        return(
            <div>
              <nav>
                <Sidebar></Sidebar>
              </nav>
                <head className="pr_header">   
                    <div className="pr_pages">
                        <h5>프로젝트 페이지</h5>
                    </div>
                  <ul>
                    <li className="h_img">
                  <a href="#"><img src={bell}></img></a> 
                    </li>
                    <li className="h_img">
                    <a href="#"><img src={profile}></img></a>
                    </li>
                  </ul>
                </head>
                    <body className="pr_tables">
                        <Body>
                        </Body>
                          <Table responsive="sm">
                          <thead>
                            <tr>
                              <th>#</th>
                              <th>프로젝트 이름</th>
                              <th>레이블링 기법</th>
                              <th>레이블링 횟수</th>
                              <th> 프로젝트 생성 날짜</th>
                              <th>마지막 수정일</th>
                              <th></th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr className="pr_table">
                              <td>1</td>
                              <td>프로젝트1</td>
                              <td><img src={square}></img></td>
                              <td>1</td>
                              <td>2022.01.23</td>
                              <td>2일 전</td>
                              <td></td>
                            </tr>
                            <tr>
                              <td>2</td>
                              <td>Table cell</td>
                              <td>Table cell</td>
                              <td>Table cell</td>
                              <td>Table cell</td>
                              <td>Table cell</td>
                              <td></td>
                            </tr>
                            <tr>
                              <td>3</td>
                              <td>Table cell</td>
                              <td>Table cell</td>
                              <td>Table cell</td>
                              <td>Table cell</td>
                              <td>Table cell</td>
                              <td></td>
                            </tr>
                          </tbody>
                        </Table>
                    </body>
                    <footer>
                        <div className="pr_navs">
                            <ul className="pr_pagenation">
                              <li className="page_btn"><a href="#" className="first">처음 페이지</a></li>
                              <li className="page_btn"><a href="#" className="arrow_left">\\</a></li>
                              <li className="page_btn"><a href="#" className="cur_num">1</a></li>
                              <li className="page_btn"><a href="#" className="num">2</a></li>
                              <li className="page_btn"><a href="#" className="num">3</a></li>
                              <li className="page_btn"><a href="#" className="num">4</a></li>
                              <li className="page_btn"><a href="#" className="num">5</a></li>
                              <li className="page_btn"><a href="#" className="num">6</a></li>
                              <li className="page_btn"><a href="#" className="num">7</a></li>
                              <li className="page_btn"><a href="#" className="num">8</a></li>
                              <li className="page_btn"><a href="#" className="num">9</a></li>
                              <li className="page_btn"><a href="#" className="arrrow_right">//</a></li>
                              <li className="page_btn"><a href="#" className="last">끝 페이지</a></li>
                            </ul>
                        </div>
                    </footer>
            </div>
        );
    }
}

export default Pr_main;