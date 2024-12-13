// import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import CategoriesScreen from "./screens/CategoriesScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import MealsOverviewScreen from "./screens/MealsOverviewScreen";
import MealDetailScreen from "./screens/MealDetailScreen";
import FavouriteScreen from "./screens/FavouriteScreen";

import { Ionicons } from "@expo/vector-icons";
// import FavouritesContextProvider from "./store/context/favorites-context";
import { store } from "./store/redux/store";
import { Provider } from "react-redux";

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();
function DrawerNavigator() {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: "#a26b6a" },
        headerTintColor: "white",
        sceneStyle: { backgroundColor: "#3f2f25" },
        drawerContentStyle: { backgroundColor: "#a26b6a" },
        drawerInactiveTintColor: "white",
        drawerActiveTintColor: "#98FF98",
        drawerActiveBackgroundColor: "#3f2f25",
      }}
    >
      <Drawer.Screen
        name="Categories"
        component={CategoriesScreen}
        options={{
          title: "All Categories",
          drawerIcon: ({ color, size }) => (
            <Ionicons name="list" color={color} size={size} />
          ),
        }}
      />
      <Drawer.Screen
        name="Favourites"
        component={FavouriteScreen}
        options={{
          drawerIcon: ({ color, size }) => (
            <Ionicons name="star" color={color} size={size} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}

export default function App() {
  return (
    <>
      <StatusBar style="light" />
      {/* <FavouritesContextProvider> */}
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerStyle: { backgroundColor: "#a26b6a" },
              headerTintColor: "white",
              contentStyle: { backgroundColor: "#3f2f25" },
            }}
          >
            <Stack.Screen
              name="MealsCategories"
              component={DrawerNavigator}
              options={{
                title: "All Categories",
                headerShown: false,
                // headerStyle: { backgroundColor: "#a26b6a" },
                // headerTintColor: "white",
                // contentStyle: { backgroundColor: "#3f2f25" },
              }}
            />
            <Stack.Screen
              name="MealsOverview"
              component={MealsOverviewScreen}
              // options={({ route, navigation }) => {
              //   const catId = route.params.categoryId;
              //   return {
              //     title: catId,
              //   };
              // }}
            />
            <Stack.Screen
              name="MealDetail"
              component={MealDetailScreen}
              options={{
                title: "About the Meal",
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
        {/* </FavouritesContextProvider> */}
      </Provider>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    // backgroundColor: "#24180",
    backgroundColor: "#24180",
  },
});
