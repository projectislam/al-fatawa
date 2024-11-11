import ErrorMessage from "@/components/ErrorMessage";
import Loading from "@/components/Loading";
import UrduText from "@/components/UrduText";
import { t } from "@/locales/i18n";
import { ScrollView, StyleSheet } from "react-native";
import Answer from "./Answer";
import FatwaInfo from "./FatwaInfo";
import Question from "./Question";
import FatwaTitle from "./Title";
import { useData } from "./useData";

const DetailScreen = () => {
  const { data, loading, error } = useData();

  if (loading) {
    return <Loading />;
  }

  if (error) {
    console.log(error);
    return <ErrorMessage error={error} />;
  }

  if (!data) {
    return <UrduText>{t("no_detail_found")}</UrduText>;
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <FatwaTitle text={data.title} />
      <Question text={data.question} />
      <Answer text={data.answer} />
      <FatwaInfo
        darUlIfta={data.dar_ul_ifta}
        fatwaNumber={data.fatwa_number}
        issuedAt={data.issued_at}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#fff",
  },
});

export default DetailScreen;
