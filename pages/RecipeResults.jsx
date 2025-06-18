

import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import '../styles/RecipeResults.css';
import Footer from '../components/Footer';

function RecipeResults() {
  const location = useLocation();
  const navigate = useNavigate();
  const [recipes, setRecipes] = useState([]);
  const ingredients = location.state?.ingredients || [];

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const apiKey = import.meta.env.VITE_SPOONACULAR_API_KEY;
        const response = await fetch(
          `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredients.join(',')}&number=6&apiKey=${apiKey}`
        );
        const data = await response.json();
        setRecipes(data);
      } catch (error) {
        console.error('Error fetching recipes:', error);
      }
    };

    if (ingredients.length > 0) {
      fetchRecipes();
    }
  }, [ingredients]);

 const handleShowClick = async (recipe) => {
  try {
    const detailsRes = await fetch(
      `https://api.spoonacular.com/recipes/${recipe.id}/information?apiKey=${import.meta.env.VITE_SPOONACULAR_API_KEY}`
    );
    const details = await detailsRes.json();

    const instructions = (details.analyzedInstructions?.[0]?.steps || [])
      .map((step) => step.step)
      .join('\n') || 'No instructions provided.';

    await fetch('http://localhost:3001/api/recipes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: recipe.id,
        title: recipe.title,
        image_url: recipe.image,
        instructions,
      }),
    });

    navigate(`/recipes/${recipe.id}`);
  } catch (error) {
    console.error('Error handling SHOW:', error);
  }
};


  return (
    <>
      <div className="recipe-results">
        <h2 className="results-title">RECIPES FOUND</h2>
        <div className="recipe-grid">
          {recipes.map((recipe) => (
            <div key={recipe.id} className="recipe-card">
              <img src={recipe.image} alt={recipe.title} className="recipe-img" />
              <h3 className="recipe-name">{recipe.title}</h3>
              <button className="show-btn" onClick={() => handleShowClick(recipe)}>
                SHOW
              </button>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default RecipeResults;
