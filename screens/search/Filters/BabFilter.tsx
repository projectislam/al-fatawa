import { Picker } from "@react-native-picker/picker";
import { useMemo } from "react";
import { Text, View } from "react-native";
import { useSearchContext } from "../context/searchContext";
import { useData } from "./useData";

const BabFilter = () => {
  const { data } = useData();
  const { filters, applyFilter } = useSearchContext();

  const options = useMemo(() => {
    if (filters.kitab) {
      return data?.babList.filter((b) => b.kitab == filters.kitab) || [];
    }

    return data?.babList || [];
  }, [filters]);

  return (
    <View>
      <Text>Filter by Bab:</Text>
      <Picker
        selectedValue={filters.bab}
        onValueChange={(value) => applyFilter("bab", value)}
      >
        <Picker.Item label="All" value="" />
        {options.map((opt) => (
          <Picker.Item key={opt.id} label={opt.name} value={opt.id} />
        ))}
      </Picker>
    </View>
  );
};

export default BabFilter;
