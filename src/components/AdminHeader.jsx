import { NavLink } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/Header.css'; // reuse the same styling

function AdminHeader() {
  return (
    <Navbar expand="lg" bg="white" variant="light" className="shadow-sm py-2">
      <Container>
        <Navbar.Brand href="/admin-dashboard" className="d-flex align-items-center">
          <img
            src="/images/reco-logo.png"
            alt="RecoMeal Logo"
            className="reco-logo"
          />
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="admin-navbar-nav" />
        <Navbar.Collapse id="admin-navbar-nav" className="justify-content-end">
          <Nav>
            <NavLink to="/admin-dashboard" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Dashboard</NavLink>
            <NavLink to="/login" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Logout</NavLink>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default AdminHeader;
