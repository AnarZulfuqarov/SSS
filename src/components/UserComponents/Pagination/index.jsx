import "./index.scss";

function Pagination({ currentPage, totalPages, onPageChange }) {
    // Səhifələrin siyahısını yaratmaq
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
    }

    // Növbəti səhifəyə keçmək üçün funksiyalar
    const handleNext = () => {
        if (currentPage < totalPages) {
            onPageChange(currentPage + 1);
        }
    };

    // Əvvəlki səhifəyə keçmək üçün funksiya
    const handlePrev = () => {
        if (currentPage > 1) {
            onPageChange(currentPage - 1);
        }
    };

    return (
        <div className="pagination-container">
            <button
                className="pagination-btn"
                onClick={handlePrev}
                disabled={currentPage === 1}
            >
                &lt;
            </button>
            {pages.map((page) => (
                <button
                    key={page}
                    className={`pagination-btn ${currentPage === page ? "active" : ""}`}
                    onClick={() => onPageChange(page)}
                >
                    {page}
                </button>
            ))}
            <button
                className="pagination-btn"
                onClick={handleNext}
                disabled={currentPage === totalPages}
            >
                &gt;
            </button>
        </div>
    );
}

export default Pagination;
