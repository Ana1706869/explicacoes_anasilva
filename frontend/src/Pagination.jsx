const pageButtonClass =
  "bg-gray-300_px-300_px-3_py-1_rounded_disabled_opacity-50";

export const paginateItems = (items, currentPage, itemsPerPage) => {
  // Converte a página atual num intervalo usado por Array.slice.
  const startIndex = (currentPage - 1) * itemsPerPage;
  const totalPages = Math.ceil(items.length / itemsPerPage);

  return {
    items: items.slice(startIndex, startIndex + itemsPerPage),
    totalPages,
  };
};

const Pagination = ({ currentPage, totalPages, setCurrentPage }) => (
  <div className="paginas">
    <button
      onClick={() => setCurrentPage((page) => Math.max(page - 1, 1))}
      disabled={currentPage === 1}
      className={pageButtonClass}
    >
      Anterior
    </button>
    {Array.from({ length: totalPages }, (_, index) => (
      <button
        key={index}
        onClick={() => setCurrentPage(index + 1)}
        className={pageButtonClass}
      >
        {index + 1}
      </button>
    ))}
    <button
      onClick={() => setCurrentPage((page) => Math.min(page + 1, totalPages))}
      disabled={currentPage === totalPages}
      className={pageButtonClass}
    >
      Próxima
    </button>
  </div>
);

export default Pagination;
