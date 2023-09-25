import { useEffect, useState } from 'react';
import { getMovies } from 'API';
import { MoviesList } from 'components/MoviesList/MoviesList';
const Home = () => {
  const [trendingMovies, setTrendingMovies] = useState([]);

  useEffect(() => {
    const fetchTrendingMovies = async () => {
      try {
        const response = await getMovies('/trending/all/day?language=en-US');
        setTrendingMovies(response.data.results);
      } catch (error) {
        console.log(error);
      }
    };

    fetchTrendingMovies();
  }, []);
  return <MoviesList movies={trendingMovies} />;
};

export default Home;
