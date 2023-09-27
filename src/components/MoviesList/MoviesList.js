import { Link, useLocation } from 'react-router-dom';
import { StyledMoviesList } from './MoviesList.styled';

export const MoviesList = ({ movies, title = 'Trending today' }) => {
  const location = useLocation();

  const shouldShowTitle =
    title === 'Trending today' && location.pathname === '/';

  return (
    <div>
      {shouldShowTitle && <h1>{title}</h1>}
      <StyledMoviesList>
        {movies.map(movie => {
          const { id, title } = movie;
          return (
            <div key={id}>
              <Link to={`/movies/${id}`} state={{ from: location }}>
                {title}
              </Link>
            </div>
          );
        })}
      </StyledMoviesList>
    </div>
  );
};
