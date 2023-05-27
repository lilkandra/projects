import Pagination from 'react-bootstrap/Pagination';
import { useState } from 'react';

const MyPagination = ({countriesPerPage, totalCountries, paginate, active}) => {
    const n = Math.ceil(totalCountries/countriesPerPage);
    let pageNumbers = [];
    for (let i = 1; i <= n; i++) {
        pageNumbers.push(i);
    }
    return (
            <Pagination className='divPages' size="lg">
                {pageNumbers.map(Number => (
                    <Pagination.Item onClick={() => {paginate(Number)}} key={Number} active={Number === active}>
                        {Number}
                    </Pagination.Item>
                ))}
            </Pagination>
    );
}

export default MyPagination;