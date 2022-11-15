import React from 'react';
import '../../css/Pagenation.css';

const Pagenation = ({postsPerPage, totalPosts, paginate}:any) => {
    
    const pageNums = [];
    for(let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++){
        pageNums.push(i);
        console.log(pageNums);
    }

    return (
        <div className="ulComponent">
            <ul className=''>
                {pageNums.map((number:any) =>( 
                <li key={number} style={{display: 'inline-block'}}>
                    <button className="page-link" onClick={() => paginate(number)}>{number}</button>
                    
                </li>
                    )
                )}
            </ul>
        </div>
    );
};

export default Pagenation;