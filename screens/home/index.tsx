import { ScrollView, StyleSheet, View } from "react-native";
import DarUlIftaList from "./DarUlIftaList";
import SearchBar from "./SearchBar";

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
