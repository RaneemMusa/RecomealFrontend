










import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/RecipeSelection.css';

function RecipeSelection() {
  const [ingredientsList, setIngredientsList] = useState([]);
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:3001/api/ingredients') // Your backend endpoint
      .then(res => res.json())
      .then(data => {
        const grouped = data.reduce((acc, item) => {
          const cat = item.category;
          if (!acc[cat]) acc[cat] = [];
          acc[cat].push(item.name);
          return acc;
        }, {});

        const list = Object.entries(grouped).map(([title, items]) => ({ title, items }));
        setIngredientsList(list);
      })
      .catch(err => console.error('Failed to load ingredients', err));
  }, []);

  const handleCheckboxChange = (ingredient) => {
    setSelectedIngredients(prev =>
      prev.includes(ingredient)
        ? prev.filter(item => item !== ingredient)
        : [...prev, ingredient]
    );
  };

  const handleFindRecipes = () => {
    navigate('/recipes-result', { state: { ingredients: selectedIngredients } });
  };

  const rows = [];
  for (let i = 0; i < ingredientsList.length; i += 2) {
    const left = ingredientsList[i];
    const right = ingredientsList[i + 1];
    rows.push([left, right]);
  }

  return (
    <>
      
      <div className="recipe-selection">
        <h2 className="section-title">WHAT`S IN YOUR FRIDGE?</h2>
        {rows.map((pair, idx) => (
          <div key={idx} className="category-row">
            <div className="ingredient-category">
              <h3>{pair[0].title}</h3>
              {pair[0].items.map((item, i) => (
                <label key={i}>
                  <input
                    type="checkbox"
                    value={item}
                    checked={selectedIngredients.includes(item)}
                    onChange={() => handleCheckboxChange(item)}
                  />
                  {item}
                </label>
              ))}
            </div>

            <div className="decorative-img-wrapper">
              <img src="/images/p1.png" alt="Decoration" className="decorative-img" />
            </div>

            {pair[1] && (
              <div className="ingredient-category">
                <h3>{pair[1].title}</h3>
                {pair[1].items.map((item, i) => (
                  <label key={i}>
                    <input
                      type="checkbox"
                      value={item}
                      checked={selectedIngredients.includes(item)}
                      onChange={() => handleCheckboxChange(item)}
                    />
                    {item}
                  </label>
                ))}
              </div>
            )}
          </div>
        ))}

        <button className="find-btn" onClick={handleFindRecipes}>
          FIND RECIPE!
        </button>
      </div>
      <Footer />
    </>
  );
}

export default RecipeSelection;

