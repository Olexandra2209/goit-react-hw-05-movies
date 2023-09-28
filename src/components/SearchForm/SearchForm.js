import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SearchForm = ({ setSearchParams }) => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSubmit = e => {
    e.preventDefault();
    setSearchParams({ searchQuery: query });
    navigate(`/movies?searchQuery=${query}`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Search movies..."
        autoComplete="off"
        value={query}
        onChange={e => setQuery(e.target.value)}
      />
      <button type="submit">Search</button>
    </form>
  );
};

export default SearchForm;
