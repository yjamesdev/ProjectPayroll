import "../assets/Nav.css";
import logo from "/icon.png";
import PropTypes from "prop-types";
import {FiHome} from 'react-icons/fi'
import { Link } from "react-router-dom";

const Navbar = ({ show }) => {
  return (
    <div className={show ? "sidenav active" : "sidenav"}>
      <img src={logo} alt="Logo" className="logo" />
      <ul>
        <li>
          <Link to="/"><FiHome/>Home</Link>
        </li>
        <li>
          <Link to="/Abouts us">Abouts us</Link>
        </li>

        <li>
          <Link to="/">Contact</Link>
        </li>
      </ul>
    </div>
  );
};

Navbar.propTypes = {
  show: PropTypes.bool.isRequired,
};

export default Navbar;
