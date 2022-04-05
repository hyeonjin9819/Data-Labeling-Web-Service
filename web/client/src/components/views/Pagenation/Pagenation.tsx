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
            <ul>
                {pageNums.map((number:any) =>( 
                <li key={number}>
                    <button onClick={() => paginate(number)}></button>
                    {number}
                </li>
                    )
                )}
            </ul>
        </div>
    );
};

export default Pagenation;