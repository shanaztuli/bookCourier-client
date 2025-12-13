import useAuth from '../hooks/useAuth'
import { Navigate, useLocation } from 'react-router'


const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth()
  const location = useLocation()

  if (loading) return <h3>This is loading</h3>
  if (user) return children
  return <Navigate to='/auth/login' state={location.pathname} replace='true' />
}

export default PrivateRoute
