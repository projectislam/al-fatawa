import { Picker } from "@react-native-picker/picker";
import { Text, View } from "react-native";
import { useSearchContext } from "../context/searchContext";
import { useData } from "./useData";

const KitabFilter = () => {
  const { data } = useData();
  const { filters, applyFilter } = useSearchContext();

  return (
    <View>
      <Text>Filter by Kitab:</Text>
      <Picker
        selectedValue={filters.kitab}
        onValueChange={(value) => applyFilter("kitab", value)}
      >
        <Picker.Item label="All" value="" />
        {data?.kitabList.map((k) => (
          <Picker.Item key={k.id} label={k.urdu} value={k.id} />
        ))}
      </Picker>
    </View>
  );
};

export default KitabFilter;
