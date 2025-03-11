import FilterValidMovies from "../utils/FilterValidMovies";




async function FetchMoviesBySearch(ACCESS_TOKEN, page, searchText) {
  const proxy=process.env.REACT_APP_PROXY;

  const targetUrl = `https://api.themoviedb.org/3/search/multi?api_key=${ACCESS_TOKEN}&language=en-US&query=${encodeURIComponent(
    searchText
  )}&page=${page}&include_adult=false`;


    try {
      const response = await fetch(proxy + targetUrl, {
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${ACCESS_TOKEN}`,
        },
      });

      if (!response.ok) throw new Error(`Proxy failed`);

      const data = await response.json();

      const filteredMovies = FilterValidMovies(data.results).filter(
        (movie) => movie.backdrop_path !== null
      );

      return { filteredMovies, totalPages: data.total_pages };
    } catch (error) {
      console.warn(`Error with proxy , trying next...`, error);
    }
  return null;
}

export default FetchMoviesBySearch;