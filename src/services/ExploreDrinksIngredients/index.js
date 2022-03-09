export default async function getIngredientsList() {
  const MAX_INGREDIENTS = 12;
  const ENDPOINT = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list';
  const REQUEST = await fetch(ENDPOINT);
  const DATA = await REQUEST.json().then((data) => data.drinks);

  return DATA.slice(0, MAX_INGREDIENTS);
}
