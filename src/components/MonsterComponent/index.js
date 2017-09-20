import React, { Component } from 'react';
import { connect } from 'react-redux';

class MonsterComponent extends Component {
  componentDidMount() {
    const cachedName = localStorage.getItem('name');
    if (cachedName) {
      this.props.setName(cachedName);
    }
  }

  onLogin = async () => {
    const { name } = await fetch('/login').then(res => res.json());
    this.props.setName(name);
    localStorage.setItem('name', name);
  };

  onLogout = () => {
    this.props.setName(name);
    localStorage.removeItem('name');
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

export default connect(mapStateToProps, mapDispatchToProps)(MonsterComponent);
