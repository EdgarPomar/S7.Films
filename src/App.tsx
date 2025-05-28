import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ButtonAppBar from './components/ButtonAppBar';
import FilmList from './components/FilmList';
import FilmPage from './pages/FilmPage';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import PrivateRoute from './components/PrivateRoute';
import PublicRoute from './components/PublicRoute';
import ProfilePage from './components/ProfilePage';
import ActorPage from './pages/ActorPage';


function App() {
  return (
    <BrowserRouter>
      <div
        style={{
          minHeight: '150vh',
          background: 'radial-gradient(circle at top, #1b1b1b, #000)',
          color: '#e0e0e0',
          paddingTop: 32, // espacio para AppBar
          paddingLeft: 16,
          paddingRight: 16,
          paddingBottom: 32,
        }}
      >
        <ButtonAppBar />
        <Routes>
          <Route path="/" element={<FilmList />} />
          <Route path="/film/:id" element={<FilmPage />} />
          <Route path="/actor/:id" element={<ActorPage />} />

          {/* Rutes per autenticació */}
          <Route
            path="/login"
            element={
              <PublicRoute>
                <LoginForm />
              </PublicRoute>
            }
          />
          <Route
            path="/register"
            element={
              <PublicRoute>
                <RegisterForm />
              </PublicRoute>
            }
          />

          {/* Ruta protegida */}
          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <ProfilePage />
              </PrivateRoute>
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
