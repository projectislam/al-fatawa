import { Text, TextInput, View } from "react-native";
import { useSearchContext } from "../context/searchContext";

const FatwaNumberFilter = () => {
  const { filters, applyFilter } = useSearchContext();

  return (
    <View>
      <Text>Filter by Fatawa Number:</Text>
      <TextInput
        style={{ borderBottomWidth: 1, marginBottom: 16, padding: 8 }}
        placeholder="Enter Fatawa Number"
        value={filters.fatwaNumber as any as string}
        onChangeText={(value) => applyFilter("fatwaNumber", parseInt(value))}
      />
    </View>
  );
};

export default FatwaNumberFilter;
