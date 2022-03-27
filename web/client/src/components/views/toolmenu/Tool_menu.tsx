import React from 'react';
import '../tool_menu.css'

import '../../css/tool_menu.css';


const Tool_menu = ()=> {
    return(
        <div className="tool_menus">
            <h3>레이블링 객체 {console.log("툴 메뉴 파트 콘솔입니다")}</h3>
            <select className="label_selection">
                <option value="person">사람</option>
                <option value="animal">동물</option>
                <option value="plant">식물</option>
            </select>
        </div>
    );
}

export default Tool_menu;