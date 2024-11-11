import { StyleSheet, View } from "react-native";
import ResultList from "./ResultList";

const ResultsScreen = () => {
  return (
    <View style={styles.container}>
      <ResultList />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
});

export default ResultsScreen;
