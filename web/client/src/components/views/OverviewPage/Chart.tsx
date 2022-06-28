import React, { useEffect } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { useDispatch } from "react-redux";
import { data_chart } from "../../../_actions/user_action";
import { useState } from "react";
import '../../css/OverviewPage.css';

ChartJS.register(ArcElement, Tooltip, Legend);

interface props {
  id : String;
}

export function Chart(props:props) {
  const dispatch = useDispatch<any>();
  const {id} = props;
  const [complete, setComplete] = useState<number>(0);
  const [progressing, setProgressing] = useState<number>(0);
  let completed= 0;
  let progressed=0;

  let body = {
    id: id
  }

  useEffect(() => {
    dispatch(data_chart(body))
    .then((response : {payload : {success : any; chart :any};})=>{

     for (let i =0; i<response.payload.chart[0].data.length; i++){
      if(response.payload.chart[0].data[i].ing === "진행 중"){
        progressed++;  // 진행
      }
      else{
        completed++; // 완료
      }
     }

     
     for (let i =0; i<response.payload.chart[0].auto_data.length; i++){
      if(response.payload.chart[0].auto_data[i].ing === "진행 중"){
        progressed++;
      }
      else{
        completed++
      }
     }
     setProgressing(progressed)
     setComplete(completed);
 
    }     
    )},[id])

   const data = {
    labels: ["진행 중", "완료"],
    datasets: [
      {
        label: "# of Votes",
        data: [progressing, complete],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };
  
  return (
    <>
    <h3 className="titleH3">Project Status</h3>
    <hr></hr>
    {
    (progressing === 0 && complete ===0 )?
    <h3> 차트가 없습니다.</h3>
   : 
   <Doughnut
   className="chart"
   data={data}
   width={380}
   height={380}
   options={{ maintainAspectRatio: true , responsive: false}}
 />
    
  }
  </>
  );
}
