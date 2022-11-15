import dotenv from "dotenv";
import multiDownload from "./multiDownload";
import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import AWS from "aws-sdk";
import { useNavigate } from "react-router-dom";
import Sidebar from "../SideBar/SideBar";
import "../../css/DataPage.css";
import logout from "../../images/logout.png";
import { useDispatch } from "react-redux";
import {
  data_delete,
  imageList,
  projectImg,
  python,
  show_Ing,
  update_Ing,
} from "../../../_actions/user_action";
import { message } from "antd";
import Labeling_tool from "../labeltool/Labeling_tool";
import Pagenation from "../Pagenation/Pagenation";
import { response } from "express";
import ClassAddPage from "../ClassAddPage/ClassAddPage";

const ACCESS_KEY = process.env.REACT_APP_GITHUB_ACCESS_KEY;
const SECRET_ACCESS_KEY = process.env.REACT_APP_GITHUB_SECRET_ACCESS_KEY;
const REGION = process.env.REACT_APP_REGION;
const S3_BUCKET = process.env.REACT_APP_GITHUB_S3_BUCKET;
const Mongoose_URI = process.env.REACT_APP_GITHUB_Mongoose_URI;

const DataPage = () => {
  // console.log(process.env.ACCESS_KEY+'kk')
  const dispatch = useDispatch<any>();
  const { projectId, dataId, label } = useParams(); //라우팅 처리용 함수?(현진쓰)
  console.log("project", projectId);
  console.log("id", dataId);
  //const [imageurl, setImageurl] = seState("");
  const [idx, setidx] = useState(dataId);
  const [_id, set_id] = useState<number>(0);
  const [Imagefilename, setImagefilename] = useState([]); // 다중 이미지 선택 배열로 바꿔서 업로드한 이미지 이름들 저장하면 될듯?
  //테이블 데이터 받아주는 배열
  const [data_list, setData] = useState<any>([]);
  const [fileImage, setFileImage] = useState<any>([]);
  const [fileImage2, setFileImage2] = useState<any>([]);
  const imgName = [...data_list];
  const nextId = data_list.length; // list 개수
  const nowImageUrl = [...fileImage];
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(5);
  const [ingState, setIngState] = useState<String>("진행 중");
  const [ingStateList, setIngStateList] = useState<any>([
    {
      ingState: null,
    },
  ]);

  const indexOfLast = currentPage * postsPerPage;
  const indexOfFirst = indexOfLast - postsPerPage;

  const [clsModal, setclsModal] = useState(false);

  // 모달에서 쓸거면 이 함수를 모달 쪽으로 이동
  //    const pythonClick = () =>{
  //      //인덱스 배열 어캐 받아오노

  //      fileImage2.map((data : any)=>{

  //       let body = {
  //         data : data,
  //         projectId : projectId,

  //       }
  //       dispatch(python(body))
  //       .then((response: { payload: {pythons: String}; }) => {
  //       console.log('python', response.payload.pythons)
  //    })
  //   })
  // }

  AWS.config.update({
    accessKeyId: ACCESS_KEY,
    secretAccessKey: SECRET_ACCESS_KEY,
  });

  const myBucket = new AWS.S3({
    params: { Bucket: S3_BUCKET },
    region: REGION,
  });

  let body = {
    _id: idx,
    label: label,
  };

  useEffect(() => {
    dispatch(imageList(body)).then(
      (response: {
        payload: { Success: any; imagelist: any; imageobject: any };
      }) => {
        if (response.payload.Success) {
          // alert("이미지 업로드 성공++" + response.payload.imagelist);
          console.log(response.payload.imagelist);
          setData(response.payload.imagelist);
          // setData(imgName)
          for (let ids = 0; ids < response.payload.imagelist.length; ids++) {
            nowImageUrl.push(
              "https://weblabeling.s3.ap-northeast-2.amazonaws.com/" +
                label +
                "/" +
                projectId +
                "/" +
                response.payload.imagelist[ids].name +
                ".jpeg"
            );
          }
          setFileImage(nowImageUrl); // 서버에서 가져온 이미지 저장
        } else {
          // alert("이미지 가져오기 실패");
        }
      }
    );
  }, [idx]);
  // 이미지 뽑아오기

  const timer = (ms: number) => new Promise((res) => setTimeout(res, ms));

  async function ImageUpload(e: any) {
    // 초기 업로드 .csv 필드 값
    const file = e.target.files;

    for (let i = 0; i < file.length + 1; i++) {
      if (i !== file.length) {
        let name = file[i].name.toString();
        let url = URL.createObjectURL(file[i]);
        let url2: String = url.toString().substr(27);
        let params = {
          ACL: "public-read",
          Body: file[i],
          Bucket: S3_BUCKET,
          Key: label + "/" + projectId + "/" + url2 + ".jpeg",
        };

        const params2 = {
          ACL: "public-read",
          Body: "",
          Bucket: S3_BUCKET,
          Key: label + "/" + projectId + "/labels/" + url2 + ".csv",
        };

        myBucket.putObject(params).send((err) => {
          if (err) {
            console.log(err);
            return err;
          } else {
            nowImageUrl.push(
              "https://weblabeling.s3.ap-northeast-2.amazonaws.com/" +
                label +
                "/" +
                projectId +
                "/" +
                url2 +
                ".jpeg"
            );
            setFileImage(nowImageUrl);
          }
        });
        myBucket.putObject(params2).send((err) => {
          if (err) {
            console.log(err);
            return err;
          }
        });

        imgName.push({
          project_id: idx,
          name: url2,
          state: false,
          states: "작업 중",
          _id: 0,
          label: "",
          width: 0,
          height: 0,
          x: 0,
          y: 0,
          labels: label,
          ing: ingState,
          data_id: nextId,
        });
        await timer(100);
      } else {
        break;
      }
    }

    dispatch(projectImg(imgName)).then(
      (response: { payload: { success: any; message: any } }) => {
        if (response.payload.success) {
          setData(data_list.concat(imgName));
        } else {
          alert("이미지 업로드 실패");
        }
      }
    );

    e.target.value = ""; //중복 파일 초기화를 위한 처리
  }

  imgName.splice(0);
  const navigate = useNavigate();
  const handleRowClick = (event1: any) => {
    navigate(`/DataPage/${event1}/${idx}/${projectId}/${label}`);
  };

  const onClickHandler = () => {
    axios.get("/api/users/logout").then((response) => {
      if (response.data.success) {
        console.log("logout");
        navigate("/");
      } else {
        alert("Logout Failed");
      }
    });
  };
  const currentPosts = (tmp: any) => {
    let currentPosts = 0;
    currentPosts = tmp.slice(indexOfFirst, indexOfLast);
    return currentPosts;
  };

  const onCheck = (e: any) => {
    //개별 체크박스를 선택, 해제 시켜주는 함수
    if (e.target.checked) {
      e.target.checked = true;
      // 계속 누적
      fileImage2.push(fileImage[e.target.id]);
      //setFileImage2((fileImage2: any)  => [...fileImage2, fileImage[e.target.id]]
    } else {
      e.target.checked = false;
      setFileImage2(
        fileImage2.filter((value: any) => value !== fileImage[e.target.id])
      );
      console.log("삭제" + fileImage2);
      console.log("삭제2" + e.target.id);
    }
  };

  const aa = (image: any) => {
    let aa = [];
    for (let i = 0; i < image.length; i++) {
      const I = image[i].toString().substr(image[i].length - 41, 36);
      const unicorn = `https://weblabeling.s3.ap-northeast-2.amazonaws.com/${label}/${projectId}/labels/${I}.csv`;
      const goat = `https://weblabeling.s3.ap-northeast-2.amazonaws.com/${label}/${projectId}/${I}.jpeg`;
      aa.push(unicorn);
      aa.push(goat);
    }
    multiDownload(aa);
  };

  const onCheckAll = (e: any) => {
    //모든 체크박스를 선택, 해제 시켜주는 함수
    var ele: any = document.getElementsByClassName("check");
    if (e.target.checked) {
      for (var i = 0; i < ele.length; i++) {
        ele[i].checked = true;
      }
    } else {
      for (var i = 0; i < ele.length; i++) {
        ele[i].checked = false;
      }
    }
  };

  const onDelete = () => {
    var chk: any = document.getElementsByClassName("check");
    var th: any = document.getElementById("datas"); //테이블 행 갯수 5

    console.log("테이블 행 길이1:", th.rows.length);
    for (var i = th.rows.length - 1; i >= 0; i--) {
      console.log("테이블 행 길이2:", i);
      console.log(chk[i]);
      if (chk[i].checked) {
        console.log(chk[i].id);
        console.log(data_list[i].name);
        chk[i].parentElement.parentElement.remove();
        let body = {
          _id: idx,
          label: label,
          name: data_list[i].name,
          projectId: projectId,
        };
        // 사진 이름을 비교해서 삭제
        dispatch(data_delete(body)).then(
          (response: { payload: { success: any; message: any } }) => {
            if (response.payload.success) {
              alert(response.payload.success);
            } else {
              alert("이미지 업로드 실패");
            }
          }
        );
      }
    }
  };

  const setStatus = () => {
    for (let i = 0; i < data_list.length; i++) {
      var state: boolean = data_list[i].state;
      state = true;
    }
  };
  // 작업상태 빼오는 파트 (수정)
  useEffect(() => {
    let bodys = {
      key: idx + "_",
    };
    dispatch(show_Ing(bodys)).then(
      (response: { payload: { Success: any; message: any } }) => {
        if (response.payload.Success) {
          const ingState = response.payload.message;
          console.log(response.payload.message);

          //console.log(ingStateList)
        }
      }
    );
  }, []);

  return (
    <div>
      <header>
        <title>메인뷰 페이지</title>
      </header>
      <nav className="sidebar">
        <Sidebar></Sidebar>
      </nav>
      <body className="view" style={{ display: "fixed" }}>
        <div className="view_header">
          <h2 className="dashboard">'{projectId}' 데이터 리스트</h2>
          <button className="label_dl" onClick={() => aa(fileImage2)}>
            다운로드
          </button>
          <button className="delete" onClick={() => onDelete()}>
            삭제
          </button>
          {/* <button onClick={ ()=>pythonClick}>python</button> */}
          <button className="label_class" onClick={() => setclsModal(true)}>
            클래스 설정
          </button>
          <ClassAddPage
            show={clsModal}
            nextId={nextId}
            onHide={() => setclsModal(false)}
            projectId={projectId}
            fileImage2={fileImage2}
          ></ClassAddPage>
          <label htmlFor="data" className="addData">
            {" "}
            <p className="addText">이미지 업로드</p>
            {/*이상 생기면 아래 button 복구..*/}
            <input
              multiple
              id="data"
              className="inputHide"
              type="file"
              accept="image/*"
              onChange={ImageUpload}
            ></input>
          </label>

          {/* <h3 className="welcome">원우연님 환영합니다</h3> */}
        </div>
        <div className="tables">
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>체크 박스</th>
                <th>번호</th>
                <th>이미지 썸네일</th>
                <th>데이터 명</th>
                <th>진행 사항</th>
              </tr>
            </thead>
            <tbody id="datas">
              {currentPosts(
                data_list.map(
                  (
                    data: {
                      name: String;
                      data_id: any;
                      status: String;
                      ing: String;
                    },
                    num: number
                  ) => (
                    <tr key={num}>
                      <td key={num}>
                        <input
                          id={num.toString()}
                          className="check"
                          type="checkbox"
                          onChange={onCheck}
                        ></input>
                      </td>
                      <td key={num} onClick={() => handleRowClick(data.name)}>
                        {num + 1}
                      </td>
                      <td key={num} onClick={() => handleRowClick(data.name)}>
                        {fileImage && (
                          <img className="imgThumb" src={fileImage[num]} />
                        )}
                      </td>
                      <td key={num} onClick={() => handleRowClick(data.name)}>
                        {data.name}
                      </td>
                      <td key={num} onClick={() => handleRowClick(data.name)}>
                        {data.ing}
                      </td>
                    </tr>
                  )
                )
              )}
            </tbody>
          </Table>
          <Pagenation
            postsPerPage={postsPerPage}
            totalPosts={data_list.length}
            paginate={setCurrentPage}
          ></Pagenation>
        </div>
      </body>
      <footer></footer>
    </div>
  );
};

export default DataPage;
