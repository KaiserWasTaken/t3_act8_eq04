const API_URL = 'https://dummyjson.com'

async function request(path, options = {}) {
  const response = await fetch(`${API_URL}${path}`, options)
  if (!response.ok) throw new Error(`Request failed with status ${response.status}`)
  return response.json()
}

export function loginUser(username, password) {
  return request('/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  })
}

export function getProductCategories() {
  return request('/products/categories')
}

export function getProducts({ page, pageSize, search, category, signal }) {
  const skip = (page - 1) * pageSize
  const endpoint = category ? `/products/category/${encodeURIComponent(category)}` : '/products'
  const query = new URLSearchParams({ limit: pageSize, skip })
  if (search) query.set('q', search)
  return request(`${endpoint}?${query}`, { signal })
}

export function createProduct(product) {
  return request('/products/add', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(product),
  })
}

export function updateProduct(productId, product) {
  return request(`/products/${productId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(product),
  })
}

export function removeProduct(productId) {
  return request(`/products/${productId}`, { method: 'DELETE' })
}
