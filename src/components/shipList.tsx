import React, { useEffect, useState } from 'react';
import { fetchStarWarsFilms, Film } from '../api/tmdb';

export const ShipList: React.FC = () => {
  const [films, setFilms] = useState<Film[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStarWarsFilms().then((data) => {
      setFilms(data);
      setLoading(false);
    });
  }, []);

  if (loading) return <p>Carregant pel·lícules...</p>;

  return (
    <div style={{ padding: '1rem' }}>
      <h1 style={{ fontSize: '24px', marginBottom: '1rem' }}>Llistat de Pel·lícules (Star Wars)</h1>
      <ul>
        {films.map((film) => (
          <li key={film.id} style={{ marginBottom: '1rem' }}>
            <strong>{film.title}</strong> <br />
            <span style={{ color: 'gray' }}>Estrena: {film.release_date}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};
