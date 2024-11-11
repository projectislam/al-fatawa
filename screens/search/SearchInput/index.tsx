import { useState } from "react";
import { Text, TextInput, View } from "react-native";

const SearchInput = () => {
  const [query, setQuery] = useState("");

  return (
    <View>
      <Text>Search Query:</Text>
      <TextInput
        style={{ borderBottomWidth: 1, marginBottom: 16, padding: 8 }}
        placeholder="Enter search query"
        value={query}
        onChangeText={setQuery}
      />
    </View>
  );
};

export default SearchInput;
