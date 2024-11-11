import UrduText from "@/components/UrduText";
import { t } from "@/locales/i18n";
import { StyleSheet, View } from "react-native";

type Props = {
  darUlIfta: number | DarUlIfta;
  issuedAt: string;
  fatwaNumber: string | number;
};

const FatwaInfo = ({ darUlIfta, issuedAt, fatwaNumber }: Props) => {
  return (
    <View>
      <UrduText style={styles.subText}>
        {t("dar_ul_ifta")}: {darUlIfta as any}
      </UrduText>
      <UrduText style={styles.subText}>
        {t("issued_at")}: {issuedAt}
      </UrduText>
      <UrduText style={styles.subText}>
        {t("fatwa_number")}: {fatwaNumber}
      </UrduText>
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
