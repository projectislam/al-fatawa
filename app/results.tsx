import UrduText from "@/components/UrduText";
import { useRoute } from "@react-navigation/native";
import { router } from "expo-router";
import { useSQLiteContext } from "expo-sqlite";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function ResultsScreen() {
  const db = useSQLiteContext();
  const route = useRoute();
  const { fasalId } = route.params as { fasalId: number };

  const [fatawa, setFatawa] = useState<Fatawa[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch fatawa related to the selected fasal
  useEffect(() => {
    const fetchFatawa = async () => {
      setLoading(true);

      const statement = await db.prepareAsync(
        `SELECT f.id, f.title, d.name, f.issued_at
           FROM fatwa f
           JOIN dar_ul_ifta d ON f.dar_ul_ifta = d.id
           WHERE f.fasal = $fasalId`
      );

      try {
        const result = await statement.executeAsync({ $fasalId: fasalId });
        const rows = await result.getAllAsync();
        setFatawa(rows as Fatawa[]);
        setLoading(false);
      } catch (error) {
        Alert.alert("Error", "Failed to load fatawa.");
        console.error(error);
      } finally {
        setLoading(false);
        await statement.finalizeAsync();
      }
    };

    fetchFatawa();
  }, [fasalId]);

  const handleFatwaClick = (fatwaId: number) => {
    router.navigate({ pathname: "/detail", params: { fatwaId } });
  };

  // Loading indicator
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator />
        <Text>Loading fatawa...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={fatawa}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.fatwaCard}>
            <TouchableOpacity onPress={() => handleFatwaClick(item.id)}>
              <UrduText style={styles.title}>{item.title}</UrduText>
              <Text style={styles.subText}>
                Dar-ul-Ifta: {(item.dar_ul_ifta as DarUlIfta)?.name}
              </Text>
              <Text style={styles.subText}>Issued: {item.issued_at}</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
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
