import React from 'react';
import PropTypes from 'prop-types';

import './Navbar.css';
import logo from '../../assets/logo.png';

const Navbar = (props) => (
  <div className="navbar">
    <img className="logo" src={logo} alt="brand logo" />
    {props.showLogoutButton && 
      <i className="fa fa-sign-out logout-button" onClick={props.onLogout} />
    }
  </div>
)

Navbar.propTypes = {
  showLogoutButton: PropTypes.bool.isRequired,
  onLogout: PropTypes.func.isRequired,
};

export default Navbar;
