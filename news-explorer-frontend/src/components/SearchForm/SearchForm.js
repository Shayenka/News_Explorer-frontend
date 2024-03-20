import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function SearchForm({ onSearch, setQuery, query, isLogin, isRegister }) {
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isLogin || isRegister) {
      navigate("/");
    }

    if (!query.trim()) {
      setError("Por favor, introduzca una palabra clave.");
      return;
    }

    setError("");
    setIsSubmitting(true);

    onSearch();

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
      <button
        className="searchForm__button"
        type="submit"
        disabled={isSubmitting}
      >
        Buscar
      </button>
      <div className="searchForm_mesageNoInput">
        {error && <p style={{ color: "red" }}>{error}</p>}
      </div>
    </form>
  );
}

export default SearchForm;
