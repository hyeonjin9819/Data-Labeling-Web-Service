import { useNavigate, useParams } from "react-router-dom"

// 프로젝트 데이터 리스트로 가기 전 임시 페이지
const DataDetails = () =>{
    const {projectId}= useParams()
    const navigate = useNavigate();
    const handleClick= () =>{
        navigate('/ProjectPage')
    }
    return(
        <>
        <div>
            '{projectId}' 프로젝트 내 데이터 리스트가 뜰 화면입니다.
        </div>
        <button onClick={handleClick}>돌아가기</button>
        </>
    )
}

export default DataDetails;