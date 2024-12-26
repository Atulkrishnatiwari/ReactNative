import PlaceForm from "../components/Places/PlaceForm";
import { insertPlace } from "../util/database";

function AddPlace({ navigation }) {
  function createPlaceHandler(place) {
    insertPlace(place);
    navigation.navigate("AllPlaces", {
      place: place,
    });
  }
  return <PlaceForm onCreatePlace={createPlaceHandler} />;
}

export default AddPlace;
