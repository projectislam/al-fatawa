import { ScrollView, StyleSheet, View } from "react-native";
import SearchBar from "../../components/SearchBar";
import DarUlIftaList from "./DarUlIftaList";

const HomeScreen = () => {
  return (
    <ScrollView>
      <View style={styles.container}>
        <SearchBar />
        <DarUlIftaList />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
});

export default HomeScreen;
