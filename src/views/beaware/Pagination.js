import React, { Fragment, useState, useEffect   } from 'react';
import { number } from 'prop-types';

const Pagination = ({postPerPgae, totalPosts, paginate}) => {
    const pageNumbers = [];

    //for que forma la cantidad de paginas en el paginador
    for(let i = 1; i <= Math.ceil(totalPosts / postPerPgae); i++){
        pageNumbers.push(i);
    }

    return (
        <nav >
            <ul className="pagination justify-content-center">
                {
                    pageNumbers.map(number => (
                       <li key={number} className="page-item paginacionCasos">
                           <a onClick={() => paginate(number)}  className="page-link">
                                {number}
                           </a>
                       </li> 
                    ))
                }

            </ul>
        </nav>
    )

}

export default Pagination;