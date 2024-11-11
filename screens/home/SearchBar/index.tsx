import { router } from "expo-router";
import { StyleSheet, TextInput, TouchableOpacity } from "react-native";

const SearchBar = () => {
  return (
    <TouchableOpacity onPress={() => router.push("/search")}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search..."
        editable={false}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  searchInput: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 10,
    borderRadius: 8,
  },
});

export default SearchBar;
