import { useContext } from "react";
import { SearchContext } from "../../contexts/SearchContext";

export default function useSearchContext() {
  return useContext(SearchContext);
}
