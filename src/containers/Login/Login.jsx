import React from 'react';
import PropTypes from 'prop-types';

import './Login.css';

const Login = (props) => (
  <div className="login-container">
    <form className="login-form" onSubmit={props.onSubmit}>
      <h3>Please provide Access Credentials</h3>
      <div className="access-field-container">
        <label htmlFor="accessId" className="auth-input-label">Access ID</label>
        <input
          name="accessId"
          id="accessId"
          className="auth-input-field"
          value={props.accessId}
          onChange={props.onAuthFieldChange}
        />
      </div>
      <div className="access-field-container">
        <label htmlFor="secretKey" className="auth-input-label">Access Key</label>
        <input
          name="secretKey"
          id="secretKey"
          className="auth-input-field"
          type="password"
          value={props.secretKey}
          onChange={props.onAuthFieldChange}
        />
      </div>
      <div className="login-button">
      <button type="submit" className="login-button">Log In</button>
      </div>
    </form>
  </div>
);

Login.propTypes = {
  accessId: PropTypes.string.isRequired,
  secretKey: PropTypes.string.isRequired,
  onAuthFieldChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default Login;
