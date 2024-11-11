import UrduText from "@/components/UrduText";
import { t } from "@/locales/i18n";
import { TextInput, View } from "react-native";
import { useSearchContext } from "../context/searchContext";

const FatwaNumberFilter = () => {
  const { filters, applyFilter } = useSearchContext();

  return (
    <View>
      <UrduText>{t("filter_by_fatwa_number")}:</UrduText>
      <TextInput
        style={{ borderBottomWidth: 1, marginBottom: 16, padding: 8 }}
        placeholder={t("enter_fatwa_number")}
        value={filters.fatwaNumber as any as string}
        onChangeText={(value) => applyFilter("fatwaNumber", parseInt(value))}
      />
    </View>
  );
};

export default FatwaNumberFilter;
