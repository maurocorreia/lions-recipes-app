const MAX_FILTERS = 5;

export async function fetchFiltersFood() {
  try {
    const { meals } = await (await fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list')).json();
    return meals.slice(0, MAX_FILTERS);
  } catch (error) {
    console.error(error.message);
  }
}

export async function fetchFiltersDrinks() {
  try {
    const { drinks } = await (await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list')).json();
    return drinks.slice(0, MAX_FILTERS);
  } catch (error) {
    console.error(error.message);
  }
}

export async function fetchFoodsByCategory(category) {
  try {
    const { meals } = await (await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)).json();
    return meals;
  } catch (error) {
    console.error(error.message);
  }
}

export async function fetchDrinksByCategory(category) {
  try {
    const { drinks } = await
    (await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`)).json();
    return drinks;
  } catch (error) {
    console.error(error.message);
  }
}
