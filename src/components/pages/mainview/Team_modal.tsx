import React, {useState, FC} from 'react';

import Team_add from './Team_add';
/*팀 생성 modal창 구현을 도와주는 함수*/
const Body:FC = () => {
    const [proModal, setproModal] = useState(false);
    return(
      <>
      <div className="Body">
      <Team_add show ={proModal} onHide={()=>setproModal(false)} />
        <button className="pr_add_btn" onClick={ ()=>setproModal(true)} >팀 생성 </button> 
     
    </div>
    </>
    );
}

export default Body;