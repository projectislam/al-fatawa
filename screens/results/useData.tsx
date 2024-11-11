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
        SELECT fatwa.*,
               bm25(fatwa_fts) AS score
        FROM fatwa_fts
        JOIN fatwa ON fatwa_fts.rowid = fatwa.id
    `;
    const queryParams: Record<string, any> = {};

    try {
      const filters = JSON.parse(params.filters);

      if (filters.fatwaNumber) {
        query += " WHERE fatawa_number = $fatwaNumber";
        queryParams.$fatwaNumber = filters.fatwaNumber;
      } else {
        if (filters.query) {
          query += " WHERE title MATCH '$searchQuery'";
          queryParams.$searchQuery = filters.query;
        }

        if (filters.fasal) {
          if (query.includes("WHERE")) {
            query += " AND fasal = $fasal";
          } else {
            query += " WHERE fasal = $fasal";
          }

          queryParams.$fasal = filters.fasal;
        } else if (filters.bab) {
          if (query.includes("WHERE")) {
            query += " AND bab = $bab";
          } else {
            query += " WHERE bab = $bab";
          }

          queryParams.$bab = filters.bab;
        } else if (filters.kitab) {
          if (query.includes("WHERE")) {
            query += " AND kitab = $kitab";
          } else {
            query += " WHERE kitab = $kitab";
          }

          queryParams.$kitab = filters.kitab;
        }
      }

      if (filters.darUlIfta) {
        if (query.includes("WHERE")) {
          query += " AND dar_ul_ifta = $darUlIfta";
        } else {
          query += " WHERE dar_ul_ifta = $darUlIfta";
        }

        queryParams.$darUlIfta = filters.darUlIfta;
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
