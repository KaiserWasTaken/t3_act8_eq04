import { useState } from 'react'

export default function ProductModal({ product, onClose, onSave, loading }) {
  const [form, setForm] = useState({
    title: product?.title || '',
    price: product?.price || '',
    category: product?.category || 'beauty',
    brand: product?.brand || '',
  })
  const [error, setError] = useState('')
  const updateField = (field, value) => setForm((current) => ({ ...current, [field]: value }))

  function handleSubmit(event) {
    event.preventDefault()
    if (!form.title.trim() || !form.price || Number(form.price) <= 0) {
      setError('Indica un nombre y un precio mayor que cero.')
      return
    }
    onSave({ ...form, price: Number(form.price) })
  }

  return (
    <div className="modal-backdrop" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <form className="modal-card" onSubmit={handleSubmit}>
        <button type="button" className="modal-close" onClick={onClose} aria-label="Cerrar">×</button>
        <h2>{product ? 'Editar producto' : 'Agregar producto'}</h2>
        <p>{product ? 'Actualiza la información del producto.' : 'Añade un nuevo producto al catálogo.'}</p>
        <label>Nombre<input value={form.title} onChange={(event) => updateField('title', event.target.value)} autoFocus /></label>
        <div className="form-grid">
          <label>Precio<input type="number" min="0.01" step="0.01" value={form.price} onChange={(event) => updateField('price', event.target.value)} /></label>
          <label>Categoría<input value={form.category} onChange={(event) => updateField('category', event.target.value)} /></label>
        </div>
        <label>Marca<input value={form.brand} onChange={(event) => updateField('brand', event.target.value)} /></label>
        {error && <div className="form-error">{error}</div>}
        <div className="modal-actions">
          <button type="button" className="secondary-button" onClick={onClose}>Cancelar</button>
          <button className="primary-button" disabled={loading}>{loading ? 'Guardando...' : 'Guardar'}</button>
        </div>
      </form>
    </div>
  )
}
