export default async function getRandomDrinkRecipe() {
  const ENDPOINT = 'https://www.thecocktaildb.com/api/json/v1/1/random.php';
  const REQUEST = await fetch(ENDPOINT);
  const DATA = await REQUEST.json().then((data) => data.drinks[0].idDrink);

  return DATA;
}
