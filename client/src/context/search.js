import { useState, useEffect, useContext, createContext } from "react";
import axios from "axios";

const SearchContext = createContext();

const SearchProvider = ({ children }) => {
  const [values, setValues] = useState({
    keyword: "",
    results: [],
  });

  return (
    <SearchContext.Provider value={[values, setValues]}>
      {children}
    </SearchContext.Provider>
  );
};

//custome hook

const useSearch = () => useContext(SearchContext);

export { useSearch, SearchProvider };
