import { StyleSheet, Text, View } from "react-native";

type Props = {
  darUlIfta: number | DarUlIfta;
  issuedAt: string;
  fatwaNumber: string | number;
};

const FatwaInfo = ({ darUlIfta, issuedAt, fatwaNumber }: Props) => {
  return (
    <View>
      <Text style={styles.subText}>Dar-ul-Ifta: {darUlIfta as any}</Text>
      <Text style={styles.subText}>Issued at: {issuedAt}</Text>
      <Text style={styles.subText}>Fatwa Number: {fatwaNumber}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  subText: {
    fontSize: 16,
    color: "#555",
    marginBottom: 4,
  },
});

export default FatwaInfo;
