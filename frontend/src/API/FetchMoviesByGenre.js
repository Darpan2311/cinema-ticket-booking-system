
async function FetchMoviesByGenre(ACCESS_TOKEN, page, genreIds) {
  const proxy=process.env.REACT_APP_PROXY;
  const genreIdsURL = genreIds.length > 0 ? genreIds.join(',') : '';
  const targetUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${ACCESS_TOKEN}&language=en-US&sort_by=popularity.desc&include_adult=fals&include_video=false&page=${page}&with_genres=${genreIdsURL}`;

    try {
      console.log(process.env.REACT_APP_PROXY);
      const response = await fetch(proxy+targetUrl, {
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${ACCESS_TOKEN}`,
        },
      });

      if (!response.ok) throw new Error(`Proxy failed`);

      const data = await response.json();
      return { filteredMovies: data.results, totalPages: data.total_pages };
    } catch (error) {
      console.error(`Error with proxy, trying next...`, error);
    }
  
  return null;
}

export default FetchMoviesByGenre;
