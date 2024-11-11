import Loading from "@/components/Loading";
import { View } from "react-native";
import BabFilter from "./BabFilter";
import DarUlIftaFilter from "./DarUlIftaFilter";
import FasalFilter from "./FasalFilter";
import FatwaNumberFilter from "./FatwaNumberFilter";
import KitabFilter from "./KitabFilter";
import { useData } from "./useData";

const Filters = () => {
  const { loading } = useData();

  if (loading) {
    return <Loading />;
  }

  return (
    <View>
      <FatwaNumberFilter />
      <DarUlIftaFilter />
      <KitabFilter />
      <BabFilter />
      <FasalFilter />
    </View>
  );
};

export default Filters;
