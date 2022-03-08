const fetchFoods = async (endURL) => {
  const url = 'https://www.themealdb.com/api/json/v1/1/';
  const response = await fetch(`${url}${endURL}`);
  const data = await response.json();
  console.log(data);
  return data;
};

const fetchDrinks = async (endURL) => {
  const url = 'https://www.thecocktaildb.com/api/json/v1/1/';
  const response = await fetch(`${url}${endURL}`);
  const data = await response.json();
  console.log(data);
  return data;
};

export default function redirectFetch(route, endURL) {
  return route.includes('drinks') ? fetchDrinks(endURL) : fetchFoods(endURL);
}
