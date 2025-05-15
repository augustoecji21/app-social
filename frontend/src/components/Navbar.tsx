import { Link } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';

function Navbar() {
  const token = useAuthStore((state) => state.token);
  const logout = useAuthStore((state) => state.logout);

  const handleLogout = () => {
    logout();
    window.location.href = '/login';
  };

  return (
    <nav style={{ padding: '1rem', background: '#f0f0f0', display: 'flex', gap: '1rem' }}>
      {token ? (
        <>
          <Link to="/profile">Perfil</Link>
          <Link to="/posts">Posts</Link>
          <Link to="/create">Create Post</Link>
          <button onClick={handleLogout}>Cerrar sesión</button>
        </>
      ) : (
        <>
          <Link to="/login">Login</Link>
          <Link to="/register">Registro</Link>
        </>
      )}
    </nav>
  );
}

export default Navbar;
