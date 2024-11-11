import { Text, View } from "react-native";

type Props = {
  error: any;
};

const ErrorMessage = ({ error }: Props) => {
  return (
    <View>
      <Text>{error.message}</Text>
    </View>
  );
};

export default ErrorMessage;
