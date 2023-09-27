import toast from 'react-hot-toast';
import { useEffect, useCallback } from 'react';
import { getMovies } from 'API';
import { MoviesList } from 'components/MoviesList/MoviesList';

export const SearchForm = ({
  moviesByQuery,
  setMoviesByQuery,
  searchParams,
  setSearchParams,
}) => {
  const fetchMoviesByQuery = useCallback(
    async query => {
      if (!query || !query.trim()) {
        toast.error("You didn't enter anything for the search.");
        return;
      }

      try {
        const response = await getMovies(
          `/search/movie?query=${query}&include_adult=false&language=en-US&page=1`
        );
        setMoviesByQuery(response.data.results);
      } catch (error) {
        console.error(error);
      }
    },
    [setMoviesByQuery]
  );

  useEffect(() => {
    const query = searchParams.get('searchQuery');
    if (query) {
      fetchMoviesByQuery(query);
    }
  }, [searchParams, fetchMoviesByQuery]);

  const handleSubmit = e => {
    e.preventDefault();
    const query = e.target.elements.query.value;
    setSearchParams(new URLSearchParams({ searchQuery: query }));
    fetchMoviesByQuery(query);
    e.target.reset();
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="query"
          placeholder="Search movies..."
          autoComplete="off"
        />
        <button type="submit">Search</button>
      </form>
      {moviesByQuery.length > 0 && <MoviesList movies={moviesByQuery} />}
    </div>
  );
};
