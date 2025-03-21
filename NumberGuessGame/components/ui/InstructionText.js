import { Text, StyleSheet } from "react-native";
import Colors from "../../constants/colors";

function InstructionText({ children, myStyle }) {
  return <Text style={[styles.instructionText, myStyle]}>{children}</Text>;
}

export default InstructionText;

const styles = StyleSheet.create({
  instructionText: {
    fontFamily: "open-sans",
    color: Colors.accent500,
    fontSize: 24,
  },
});
