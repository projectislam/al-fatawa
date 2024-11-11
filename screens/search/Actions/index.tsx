import { Button, View } from "react-native";
import { useSearchContext } from "../context/searchContext";

const SearchActions = () => {
  const { handleSearch } = useSearchContext();

  return (
    <View>
      <Button title="Search" onPress={handleSearch} />
    </View>
  );
};

export default SearchActions;
