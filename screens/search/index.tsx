import { ScrollView } from "react-native";
import SearchActions from "./Actions";
import { SearchContextProvider } from "./context/searchContext";
import Filters from "./Filters";
import { DataProvider } from "./Filters/useData";
import SearchInput from "./SearchInput";

const SearchScreen = () => {
  return (
    <SearchContextProvider>
      <DataProvider>
        <ScrollView>
          <SearchInput />
          <Filters />
          <SearchActions />
        </ScrollView>
      </DataProvider>
    </SearchContextProvider>
  );
};

export default SearchScreen;
