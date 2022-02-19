import React, { useState } from 'react';
import Sidebar from '../../navs/Sidebar';
import "../../css/label_view.css";
import "../../css/Sidebar.css";
import profile from "../../images/profile.png";
import bell from "../../images/bell.png";
import logout from '../../images/logout.png';
import {Table} from 'react-bootstrap';
import Tables from './Tables';

/* 프로젝트 진입 시 나오는 레이블링 페이지*/

const Label_page = () => {
        return (
            
         <Tables></Tables>
    );
}

export default Label_page;