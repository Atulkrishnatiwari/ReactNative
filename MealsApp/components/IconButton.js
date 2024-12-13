import { Pressable, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

function IconButton({ icon, color, pressButton }) {
  return (
    <Pressable
      style={({ pressed }) => pressed && styles.onPressed}
      onPress={pressButton}
    >
      <Ionicons name={icon} size={24} color={color} />
    </Pressable>
  );
}

export default IconButton;

const styles = StyleSheet.create({
  onPressed: {
    opacity: 0.7,
  },
});
