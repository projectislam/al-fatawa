import { Picker } from "@react-native-picker/picker";
import { Text, View } from "react-native";
import { useSearchContext } from "../context/searchContext";
import { useData } from "./useData";

const BabFilter = () => {
  const { data } = useData();
  const { filters, applyFilter } = useSearchContext();

  return (
    <View>
      <Text>Filter by Bab:</Text>
      <Picker
        selectedValue={filters.bab}
        onValueChange={(value) => applyFilter("bab", value)}
      >
        <Picker.Item label="All" value="" />
        {data?.babList.map((b) => (
          <Picker.Item key={b.id} label={b.urdu} value={b.id} />
        ))}
      </Picker>
    </View>
  );
};

export default BabFilter;
