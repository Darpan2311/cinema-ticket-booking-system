async function FetchMovieDetails(id, API_KEY) {
  const proxy=process.env.REACT_APP_PROXY;

    try {
      const response = await fetch(
       proxy+ `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=en-US`,
      );
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching movie details:', error);
      return null;
    }
  };
  
  export default FetchMovieDetails;