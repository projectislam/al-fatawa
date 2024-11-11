import { t } from "@/locales/i18n";
import { Button, View } from "react-native";
import { useSearchContext } from "../context/searchContext";

const SearchActions = () => {
  const { handleSearch } = useSearchContext();

  return (
    <View>
      <Button title={t("search")} onPress={handleSearch} />
    </View>
  );
};

export default SearchActions;
