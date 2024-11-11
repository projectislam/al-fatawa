import UrduText from "@/components/UrduText";
import { t } from "@/locales/i18n";
import { Picker } from "@react-native-picker/picker";
import { View } from "react-native";
import { useSearchContext } from "../context/searchContext";
import { useData } from "./useData";

const DarUlIftaFilter = () => {
  const { data } = useData();
  const { filters, applyFilter } = useSearchContext();

  return (
    <View>
      <UrduText>{t("filter_by_dar_ul_ifta")}:</UrduText>
      <Picker
        selectedValue={filters.darUlIfta}
        onValueChange={(value) => applyFilter("darUlIfta", value)}
      >
        <Picker.Item label={t("all")} value="" />
        {data?.darUlIftaList.map((df) => (
          <Picker.Item key={df.id} label={df.name} value={df.id} />
        ))}
      </Picker>
    </View>
  );
};

export default DarUlIftaFilter;
