// src/pages/Profile.tsx
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useAuthStore } from '../store/authStore'

interface User {
  id: number
  name?: string
  email: string
}

function Profile() {
  const [user, setUser] = useState<User | null>(null)
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const token = useAuthStore((state) => state.token)

  useEffect(() => {
    if (!token) {
      navigate('/login')
      return
    }

    axios
      .get('http://127.0.0.1:3000/auth/me', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setUser(res.data)
      })
      .catch(() => {
        setError('Error al cargar perfil')
      })
  }, [token, navigate])

  const handleLogout = () => {
    localStorage.removeItem('token')
    navigate('/login')
  }

  if (error) return <p>{error}</p>
  if (!user) return <p>Cargando perfil...</p>

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Perfil del Usuario</h2>
      <p><strong>ID:</strong> {user.id}</p>
      <p><strong>Nombre:</strong> {user.name}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <button onClick={handleLogout}>Cerrar sesión</button>
    </div>
  )
}

export default Profile
