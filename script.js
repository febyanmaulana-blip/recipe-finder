const sidebar = document.getElementById('sidebar');
const searchBtn = document.getElementById('searchBtn');
const searchInput = document.getElementById('searchInput');
const recipeResults = document.getElementById('recipeResults');
const darkModeToggle = document.getElementById('darkModeToggle');
const hamburger = document.getElementById('hamburger');

// Toggle sidebar & content slide
function toggleSidebar() {
  sidebar.classList.toggle('active');
  hamburger.classList.toggle('active');
}

// Hamburger click
hamburger.addEventListener('click', toggleSidebar);

// Dark mode persistence
if (localStorage.getItem('darkMode') === 'enabled') {
  document.body.classList.add('dark');
}
darkModeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  if (document.body.classList.contains('dark')) {
    localStorage.setItem('darkMode', 'enabled');
  } else {
    localStorage.setItem('darkMode', 'disabled');
  }
});

// Search button click
searchBtn.addEventListener('click', searchRecipes);

// Search on Enter
searchInput.addEventListener('keypress', function(e) {
  if (e.key === 'Enter') {
    searchRecipes();
  }
});

// Fetch recipes
async function searchRecipes() {
  const query = searchInput.value.trim();
  if (!query) return;

  recipeResults.innerHTML = '<div class="spinner"></div>';

  try {
    const res = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
    const data = await res.json();
    if (data.meals) {
      displayRecipes(data.meals);
    } else {
      recipeResults.innerHTML = '<p>No recipes found.</p>';
    }
  } catch (err) {
    recipeResults.innerHTML = '<p>Error fetching recipes.</p>';
  }
}

function displayRecipes(recipes) {
  recipeResults.innerHTML = recipes.map(meal => `
    <div class="recipe-card">
      <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
      <h3>${meal.strMeal}</h3>
      <p>${meal.strArea} - ${meal.strCategory}</p>
      <a href="${meal.strSource || '#'}" target="_blank">View Recipe</a>
    </div>
  `).join('');
}

// Load GitHub avatar
fetch('https://api.github.com/users/febyanmaulana-blip')
  .then(res => res.json())
  .then(data => {
    document.getElementById('github-avatar').src = data.avatar_url;
  });
