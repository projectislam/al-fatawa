import { View } from "react-native";
import HtmlDisplay from "./HtmlDIsplay";

type Props = {
  text: string;
};

const Answer = ({ text }: Props) => {
  return (
    <View>
      <HtmlDisplay content={text} />
    </View>
  );
};

export default Answer;
