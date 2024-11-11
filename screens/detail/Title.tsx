import UrduText from "@/components/UrduText";
import { StyleSheet } from "react-native";

type Props = {
  text: string;
};

const FatwaTitle = ({ text }: Props) => {
  return <UrduText style={styles.title}>{text}</UrduText>;
};

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
});

export default FatwaTitle;
