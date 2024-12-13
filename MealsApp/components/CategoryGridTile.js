import { Pressable, View, Text, StyleSheet, Platform } from "react-native";

function CategoryGridTile({ title, color, onButtonTap }) {
  return (
    <View style={styles.gridItem}>
      <Pressable
        android_ripple={{ color: "#ccc" }}
        style={({ pressed }) => [
          styles.buttonStyle,
          pressed ? styles.buttonPressed : null,
        ]}
        onPress={onButtonTap}
      >
        <View style={[styles.innerGridContainer, { backgroundColor: color }]}>
          <Text style={styles.title}>{title}</Text>
        </View>
      </Pressable>
    </View>
  );
}

export default CategoryGridTile;
const styles = StyleSheet.create({
  gridItem: {
    flex: 1,
    margin: 16,
    height: 150,
    borderRadius: 8,
    elevation: 4,
    //for ios shadow
    backgroundColor: "white",
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    //for hiding overflow in ripple effect
    overflow: Platform.OS === "android" ? "hidden" : "visible",
  },
  buttonStyle: {
    flex: 1,
  },
  //for ios ripple effecr
  buttonPressed: {
    opacity: 0.5,
  },
  innerGridContainer: {
    flex: 1,
    padding: 16,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontWeight: "bold",
    fontSize: 18,
  },
});
