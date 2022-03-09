const fetchFoods = async (endURL) => {
  try {
    const url = 'https://www.themealdb.com/api/json/v1/1/';
    const response = await fetch(`${url}${endURL}`);
    const { meals } = await response.json();
    return meals;
  } catch (error) {
    console.error(error.message);
  }
};

const fetchDrinks = async (endURL) => {
  try {
    const url = 'https://www.thecocktaildb.com/api/json/v1/1/';
    const response = await fetch(`${url}${endURL}`);
    const { drinks } = await response.json();
    return drinks;
  } catch (error) {
    console.error(error.message);
  }
};

export default function redirectFetch(route, endURL) {
  return route.includes('drinks') ? fetchDrinks(endURL) : fetchFoods(endURL);
}
