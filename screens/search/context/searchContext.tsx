import { router } from "expo-router";
import { createContext, PropsWithChildren, useContext, useState } from "react";

export type Ctx = {
  filters: {
    query?: string;
    kitab?: number;
    bab?: number;
    fasal?: number;
    fatwaNumber?: number;
    darUlIfta?: number;
  };
  applyFilter: <K extends keyof Ctx["filters"]>(
    name: K,
    value: Ctx["filters"][K]
  ) => void;
  clearFilter: (name: keyof Ctx["filters"]) => void;
  handleSearch: () => void;
};

const initialState: Ctx = {
  filters: {},
  applyFilter: () => {},
  clearFilter: () => {},
  handleSearch: () => {},
};

const SearchContext = createContext<Ctx>(initialState);

export const SearchContextProvider = ({ children }: PropsWithChildren) => {
  const [filters, setFilters] = useState(initialState.filters);

  const applyFilter = <K extends keyof Ctx["filters"]>(
    name: K,
    value: Ctx["filters"][K]
  ) => {
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const clearFilter = (name: keyof Ctx["filters"]) => {
    setFilters((prev) => ({
      ...prev,
      [name]: initialState.filters[name],
    }));
  };

  const handleSearch = () => {
    router.navigate({
      pathname: "/results",
      params: {
        filters: JSON.stringify(filters),
      },
    });
  };

  return (
    <SearchContext.Provider
      value={{ filters, applyFilter, clearFilter, handleSearch }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export const useSearchContext = () => {
  const context = useContext(SearchContext);

  if (!context) {
    throw new Error("SearchContext must be used within SearchContextProvider");
  }

  return context;
};
