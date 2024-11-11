import { t } from "@/locales/i18n";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import UrduText from "./UrduText";

export default function Loading() {
  return (
    <View style={styles.loadingContainer}>
      <ActivityIndicator />
      <UrduText>{t("loading")}</UrduText>
    </View>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
