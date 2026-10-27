import { useEffect, useState } from 'react'
import ProductModal from '../components/ProductModal'
import ProductTable from '../components/ProductTable'
import Pagination from '../components/Pagination'
import { createProduct, getProductCategories, getProducts, removeProduct, updateProduct } from '../services/api'

const PAGE_SIZES = [10, 20, 40, 50]
const DEFAULT_THUMBNAIL = 'https://cdn.dummyjson.com/product-images/beauty/essence-mascara-lash-princess/thumbnail.webp'

export default function CatalogPage({ user }) {
  const params = new URLSearchParams(window.location.search)
  const [search, setSearch] = useState(params.get('search') || '')
  const [category, setCategory] = useState(params.get('category') || '')
  const [pageSize, setPageSize] = useState(Number(params.get('limit')) || 10)
  const [page, setPage] = useState(Number(params.get('page')) || 1)
  const [products, setProducts] = useState([])
  const [total, setTotal] = useState(0)
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [actionLoading, setActionLoading] = useState(false)
  const [error, setError] = useState('')
  const [retryTick, setRetryTick] = useState(0)
  const [modalProduct, setModalProduct] = useState(undefined)
  const [notice, setNotice] = useState('')

  useEffect(() => {
    getProductCategories().then(setCategories).catch(() => setCategories([]))
  }, [])

  useEffect(() => {
    const query = new URLSearchParams({ limit: pageSize })
    if (page > 1) query.set('page', page)
    if (search) query.set('search', search)
    if (category) query.set('category', category)
    window.history.replaceState({}, '', `${window.location.pathname}?${query}`)
  }, [page, pageSize, search, category])

  useEffect(() => {
    const controller = new AbortController()
    setLoading(true)
    setError('')
    getProducts({ page, pageSize, search, category, signal: controller.signal })
      .then((data) => {
        setProducts(data.products)
        setTotal(data.total)
      })
      .catch((requestError) => {
        if (requestError.name !== 'AbortError') setError('No se pudieron cargar los productos. Intenta de nuevo.')
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false)
      })
    return () => controller.abort()
  }, [page, pageSize, search, category, retryTick])

  useEffect(() => {
    if (!notice) return undefined
    const timeout = setTimeout(() => setNotice(''), 3500)
    return () => clearTimeout(timeout)
  }, [notice])

  function updateFilter(update) {
    setPage(1)
    update()
  }

  async function handleSaveProduct(data) {
    const isEditing = Boolean(modalProduct)
    if (isEditing && !window.confirm('¿Confirmas que deseas editar este producto?')) return
    setActionLoading(true)
    try {
      const saved = isEditing ? await updateProduct(modalProduct.id, data) : await createProduct(data)
      setProducts((current) => isEditing
        ? current.map((item) => item.id === modalProduct.id ? { ...item, ...saved } : item)
        : [{ ...saved, thumbnail: DEFAULT_THUMBNAIL }, ...current])
      if (!isEditing) setTotal((current) => current + 1)
      setNotice(isEditing ? 'Producto actualizado correctamente.' : 'Producto agregado correctamente.')
      setModalProduct(undefined)
    } catch {
      setNotice('No se pudo completar la operación. Intenta de nuevo.')
    } finally {
      setActionLoading(false)
    }
  }

  async function handleDeleteProduct(product) {
    if (!window.confirm(`¿Seguro que deseas eliminar “${product.title}”?`)) return
    setActionLoading(true)
    try {
      await removeProduct(product.id)
      setProducts((current) => current.filter((item) => item.id !== product.id))
      setTotal((current) => Math.max(0, current - 1))
      setNotice('Producto eliminado correctamente.')
    } catch {
      setNotice('No se pudo eliminar el producto. Intenta de nuevo.')
    } finally {
      setActionLoading(false)
    }
  }

  const pageCount = Math.max(1, Math.ceil(total / pageSize))
  const rangeStart = total ? (page - 1) * pageSize + 1 : 0
  const rangeEnd = Math.min(page * pageSize, total)

  return (
    <section className="catalog">
      <div className="catalog-heading">
        <div><p className="eyebrow">Bodrio PopCorn / Colección</p><h1>Bienvenido, {user.firstName}</h1><p className="subtitle">Explora y administra nuestro catálogo de productos.</p></div>
        <button className="primary-button add-button" onClick={() => setModalProduct(null)}>＋ Agregar producto</button>
      </div>
      <div className="toolbar">
        <div className="search-wrap"><span>⌕</span><input value={search} onChange={(event) => updateFilter(() => setSearch(event.target.value))} placeholder="Buscar por nombre..." aria-label="Buscar por nombre" />{search && <button className="clear-search" onClick={() => updateFilter(() => setSearch(''))}>×</button>}</div>
        <select value={category} onChange={(event) => updateFilter(() => setCategory(event.target.value))} aria-label="Filtrar por categoría">
          <option value="">Todas las categorías</option>
          {categories.map((item) => <option key={typeof item === 'string' ? item : item.slug} value={typeof item === 'string' ? item : item.slug}>{typeof item === 'string' ? item : item.name}</option>)}
        </select>
        <label className="page-size">Mostrar<select value={pageSize} onChange={(event) => updateFilter(() => setPageSize(Number(event.target.value)))}>{PAGE_SIZES.map((size) => <option key={size} value={size}>{size}</option>)}</select></label>
      </div>
      {notice && <div className="notice" role="status">{notice}</div>}
      {error && <div className="request-error" role="alert">{error} <button onClick={() => setRetryTick((current) => current + 1)}>Reintentar</button></div>}
      <div className="table-card"><ProductTable products={products} loading={loading} actionLoading={actionLoading} onEdit={setModalProduct} onDelete={handleDeleteProduct} /></div>
      <Pagination page={page} pageCount={pageCount} rangeStart={rangeStart} rangeEnd={rangeEnd} total={total} loading={loading} onPageChange={setPage} />
      {modalProduct !== undefined && <ProductModal product={modalProduct} onClose={() => setModalProduct(undefined)} onSave={handleSaveProduct} loading={actionLoading} />}
    </section>
  )
}
