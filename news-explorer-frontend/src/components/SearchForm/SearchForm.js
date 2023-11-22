import React, { useState } from 'react';

function SearchForm({ onSearch }) {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Pasa la consulta al manejador de búsqueda
    onSearch(query);
  };

  return (
    <form className="searchForm" onSubmit={handleSubmit}>
      <input
      className="searchForm__input"
        type="text"
        placeholder="Introduce un tema"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button className="searchForm__button" type="submit">Buscar</button>
    </form>
  );
}

export default SearchForm;