import ButtonAppBar from './components/ButtonAppBar';
import FilmList from './components/FilmList';

function App() {
  return (
    <div
      style={{
        minHeight: '150vh',
        background: 'radial-gradient(circle at top, #1b1b1b, #000)',
        color: '#e0e0e0',
        paddingTop: 32, // deixa espai per la AppBar
        paddingLeft: 16,
        paddingRight: 16,
        paddingBottom: 32,
      }}
    >
      <ButtonAppBar />
      <FilmList />
    </div>
  );
}

export default App;
