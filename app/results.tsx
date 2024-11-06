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
  const routeParams = route.params as any;

  const [results, setResults] = useState<Fatawa[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log(routeParams, Date.now());
    searchFatawa();
  }, [routeParams]);

  const searchFatawa = async () => {
    setLoading(true);

    const filters = JSON.parse(routeParams.filters);

    let query = `SELECT * FROM fatwa`;
    const params: Record<string, any> = {};

    if (filters.query) {
      query += ` WHERE title LIKE '%${filters.query}%'`;
      // params.$query = filters.query;
    }

    if (filters.fasalId) {
      if (query.includes("WHERE")) {
        query += " AND fasal = $fasalId";
      } else {
        query += " WHERE fasal = $fasalId";
      }
      params.$fasalId = filters.fasalId;
    }

    if (filters.kitab) {
      if (query.includes("WHERE")) {
        query += " AND kitab = $kitabId";
      } else {
        query += " WHERE kitab = $kitabId";
      }
      params.$kitabId = filters.kitab;
    }

    if (filters.bab) {
      if (query.includes("WHERE")) {
        query += " AND bab = $babId";
      } else {
        query += " WHERE bab = $babId";
      }
      params.$babId = filters.bab;
    }

    if (filters.fasal) {
      if (query.includes("WHERE")) {
        query += " AND bab = $babId";
      } else {
        query += " WHERE bab = $babId";
      }
      params.$fasalId = filters.fasal;
    }

    if (filters.fatawaNumber) {
      if (query.includes("WHERE")) {
        query += " AND fatwa_number = $fatawaNumber";
      } else {
        query += " WHERE fatwa_number = $fatawaNumber";
      }
      params.$fatawaNumber = filters.fatawaNumber;
    }

    if (filters.darUlIfta) {
      if (query.includes("WHERE")) {
        query += " AND dar_ul_ifta = $darUlIfta";
      } else {
        query += " WHERE dar_ul_ifta = $darUlIfta";
      }
      params.$darUlIfta = filters.darUlIfta;
    }

    const statement = await db.prepareAsync(query);

    try {
      const result = await statement.executeAsync(params);
      const rows = await result.getAllAsync();
      setResults(rows as Fatawa[]);
    } catch (error: any) {
      Alert.alert("Search error", error.message);
      console.log(error);
    } finally {
      setLoading(false);
      await statement.finalizeAsync();
    }
  };

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
        data={results}
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
