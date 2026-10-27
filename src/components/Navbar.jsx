import Brand from './Brand'

export default function Navbar({ user, onLogout }) {
  return (
    <header className="navbar">
      <div className="mobile-brand"><Brand compact /></div>
      <div className="navbar-title">CATÁLOGO</div>
      <div className="user-area">
        <div className="user-copy">
          <strong>{user.firstName} {user.lastName}</strong>
          <span>@{user.username}</span>
        </div>
        <img src={user.image} alt={`Foto de ${user.firstName}`} className="avatar" />
        <button className="logout-button" onClick={onLogout}>Cerrar sesión</button>
      </div>
    </header>
  )
}
