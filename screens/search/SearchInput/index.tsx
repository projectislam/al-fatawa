import { t } from "@/locales/i18n";
import { useState } from "react";
import { Text, TextInput, View } from "react-native";

const SearchInput = () => {
  const [query, setQuery] = useState("");

  return (
    <View>
      <Text>Search Query:</Text>
      <TextInput
        style={{ borderBottomWidth: 1, marginBottom: 16, padding: 8 }}
        placeholder={t("search_placeholder")}
        value={query}
        onChangeText={setQuery}
      />
    </View>
  );
};

export default SearchInput;
