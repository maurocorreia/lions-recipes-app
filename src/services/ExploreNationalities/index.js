export async function getNationalities() {
  const ENDPOINT = 'https://www.themealdb.com/api/json/v1/1/list.php?a=list';
  const REQUEST = await fetch(ENDPOINT);
  const DATA = await REQUEST.json().then((data) => data.meals);

  return DATA;
}

export async function getFoodsByArea(area) {
  const MAX_INGREDIENTS = 12;
  const ENDPOINT = `https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`;
  const REQUEST = await fetch(ENDPOINT);
  const DATA = await REQUEST.json().then((data) => data.meals);

  return DATA.slice(0, MAX_INGREDIENTS);
}

export async function getAll() {
  const MAX_INGREDIENTS = 12;
  const ENDPOINT = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
  const REQUEST = await fetch(ENDPOINT);
  const DATA = await REQUEST.json().then((data) => data.meals);

  return DATA.slice(0, MAX_INGREDIENTS);
}
