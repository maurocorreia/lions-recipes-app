export default async function getRandomFoodRecipe() {
  const ENDPOINT = 'https://www.themealdb.com/api/json/v1/1/random.php';
  const REQUEST = await fetch(ENDPOINT);
  const DATA = await REQUEST.json().then((data) => data.meals[0].idMeal);

  return DATA;
}
