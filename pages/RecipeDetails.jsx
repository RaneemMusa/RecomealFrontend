


// import { useParams } from 'react-router-dom';
// import { useEffect, useState } from 'react';
// import Footer from '../components/Footer';
// import '../styles/RecipeDetails.css';

// function RecipeDetails() {
//   const { id } = useParams();
//   const [recipe, setRecipe] = useState(null);
//   const apiKey = import.meta.env.VITE_SPOONACULAR_API_KEY;

//   useEffect(() => {
//     const fetchRecipe = async () => {
//       try {
//         const res = await fetch(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${apiKey}`);
//         const data = await res.json();
//         setRecipe(data);
//       } catch (err) {
//         console.error("Failed to fetch recipe", err);
//       }
//     };

//     fetchRecipe();
//   }, [id]);

//   const handleAddToList = () => {
//     const existing = JSON.parse(localStorage.getItem('myRecipes')) || [];
//     const isAlreadySaved = existing.find((r) => r.id === recipe.id);
//     if (!isAlreadySaved) {
//       localStorage.setItem('myRecipes', JSON.stringify([...existing, {
//         id: recipe.id,
//         title: recipe.title,
//         image: recipe.image
//       }]));
//       alert("Recipe added to your list!");
//     } else {
//       alert("Recipe is already in your list.");
//     }
//   };

//   if (!recipe) return <p className="loading">Loading recipe...</p>;

//   return (
//     <>
//       <div className="recipe-details">
//         <h2 className="details-title">{recipe.title}</h2>
//         <div className="details-card">
//           <div className="text-column">
//             <h3>Ingredients:</h3>
//             <ul>
//               {recipe.extendedIngredients?.map((ing, i) => (
//                 <li key={i}>{ing.original}</li>
//               ))}
//             </ul>

//             <h3>Steps:</h3>
//             {recipe.analyzedInstructions?.length > 0 ? (
//               <ol>
//                 {recipe.analyzedInstructions[0].steps.map((step, i) => (
//                   <li key={i}>{step.step}</li>
//                 ))}
//               </ol>
//             ) : (
//               <p>No instructions provided.</p>
//             )}

//             <button className="add-button" onClick={handleAddToList}>ADD TO MY LIST</button>
//           </div>

//           <div className="image-column">
//             <img src={recipe.image} alt={recipe.title} />
//           </div>
//         </div>
//       </div>
//       <Footer />
//     </>
//   );
// }


/////////////////////////////////////////////////////////
// import { useParams } from 'react-router-dom';
// import { useEffect, useState } from 'react';
// import Footer from '../components/Footer';
// import '../styles/RecipeDetails.css';

// function RecipeDetails() {
//   const { id } = useParams();
//   const [recipe, setRecipe] = useState(null);
//   const apiKey = import.meta.env.VITE_SPOONACULAR_API_KEY;

//   useEffect(() => {
//     const fetchRecipe = async () => {
//       try {
//         const res = await fetch(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${apiKey}`);
//         const data = await res.json();
//         setRecipe(data);
//       } catch (err) {
//         console.error("Failed to fetch recipe", err);
//       }
//     };

//     fetchRecipe();
//   }, [id]);

//   const handleAddToList = async () => {
//     const user = JSON.parse(localStorage.getItem('user'));
//     if (!user || !user.id) {
//       alert('Please log in first.');
//       return;
//     }

//     const instructions = recipe.analyzedInstructions?.[0]?.steps
//       ?.map(step => step.step)
//       .join('\n') || 'No instructions provided.';

//     try {
//       const res = await fetch('http://localhost:3001/api/saved_recipes', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           user_id: user.id,
//           recipe_id: recipe.id,
//           title: recipe.title,
//           image_url: recipe.image,
//           instructions,
//         }),
//       });

//       const data = await res.json();
//       if (res.ok) {
//         alert('Recipe saved!');
//       } else {
//         alert(data.message || 'Could not save recipe.');
//       }
//     } catch (err) {
//       console.error('Save error:', err);
//       alert('Error saving recipe.');
//     }
//   };

//   if (!recipe) return <p className="loading">Loading recipe...</p>;

//   return (
//     <>
//       <div className="recipe-details">
//         <h2 className="details-title">{recipe.title}</h2>
//         <div className="details-card">
//           <div className="text-column">
//             <h3>Ingredients:</h3>
//             <ul>
//               {recipe.extendedIngredients?.map((ing, i) => (
//                 <li key={i}>{ing.original}</li>
//               ))}
//             </ul>

//             <h3>Steps:</h3>
//             {recipe.analyzedInstructions?.[0]?.steps?.length ? (
//               <ol>
//                 {recipe.analyzedInstructions[0].steps.map((step) => (
//                   <li key={step.number}>{step.step}</li>
//                 ))}
//               </ol>
//             ) : (
//               <p>No instructions provided.</p>
//             )}

//             <button className="add-button" onClick={handleAddToList}>
//               ADD TO MY LIST
//             </button>
//           </div>
//           <div className="image-column">
//             <img src={recipe.image} alt={recipe.title} />
//           </div>
//         </div>
//       </div>
//       <Footer />
//     </>
//   );
// }

// export default RecipeDetails;



import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Footer from '../components/Footer';
import '../styles/RecipeDetails.css';

function RecipeDetails() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const apiKey = import.meta.env.VITE_SPOONACULAR_API_KEY;

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const res = await fetch(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${apiKey}`);
        const data = await res.json();
        setRecipe(data);

        // ✅ Save recipe to local database on "SHOW"
        await fetch('http://localhost:3001/api/recipes', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            id: data.id,
            title: data.title,
            image_url: data.image,
            instructions: data.instructions || data.analyzedInstructions?.[0]?.steps?.map(s => s.step).join(' ') || ''
          })
        });

      } catch (err) {
        console.error("Failed to fetch/save recipe", err);
      }
    };

    fetchRecipe();
  }, [id]);

  const handleAddToList = async () => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user?.id) {
      alert('Please log in first.');
      return;
    }

    try {
      const res = await fetch('http://localhost:3001/api/saved_recipes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_id: user.id,
          recipe_id: recipe.id
        }),
      });

      const data = await res.json();
      if (res.ok) {
        alert('Recipe added to your list!');
      } else {
        alert(data.error || 'Could not save recipe.');
      }
    } catch (err) {
      console.error('Save error:', err);
      alert('Error saving recipe.');
    }
  };

  if (!recipe) return <p className="loading">Loading recipe...</p>;

  return (
    <>
      <div className="recipe-details">
        <h2 className="details-title">{recipe.title}</h2>
        <div className="details-card">
          <div className="text-column">
            <h3>Ingredients:</h3>
            <ul>
              {recipe.extendedIngredients?.map((ing, i) => (
                <li key={i}>{ing.original}</li>
              ))}
            </ul>

            <h3>Steps:</h3>
            {recipe.analyzedInstructions?.[0]?.steps?.length ? (
              <ol>
                {recipe.analyzedInstructions[0].steps.map((step) => (
                  <li key={step.number}>{step.step}</li>
                ))}
              </ol>
            ) : (
              <p>No instructions provided.</p>
            )}

            <button className="add-button" onClick={handleAddToList}>
              ADD TO MY LIST
            </button>
          </div>
          <div className="image-column">
            <img src={recipe.image} alt={recipe.title} />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default RecipeDetails;


