const fetchFoods = async (endURL) => {
  const url = 'https://www.themealdb.com/api/json/v1/1/';
  const response = await fetch(`${url}${endURL}`);
  const { meals } = await response.json();
  return meals;
};

const fetchDrinks = async (endURL) => {
  const url = 'https://www.thecocktaildb.com/api/json/v1/1/';
  const response = await fetch(`${url}${endURL}`);
  const { drinks } = await response.json();
  return drinks;
};

export default function redirectFetch(route, endURL) {
  return route.includes('drinks') ? fetchDrinks(endURL) : fetchFoods(endURL);
}
