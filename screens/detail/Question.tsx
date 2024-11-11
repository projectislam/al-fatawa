import UrduText from "@/components/UrduText";
import { t } from "@/locales/i18n";
import { StyleSheet, View } from "react-native";

type Props = {
  text: string;
};

const Question = ({ text }: Props) => {
  return (
    <View>
      <UrduText style={styles.sectionTitle}>{t("question")}</UrduText>
      <UrduText style={styles.content}>{text}</UrduText>
    </View>
  );
};

const styles = StyleSheet.create({
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 16,
    marginBottom: 4,
  },
  content: {
    fontSize: 16,
    color: "#333",
    marginBottom: 16,
  },
});

export default Question;
