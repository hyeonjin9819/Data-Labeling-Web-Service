import React, {
  useRef,
  useEffect,
  useState,
  useImperativeHandle,
  forwardRef,
  ChangeEvent,
} from "react";
import { CloseButton } from "react-bootstrap";
import { createUseStyles } from "react-jss";
import { v4 as uuid } from "uuid";
import BBoxSelector from "../BBoxSelector";
import LabelBox from "../LabelBox";
import "../../css/Labeling_tool.css";
import Tool_menu from "../toolmenu/Tool_menu";
import { Link, useParams, useNavigate } from "react-router-dom";
import draw from "../../images/draw.png";
import save from "../../images/save.png";
import Polygon from "../Polygon/Polygon";
import "../../css/tool_menu.css";
import DataPage from "../DataPage/DataPage";
import { useDispatch } from "react-redux";
import {
  commit_message,
  datadraw,
  dataTxt,
  imageList,
  myInfo,
  show_message,
  update_Ing,
} from "../../../_actions/user_action";
import { NumberList } from "aws-sdk/clients/iot";
import { IMessage } from "./LabelInterface";
import { Table } from "react-bootstrap";
import Pagenation from "../Pagenation/Pagenation";

export type EntryType = {
  // 라벨링 시 출력되는 데이터를 담는 곳
  id: string;
  x: number; //left
  y: number; // top
  width: number;
  height: number;
  label: string;
  index: any;
};

const useStyles = createUseStyles({
  // react-jss 사용
  bBoxAnnotator: {
    cursor: "crosshair",
    // 사진에 마우스를 두게 되면 십자선 커서로 바뀜
  },
  imageFrame: {
    // 사진 기본 스타일
    position: "relative",
    backgroundSize: "100%",
  },
});
type Props = {
  // 타입 정의
  imageId: any;
  url: string; // 사진 경로
  inputMethod: String; // 레이블링 이름 메소드 선택
  labels?: string[]; // 라벨 이름 타입
  onChange: (entries: EntryType[]) => void; // left, top, width, height, label 값을 가진 EntryType
  borderWidth?: number; // 바운딩 박스 테두리 두께
  setlabels?: any;
  saveFun: () => void;
  idx: any;
  setaddlabel?: any;
  addlabel?: any;
  label?: any;
  projectId?: any;
};

