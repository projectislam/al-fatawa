import { Picker } from "@react-native-picker/picker";
import { Text, View } from "react-native";
import { useSearchContext } from "../context/searchContext";
import { useData } from "./useData";

const DarUlIftaFilter = () => {
  const { data } = useData();
  const { filters, applyFilter } = useSearchContext();

  return (
    <View>
      <Text>Filter by Dar ul Ifta:</Text>
      <Picker
        selectedValue={filters.darUlIfta}
        onValueChange={(value) => applyFilter("darUlIfta", value)}
      >
        <Picker.Item label="All" value="" />
        {data?.darUlIftaList.map((df) => (
          <Picker.Item key={df.id} label={df.name} value={df.id} />
        ))}
      </Picker>
    </View>
  );
};

export default DarUlIftaFilter;
