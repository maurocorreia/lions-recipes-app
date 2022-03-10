const MAX_CARD = 6;

export async function fetchFoodbyId(foodId) {
  try {
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${foodId}`;
    const response = await fetch(url);
    const responseJSON = await response.json();
    return responseJSON.meals[0];
  } catch (error) {
    console.error(error.message);
  }
}

export async function fetchDrinkbyId(foodId) {
  try {
    const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${foodId}`;
    const response = await fetch(url);
    const responseJSON = await response.json();
    return responseJSON.drinks[0];
  } catch (error) {
    console.error(error.message);
  }
}

export async function fetchRecommendedFoods() {
  try {
    const url = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
    const response = await fetch(url);
    const responseJSON = await response.json();
    return responseJSON.meals.slice(0, MAX_CARD);
  } catch (error) {
    console.error(error.message);
  }
}

export async function fetchRecommendedDrinks() {
  try {
    const url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
    const response = await fetch(url);
    const responseJSON = await response.json();
    return responseJSON.drinks.slice(0, MAX_CARD);
  } catch (error) {
    console.error(error.message);
  }
}
