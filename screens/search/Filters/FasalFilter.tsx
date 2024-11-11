import { Picker } from "@react-native-picker/picker";
import { Text, View } from "react-native";
import { useSearchContext } from "../context/searchContext";
import { useData } from "./useData";

const FasalFilter = () => {
  const { data } = useData();
  const { filters, applyFilter } = useSearchContext();

  return (
    <View>
      <Text>Filter by Fasal:</Text>
      <Picker
        selectedValue={filters.fasal}
        onValueChange={(value) => applyFilter("fasal", value)}
      >
        <Picker.Item label="All" value="" />
        {data?.fasalList.map((f) => (
          <Picker.Item key={f.id} label={f.urdu} value={f.id} />
        ))}
      </Picker>
    </View>
  );
};

export default FasalFilter;
