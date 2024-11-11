import { useRoute } from "@react-navigation/native";
import { useSQLiteContext } from "expo-sqlite";
import { useEffect, useState } from "react";

export const useData = () => {
  const db = useSQLiteContext();
  const route = useRoute();
  const params = route.params as any;

  const [data, setData] = useState<Fatwa[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    loadData();
  }, [params]);

  const loadData = async () => {
    let query = `
        SELECT fatwa.id, fatwa.title, fatwa.content,
               bm25(fatwa_fts) AS score
        FROM fatwa_fts
        JOIN fatwa ON fatwa_fts.rowid = fatwa.id
    `;
    const queryParams: Record<string, any> = {};

    try {
      const filters = JSON.parse(params.filters);

      // Local helper function
      const addFilter = (field: string, param: any) => {
        query += `${
          query.includes("WHERE") ? " AND" : " WHERE"
        } ${field} = $${param}`;
        queryParams[`$${param}`] = filters[param];
      };

      if (filters.fatwaNumber) {
        addFilter("fatwa_number", "fatwaNumber");
      } else {
        if (filters.query) {
          query += " WHERE title MATCH '$searchQuery'";
          queryParams.$searchQuery = filters.query;
        }

        ["fasal", "bab", "kitab"].forEach(
          (key) => filters[key] && addFilter(key, key)
        );
      }

      if (filters.darUlIfta) {
        addFilter("dar_ul_ifta", "darUlIfta");
      }

      if (filters.query) {
        query += " ORDER BY score ASC";
      }
    } catch (error) {
      setError(error);
      setLoading(false);
    }

    const statement = await db.prepareAsync(query);

    try {
      const results = await statement.executeAsync(queryParams);
      const rows = await results.getAllAsync();
      setData(rows as Fatwa[]);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
      await statement.finalizeAsync();
    }
  };

  return { data, loading, error };
};
