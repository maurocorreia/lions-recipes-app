export async function fetchAllFoods() {
  try {
    const { meals } = await (await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=')).json();
    return meals;
  } catch (error) {
    console.error(error.message);
  }
}

export async function fetchAllDrinks() {
  try {
    const { drinks } = await (await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=')).json();
    return drinks;
  } catch (error) {
    console.error(error.message);
  }
}
