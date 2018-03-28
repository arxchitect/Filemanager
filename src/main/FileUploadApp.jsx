import React, { Component } from 'react';

import Navbar from '../components/Navbar';
import Login from '../containers/Login';
import AppContainer from '../containers/AppContainer';

import './FileUploadApp.css';

const defaultState = { accessId: "", secretKey: "", authed: false };

class FileUploadApp extends Component {
  constructor() {
    super();
    this.state = defaultState;
  }

  handleAuthFieldChange = (e) => this.setState({ [e.target.name]: e.target.value });
  handleLoginSubmit = (e) => {
    e.preventDefault();
    this.setState({ authed: true });
  }
  handleLogout = () => this.setState(defaultState);

  render() {
    return (
      <div className="FileUploadApp">
        <Navbar
          showLogoutButton={this.state.authed}
          onLogout={this.handleLogout}
        />
        { 
          this.state.authed ?
            <AppContainer  auth={{ accessId: this.state.accessId, accessKey: this.state.secretKey }}/>
            :
            <Login
              accessId={this.state.accessId}
              secretKey={this.state.secretKey}
              onAuthFieldChange={this.handleAuthFieldChange}
              onSubmit={this.handleLoginSubmit}
            />
        }
      </div>
    );
  }
}

export default FileUploadApp;
