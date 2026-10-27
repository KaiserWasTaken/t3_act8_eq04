export default function Pagination({ page, pageCount, rangeStart, rangeEnd, total, loading, onPageChange }) {
  return (
    <div className="pagination">
      <span>Mostrando {rangeStart}–{rangeEnd} de {total} productos</span>
      <div className="pagination-controls">
        <button disabled={page <= 1 || loading} onClick={() => onPageChange(page - 1)}>‹</button>
        <strong>Página {page} de {pageCount}</strong>
        <button disabled={page >= pageCount || loading} onClick={() => onPageChange(page + 1)}>›</button>
      </div>
    </div>
  )
}