const BBoxAnnotator = React.forwardRef<any, Props>(
  (
    {
      imageId,
      idx,
      url,
      borderWidth = 2,
      inputMethod,
      labels,
      onChange,
      setlabels,
      saveFun,
      setaddlabel,
      addlabel,
      projectId,
      label,
    },
    ref
  ) => {
    const dispatch = useDispatch<any>();

    const [number, setnumber] = useState<number>(0);
    const [multiplier, setMultiplier] = useState(1);
    const [user_Width, setuser_Width] = useState<any>(window.innerWidth);
    const [user_Heigth, setuser_Height] = useState<any>(window.innerHeight);
    const [img_width, setImg_width] = useState<any>(0);
    const [img_height, setImg_height] = useState<any>(0);
    const bBoxAnnotatorRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLDivElement>(null);
    const labelInputRef = useRef<HTMLDivElement>(null);
    const labelClickRef = useRef<any>([]);
    const maxHeigth = inputRef.current?.clientHeight || 1;
    const [Id, setId] = useState<String>("");
    const [labelStyle, setLabelStyle] = useState<{
      color?: String;
      id?: Number;
    }>({});
    // 업로드 이미지 스타일
    // 진행 중, 레이블링 완료
    const [ingState, setIngState] = useState<String>("진행 중");
    const [message, setMessage] = useState<string>(""); // 커밋 메시지
    const [messageUser, setMessageUser] = useState<string>("김현진"); // 커밋 메시지 작성자
    const navigate = useNavigate();

    //const [messageList, setMessageList] = useState<IMessage[]>([]);
    const [messageList, setMessageList] = useState<any>([
      {
        message: null,
        messageUser: null,
      },
    ]);

    const [commitName] = [...messageList];
    const nextId = messageList.length;
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage, setPostsPerPage] = useState(6);

    const [MeCurrentPage, setMeCurrentPage] = useState(1);
    const [MePostPerPage, setMePostPerPage] = useState(3);

    const listOfLast = currentPage * postsPerPage;
    const listOfFirst = listOfLast - postsPerPage;

    const messageOfLast = MeCurrentPage * MePostPerPage;
    const messageOfFirst = messageOfLast - MePostPerPage;

    const currentPosts = (tmp: any) => {
      let currentPosts = 0;
      currentPosts = tmp.slice(listOfFirst, listOfLast);
      return currentPosts;
    };

    const MeCurrentPosts = (tmp: any) => {
      let MeCurrentPosts = 0;
      MeCurrentPosts = tmp.slice(messageOfFirst, messageOfLast);
      return MeCurrentPosts;
    };

    const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
      if (event.target.name === "message") {
        setMessage(event.target.value);
      }
    };

    var token_name = "x_auth";
    token_name = token_name + "=";
    var cookieData = document.cookie;
    var start = cookieData.indexOf(token_name);
    let token = "";
    if (start != -1) {
      start += token_name.length;
      var end = cookieData.indexOf(";", start);
      if (end == -1) end = cookieData.length;
      token = cookieData.substring(start, end);
    }
    let body = {
      token: token,
    };

    useEffect(() => {
      dispatch(myInfo(body)).then(
        (response: { payload: { Success: any; name: any } }) => {
          if (response.payload.Success) {
            setMessageUser(response.payload.name);
            console.log("id값", response.payload.name);
          } else {
            alert("아이디 가져오기 실패");
          }
        }
      );
    }, [Id]);
    let bodys = { id: Id };
    const addMesage = (): void => {
      const newMessage = { messageName: message, messageUser: messageUser }; // 원래 messageUser
      setMessageList([...messageList, newMessage]);
      console.log(messageList);
      setMessage("");
      let bodys = {
        key: idx + "_" + imageId,
        message: message,
        user_name: messageUser, // 원래 messageUser
        data_id: imageId, // 데이터 id 들어가야함, 원래 2였음
        idx: idx, // 프로젝트 id
        _id: messageList.length - 1, // 메시지의 갯수 -> 인덱스
      };
      dispatch(commit_message(bodys)).then(
        (response: { payload: { success: any; datas: any } }) => {
          if (response.payload.success) {
            alert("업로드 성공");
          } else {
            alert("실패");
          }
        }
      );
    };

    useEffect(() => {
      let bodys = {
        key: idx + "_" + imageId,
        message: message,
        user_name: messageUser, // 원래 messageUser
        data_id: imageId, // 데이터 id 들어가야함, 원래 2였음
        idx: idx, // 프로젝트 id
        _id: messageList.length - 1, // 메시지의 갯수 -> 인덱스
      };
      dispatch(show_message(bodys)).then(
        (response: { payload: { Success: any; message: any } }) => {
          if (response.payload.Success) {
            const message = response.payload.message.message;
            console.log(response.payload.message.message);
            for (var i = 0; i < message.length; i++) {
              const newMessage = {
                messageName: message[i].message,
                messageUser: message[i].user_name,
              }; // 원래 messageUser
              setMessageList((messageList: any) => [
                ...messageList,
                newMessage,
              ]);
            }
          }
        }
      );
    }, []);

    const buttonClick = () => {
      if (messageList.length < 0) {
        alert("커밋 메시지 입력이 필요합니다!");
      } else {
        let bodys = {
          test: 1,
          data_id: imageId, // 데이터 id 들어가야함, 원래 2였음
          idx: idx, // 프로젝트 id
          label: label,
        };
        dispatch(update_Ing(bodys)).then(
          (response: { payload: { success: any; datas: any } }) => {
            if (response.payload.success) {
              alert("업로드 성공");
            } else {
              alert("실패");
            }
          }
        );
        alert("레이블링 완료!");
        navigate(`/ProjectPage/${projectId}/${idx}/${label}`);
        window.location.reload();
      }
    };
    // React.forwardRef : 부모 컴포넌트로부터 하위 컴포넌트로 ref를 전달할 수 있다.
    // 전달받은 ref를 html 요소의 속성으로 넘겨줌으로써 함수 컴포넌트 역시 ref를 통한 제어가 가능해진다.
    window.onresize = function (event) {
      setuser_Width(window.innerWidth);
      setuser_Height(window.innerHeight);
      console.log("size확인 ", user_Heigth);
    };
    const [labelTool, setlabelTool] = useState<any>(inputMethod);
    let [tool, settool] = useState("bbox");

    const changeOn = (to: String) => {
      setlabelTool(to);
    };
    const changetool = (to: string) => {
      settool(to);
    };

    const classes = useStyles();
    const [pointer, setPointer] = useState<{ x: number; y: number } | null>(
      null
    );
    const [offset, setOffset] = useState<{ x: number; y: number } | null>(null);
    const [showCloseButton, setshowCloseButton] = useState<boolean>();
    const [entries, setEntries] = useState<
      ({
        id: string;
        showCloseButton: boolean;
      } & EntryType)[]
    >([]);

    const [entries2, setEntries2] = useState<
      ({
        id: string;
        showCloseButton: boolean;
      } & EntryType)[]
    >([]);

    const handleRowClick = (e: any, num: any) => {
      setnumber(num);
      entries.map((i, m) => {
        if (labelClickRef.current[num].className === i.id) {
          labelClickRef.current[num].style.borderColor = "blue";
        }
      });
    };

    useEffect(() => {
      entries.map((i, m) => {
        if (m !== number) {
          labelClickRef.current[m].style.borderColor = "rgb(256,0,0)";
        }
      });
    }, [number]);

    ///////// 이미지 위에 Annotation
    // 1. 이미지 이름을 매개변수로\
    // 이미지에 좌표 찍기
    // project Id값이랑 image Id값 전달
    let rect2: { id: string; showCloseButton: boolean } & EntryType = null;
    useEffect(() => {
      let bodys = {
        imageId: imageId,
        idx: idx,
        projectId: projectId,
        label: label,
      };
      let body = {
        _id: idx,
        projectId: projectId,
        label: label,
      };

      dispatch(imageList(body)).then(
        (response: { payload: { Success: any; imageobject: any } }) => {
          if (response.payload.Success) {
            setlabels(response.payload.imageobject);
          }
        }
      );

      dispatch(datadraw(bodys)).then(
        (response: { payload: { success: any; datas: any } }) => {
          if (response.payload.success) {
            const maxWidth = bBoxAnnotatorRef.current?.offsetWidth || 1;
            setMultiplier(bBoxAnnotatorRef.current.clientWidth / maxWidth);
            for (
              let i = 0;
              i < JSON.parse(response.payload.datas).length;
              i++
            ) {
              rect2 = {
                width:
                  JSON.parse(response.payload.datas)[i].width *
                  bBoxAnnotatorRef.current.clientWidth,
                height:
                  JSON.parse(response.payload.datas)[i].height *
                  bBoxAnnotatorRef.current.clientHeight,
                x:
                  JSON.parse(response.payload.datas)[i].x *
                    bBoxAnnotatorRef.current.clientWidth -
                  (JSON.parse(response.payload.datas)[i].width *
                    bBoxAnnotatorRef.current.clientWidth) /
                    2,
                y:
                  JSON.parse(response.payload.datas)[i].y *
                    bBoxAnnotatorRef.current.clientHeight -
                  (JSON.parse(response.payload.datas)[i].height *
                    bBoxAnnotatorRef.current.clientHeight) /
                    2,
                index: JSON.parse(response.payload.datas)[i].index,
                id: JSON.parse(response.payload.datas)[i].id,
                label: JSON.parse(response.payload.datas)[i].label,
                showCloseButton: false,
              };
              console.log("rect2", rect2);
              setEntries((entries) => [...entries, rect2]);
            }
          } else {
            alert("실패");
          }
        }
      );
    }, []);
    useEffect(() => {
      // 리렌더링 될 때 마다 실행
      onChange(
        entries.map((entry) => ({
          id: entry.id,
          index: labels?.indexOf(entry.label),
          label: entry.label,
          width: Math.round(entry.width * multiplier) / img_width,
          height: Math.round(entry.height * multiplier) / img_height,
          x:
            (Math.round(entry.x * multiplier) +
              Math.round(entry.width * multiplier) / 2) /
            img_width,
          y:
            (Math.round(entry.y * multiplier) +
              Math.round(entry.height * multiplier) / 2) /
            img_height,
          // 바운딩 박스 시 수치와 라벨
        }))
      );
    }, [entries, multiplier]); // 바뀌는 값
    const [status, setStatus] = useState<"free" | "input" | "hold">("free");
    const [bBoxAnnotatorStyle, setBboxAnnotatorStyle] = useState<{
      width?: number;
      height?: number;
    }>({});
    const [imageFrameStyle, setImageFrameStyle] = useState<{
      width?: number;
      height?: number;
      backgroundImageSrc?: string;
    }>({}); // 업로드 이미지 스타일
    useEffect(() => {
      // 재런더링
      const maxWidth = bBoxAnnotatorRef.current?.offsetWidth || 1;
      const imageElement = new Image(); // Image 객체 생성
      imageElement.src = url;
      imageElement.onload = function () {
        const width = imageElement.width;
        setImg_width(width);
        const height = imageElement.height;
        setImg_height(height);
        setMultiplier(width / maxWidth);
        setBboxAnnotatorStyle({
          width: width / multiplier,
          height: height / multiplier,
        });

        setImageFrameStyle({
          backgroundImageSrc: imageElement.src,
          width: width / multiplier,
          height: height / multiplier,
        });
      };

      imageElement.onerror = function () {
        throw "Invalid image URL: " + url;
      };
    }, [url, multiplier, bBoxAnnotatorRef]);

    const crop = (pageX: number, pageY: number) => {
      console.log("current_offsetLeft", bBoxAnnotatorRef.current?.offsetLeft); // 이미지 가로 세로
      console.log("current_offsetTop ", bBoxAnnotatorRef.current?.offsetTop);
      return {
        x:
          bBoxAnnotatorRef.current && imageFrameStyle.width
            ? Math.min(
                Math.max(
                  Math.round(pageX - bBoxAnnotatorRef.current.offsetLeft),
                  0
                ),
                Math.round(imageFrameStyle.width)
              )
            : 0,
        y:
          bBoxAnnotatorRef.current && imageFrameStyle.height
            ? Math.min(
                Math.max(
                  Math.round(pageY - bBoxAnnotatorRef.current.offsetTop),
                  0
                ),
                Math.round(imageFrameStyle.height)
              )
            : 0,
      };
    };
    const updateRectangle = (pageX: number, pageY: number) => {
      setPointer(crop(pageX, pageY));
    };

    const mouseMoveHandler = (e: MouseEvent) => {
      switch (status) {
        case "hold":
          updateRectangle(e.pageX, e.pageY);
      }
    };

    const mouseUpHandler = (e: MouseEvent) => {
      switch (status) {
        case "hold":
          updateRectangle(e.pageX, e.pageY); // 움직이는 좌표 ..? 그래서 결과적으론 마지막 좌표
          console.log("mouseUP", e.pageX, e.pageY);
          setStatus("input");
          labelInputRef.current?.focus();
      }
    };

    // 컴포넌트가 처음 나타날때, 사라질때, 업데이트 될 때 특정 작업을 처리
    useEffect(() => {
      window.addEventListener("mousemove", mouseMoveHandler);
      window.addEventListener("mouseup", mouseUpHandler);
      setuser_Width(window.innerWidth);
      return () => {
        window.removeEventListener("mousemove", mouseMoveHandler);
        window.removeEventListener("mouseup", mouseUpHandler);
      };
      // mouseup -> 마우스를 떼는 그 순간 드래그한 HTML 위에 놓을 수 있다.
      // setuser_Width(window.innerWidth);
      //  return () => window.removeEventListener('mouseup', mouseUpHandler);
    }, [status, labelInputRef]);

    const addEntry = (label: string) => {
      // select or text로 들어온 label을 매개인자로
      setEntries([
        ...entries,
        { ...rect, label, id: uuid(), showCloseButton: false },
      ]);
      setshowCloseButton(false);
      setStatus("free");
      setPointer(null);
      setOffset(null);
    };

    const mouseDownHandler = (
      e: React.MouseEvent<HTMLDivElement, MouseEvent>
    ) => {
      switch (status) {
        case "free":
        case "input":
          if (e.button !== 2) {
            setOffset(crop(e.nativeEvent.pageX, e.nativeEvent.pageY)); // 처음 클릭한 죄표
            setPointer(crop(e.nativeEvent.pageX, e.nativeEvent.pageY)); // 처음 클릭한 죄표
            setStatus("hold");
          }
      }
    };

    const rectangle = () => {
      const x1 = offset && pointer ? Math.min(offset.x, pointer.x) : 0;
      const y1 = offset && pointer ? Math.min(offset.y, pointer.y) : 0; // top
      const x2 = offset && pointer ? Math.max(offset.x, pointer.x) : 0; //
      const y2 = offset && pointer ? Math.max(offset.y, pointer.y) : 0; // height

      return {
        width: x2 - x1 + 1,
        height: y2 - y1 + 1,
        x: x1,
        y: y1,
        index: 0,
      };
    };

    useImperativeHandle(ref, () => ({
      reset() {
        setEntries([]);
      },
    }));
    const rect = rectangle();

    return (
      <>
        <header>
          <title>레이블링 툴 페이지</title>
          <div className="labeling_header">
            <button className="header_button" onClick={saveFun}>
              <img className="check" src={save}></img>레이블링 완료
            </button>
            <button className="header_button" onClick={buttonClick}>
              <img className="check" src={save}></img>작업 완료
            </button>
            <h3 className="imageId">{projectId + " _ " + label}</h3>
          </div>
        </header>
        <div
          className="testAll"
          style={{
            height: bBoxAnnotatorStyle.height,
            border: "1px solid black",
          }}
        >
          <div className="tool_menus">
            <h4 className="left_subject">레이블링 목록</h4>

            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>No.</th>
                  <th>Type</th>
                  <th>Class</th>
                </tr>
              </thead>
              <tbody>
                {currentPosts(
                  entries?.map((entry, num) => (
                    <tr onClick={() => handleRowClick(entry.id, num)}>
                      <td>{num + 1}</td>
                      <td>바운딩박스</td>
                      <td>{entry.label}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </Table>
            <div
              className="Pagenation"
              style={{
                position: "absolute",
                bottom: user_Heigth - bBoxAnnotatorStyle.height - 70,
                left: "6%",
              }}
            >
              <Pagenation
                postsPerPage={postsPerPage}
                totalPosts={entries.length + 1}
                paginate={setCurrentPage}
              ></Pagenation>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "row",
            }}
          >
            <div style={{ width: "70%" }}>
              <div
                className={classes.bBoxAnnotator}
                style={{
                  width: bBoxAnnotatorStyle.width,
                  height: bBoxAnnotatorStyle.height,
                  backgroundColor: "transparent",
                  border: "1px solid black",
                }}
                ref={bBoxAnnotatorRef}
                onMouseDown={mouseDownHandler}
              >
                <div
                  className={classes.imageFrame}
                  style={{
                    width: "100%",
                    height: "100%",
                    backgroundImage: `url(${imageFrameStyle.backgroundImageSrc})`,
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center",
                  }}
                >
                  {status === "hold" || status === "input" ? (
                    //오류?
                    <BBoxSelector
                      rectangle={rect}
                      mouseDownHandler={undefined}
                    />
                  ) : null}
                  {status === "input" ? (
                    <LabelBox
                      inputMethod={labelTool}
                      y={rect.y + rect.height + borderWidth}
                      x={rect.x - borderWidth}
                      labels={labels}
                      onSubmit={addEntry}
                      ref={labelInputRef}
                      setlabels={setlabels}
                    />
                  ) : null}

                  {entries.map((entry, i) => (
                    <div
                      className={entry.id}
                      style={{
                        border: `${borderWidth}px solid `,
                        borderColor: labelStyle.color?.toString(),
                        position: "absolute",
                        top: `${entry.y - borderWidth}px`,
                        left: `${entry.x - borderWidth}px`,
                        width: `${entry.width}px`,
                        height: `${entry.height}px`,
                        color: "rgb(255,0,0)",
                        fontFamily: "monospace",
                        fontSize: "small",
                      }}
                      ref={(elem) => (labelClickRef.current[i] = elem)}
                      key={i}
                      onMouseOver={() =>
                        setEntries((prevEntries) =>
                          prevEntries.map((e) =>
                            e.id === entry.id
                              ? { ...e, showCloseButton: true }
                              : e
                          )
                        )
                      }
                      onMouseLeave={() =>
                        setEntries((prevEntries) =>
                          prevEntries.map((e) =>
                            e.id === entry.id
                              ? { ...e, showCloseButton: false }
                              : e
                          )
                        )
                      }
                    >
                      {entry.showCloseButton ? (
                        <div
                          style={{
                            position: "absolute",
                            top: "-8px",
                            right: "-8px",
                            width: "16px",
                            height: "0",
                            padding: "16px 0 0 0",
                            overflow: "hidden",
                            color: "#fff",
                            backgroundColor: "#030",
                            border: "2px solid #fff",
                            borderRadius: "18px",
                            cursor: "pointer",
                            userSelect: "none",
                            textAlign: "center",
                          }}
                          onMouseDown={(e) => {
                            e.stopPropagation();
                          }}
                          onClick={() => {
                            setEntries(
                              entries.filter((e) => e.id !== entry.id)
                            );
                          }}
                        >
                          <div
                            style={{
                              display: "block",
                              textAlign: "center",
                              width: "16px",
                              position: "absolute",
                              top: "-2px",
                              left: "0",
                              fontSize: "16px",
                              lineHeight: "16px",
                              fontFamily:
                                '"Helvetica Neue", Consolas, Verdana, Tahoma, Calibri, ' +
                                'Helvetica, Menlo, "Droid Sans", sans-serif',
                            }}
                          >
                            &#215;
                          </div>
                        </div>
                      ) : null}

                      {entry.showCloseButton ? (
                        <div
                          style={{
                            position: "absolute",
                            top: "-8px",
                            right: "-8px",
                            width: "16px",
                            height: "0",
                            padding: "16px 0 0 0",
                            overflow: "hidden",
                            color: "#fff",
                            backgroundColor: "#030",
                            border: "2px solid #fff",
                            borderRadius: "18px",
                            cursor: "pointer",
                            userSelect: "none",
                            textAlign: "center",
                          }}
                          onMouseDown={(e) => {
                            e.stopPropagation();
                          }}
                          onClick={() => {
                            setEntries(
                              entries.filter((e) => e.id !== entry.id)
                            );
                          }}
                        >
                          <div
                            style={{
                              display: "block",
                              textAlign: "center",
                              width: "16px",
                              position: "absolute",
                              top: "-2px",
                              left: "0",
                              fontSize: "16px",
                              lineHeight: "16px",
                              fontFamily:
                                '"Helvetica Neue", Consolas, Verdana, Tahoma, Calibri, ' +
                                'Helvetica, Menlo, "Droid Sans", sans-serif',
                            }}
                          >
                            &#215;
                          </div>
                        </div>
                      ) : null}

                      <div style={{ overflow: "hidden" }}>{entry.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="tool_menuss">
              <h4 className="obj_subject">
                객체 입력 방식 {console.log("비박스 어노테이터 확인")}
              </h4>
              <div className="obj_sel">
                <button className="objs1" onClick={() => changeOn("text")}>
                  직접 입력
                </button>
                <button className="objs2" onClick={() => changeOn("select")}>
                  선택하기
                </button>
              </div>
              <br />
              <h4 className="commit_subject">커밋 알림</h4>
              <input
                className="commit_type"
                type="text"
                name="message"
                value={message}
                onChange={handleChange}
                placeholder="커밋 메시지를 입력해주세요"
              ></input>
              <button className="commit_save" onClick={addMesage}>
                저장
              </button>
              <div>
                <Table id="tables" striped bordered hover>
                  <thead>
                    <tr>
                      <th>커밋 메시지 내용</th>
                      <th>작성자</th>
                    </tr>
                  </thead>
                  <tbody id="tables">
                    {MeCurrentPosts(
                      messageList?.map((message: any) =>
                        message.message !== null ? (
                          <tr>
                            <td>{message.messageName}</td>
                            <td>{message.messageUser}</td>
                          </tr>
                        ) : (
                          <tr></tr>
                        )
                      )
                    )}
                  </tbody>
                </Table>
              </div>
              <div
                className="commitPage"
                style={{
                  position: "absolute",
                  left: "80%",
                  bottom: user_Heigth - bBoxAnnotatorStyle.height - 70,
                }}
              >
                <Pagenation
                  postsPerPage={MePostPerPage}
                  totalPosts={messageList.length + 1}
                  paginate={setMeCurrentPage}
                ></Pagenation>
              </div>
            </div>
          </div>
          <footer></footer>
        </div>
      </>
    );
  }
);
export default BBoxAnnotator;
