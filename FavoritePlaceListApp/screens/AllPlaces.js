import { useEffect, useState } from "react";
import PlacesList from "../components/Places/PlacesList";
import { useIsFocused } from "@react-navigation/native";
import { fetchPlaces } from "../util/database";
function AllPlaces({ route }) {
  const [loadedPlace, setLoadedPlace] = useState([]);
  const isFocussed = useIsFocused();
  useEffect(() => {
    async function loadedPlace() {
      const places = await fetchPlaces();
      setLoadedPlace(places);
    }
    if (isFocussed) {
      // setLoadedPlace((currentPlaces) => [...currentPlaces, route.params.place]);
    }
  }, [isFocussed]);
  return <PlacesList places={loadedPlace} />;
}

export default AllPlaces;
