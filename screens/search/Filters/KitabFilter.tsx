import UrduText from "@/components/UrduText";
import { t } from "@/locales/i18n";
import { Picker } from "@react-native-picker/picker";
import { View } from "react-native";
import { useSearchContext } from "../context/searchContext";
import { useData } from "./useData";

const KitabFilter = () => {
  const { data } = useData();
  const { filters, applyFilter } = useSearchContext();

  return (
    <View>
      <UrduText>{t("filter_by_kitab")}:</UrduText>
      <Picker
        selectedValue={filters.kitab}
        onValueChange={(value) => applyFilter("kitab", value)}
      >
        <Picker.Item label={t("all")} value="" />
        {data?.kitabList.map((k) => (
          <Picker.Item key={k.id} label={k.name} value={k.id} />
        ))}
      </Picker>
    </View>
  );
};

export default KitabFilter;
