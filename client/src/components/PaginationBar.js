import React from 'react'

const PaginationBar = ({ totalPages, currentPage, setCurrentPage }) => {
  return (
    <nav className="row justify-content-center" aria-label="Page navigation">
      <ul className="pagination shadow-sm">
        {totalPages &&
          [...Array(totalPages).keys()].map(num =>
            <li key={num} className="page-item">
              <button onClick={() => setCurrentPage(num + 1)} className="page-link">{num + 1}</button>
            </li>)}
      </ul>
    </nav>
  )
}

export default PaginationBar;
