import { Pressable, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../../constants/colors";

function OutlinedButton({ icon, onTap, children }) {
  return (
    <Pressable
      onPress={onTap}
      style={({ pressed }) => [styles.button, pressed && styles.pressed]}
    >
      <Ionicons
        style={styles.icon}
        name={icon}
        size={18}
        color={Colors.primary500}
      />
      <Text style={styles.text}>{children}</Text>
    </Pressable>
  );
}

export default OutlinedButton;

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    paddingHorizontal: 12,
    paddingVertical: 6,
    margin: 4,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: Colors.primary500,
  },
  pressed: {
    opacity: 0.7,
  },
  icon: {
    marginRight: 6,
  },
  text: {
    color: Colors.primary500,
  },
});
