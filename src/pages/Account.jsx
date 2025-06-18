


import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Account.css';
import Footer from '../components/Footer';

function Account() {
  const [user, setUser] = useState({ id: '', username: '', email: '' });
  const navigate = useNavigate();

  useEffect(() => {
    const localUser = JSON.parse(localStorage.getItem('user'));
    if (localUser?.id) {
      fetch(`http://localhost:3001/api/users/${localUser.id}`)
        .then(res => res.json())
        .then(data => {
          setUser(data);
        })
        .catch(err => {
          console.error('Error loading user info:', err);
          alert('Failed to load user info.');
        });
    } else {
      navigate('/login');
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`http://localhost:3001/api/users/${user.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: user.username, email: user.email })
      });

      if (!res.ok) {
        throw new Error('Failed to update user');
      }

      const updatedUser = await res.json();
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
      alert('Profile updated!');
    } catch (err) {
      console.error('Update failed:', err);
      alert('Error updating profile');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <>
      <div className="account-page">
        <div className="account-header">
          <h2>Account Settings</h2>
          <h3>{user.username || 'Username'}</h3>
          <p>{user.email || 'Email'}</p>
        </div>

        <form className="account-form" onSubmit={handleSubmit}>
          <label>
            Username
            <input
              type="text"
              name="username"
              value={user.username}
              onChange={handleChange}
              placeholder="Enter username..."
              required
            />
          </label>

          <label>
            Email
            <input
              type="email"
              name="email"
              value={user.email}
              onChange={handleChange}
              placeholder="Enter email..."
              required
            />
          </label>

          <button type="submit" className="update-btn">Update</button>
          <button type="button" className="logout-btn" onClick={handleLogout}>Log Out</button>
        </form>
      </div>

      <Footer />
    </>
  );
}

export default Account;


