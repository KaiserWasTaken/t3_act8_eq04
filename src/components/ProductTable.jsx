export default function ProductTable({ products, loading, actionLoading, onEdit, onDelete }) {
  if (loading) {
    return <div className="loading"><span className="spinner" />Cargando productos...</div>
  }

  return (
    <div className="table-scroll">
      <table>
        <thead><tr><th>Producto</th><th>Categoría</th><th>Marca</th><th>Precio</th><th>Valoración</th><th>Acciones</th></tr></thead>
        <tbody>
          {products.length === 0 ? <tr><td colSpan="6" className="empty">No encontramos productos con esos filtros.</td></tr> : products.map((product) => (
            <tr key={product.id}>
              <td><div className="product-cell"><img src={product.thumbnail} alt="" /><span>{product.title}</span></div></td>
              <td><span className="category-pill">{product.category}</span></td>
              <td>{product.brand || '—'}</td>
              <td className="price">${Number(product.price).toFixed(2)}</td>
              <td><span className="rating">★ {product.rating?.toFixed(1) || '—'}</span></td>
              <td><div className="row-actions"><button title="Editar" onClick={() => onEdit(product)}>✎</button><button title="Eliminar" className="delete-action" disabled={actionLoading} onClick={() => onDelete(product)}>⌫</button></div></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
