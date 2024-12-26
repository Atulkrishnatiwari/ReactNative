import { Pressable, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
function IconButton({ icon, size, color, onClick }) {
  return (
    <Pressable
      style={({ pres }) => [styles.button, pres && styles.pressed]}
      onPress={onClick}
    >
      <Ionicons name={icon} size={size} color={color} />
    </Pressable>
  );
}

export default IconButton;

const styles = StyleSheet.create({
  button: {
    padding: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  pressed: {
    opacity: 0.7,
  },
});
