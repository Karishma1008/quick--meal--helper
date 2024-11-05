// app.js

document.getElementById('searchBtn').addEventListener('click', function () {
  let ingredient = document.getElementById('ingredientInput').value;
  let mood = document.getElementById('moodSelector').value;
  let time = document.getElementById('timeSelector').value;
  let avoid = document.getElementById('avoidInput').value;

  // Build the API URL based on the ingredient input
  let apiUrl = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`;

  // Call TheMealDB API
  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      if (data.meals) {
        displayRecipes(data.meals);
      } else {
        document.getElementById('recipeResults').innerHTML = 'No recipes found!';
      }
    })
    .catch(error => {
      console.error('Error fetching data:', error);
      document.getElementById('recipeResults').innerHTML = 'Error fetching recipes.';
    });
});

function displayRecipes(meals) {
  const recipeResults = document.getElementById('recipeResults');
  recipeResults.innerHTML = '';

  meals.forEach(meal => {
    const mealDiv = document.createElement('div');
    mealDiv.classList.add('recipe-card');
    mealDiv.innerHTML = `
      <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
      <h3>${meal.strMeal}</h3>
      <a href="https://www.themealdb.com/meal/${meal.idMeal}" target="_blank">View Recipe</a>
    `;
    recipeResults.appendChild(mealDiv);
  });
}
