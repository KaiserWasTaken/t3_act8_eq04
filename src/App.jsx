import { useState } from 'react'
import LoginForm from './components/LoginForm'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import CatalogPage from './pages/CatalogPage'

function getStoredUser() {
  try {
    return JSON.parse(sessionStorage.getItem('bodrio-user') || localStorage.getItem('bodrio-user')) || null
  } catch {
    return null
  }
}

export default function App() {
  const [user, setUser] = useState(getStoredUser)
  const [activeSection, setActiveSection] = useState('catalog')

  function handleLogin(nextUser, remember) {
    setUser(nextUser)
    const storage = remember ? localStorage : sessionStorage
    storage.setItem('bodrio-user', JSON.stringify(nextUser))
  }

  function handleLogout() {
    setUser(null)
    sessionStorage.removeItem('bodrio-user')
    localStorage.removeItem('bodrio-user')
  }

  if (!user) return <LoginForm onLogin={handleLogin} />

  return (
    <div className="app-shell">
      <Sidebar activeSection={activeSection} onSectionChange={setActiveSection} />
      <div className="main-area">
        <Navbar user={user} onLogout={handleLogout} />
        {activeSection === 'catalog'
          ? <CatalogPage user={user} />
          : <div className="placeholder"><span>✦</span><h2>{activeSection === 'favorites' ? 'Mis favoritas' : 'Configuración'}</h2><p>Esta sección estará disponible próximamente.</p></div>}
      </div>
    </div>
  )
}
