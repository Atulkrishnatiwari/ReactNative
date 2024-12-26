import { Image, Alert, View, StyleSheet, Text } from "react-native";
import OutlinedButton from "../UI/OutlinedButton";
import { Colors } from "../../constants/colors";
import {
  useIsFocused,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import {
  getCurrentPositionAsync,
  useForegroundPermissions,
  PermissionStatus,
} from "expo-location";
import { useEffect, useState } from "react";
import { getAddress, getMapPreview } from "../../util/locations";

function LocationPicker({ onPickLocation }) {
  const [pickedLocation, setPickedLocation] = useState();
  const isFocussed = useIsFocused();
  const navigation = useNavigation();
  const route = useRoute();
  const [locationPermission, requestPermission] = useForegroundPermissions();

  useEffect(() => {
    if (isFocussed && route.params) {
      const mapPickedLocation = route.params && {
        lat: route.params.pickedLat,
        long: route.params.pickedLong,
      };
      setPickedLocation(mapPickedLocation);
    }
  }, [route, isFocussed]);
  useEffect(() => {
    async function handleLocation() {
      if (pickedLocation) {
        const address = await getAddress(
          pickedLocation.lat,
          pickedLocation.long
        );
        onPickLocation({ ...pickedLocation, address: address });
      }
    }
    handleLocation();
  }, [pickedLocation, onPickLocation]);
  async function verifyPermission() {
    if (locationPermission.status === PermissionStatus.UNDETERMINED) {
      const permissionResponse = await requestPermission();
      return permissionResponse.granted;
    }
    if (locationPermission.status === PermissionStatus.DENIED) {
      Alert.alert(
        "Permission denied",
        "You need to grant location permissions to use this app"
      );
      return false;
    }
    return true;
  }
  async function getLocationHandler() {
    const hasPermission = await verifyPermission();
    if (!hasPermission) {
      return;
    }
    const location = await getCurrentPositionAsync();
    setPickedLocation({
      lat: location.coords.latitude,
      long: location.coords.longitude,
    });
  }
  function pickOnMapHandler() {
    navigation.navigate("Map");
  }
  let locationPreview = <Text>No location picked yet.</Text>;
  if (pickedLocation) {
    locationPreview = (
      <Image
        style={styles.image}
        source={{
          uri: getMapPreview(pickedLocation.lat, pickedLocation.long),
        }}
      />
    );
  }
  return (
    <View>
      <View style={styles.mapPreview}>{locationPreview}</View>
      <View style={styles.actions}>
        <OutlinedButton onTap={getLocationHandler} icon="location">
          Locate User
        </OutlinedButton>
        <OutlinedButton onTap={pickOnMapHandler} icon="map">
          Pick on Map
        </OutlinedButton>
      </View>
    </View>
  );
}

export default LocationPicker;

const styles = StyleSheet.create({
  mapPreview: {
    width: "100%",
    height: 200,
    marginVertical: 8,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.primary100,
    borderRadius: 4,
    overflow: "hidden",
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: "100%",
  },
});
