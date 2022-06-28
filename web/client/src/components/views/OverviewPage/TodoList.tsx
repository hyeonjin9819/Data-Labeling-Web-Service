import React, { useEffect, useRef, useState } from "react";
import { Table } from "react-bootstrap";
import { setTextRange } from "typescript";
import Pagenation from "../Pagenation/Pagenation";
import "../../css/TodoList.css";
import { useDispatch } from "react-redux";
import {
  project_todo,
  todo_view,
  todo_deletes,
} from "../../../_actions/user_action";
import { ConfigurationServicePlaceholders } from "aws-sdk/lib/config_service_placeholders";
interface props {
  id: String;
  Id: any;
}
const TodoList = (props: props) => {
  const dispatch = useDispatch<any>();
  const { id, Id } = props;
  const [todo, setTodo] = useState("");

  const [todo_data, setTodo_data] = useState([]);
  //const [todo_delete, setTodo_delete] = useState([]);
  let todo_delete: [] = [];
  const inputRef = useRef(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(5);

  const indexOfLast = currentPage * postsPerPage;
  const indexOfFirst = indexOfLast - postsPerPage;

  const currentPosts = (tmp: any) => {
    let currentPosts = 0;
    currentPosts = tmp.slice(indexOfFirst, indexOfLast);
    return currentPosts;
  };
  let bodys = {
    id: id,
    Id: Id,
  };
  useEffect(() => {
    dispatch(todo_view(bodys)).then(
      (response: { payload: { Success: any; document: any } }) => {
        if (response.payload.Success) {
          // setTodo_data([response.payload.document])
          console.log(response.payload.document[0].users.length);
          console.log(response.payload.document[0].users[0].todo);

          for (let i = 0; i < response.payload.document[0].users.length; i++) {
            if (response.payload.document[0].users[i]._id === Number(Id)) {
              setTodo_data(response.payload.document[0].users[i].todo);
            }
          }
        }
      }
    );
  }, [id]);
  const onChangeTodo = (e: any) => {
    setTodo(e.target.value);
    console.log(todo);
  };

  const onEnterInput = (e: any) => {
    if (e.key == "Enter") onClickAdd();
  };
  let body = {
    id: id,
    Id: Id,
    todo: [todo],
  };

  const onClickAdd = () => {
    setTodo("");
    setTodo_data([...todo_data, todo]);
    inputRef.current.focus();

    dispatch(project_todo(body)).then(
      (response: { payload: { Success: any; id: number } }) => {
        if (response.payload.Success) {
        } else {
          alert("아이디 가져오기 실패");
        }
      }
    );
  };

  const onCheck = (e: any) => {
    //개별 체크박스를 선택, 해제 시켜주는 함수
    if (e.target.checked) {
      e.target.checked = true;
      console.log(e.target.checked);
    } else {
      e.target.checked = false;
      console.log(e.target.checked);
    }
  };

  const todoComplete = (num: any) => {
    var chk: any = document.getElementsByClassName("todo_checked");
    var th: any = document.getElementById("datas"); //테이블 행 갯수 5
    var elem: any = document.getElementById(num);

    console.log("테이블 행 길이1:", th.rows.length);
    for (var i = th.rows.length - 1; i >= 0; i--) {
      console.log("테이블 행 길이2:", i);
      console.log("체크박스 인덱스", chk[i]);
      console.log("텍스트 인덱스", elem[i]);
      if (chk[i].checked == true) {
        console.log(chk[i].id);
        elem.style.textDecoration = "line-through";
      }
    }
  };

  const todoDelete = (e: any) => {
    var chk: any = document.getElementsByClassName("todo_checked");
    var th: any = document.getElementById("datas"); //테이블 행 갯수 5

    for (var i = th.rows.length - 1; i >= 0; i--) {
      console.log("테이블 행 길이2:", i);
      console.log(chk[i]);
      if (chk[i].checked) {
        // setTodo_data([...todo_delete, chk[i].id])
        console.log(chk[i].id); // 배열로 넣어라 ?
        // todo_delete.concat(chk[i].id)

        dispatch(todo_deletes({ id: id, Id: Id, todo: [chk[i].id] })).then(
          (response: { payload: { Success: any } }) => {
            if (response.payload.Success) {
              console.log("삭제 성공");
            } else {
              console.log("삭제 no");
            }
          }
        );
        chk[i].parentElement.parentElement.remove();
      }
    }
  };

  return (
    <div>
      <h5 className="todoText">TODOList</h5>
      {/* <h5>할일 추가</h5> */}
      <input
        className="addTodo"
        type="text"
        value={todo}
        onChange={onChangeTodo}
        onKeyPress={onEnterInput}
        ref={inputRef}
        placeholder="할 일을 입력하세요."
      ></input>
      <button className="addTodoBtn" type="submit" onClick={onClickAdd}>
        추가
      </button>

      <button className="delTodobtn" onClick={todoDelete}>
        삭제
      </button>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>체크 박스</th>
            <th>할일 목록</th>
            <th>완료</th>
          </tr>
        </thead>

        <tbody id="datas">
          {currentPosts(
            todo_data.map((todo, num) =>
              todo.id !== null ? (
                <tr>
                  <td>
                    <input
                      id={todo.toString()}
                      className="todo_checked"
                      type="checkbox"
                      onChange={onCheck}
                    ></input>
                  </td>
                  <td id={num.toString()}>{todo_data[num]}</td>
                  <td>
                    <button
                      className="listBtn"
                      onClick={() => todoComplete(num.toString())}
                    >
                      완료
                    </button>
                  </td>
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
        totalPosts={todo_data.length}
        paginate={setCurrentPage}
      ></Pagenation>
    </div>
  );
};

export default TodoList;
