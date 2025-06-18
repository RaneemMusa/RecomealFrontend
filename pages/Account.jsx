// import { useState, useEffect } from 'react';
// import '../styles/Account.css';
// import Footer from '../components/Footer';

// function Account() {
//   const [user, setUser] = useState({
//     fullName: '',
//     username: '',
//     email: '',
//     profileImage: ''
//   });

//   // Load user info from localStorage
//   useEffect(() => {
//     const storedUser = JSON.parse(localStorage.getItem('recoUser'));
//     if (storedUser) {
//       setUser(storedUser);
//     }
//   }, []);

//   const handleChange = (e) => {
//     const { name, value, files } = e.target;
//     if (name === 'profileImage' && files.length > 0) {
//       const reader = new FileReader();
//       reader.onload = () => {
//         setUser((prev) => ({ ...prev, profileImage: reader.result }));
//       };
//       reader.readAsDataURL(files[0]);
//     } else {
//       setUser((prev) => ({ ...prev, [name]: value }));
//     }
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     localStorage.setItem('recoUser', JSON.stringify(user));
//     alert('Profile updated!');
//   };

//   return (
//     <>
//       <div className="account-page">
//         <div className="account-header">
//           <h2>Account Settings</h2>
//           <h3>{user.fullName || 'Full Name'}</h3>
//           <p>{user.email || 'Email'}</p>
//         </div>

//         <form className="account-form" onSubmit={handleSubmit}>
//           <label>
//             Full Name
//             <input type="text" name="fullName" value={user.fullName} onChange={handleChange} placeholder="Enter full name..." />
//           </label>

//           <label>
//             Username
//             <input type="text" name="username" value={user.username} onChange={handleChange} placeholder="Enter username..." />
//           </label>

//           <label>
//             Email
//             <input type="email" name="email" value={user.email} onChange={handleChange} placeholder="Enter email..." />
//           </label>

//           <label className="image-upload">
//             Profile Image
//             <input type="file" name="profileImage" accept="image/*" onChange={handleChange} />
//             {user.profileImage && <img src={user.profileImage} alt="Preview" className="preview-image" />}
//           </label>

//           <button type="submit" className="update-btn">Update</button>
//         </form>
//       </div>

//       <Footer />
//     </>
//   );
// }

// export default Account;



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


