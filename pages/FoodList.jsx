

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import '../styles/FoodList.css';

function FoodList() {
  const [recipes, setRecipes] = useState([]);
  const user = JSON.parse(localStorage.getItem('user'));
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSaved = async () => {
      if (!user?.id) {
        alert('Please log in to see your food list');
        return;
      }

      try {
        const res = await fetch(`http://localhost:3001/api/saved_recipes/user/${user.id}`);
        const data = await res.json();
        if (res.ok) {
          setRecipes(data);
        } else {
          alert(data.error || 'Failed to load saved recipes');
        }
      } catch (err) {
        console.error('Fetch error:', err);
        alert('Failed to load your saved recipes');
      }
    };

    fetchSaved();
  }, []);

  const removeFromList = async (recipeId) => {
    if (!user?.id) return;

    const confirm = window.confirm('Are you sure you want to remove this recipe?');
    if (!confirm) return;

    try {
      const res = await fetch(`http://localhost:3001/api/saved_recipes/${user.id}/${recipeId}`, {
        method: 'DELETE',
      });

      const data = await res.json();
      if (res.ok) {
        setRecipes((prev) => prev.filter((r) => r.recipe_id !== recipeId));
      } else {
        alert(data.error || 'Failed to delete');
      }
    } catch (err) {
      console.error('Delete error:', err);
      alert('Error deleting recipe');
    }
  };

  return (
    <>
      <div className="container mt-5 food-list">
        <h2 className="text-center mb-4">MY FOOD LIST</h2>
        <div className="row">
          {recipes.length === 0 ? (
            <p className="text-center">No saved recipes yet.</p>
          ) : (
            recipes.map((recipe) => (
              <div key={recipe.recipe_id} className="col-md-4 mb-3">
                <div className="card list-container">
                  <img
                    src={recipe.image_url}
                    className="card-img-top clickable"
                    alt={recipe.title}
                    onClick={() => navigate(`/recipes/${recipe.recipe_id}`)}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{recipe.title}</h5>
                    <p className="card-text">
                      Saved on: {new Date(recipe.saved_at).toLocaleDateString()}
                    </p>
                    <button
                      onClick={() => removeFromList(recipe.recipe_id)}
                      className="btn btn-danger mt-2"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default FoodList;
