import { useContext } from "react";
import { NewsContext } from "../../contexts/NewsContext";

export default  function useNewsContext() {
    return useContext(NewsContext)

}