import { useSQLiteContext } from "expo-sqlite";
import { useEffect, useState } from "react";

export const useData = () => {
  const db = useSQLiteContext();
  const [data, setData] = useState<DarUlIfta[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const darUlIftaResult = await db.getAllAsync("SELECT * FROM dar_ul_ifta");
      setData(darUlIftaResult as DarUlIfta[]);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error };
};
