import { Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { supabase } from '../api/supabaseClient';

interface PublicRouteProps {
  children: React.JSX.Element;
}

const PublicRoute = ({ children }: PublicRouteProps) => {
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
    return <div>Loading...</div>;
  }

  // Si està autenticat, redirigeix a l'inici o a la pàgina que vulguis
  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default PublicRoute;
