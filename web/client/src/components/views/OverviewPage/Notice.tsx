import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { myInfo, project_owner } from "../../../_actions/user_action";
import NoticeAdd from "./NoticeAdd";
import "../../css/OverviewPage.css";

interface props {
  id: any;
}

const Notice = (props: props) => {
  const { id } = props;
  const dispatch = useDispatch<any>();
  const [notiModal, setnotiModal] = useState(false);
  const [noti_data, setNoti_data] = useState<String>(null);

  const getNotice = (notice: any) => {
    setNoti_data(notice);
  };

  const [userid, setUserid] = useState(0);
  const [owner, setOwner] = useState(0);

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
    id: id,
  };

  let bodys = {
    token: token,
  };

  useEffect(() => {
    dispatch(myInfo(bodys)).then(
      (response: { payload: { Success: any; id: number } }) => {
        if (response.payload.Success) {
          setUserid(response.payload.id);
        }
      }
    );

    dispatch(project_owner(body)).then(
      (response: {
        payload: { success: any; project_owner: any; project_notice: any };
      }) => {
        if (response.payload.success) {
          setOwner(response.payload.project_owner);
          setNoti_data(response.payload.project_notice);
        }
      }
    );
  }, [id]);
  return (
    <div>
      <div>
        {owner === userid ? (
          <>
            <button className="addNoticeBtn" onClick={() => setnotiModal(true)}>
              추가
            </button>{" "}
          </>
        ) : (
          <div></div>
        )}
        <h3 className="titleH3">Notice</h3>
      </div>
      <hr className="hrhr"></hr>

      <NoticeAdd
        show={notiModal}
        getNotice={getNotice}
        onHide={() => setnotiModal(false)}
        id={body.id}
      ></NoticeAdd>

      <h3 className="noti_info">{noti_data}</h3>
      {console.log(noti_data)}
    </div>
  );
};

export default Notice;
