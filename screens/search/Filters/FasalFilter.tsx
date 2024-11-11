import { t } from "@/locales/i18n";
import { Picker } from "@react-native-picker/picker";
import { useMemo } from "react";
import { Text, View } from "react-native";
import { useSearchContext } from "../context/searchContext";
import { useData } from "./useData";

const FasalFilter = () => {
  const { data } = useData();
  const { filters, applyFilter } = useSearchContext();

  const options = useMemo(() => {
    if (filters.bab) {
      return data?.fasalList.filter((f) => f.bab == filters.bab) || [];
    }

    // if(filters.kitab) {
    //   return data?.fasalList.filter(f => f.bab.kitab == filters.kitab) || []
    // }

    return data?.fasalList || [];
  }, [filters]);

  return (
    <View>
      <Text>{t("filter_by_fasal")}:</Text>
      <Picker
        selectedValue={filters.fasal}
        onValueChange={(value) => applyFilter("fasal", value)}
      >
        <Picker.Item label={t("all")} value="" />
        {options.map((opt) => (
          <Picker.Item key={opt.id} label={opt.name} value={opt.id} />
        ))}
      </Picker>
    </View>
  );
};

export default FasalFilter;
