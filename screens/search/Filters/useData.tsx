import { useSQLiteContext } from "expo-sqlite";
import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";

type FiltersData = {
  kitabList: Kitab[];
  babList: Bab[];
  fasalList: Fasal[];
  darUlIftaList: DarUlIfta[];
};

const DataContext = createContext<{
  data: FiltersData | undefined;
  loading: boolean;
  error: any;
}>({
  data: undefined,
  loading: true,
  error: null,
});

export const DataProvider = ({ children }: PropsWithChildren) => {
  const db = useSQLiteContext();
  const [data, setData] = useState<FiltersData>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const kitabList: Kitab[] = await db.getAllAsync("SELECT * FROM kitab");
      const babList: Bab[] = await db.getAllAsync("SELECT * FROM bab");
      const fasalList: Fasal[] = await db.getAllAsync("SELECT * FROM fasal");
      const darUlIftaList: DarUlIfta[] = await db.getAllAsync(
        "SELECT * FROM dar_ul_ifta"
      );

      setData({
        kitabList,
        babList,
        fasalList,
        darUlIftaList,
      });
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <DataContext.Provider value={{ data, loading, error }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  return useContext(DataContext);
};
