import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getMovies } from 'API';

const emptyImage =
  'https://ireland.apollo.olxcdn.com/v1/files/0iq0gb9ppip8-UA/image;s=1000x700';

const Cast = () => {
  const { id } = useParams();

  const [cast, setCast] = useState([]);

  useEffect(() => {
    const getMovieCast = async id => {
      try {
        const response = await getMovies(`/movie/${id}/credits`);
        setCast(response.data.cast);
      } catch (error) {
        console.log(error);
      }
    };

    getMovieCast(id);
  }, [id]);

  return (
    <div>
      <ul>
        {cast.map(item => {
          const { id, name, profile_path } = item;
          return (
            <li key={id}>
              <img
                src={
                  profile_path
                    ? `https://image.tmdb.org/t/p/w500/${profile_path}`
                    : emptyImage
                }
                width={250}
                alt="poster"
              />
              <p>{name}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Cast;
