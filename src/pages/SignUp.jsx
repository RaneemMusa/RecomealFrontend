




import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/Auth.css';

function SignUp() {
  const [form, setForm] = useState({
    email: '',
    password: '',
    username: '',
    role: 'user'
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3001/api/users/signup', form);
     navigate('/login');
 // redirect after sign up
    } catch (err) {
      setError(err.response?.data?.message || 'Signup failed');
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card shadow-lg p-4 rounded">
        <img src="/images/reco-logo.png" alt="RecoMeal Logo" className="mb-3" />
        <h2>Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <input
            className="form-control mb-3"
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Enter email..."
            required
          />
          <input
            className="form-control mb-3"
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Enter password..."
            required
          />
          <input
            className="form-control mb-3"
            type="text"
            name="username"
            value={form.username}
            onChange={handleChange}
            placeholder="Enter your username..."
            required
          />
          <button type="submit" className="btn btn-warning w-100">Sign Up</button>
        </form>
        {error && <p className="text-danger mt-2">{error}</p>}
        <p className="mt-3">Already have an account? <Link to="/login">Login</Link></p>
      </div>
    </div>
  );
}

export default SignUp;

