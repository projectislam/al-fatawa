import ErrorMessage from "@/components/ErrorMessage";
import Loading from "@/components/Loading";
import { View } from "react-native";
import BabFilter from "./BabFilter";
import DarUlIftaFilter from "./DarUlIftaFilter";
import FasalFilter from "./FasalFilter";
import FatwaNumberFilter from "./FatwaNumberFilter";
import KitabFilter from "./KitabFilter";
import { useData } from "./useData";

const Filters = () => {
  const { loading, error } = useData();

  if (loading) {
    return <Loading />;
  }

  if (error) {
    console.log(error);
    return <ErrorMessage error={error} />;
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
