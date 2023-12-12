import React, { useState } from 'react';

function SearchForm({ onSearch }) {
  const [query, setQuery] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
  
    // Validar si se ingresó una palabra clave
    if (!query.trim()) {
      setError('Por favor, introduzca una palabra clave.');
      return;
    }
  
    // Limpiar el mensaje de error
    setError('');
    setIsSubmitting(true);
  
    // Pasa la consulta al manejador de búsqueda
    onSearch(query);
  
    // Resetear el estado del formulario
    setQuery('');
    setIsSubmitting(false);
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
      <button className="searchForm__button" type="submit" disabled={isSubmitting}>
        Buscar
      </button>
      <div className ="searchForm_mesageNoInput" >
      {error && <p style={{ color: 'red' }}>{error}</p>}
      </div>
    </form>
  );
}

export default SearchForm;