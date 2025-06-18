

import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import React from 'react';

import Welcome from './pages/Welcome';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import Home from './pages/Home';
import Header from './components/Header';
import RecipeSelection from './pages/RecipeSelection';
import RecipeResults from './pages/RecipeResults';
import RecipeDetails from './pages/RecipeDetails';
import FoodList from './pages/FoodList';
import ContactUs from './pages/ContactUs';
import Account from './pages/Account';
//import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminDashboard from './pages/AdminDashboard';
import AdminHeader from './components/AdminHeader';

function AppContent() {
  const location = useLocation();
const noHeaderRoutes = ["/", "/signup", "/login"];
const adminRoutes = ["/admin-dashboard"];
const showHeader = !noHeaderRoutes.includes(location.pathname) && !adminRoutes.includes(location.pathname);
const isAdmin = adminRoutes.includes(location.pathname);


  return (
    <>
      {showHeader && <Header />}
      {isAdmin && <AdminHeader />}

      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/recipes" element={<RecipeSelection />} />
        <Route path="/recipes-result" element={<RecipeResults />} />
        <Route path="/recipes/:id" element={<RecipeDetails />} />
          <Route path="/food-list" element={<FoodList />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/account" element={<Account />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />


      </Routes>
    </>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
      
    </Router>
  );
}

export default App;
