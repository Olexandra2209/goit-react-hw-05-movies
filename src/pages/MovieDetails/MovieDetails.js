import { Suspense, useEffect, useRef, useState } from 'react';
import { Link, Outlet, useLocation, useParams } from 'react-router-dom';
import { getMovies } from 'API';
import { StyledMovieWrapper } from './MovieDetails.styled';

const emptyImage =
  'https://ireland.apollo.olxcdn.com/v1/files/0iq0gb9ppip8-UA/image;s=1000x700';

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [genres, setGenres] = useState([]);
  const [movieVotes, setMovieVotes] = useState(null);
  const location = useLocation();
  const backLocation = useRef(location.state?.from ?? '/');

  useEffect(() => {
    const getMovieDetails = async id => {
      try {
        const response = await getMovies(`/movie/${id}`);
        setMovie(response.data);
        setGenres(response.data.genres);
        setMovieVotes(response.data.vote_average);
      } catch (error) {
        console.log(error);
      }
    };

    getMovieDetails(id);
  }, [id]);

  const movieGenres = genres.map(genre => genre.name).join(', ');
  const movieScore = (movieVotes * 10).toFixed(0);

  if (!movie) return <div>Loading...</div>;

  const { title, overview, poster_path } = movie;

  return (
    <>
      <StyledMovieWrapper>
        <img
          src={
            poster_path
              ? `https://image.tmdb.org/t/p/w300${poster_path}`
              : emptyImage
          }
          alt={`poster of ${title} movie`}
        ></img>
        <div>
          <Link to={backLocation.current}>Back</Link>
          <h2>{title}</h2>
          <p>User Score: {movieScore} %</p>
          <b>Overview</b>
          <p>{overview}</p>
          <b>Genres: </b>
          <p>{movieGenres}</p>
        </div>
      </StyledMovieWrapper>
      <hr></hr>
      <p>Additional information</p>
      <div>
        <ul>
          <li>
            <Link to={`/movies/${id}/cast`}>Cast</Link>
          </li>
          <li>
            <Link to={`/movies/${id}/reviews`}>Reviews</Link>
          </li>
        </ul>
      </div>
      <Suspense fallback={<div>Loading</div>}>
        <Outlet />
      </Suspense>
    </>
  );
};

export default MovieDetails;
