import "./Pagination.css";

function Pagination({ currentPage, totalPages, setCurrentPage }) {
  return (
    <div className="pagination">
      <button
        className="nav-btn"
        disabled={currentPage === 1}
        onClick={() => setCurrentPage(currentPage - 1)}>
        Prev
      </button>

      <div className="page-numbers">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            className={`page-btn ${page === currentPage ? "active" : ""}`}
            onClick={() => setCurrentPage(page)}>
            {page}
          </button>
        ))}
      </div>

      <button
        className="nav-btn"
        disabled={currentPage === totalPages}
        onClick={() => setCurrentPage(currentPage + 1)}>
        Next
      </button>
    </div>
  );
}

export default Pagination;
