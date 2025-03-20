import React, { useEffect, useState } from 'react';
import FetchMoviesByGenre from '../API/FetchMoviesByGenre';
import FetchMoviesBySearch from '../API/FetchMoviesBySearch';
import { isLoggedIn } from '../utils/Auth';
import Genres from './Genre';
import MovieCard from './MovieCard';
import RecommendedMovies from './RecommendedMovies';

const MovieList = ({ searchText, selectedCity }) => {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [genreIds, setGenreIds] = useState([]);
  const userLoggedIn = isLoggedIn();

  const ACCESS_TOKEN = process.env.REACT_APP_ACCESS_TOKEN || '';

  // Hardcoded excluded movie indexes for each city
  const excludedMoviesByCity = {
    Ahmedabad: [3, 7, 12, 18, 22, 25, 27, 30, 32, 35, 38, 40, 42, 44, 47, 50, 2, 5, 9, 13, 16, 21, 28, 34, 48],
    Surat: [1, 6, 8, 10, 14, 17, 20, 23, 26, 29, 31, 33, 36, 39, 41, 43, 45, 46, 49, 4, 11, 15, 19, 24, 37],
    Vadodara: [2, 5, 9, 12, 16, 21, 25, 27, 30, 34, 37, 40, 43, 45, 48, 50, 3, 7, 11, 18, 22, 28, 32, 35, 46],
    Rajkot: [4, 6, 11, 13, 17, 22, 26, 29, 31, 35, 38, 42, 44, 47, 50, 1, 5, 8, 14, 19, 23, 27, 33, 36, 41],
    Gandhinagar: [1, 3, 7, 10, 15, 18, 21, 24, 28, 32, 36, 39, 41, 45, 48, 50, 2, 6, 11, 17, 22, 26, 30, 34, 44],
    Bhavnagar: [2, 4, 9, 13, 16, 20, 23, 27, 31, 35, 38, 41, 45, 49, 50, 1, 6, 10, 14, 19, 25, 29, 33, 37, 43],
    Jamnagar: [3, 5, 8, 12, 17, 21, 26, 30, 34, 38, 40, 44, 46, 50, 2, 7, 11, 15, 19, 24, 28, 31, 36, 42, 47],
    Junagadh: [1, 4, 6, 9, 13, 17, 20, 23, 27, 31, 35, 39, 42, 45, 48, 50, 2, 7, 11, 15, 22, 26, 30, 37, 43],
    Anand: [2, 5, 9, 12, 16, 21, 25, 27, 30, 34, 37, 40, 43, 45, 48, 50, 3, 7, 11, 18, 22, 28, 32, 35, 46],
    Navsari: [1, 6, 8, 10, 14, 17, 20, 23, 26, 29, 31, 33, 36, 39, 41, 43, 45, 46, 49, 4, 11, 15, 19, 24, 37],
    Porbandar: [3, 5, 8, 12, 17, 21, 26, 30, 34, 38, 40, 44, 46, 50, 2, 7, 11, 15, 19, 24, 28, 31, 36, 42, 47],
    Dwarka: [2, 4, 9, 13, 16, 20, 23, 27, 31, 35, 38, 41, 45, 49, 50, 1, 6, 10, 14, 19, 25, 29, 33, 37, 43],
    Somnath: [1, 4, 6, 9, 13, 17, 20, 23, 27, 31, 35, 39, 42, 45, 48, 50, 2, 7, 11, 15, 22, 26, 30, 37, 43],
    Bhuj: [2, 5, 9, 12, 16, 21, 25, 27, 30, 34, 37, 40, 43, 45, 48, 50, 3, 7, 11, 18, 22, 28, 32, 35, 46],
    Gandhidham: [1, 6, 8, 10, 14, 17, 20, 23, 26, 29, 31, 33, 36, 39, 41, 43, 45, 46, 49, 4, 11, 15, 19, 24, 37],
    Palanpur: [3, 5, 8, 12, 17, 21, 26, 30, 34, 38, 40, 44, 46, 50, 2, 7, 11, 15, 19, 24, 28, 31, 36, 42, 47],
    Mehsana: [2, 4, 9, 13, 16, 20, 23, 27, 31, 35, 38, 41, 45, 49, 50, 1, 6, 10, 14, 19, 25, 29, 33, 37, 43],
    Morbi: [1, 4, 6, 9, 13, 17, 20, 23, 27, 31, 35, 39, 42, 45, 48, 50, 2, 7, 11, 15, 22, 26, 30, 37, 43],
    Nadiad: [2, 5, 9, 12, 16, 21, 25, 27, 30, 34, 37, 40, 43, 45, 48, 50, 3, 7, 11, 18, 22, 28, 32, 35, 46],
    Valsad: [1, 6, 8, 10, 14, 17, 20, 23, 26, 29, 31, 33, 36, 39, 41, 43, 45, 46, 49, 4, 11, 15, 19, 24, 37],
  };
  
  useEffect(() => {
    const fetchMoviesBySearch = async () => {
      if (searchText) {
        const response = await FetchMoviesBySearch(
          ACCESS_TOKEN,
          page,
          searchText
        );
        if (response) {
          const { filteredMovies, totalPages } = response;
          setMovies(filteredMovies);
          setTotalPages(totalPages);
        }
      }
    };

    const fetchMoviesByGenre = async () => {
      if (!searchText) {
        const response = await FetchMoviesByGenre(ACCESS_TOKEN, page, genreIds);
        if (response) {
          const { filteredMovies, totalPages } = response;
          setMovies(filteredMovies);
          setTotalPages(totalPages);
        }
      }
    };

    fetchMoviesBySearch();
    fetchMoviesByGenre();
  }, [page, genreIds, searchText, ACCESS_TOKEN]);

  // Filter out movies based on the excluded indexes for the selected city
  const excludedIndexes = excludedMoviesByCity[selectedCity] || [];
  const filteredMovies = movies.filter((_, index) => !excludedIndexes.includes(index));

  const handleNextPage = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  const handlePrevPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  return (
    <div className='container mx-auto px-4 py-4'>
      <Genres setGenreIds={setGenreIds} />
      {userLoggedIn && (
        <div>
          <RecommendedMovies />
        </div>
      )}

      <h1 className='text-left font-bold mb-4'>All Movies</h1>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
        {filteredMovies.map((movie, index) => (
          <MovieCard key={movie.id} movie={movie} hallNumber={index} />
        ))}
      </div>
      <div className='flex justify-center mt-4'>
        <button
          onClick={handlePrevPage}
          className={`bg-red-500 hover:bg-red-700 text-white rounded px-3 py-1 text-sm font-semibold mx-2 my-2 cursor-pointer ${
            page === 1 ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          disabled={page === 1}
        >
          Previous
        </button>
        <button
          onClick={handleNextPage}
          className={`bg-red-500 hover:bg-red-700 text-white rounded px-3 py-1 text-sm font-semibold mx-2 my-2 cursor-pointer ${
            page === totalPages ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          disabled={page === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default MovieList;
