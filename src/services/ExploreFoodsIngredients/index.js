export async function getIngredientsList() {
  const MAX_INGREDIENTS = 12;
  const ENDPOINT = 'https://www.themealdb.com/api/json/v1/1/list.php?i=list';
  const REQUEST = await fetch(ENDPOINT);
  const DATA = await REQUEST.json().then((data) => data.meals);
  return DATA.slice(0, MAX_INGREDIENTS);
}

export async function getIngredientSearch(ingredient) {
  const MAX_INGREDIENTS = 12;
  const ENDPOINT = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`;
  const REQUEST = await fetch(ENDPOINT);
  const DATA = await REQUEST.json().then((data) => data.meals);

  return DATA.slice(0, MAX_INGREDIENTS);
}
