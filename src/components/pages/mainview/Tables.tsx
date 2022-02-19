import React, { Component } from 'react';
import {Table} from'react-bootstrap';

class Tables extends Component {
    render() {
        return (
            <div >
            <header>
                <title>레이블링 페이지</title>
                </header>
                    <body>
                        <h1>Labeling page</h1>
                    <Table striped bordered hover>
                            <thead>
                                <tr>
                                <th>프로젝트</th>
                                <th>프로젝트 명</th>
                                <th>팀 명</th>
                                <th>내 등급</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                </tr>
                            </tbody>
                            </Table>
                        </body> 
                    <footer>
                </footer>
        </div>
        );
    }
}

export default Tables;