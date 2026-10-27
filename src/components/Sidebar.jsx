import Brand from './Brand'

const navigationItems = [
  ['catalog', 'Catálogo de películas', '▦'],
  ['favorites', 'Mis favoritas', '♡'],
  ['settings', 'Configuración', '⚙'],
]

export default function Sidebar({ activeSection, onSectionChange }) {
  return (
    <aside className="sidebar">
      <Brand compact />
      <div className="sidebar-label">MENÚ PRINCIPAL</div>
      <nav>
        {navigationItems.map(([id, label, icon]) => (
          <button key={id} className={activeSection === id ? 'nav-item active' : 'nav-item'} onClick={() => onSectionChange(id)}>
            <span>{icon}</span>{label}
          </button>
        ))}
      </nav>
      <div className="sidebar-footer">
        <div className="sidebar-tip">“El cine es un sueño que compartimos despiertos.”</div>
        <span className="version">Bodrio PopCorn · v1.0</span>
      </div>
    </aside>
  )
}
