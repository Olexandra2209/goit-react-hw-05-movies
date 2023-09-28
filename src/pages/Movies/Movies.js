import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getMovies } from 'API';
import { MoviesList } from 'components/MoviesList/MoviesList';
import SearchForm from 'components/SearchForm/SearchForm';

const Movies = () => {
  const [moviesByQuery, setMoviesByQuery] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const query = searchParams.get('searchQuery');
    if (query) {
      async function fetchMovies() {
        try {
          const response = await getMovies(
            `/search/movie?query=${query}&include_adult=false&language=en-US&page=1`
          );
          setMoviesByQuery(response.data.results);
        } catch (error) {
          console.error(error);
        }
      }

      fetchMovies();
    }
  }, [searchParams]);

  return (
    <>
      <SearchForm setSearchParams={setSearchParams} />
      {moviesByQuery.length > 0 && <MoviesList movies={moviesByQuery} />}
    </>
  );
};

export default Movies;
