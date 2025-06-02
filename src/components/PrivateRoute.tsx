import { Navigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { supabase } from '../api/supabaseClient';

interface PrivateRouteProps {
  children: React.JSX.Element;
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setIsAuthenticated(!!session);
      setIsLoading(false);
    };
    checkUser();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>; // O un spinner si vols
  }

  if (!isAuthenticated) {
    // Guarda on volia anar l'usuari per redirigir després del login
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default PrivateRoute;
