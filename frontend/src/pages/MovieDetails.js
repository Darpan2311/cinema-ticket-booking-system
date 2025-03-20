import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import FetchMovieDetails from '../API/GetMovieDetails';
import SeatPlan from '../components/SeatPlan';
import FormatDate from '../utils/FormatDate';
import FormatRuntime from '../utils/FormatRuntime';
import MovieSessions from '../mockData/MovieSessions';

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [selectedSession, setSelectedSession] = useState(null);

  const API_KEY = process.env.REACT_APP_API_KEY || '';

  useEffect(() => {
    const fetchData = async () => {
      const movieData = await FetchMovieDetails(id, API_KEY);
      setMovie(movieData);
    };

    fetchData();
  }, [id, API_KEY]);

  if (!movie) {
    return <div>Loading...</div>;
  }

  // Generate session timings for this movie
  const movieSessions = MovieSessions(movie, 1); // Assuming Hall 1, update if needed

  return (
    <div>
      <div className='container mx-auto px-4 py-8'>
        <div className='max-w-5xl mx-auto'>
          <div className='flex flex-wrap justify-center items-start'>
            <div className='w-full md:w-1/2 lg:w-1/3 flex justify-center mb-8 md:mb-0'>
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className='w-full h-auto rounded'
              />
            </div>
            <div className='w-full md:w-1/2 lg:w-2/3 px-6 text-left'>
              <h2 className='text-3xl font-semibold'>{movie.title}</h2>
              <p className='text-gray-800 mt-2 text-justify text-sm md:text-sm lg:text-base'>
                {movie.overview}
              </p>
              <p className='text-gray-800 mt-2 text-sm md:text-sm lg:text-base'>
                <b>Genres:</b>{' '}
                {movie.genres.map((genre) => genre.name).join(', ')}
              </p>
              <p className='text-gray-800 mt-2 text-sm md:text-sm lg:text-base'>
                <b>Tagline:</b> {movie.tagline}
              </p>
              <p className='text-gray-800 mt-1 text-sm md:text-sm lg:text-base'>
                <b>Runtime:</b> {FormatRuntime(movie.runtime)}
              </p>
              <p className='text-gray-800 mt-1 text-sm md:text-sm lg:text-base'>
                <b>Rating:</b> {movie.vote_average.toFixed(1)}
              </p>
              <p className='text-gray-800 mt-2 text-sm md:text-sm lg:text-base'>
                <b>Release Date:</b> {FormatDate(movie.release_date)}
              </p>

              {/* Session Timings */}
              <div className='mt-4'>
                <h3 className='text-lg font-semibold mb-2'>Available Showtimes:</h3>
                <div className='flex flex-wrap gap-2'>
                  {movieSessions.map((session, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedSession(session)}
                      className='bg-red-500 text-white px-3 py-1 rounded text-sm'
                    >
                      {session.time} - {session.language}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Show SeatPlan only when a session is selected */}
          {selectedSession && (
            <div className='mt-6'>
              <h3 className='text-lg font-semibold mb-2'>
                Seat Plan for {selectedSession.time} - {selectedSession.language}
              </h3>
              <SeatPlan movie={movie} session={selectedSession} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
