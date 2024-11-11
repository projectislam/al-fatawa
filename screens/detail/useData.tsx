import { useRoute } from "@react-navigation/native";
import { useSQLiteContext } from "expo-sqlite";
import { useEffect, useState } from "react";

export const useData = () => {
  const db = useSQLiteContext();
  const route = useRoute();
  const { fatwaId } = route.params as { fatwaId: number };

  const [data, setData] = useState<Fatwa>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const statement = await db.prepareAsync(
      `SELECT * FROM fatwa WHERE id = $id`
    );

    try {
      const result = await statement.executeAsync({ $id: fatwaId });
      const row = await result.getFirstAsync();
      setData(row as Fatwa);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error };
};
