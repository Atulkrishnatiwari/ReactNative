import { useCallback, useLayoutEffect, useState } from "react";
import { Alert, StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";
import IconButtton from "../components/UI/IconButtton";
function Map({ navigation, route }) {
  const initialLocation = route.params && {
    lat: route.params.initialLat,
    long: route.params.initialLong,
  };
  const [selectedLocation, setSelectedLocation] = useState(initialLocation);
  const region = {
    latitude: initialLocation ? initialLocation.lat : 37.78,
    longitude: initialLocation ? initialLocation.long : -122.43,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };
  function selectedLocationHandler(event) {
    if (initialLocation) {
      return;
    }
    const lat = event.nativeEvent.coordinate.latitude;
    const long = event.nativeEvent.coordinate.longitude;
    setSelectedLocation({ lat: lat, long: long });
  }
  const savePickedLocationHandler = useCallback(() => {
    if (!selectedLocation) {
      Alert.alert(
        "No location picked",
        "You have to pick a location(by tapping on the map) first!"
      );
      return;
    }
    navigation.navigate("AddPlace", {
      pickedLat: selectedLocation.lat,
      pickedLong: selectedLocation.long,
    });
  }, [navigation, selectedLocation]);
  useLayoutEffect(() => {
    if (initialLocation) {
      return;
    }
    navigation.setOptions({
      headerRight: ({ tintColor }) => (
        <IconButtton
          icon="save"
          size={24}
          color={tintColor}
          onClick={savePickedLocationHandler}
        />
      ),
    });
  }, [navigation, savePickedLocationHandler]);
  return (
    <MapView
      onPress={selectedLocationHandler}
      style={styles.container}
      initialRegion={region}
    >
      {selectedLocation && (
        <Marker
          title="Picked Location"
          coordinate={{
            latitude: selectedLocation.lat,
            longitude: selectedLocation.long,
          }}
        />
      )}
    </MapView>
  );
}
export default Map;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
  },
});
