import React from 'react';
import MovieList from '../components/MovieList';

function Home({ searchText, selectedCity }) {
  return (
    <div>
      <MovieList searchText={searchText} selectedCity={selectedCity} />
    </div>
  );
}

export default Home;
