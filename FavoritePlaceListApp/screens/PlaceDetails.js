import { ScrollView, View, Image, Text, StyleSheet } from "react-native";
import OutlinedButton from "../components/UI/OutlinedButton";
import { Colors } from "../constants/colors";
import { useEffect, useState } from "react";
import { fetchPlaceDetails } from "../util/database";

function PlaceDetails({ route, navigation }) {
  const [fetchedPlace, setFetchedPlace] = useState();
  function showOnMapHandler() {
    navigation.navigation("Map", {
      initialLat: fetchedPlace.lat,
      initialLong: fetchedPlace.long,
    });
  }
  const selectPlaceId = route.params.placeId;
  useEffect(() => {
    //use selectedPlaceId to ftech data for a single place
    const place = fetchPlaceDetails(selectPlaceId);
    setFetchedPlace(place);
    navigation.setOptions({
      title: place.title,
    });
  }, [selectPlaceId]);
  return (
    <ScrollView>
      <Image style={styles.Image} source={{ uri: fetchedPlace.imageUri }} />
      <View style={styles.locationContainer}>
        <View style={styles.addressContainer}>
          <Text style={styles.address}>{fetchedPlace.address}</Text>
        </View>
        <OutlinedButton icon="map" onTap={showOnMapHandler}>
          View On Map
        </OutlinedButton>
      </View>
    </ScrollView>
  );
}

export default PlaceDetails;

const styles = StyleSheet.create({
  Image: {
    height: "35%",
    minHeight: 300,
    width: "100%",
  },
  locationContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  addressContainer: {
    padding: 20,
  },
  address: {
    color: Colors.primary500,
    textAlign: "center",
    fontWeight: "bold",
    fontWeight: 16,
  },
});
