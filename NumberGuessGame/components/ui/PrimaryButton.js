import { View, Text, Pressable, StyleSheet, Button } from "react-native";
import Colors from "../../constants/colors";

function PrimaryButton({ children, onPressButton }) {
  return (
    <View style={styles.buttonOuterContainer}>
      <Pressable
        style={({ pressed }) =>
          pressed
            ? [styles.buttonInnerContainer, styles.pressedStyle]
            : styles.buttonInnerContainer
        }
        onPress={onPressButton}
        android_ripple={{ color: Colors.primary600 }}
      >
        <Text style={styles.buttonText}>{children}</Text>
      </Pressable>
    </View>
  );
}
export default PrimaryButton;

const styles = StyleSheet.create({
  buttonOuterContainer: {
    borderRadius: 28,
    margin: 4,
    overflow: "hidden",
  },
  buttonInnerContainer: {
    backgroundColor: Colors.primary500,
    paddingVertical: 8,
    paddingHorizontal: 16,
    elevation: 2,
    //Ios shadow
    shadowColor: "#d9ead3",
    shadowOffset: { width: 1, height: 2 },
    shadowRadius: 8,
    shadowOpacity: 0.75,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
  },
  pressedStyle: {
    opacity: 0.75,
  },
});
