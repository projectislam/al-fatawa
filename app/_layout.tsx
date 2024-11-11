import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { SQLiteProvider } from "expo-sqlite";
import { useEffect } from "react";
import "react-native-reanimated";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <SQLiteProvider
      databaseName="v0.db"
      assetSource={{ assetId: require("../assets/v0.db") }}
    >
      <Stack>
        <Stack.Screen name="index" />
        <Stack.Screen name="search" />
        <Stack.Screen name="results" />
        <Stack.Screen name="detail" />
        <Stack.Screen name="+not-found" />
      </Stack>
    </SQLiteProvider>
  );
}
