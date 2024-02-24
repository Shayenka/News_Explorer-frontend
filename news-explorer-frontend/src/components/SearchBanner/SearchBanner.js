import SearchForm from "../SearchForm/SearchForm";

export default function SearchBanner({ handleSearch, setQuery, query }) {
  return (
    <section className="main-container">
      <h1 className="main__title">¿Qué está pasando en el mundo?</h1>
      <h2 className="main__subtitle">
        Encuentra las últimas noticias sobre cualquier tema y guárdalas en tu
        cuenta personal.
      </h2>

      <SearchForm onSearch={handleSearch} setQuery={setQuery} query={query} />
    </section>
  );
}
