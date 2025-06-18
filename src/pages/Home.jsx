
import '../styles/Home.css';
import Footer from '../components/Footer';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom'; 

function Home() {
  const navigate = useNavigate(); // Hook for navigation

  const handleStart = () => {
    navigate("/recipes"); //  Redirect to recipe selection page
  };

  return (
    <div className="home-page">
      <div className="hero-section container-fluid d-flex flex-wrap align-items-center justify-content-between py-5">
        <div className="hero-text col-md-6 mb-4 text-center text-md-start">
          <h1>It`s not just food, it`s an <span>EXPERIENCE!</span></h1>
          <button
            className="start-btn btn btn-success mt-3"
            onClick={handleStart} //  Add onClick handler
          >
            START YOUR EXPERIENCE NOW
          </button>
        </div>
        <div className="hero-image col-md-6 d-flex justify-content-center">
          <img src="/images/healthy.jpg" alt="Healthy Food" className="img-fluid rounded shadow" />
        </div>
      </div>

      <section className="about container text-center my-4 p-4 bg-light rounded">
        <h2>Who is <span className="brand">RecoMeal</span></h2>
        <p>
          At RecoMeal, we believe that healthy eating should be simple, personalized, and accessible to everyone.
          Our mission is to help users make smart food choices by offering intelligent meal recommendations
          based on the ingredients they already have, their dietary preferences, and health goals...
        </p>
      </section>

      <Footer />
    </div>
  );
}

export default Home;
