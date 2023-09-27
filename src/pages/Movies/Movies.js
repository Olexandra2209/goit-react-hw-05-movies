import { useState } from 'react';
import { SearchForm } from 'components/SearchForm/SearchForm';
import { MoviesList } from 'components/MoviesList/MoviesList';

const Movies = () => {
  const [moviesByQuery, setMoviesByQuery] = useState([]);
  const [searchParams, setSearchParams] = useState(new URLSearchParams());

  return (
    <>
      <SearchForm
        moviesByQuery={moviesByQuery}
        setMoviesByQuery={setMoviesByQuery}
        searchParams={searchParams}
        setSearchParams={setSearchParams}
      />
      <MoviesList movies={[]} title="" />
    </>
  );
};

export default Movies;
