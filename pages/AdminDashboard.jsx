// import { useEffect, useState } from "react";
// import axios from "axios";
// import "../styles/AdminDashboard.css";
// import AdminNavbar from "../components/AdminHeader";


// function AdminDashboard() {
//   const [categories, setCategories] = useState([]);
//   const [ingredients, setIngredients] = useState([]);
//   const [newCategory, setNewCategory] = useState("");
//   const [newIngredient, setNewIngredient] = useState({ name: "", category_id: "" });

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const fetchData = async () => {
//     const catRes = await axios.get("http://localhost:3001/api/categories");
//     const ingRes = await axios.get("http://localhost:3001/api/ingredients");
//     setCategories(catRes.data);
//     setIngredients(ingRes.data);
//   };

//   const handleAddCategory = async () => {
//     if (!newCategory) return;
//     await axios.post("http://localhost:3001/api/categories", { name: newCategory });
//     setNewCategory("");
//     fetchData();
//   };

//   const handleDeleteCategory = async (id) => {
//     await axios.delete(`http://localhost:3001/api/categories/${id}`);
//     fetchData();
//   };

//   const handleAddIngredient = async () => {
//     if (!newIngredient.name || !newIngredient.category_id) return;
//     await axios.post("http://localhost:3001/api/ingredients", newIngredient);
//     setNewIngredient({ name: "", category_id: "" });
//     fetchData();
//   };

//   const handleDeleteIngredient = async (id) => {
//     await axios.delete(`http://localhost:3001/api/ingredients/${id}`);
//     fetchData();
//   };

//   return (
    
//     <div className="admin-dashboard">
//       <h2>Admin Dashboard</h2>

//       <section>
//         <h3>Categories</h3>
//         <input
//           type="text"
//           placeholder="New category name"
//           value={newCategory}
//           onChange={(e) => setNewCategory(e.target.value)}
//         />
//         <button onClick={handleAddCategory}>Add Category</button>
//         <ul>
//           {categories.map((cat) => (
//             <li key={cat.id}>
//               {cat.name}
//               <button onClick={() => handleDeleteCategory(cat.id)}>Delete</button>
//             </li>
//           ))}
//         </ul>
//       </section>

//       <section>
//         <h3>Ingredients</h3>
//         <input
//           type="text"
//           placeholder="Ingredient name"
//           value={newIngredient.name}
//           onChange={(e) => setNewIngredient({ ...newIngredient, name: e.target.value })}
//         />
//         <select
//           value={newIngredient.category_id}
//           onChange={(e) => setNewIngredient({ ...newIngredient, category_id: e.target.value })}
//         >
//           <option value="">Select Category</option>
//           {categories.map((cat) => (
//             <option key={cat.id} value={cat.id}>{cat.name}</option>
//           ))}
//         </select>
//         <button onClick={handleAddIngredient}>Add Ingredient</button>

//         <ul>
//           {ingredients.map((ing) => (
//             <li key={ing.id}>
//               {ing.name} ({ing.category})
//               <button onClick={() => handleDeleteIngredient(ing.id)}>Delete</button>
//             </li>
//           ))}
//         </ul>
//       </section>
//     </div>
//   );
// }

// export default AdminDashboard;

// src/pages/AdminDashboard.jsx
// import { useEffect, useState } from 'react';
// import axios from 'axios';
// import '../styles/AdminDashboard.css';

// function AdminDashboard() {
//   const [categories, setCategories] = useState([]);
//   const [newCategory, setNewCategory] = useState('');

//   const headers = { 'x-role': 'admin' }; // Required for adminAuth

//   // Load categories
//   useEffect(() => {
//     fetchCategories();
//   }, []);

//   const fetchCategories = async () => {
//     try {
//       const res = await axios.get('http://localhost:3001/api/categories', { headers });
//       setCategories(res.data);
//     } catch (err) {
//       alert('Failed to load categories');
//       console.error(err);
//     }
//   };

//   const addCategory = async () => {
//     if (!newCategory.trim()) return;
//     try {
//       await axios.post('http://localhost:3001/api/categories', { name: newCategory }, { headers });
//       setNewCategory('');
//       fetchCategories();
//     } catch (err) {
//       alert('Failed to add category');
//       console.error(err);
//     }
//   };

//   const deleteCategory = async (id) => {
//     try {
//       await axios.delete(`http://localhost:3001/api/categories/${id}`, { headers });
//       fetchCategories();
//     } catch (err) {
//       alert('Failed to delete category');
//       console.error(err);
//     }
//   };

//   return (
//     <div className="admin-dashboard">
//       <h2>Admin Dashboard</h2>

//       <section>
//         <h3>Categories</h3>
//         <input
//           type="text"
//           value={newCategory}
//           onChange={(e) => setNewCategory(e.target.value)}
//           placeholder="New category name"
//         />
//         <button onClick={addCategory}>Add Category</button>

//         {categories.map((cat) => (
//           <div key={cat.id} className="category-item">
//             <span>{cat.name}</span>
//             <button onClick={() => deleteCategory(cat.id)}>Delete</button>
//           </div>
//         ))}
//       </section>
//     </div>
//   );
// }

// export default AdminDashboard;
// AdminDashboard.jsx
import { useEffect, useState } from 'react';
import '../styles/AdminDashboard.css';

function AdminDashboard() {
  const [categories, setCategories] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [newCategory, setNewCategory] = useState('');
  const [newIngredient, setNewIngredient] = useState({ name: '', category_id: '' });
  const [editingCategoryId, setEditingCategoryId] = useState(null);
  const [editingIngredientId, setEditingIngredientId] = useState(null);

  const headers = { 'Content-Type': 'application/json', 'x-role': 'admin' };

  const fetchCategories = async () => {
    const res = await fetch('http://localhost:3001/api/categories', { headers });
    const data = await res.json();
    setCategories(data);
  };

  const fetchIngredients = async () => {
    const res = await fetch('http://localhost:3001/api/ingredients', { headers });
    const data = await res.json();
    setIngredients(data);
  };

  useEffect(() => {
    fetchCategories();
    fetchIngredients();
  }, []);

  const addCategory = async () => {
    await fetch('http://localhost:3001/api/categories', {
      method: 'POST',
      headers,
      body: JSON.stringify({ name: newCategory })
    });
    setNewCategory('');
    fetchCategories();
  };

  const updateCategory = async (id, name) => {
    await fetch(`http://localhost:3001/api/categories/${id}`, {
      method: 'PUT',
      headers,
      body: JSON.stringify({ name })
    });
    setEditingCategoryId(null);
    fetchCategories();
  };

  const deleteCategory = async (id) => {
    await fetch(`http://localhost:3001/api/categories/${id}`, { method: 'DELETE', headers });
    fetchCategories();
  };

  const addIngredient = async () => {
    await fetch('http://localhost:3001/api/ingredients', {
      method: 'POST',
      headers,
      body: JSON.stringify(newIngredient)
    });
    setNewIngredient({ name: '', category_id: '' });
    fetchIngredients();
  };

  const updateIngredient = async (id, name, category_id) => {
    await fetch(`http://localhost:3001/api/ingredients/${id}`, {
      method: 'PUT',
      headers,
      body: JSON.stringify({ name, category_id })
    });
    setEditingIngredientId(null);
    fetchIngredients();
  };

  const deleteIngredient = async (id) => {
    await fetch(`http://localhost:3001/api/ingredients/${id}`, { method: 'DELETE', headers });
    fetchIngredients();
  };

  return (
    <div className="admin-dashboard">
      <h2>Admin Dashboard</h2>

      <section>
        <h3>Categories</h3>
        <input
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          placeholder="New category name"
        />
        <button onClick={addCategory}>Add Category</button>
        <ul>
          {categories.map((cat) => (
            <li key={cat.id}>
              {editingCategoryId === cat.id ? (
                <>
                  <input
                    defaultValue={cat.name}
                    onBlur={(e) => updateCategory(cat.id, e.target.value)}
                  />
                </>
              ) : (
                <>
                  {cat.name}
                  <button onClick={() => setEditingCategoryId(cat.id)}>Edit</button>
                  <button onClick={() => deleteCategory(cat.id)}>Delete</button>
                </>
              )}
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h3>Ingredients</h3>
        <input
          value={newIngredient.name}
          onChange={(e) => setNewIngredient({ ...newIngredient, name: e.target.value })}
          placeholder="Ingredient name"
        />
        <select
          value={newIngredient.category_id}
          onChange={(e) => setNewIngredient({ ...newIngredient, category_id: e.target.value })}
        >
          <option value="">Select Category</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>{cat.name}</option>
          ))}
        </select>
        <button onClick={addIngredient}>Add Ingredient</button>
        <ul>
          {ingredients.map((ing) => (
            <li key={ing.id}>
              {editingIngredientId === ing.id ? (
                <>
                  <input
                    defaultValue={ing.name}
                    onBlur={(e) => updateIngredient(ing.id, e.target.value, ing.category_id)}
                  />
                </>
              ) : (
                <>
                  {ing.name} ({ing.category})
                  <button onClick={() => setEditingIngredientId(ing.id)}>Edit</button>
                  <button onClick={() => deleteIngredient(ing.id)}>Delete</button>
                </>
              )}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

export default AdminDashboard;
