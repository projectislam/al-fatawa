import ErrorMessage from "@/components/ErrorMessage";
import Loading from "@/components/Loading";
import UrduText from "@/components/UrduText";
import { t } from "@/locales/i18n";
import { router } from "expo-router";
import { FlatList, StyleSheet, TouchableOpacity, View } from "react-native";
import { useData } from "./useData";

const ResultList = () => {
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
      keyExtractor={(item) => item.id.toString()}
      renderItem={ResultItem}
    />
  );
};

const ResultItem = ({ item }: { item: Fatwa }) => {
  const handleFatwaClick = (fatwaId: number) => {
    router.navigate({ pathname: "/detail", params: { fatwaId } });
  };

  return (
    <View style={styles.fatwaCard}>
      <TouchableOpacity onPress={() => handleFatwaClick(item.id)}>
        <UrduText style={styles.title}>{item.title}</UrduText>
        <UrduText style={styles.subText}>
          {t("dar_ul_ifta")}: {(item.dar_ul_ifta as DarUlIfta)?.name}
        </UrduText>
        <UrduText style={styles.subText}>
          {t("issued_at")}: {item.issued_at}
        </UrduText>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  fatwaCard: {
    backgroundColor: "#f9f9f9",
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    elevation: 2,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },
  subText: {
    fontSize: 14,
    color: "#555",
  },
});

export default ResultList;
