async function FetchGenres(ACCESS_TOKEN) {
  try {
    const proxy=process.env.REACT_APP_PROXY;

    const response = await fetch(
      proxy+'https://api.themoviedb.org/3/genre/movie/list?language=en',
      {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer ' + ACCESS_TOKEN,
        },
      },
    );
    const data = await response.json();
    return data.genres;
  } catch (error) {
    console.error(error);
    return [];
  }
}

export default FetchGenres;
