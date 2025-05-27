import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ButtonAppBar from './components/ButtonAppBar';
import FilmList from './components/FilmList';
import FilmPage from './pages/FilmPage'; // si tienes página detalle

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
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
