import React, { Component, useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { project_member } from "../../../_actions/user_action";
import Pagenation from "../Pagenation/Pagenation";
import '../../css/OverviewPage.css';

interface props {
  id: String;
}
const MemberList = (props: props) => {
  const { id } = props;
  const dispatch = useDispatch<any>();
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(5);

  const indexOfLast = currentPage * postsPerPage;
  const indexOfFirst = indexOfLast - postsPerPage;
  const currentPosts = (tmp: any) => {
    let currentPosts = 0;
    currentPosts = tmp.slice(indexOfFirst, indexOfLast);
    return currentPosts;
  };

  const left = () => {
    console.log("테스트", indexOfFirst);
    return indexOfFirst - 1;
  };

  const [member_data, setMember_data] = useState([
    {
      id: null,
      name: null,
    },
  ]);

  let body = {
    id: id
  };
  useEffect(() => {
    dispatch(project_member(body))
    .then((response: { payload: { success: any; project_users: any } }) => {
        console.log("member_check" + response.payload.project_users.length);
        for (let i = 0; i < response.payload.project_users.length; i++) {
          console.log(response.payload.project_users[i].name);
          const member = {
            id: i + 1,
            name: response.payload.project_users[i].name,
          };
          setMember_data((memberData: any) => [...memberData, member]);
        }
      }
    );
  }, [id]);
  return (
    <div>
      <h3 className="titleH3">Member List</h3>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>번호</th>
            <th>이름</th>
          </tr>
        </thead>

        <tbody>
          {currentPosts(
            member_data.map((data) =>
              data.id !== null ? (
                <tr>
                  <td>{data.id}</td>
                  <td>{data.name}</td>
                </tr>
              ) : (
                <tr></tr>
              )
            )
          )}
        </tbody>
      </Table>
      {/* <button onClick={left}>테스트</button> */}
      <Pagenation
        postsPerPage={postsPerPage}
        totalPosts={member_data.length}
        paginate={setCurrentPage}
      ></Pagenation>
    </div>
  );
};

export default MemberList;
