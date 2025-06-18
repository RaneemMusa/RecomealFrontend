import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/Auth.css';

const BASE_URL = import.meta.env.VITE_SERVER_URL;

function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${BASE_URL}/api/users/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || 'Login failed');
        return;
      }

      const user = data.user;

      if (!user?.id) {
        setError('Login failed: No user ID returned');
        return;
      }

      localStorage.setItem('user', JSON.stringify({
        id: user.id,
        email: user.email,
        role: user.role,
        username: user.username
      }));

      if (user.role === 'admin') {
        navigate('/admin-dashboard');
      } else {
        navigate('/home');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('Something went wrong during login.');
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card shadow-lg p-4 rounded">
        <img src="/images/reco-logo.png" alt="RecoMeal Logo" className="mb-3" />
        <h2 className="auth-title">Log In</h2>
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
          <button type="submit" className="btn btn-warning w-100">Log In</button>
        </form>
        {error && <p className="text-danger mt-2">{error}</p>}
        <p className="auth-footer">Don't have an account? <Link to="/signup">Sign Up</Link></p>
      </div>
    </div>
  );
}

export default Login;
