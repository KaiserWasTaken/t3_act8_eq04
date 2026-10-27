import { useState } from 'react'
import Brand from './Brand'
import { loginUser } from '../services/api'

export default function LoginForm({ onLogin }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [remember, setRemember] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(event) {
    event.preventDefault()
    setError('')
    if (!username.trim() || !password) {
      setError('Completa tu usuario y contraseña para continuar.')
      return
    }

    setLoading(true)
    try {
      const user = await loginUser(username.trim(), password)
      onLogin(user, remember)
    } catch {
      setError('Usuario o contraseña incorrectos. Prueba con emilys / emilyspass.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="login-page">
      <section className="login-promo">
        <Brand />
        <div className="popcorn-icon" aria-hidden="true">✦</div>
        <p>Hasta el mayor bodrio sabe mejor con palomitas</p>
      </section>
      <section className="login-panel">
        <form className="login-card" onSubmit={handleSubmit}>
          <h1>INICIAR SESIÓN</h1>
          <p>Ingresa tus datos para acceder a la plataforma</p>
          <label htmlFor="username">Usuario o correo</label>
          <input id="username" value={username} onChange={(event) => setUsername(event.target.value)} placeholder="Correo electrónico" autoComplete="username" />
          <label htmlFor="password">Contraseña</label>
          <input id="password" type="password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Contraseña" autoComplete="current-password" />
          <div className="login-options">
            <label className="check-label">
              <input type="checkbox" checked={remember} onChange={(event) => setRemember(event.target.checked)} />
              Recordarme
            </label>
            <button type="button" className="link-button">¿Olvidaste tu contraseña?</button>
          </div>
          {error && <div className="form-error" role="alert">{error}</div>}
          <button className="primary-button login-button" disabled={loading}>{loading ? 'Validando...' : 'Entrar'}</button>
          <p className="login-hint">Demo: <strong>emilys</strong> / <strong>emilyspass</strong></p>
        </form>
      </section>
    </main>
  )
}
