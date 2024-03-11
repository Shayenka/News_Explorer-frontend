import SearchForm from "../SearchForm/SearchForm";

export default function SearchBanner({ handleSearch, setQuery, query }) {
  return (
    <section className="searchBanner-container">
      <h1 className="searchBanner__title">¿Qué está pasando en el mundo?</h1>
      <h2 className="searchBanner__subtitle">
        Encuentra las últimas noticias sobre cualquier tema y guárdalas en tu
        cuenta personal.
      </h2>

      <SearchForm onSearch={handleSearch} setQuery={setQuery} query={query} />
    </section>
  );
}
