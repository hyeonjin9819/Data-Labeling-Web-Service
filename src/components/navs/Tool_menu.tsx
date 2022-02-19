import React from 'react';
import '../css/tool_menu.css'
import open_menu from '../images/open_menu.png';

const Tool_menu = ()=> {
    return(
        <div className="tool_menus">
            <h3>레이블링 객체</h3>
            <select className="label_selection">
                <option value="person">사람</option>
                <option value="animal">동물</option>
                <option value="plant">식물</option>
            </select>
        </div>
    );
}

export default Tool_menu;