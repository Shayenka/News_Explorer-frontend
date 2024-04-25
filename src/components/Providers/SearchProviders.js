import { useState } from "react";
import { SearchContext } from "../../contexts/SearchContext";
import Api from "../../utils/api";
import useNewsContext from "../Hooks/useNewsContext";

const api = new Api({
  address: "https://newsapi.org",
  apiKey: "016f14e7761d4baca1c75b200bde1015",
});

export default function SearchProvider({ children }) {
  const { setSearchQueries } = useNewsContext();
  const [query, setQuery] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [searchProcess, setSearchProcess] = useState(false);

  const handleSearch = async () => {
    setError("");
    setIsLoading(true);
    try {
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

      const fromDate = sevenDaysAgo.toISOString().split("T")[0];
      const toDate = new Date().toISOString().split("T")[0];

      const response = await api.get("/v2/everything", {
        q: query,
        apiKey: api.apiKey,
        from: fromDate,
        to: toDate,
        pageSize: 100,
      });

      setSearchResults(response.articles);
      setError("");
      setSearchQueries((prevQueries) => {
        const finalQuery = [query];

        return finalQuery;
      });
      setSearchProcess(true);
    } catch (error) {
      console.error("Error en la búsqueda de noticias:", error.message);
      setError(
        "Lo sentimos, algo ha salido mal durante la solicitud. Por favor, inténtelo de nuevo."
      );
    } finally {
      setIsLoading(false);
      setQuery("");
    }
  };

  return (
    <SearchContext.Provider
      value={{
        query,
        setQuery,
        handleSearch,
        searchResults,
        isLoading,
        searchProcess,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
}
