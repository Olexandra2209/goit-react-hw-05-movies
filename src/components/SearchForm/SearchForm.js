import { useState } from 'react';

const SearchForm = ({ setSearchParams }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    setSearchParams({ searchQuery: query });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        required
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
