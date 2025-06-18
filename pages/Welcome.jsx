

import { Link } from 'react-router-dom';
import '../styles/Welcome.css';

function Welcome() {
  return (
    <div className="welcome-container">
      <img src="/images/reco-logo.png" alt="RecoMeal Logo" className="welcome-logo" />
      <div className="welcome-text">
       
        <h1>
  
</h1>
<p className="welcome-description">
  Your journey to healthier, smarter eating starts <strong>now</strong>! 🍽️<br />
  Discover delicious recipes, meal plans, and more. 💡✨
</p>


      </div>
      <Link to="/signup">
        <button className="signup-btn">Sign Up</button>
      </Link>
      <p className="already-account">
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
}

export default Welcome;
