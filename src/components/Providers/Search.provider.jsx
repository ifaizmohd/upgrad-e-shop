import { createContext, useContext, useState } from "react";

// Create a search context
const SearchContext = createContext({
  // Default values for search term and its setter function
  searchTerm: "",
  setSearchTerm: () => {},
});

// Custom hook to access the search context
export const useSearch = () => useContext(SearchContext);

// SearchProvider component
const SearchProvider = ({ children }) => {
  // State to manage the search term
  const [searchTerm, setSearchTerm] = useState("");

  // Provide the search term and its setter function to child components
  return (
    <SearchContext.Provider value={{ searchTerm, setSearchTerm }}>
      {children}
    </SearchContext.Provider>
  );
};

export default SearchProvider;
