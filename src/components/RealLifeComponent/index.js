import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

class RealLifeComponent extends Component {
  componentDidMount() {
    const cachedName = localStorage.getItem('name');
    if (cachedName) {
      this.props.setName(cachedName);
    }
  }

  onLogin = async () => {
    const { name } = await fetch('/api/login').then(res => res.json());
    this.props.setName(name);
    localStorage.setItem('name', name);
    this.props.history.push('/');
  };

  onLogout = () => {
    this.props.setName(null);
    localStorage.removeItem('name');
    this.props.history.push('/login');
  };

  render() {
    if (!this.props.name) {
      return (
        <div>
          Wer bist du? <button onClick={this.onLogin}>Login</button>
        </div>
      );
    }

    return (
      <div>
        Hallo <strong>{this.props.name}</strong>!{' '}
        <button onClick={this.onLogout}>Logout</button>
      </div>
    );
  }
}

const mapStateToProps = ({ name }) => ({ name });

const mapDispatchToProps = dispatch => ({
  setName: name => dispatch({ type: 'SET_NAME', name })
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(RealLifeComponent)
);
