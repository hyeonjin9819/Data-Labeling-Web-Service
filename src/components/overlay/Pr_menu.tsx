/*프로젝트 테이블을 만들어주는 타입스크립트 파일, 리액트 연결*/

import React, { Component } from 'react';
import square from './images/square.png';
import { Table } from 'react-bootstrap'; /*부트스트랩 테이블을 import해주는 명령어*/

class PjList extends Component {
  render(){
    return(
      <div>
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
          <tr className="table">
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
    </div>
    );
  }
}

export default PjList;