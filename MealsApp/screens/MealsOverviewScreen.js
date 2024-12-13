import { MEALS, CATEGORIES } from "../data/dummy-data";
import { useLayoutEffect } from "react";
import MealsList from "../components/MealsList/MealsList";
//we can also extract data through useRoute hook like showing below in commented line 6,7
function MealsOverviewScreen({ route, navigation }) {
  //const route = useRoute();
  // const catName = route.params.catName;
  const catId = route.params.categoryId;

  const displayedMeals = MEALS.filter((mealItem) => {
    return mealItem.categoryIds.indexOf(catId) >= 0;
  });

  useLayoutEffect(() => {
    const categoryTitle = CATEGORIES.find(
      (category) => category.id === catId
    ).title;

    navigation.setOptions({
      title: categoryTitle,
    });
  }, [catId, navigation]);
  return <MealsList item={displayedMeals} />;
}

export default MealsOverviewScreen;
