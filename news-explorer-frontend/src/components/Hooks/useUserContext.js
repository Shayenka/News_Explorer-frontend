import { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

export default  function useUserContext() {
    return useContext(CurrentUserContext)

}