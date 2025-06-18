
// import { NavLink } from 'react-router-dom';
// import '../styles/Header.css';
// import { useState } from 'react';

// function Header() {
//   const [isOpen, setIsOpen] = useState(false);

//   return (
//     <header className="header">
//       <div className="header-left">
//         <img src="/images/reco-logo.png" alt="RecoMeal Logo" className="logo" />
//       </div>
//       <div className={`nav-toggle ${isOpen ? 'open' : ''}`} onClick={() => setIsOpen(!isOpen)}>
//         ☰
//       </div>
//       <nav className={`nav-links ${isOpen ? 'show' : ''}`}>
//         <NavLink to="/home">Home</NavLink>
//         <NavLink to="/recipes">Recipes</NavLink>
//         <NavLink to="/food-list">Food List</NavLink>
//         <NavLink to="/account">Account</NavLink>
//         <NavLink to="/contact">Contact us</NavLink>
//       </nav>
//     </header>
//   );
// }

// export default Header;

import { NavLink } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/Header.css';

function Header() {
  return (
    <Navbar expand="lg" bg="white" variant="light" className="shadow-sm py-2">
      <Container>
        <Navbar.Brand href="/home" className="d-flex align-items-center">
          <img
            src="/images/reco-logo.png"
            alt="RecoMeal Logo"
            className="reco-logo"
          />
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <Nav>
            <NavLink to="/home" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Home</NavLink>
            <NavLink to="/recipes" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Recipes</NavLink>
            <NavLink to="/food-list" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Food List</NavLink>
            <NavLink to="/account" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Account</NavLink>
            <NavLink to="/contact" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Contact us</NavLink>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;

