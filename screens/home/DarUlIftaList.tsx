import ErrorMessage from "@/components/ErrorMessage";
import Loading from "@/components/Loading";
import UrduText from "@/components/UrduText";
import { FlatList, View } from "react-native";
import { useData } from "./useData";

const DarUlIftaList = () => {
  const { data, loading, error } = useData();

  if (loading) {
    return <Loading />;
  }

  if (error) {
    console.log(error);
    return <ErrorMessage error={error} />;
  }

  return (
    <FlatList
      data={data}
      numColumns={2}
      renderItem={ListItem}
      keyExtractor={(item) => item.id.toString()}
    />
  );
};

const ListItem = ({ item }: { item: DarUlIfta }) => {
  return (
    <View>
      <UrduText>{item.name}</UrduText>
    </View>
  );
};

export default DarUlIftaList;
