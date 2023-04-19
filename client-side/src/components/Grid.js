import React, { useState } from "react";

function Grid({ data, pageSize = 10, term = '', filterBy, setFilterBy, n, setN, isSearch = false }) {
  if (n) {
    pageSize = n;
  }
  const [currentPage, setCurrentPage] = useState(0);
  const [sortBy, setSortBy] = useState(null);

  const totalPages = Math.ceil(data.length / pageSize);

  const filteredData = data.filter((row) => {
    if (term === '') return true;

    if (row.term) {
      return row.term.toLowerCase().includes(filterBy.toLowerCase());
    }

    return false;
  });


  const paginatedData = filteredData.slice(
    currentPage * pageSize,
    currentPage * pageSize + pageSize
  );

  const handleFilterChange = (event) => {
    if (isSearch) {
      setFilterBy(event.target.value);
    }
    else {
      setN(event.target.value);
    }
    setCurrentPage(0);
  };

  const handleSortClick = (field) => {
    setSortBy(field);
    setCurrentPage(0);
  };

  const handlePrevClick = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const handleNextClick = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const columns = Object.keys(data[0] || {});

  return (
    <div style={{ width: "80%", margin: "auto", height: "100%" }}>
      <div>
        <input type="text" value={filterBy} onChange={handleFilterChange} />
      </div>
      <table style={{ borderCollapse: "collapse", width: "100%" }}>
        <thead>
          <tr style={{ borderBottom: "1px solid #ddd" }}>
            {columns.map((column) => (
              <th
                key={column}
                onClick={() => handleSortClick(column)}
                style={{ cursor: "pointer", padding: "8px" }}
              >
                {sortBy === column ? <strong>{column}</strong> : column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {paginatedData.map((row, index) => (
            <tr key={index} style={{ borderBottom: "1px solid #ddd" }}>
              {columns.map((column) => (
                <td
                  key={`${index}-${column}`}
                  style={{ padding: "20px", textAlign: "center" }}
                >
                  {row[column]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div
        style={{ marginTop: "16px", display: "flex", justifyContent: "center" }}
      >
        <button onClick={handlePrevClick} disabled={currentPage === 0}>
          Prev
        </button>
        <button
          onClick={handleNextClick}
          disabled={currentPage === totalPages - 1}
        >
          Next
        </button>
        <span style={{ marginLeft: "16px", marginRight: "16px" }}>
          Page {currentPage + 1} of {totalPages}
        </span>
      </div>
    </div>
  );
}

export default Grid;
