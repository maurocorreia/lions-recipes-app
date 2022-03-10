export default async function getDetailedRecipe(id) {
  const ENDPOINT = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
  const REQUEST = await fetch(ENDPOINT);
  const DATA = await REQUEST.json().then((data) => data.meals);
  console.log('hello');
  return DATA;
}
